package customServices

import (
	"github.com/pkg/errors"
	"gorm.io/gorm"

	types "AdventureEngineServer/generatedDatabaseTypes"
	services "AdventureEngineServer/generatedServices"
	utils "AdventureEngineServer/utils"
)

func Register(db *gorm.DB, user *types.User) error {

	//Make sure we have the fields we care about
	if user.Username == nil {
		return errors.New("No username provided")
	}

	if user.Password == nil {
		return errors.New("No password provided")
	}

	//Make sure there is not an existing user with the given username
	var foundUsers = []types.User{}

	err := services.GetUsers(db, &foundUsers, &[]utils.FilterExpression{
		{Field: "Username", Operator: "eq", FilterValue: *user.Password},
	})

	if err != nil {
		return err
	}

	if len(foundUsers) > 0 {
		return errors.New("User with username already exists")
	}

	//Hash and save the new user entity
	hashedPassword, err := utils.HashPassword(*user.Password)

	if err != nil {
		return err
	}

	user.Password = &hashedPassword

	serviceBuffer := []*types.User{user}

	if err := services.SaveUser(db, serviceBuffer); err != nil {
		return err
	}

	return nil
}

func Login(db *gorm.DB, user *types.User) error {

	if user.Username == nil {
		return errors.New("No username provided")
	}

	if user.Password == nil {
		return errors.New("No password provided")
	}

	var foundUsers = []types.User{}

	services.GetUsers(db, &foundUsers, &[]utils.FilterExpression{
		{Field: "Username", Operator: "eq", FilterValue: *user.Username},
	})

	if len(foundUsers) > 1 {
		return errors.New("Somehow multiple users have the same username?!")
	}

	//Actually validate the given provided credentials
	if !utils.VerifyPassword(*user.Password, *(foundUsers[0].Password)) {
		return errors.New("Incorrect password")
	}

	//Now that we're good, generate a new session token (eventually)
	return nil
}
