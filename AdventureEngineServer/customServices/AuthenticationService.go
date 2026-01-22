package customServices

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/pkg/errors"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	types "AdventureEngineServer/generatedDatabaseTypes"
	services "AdventureEngineServer/generatedServices"
	utils "AdventureEngineServer/utils"
)

type AESessionCookie struct {
	jwt.MapClaims
	userId  int
	expires int64
}

//#region Internal Utilities

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 15)
	return string(bytes), err
}

func verifyPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func createToken(userId int) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"userId": userId,
			"exp":    time.Now().Add(time.Hour * 24).Unix(),
		})

	tokenString, err := token.SignedString([]byte(utils.GetEnvVar("SECRET_KEY")))

	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func verifyToken(tokenString string) error {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(utils.GetEnvVar("SECRET_KEY")), nil
	})

	if err != nil {
		return err
	}

	if !token.Valid {
		return errors.New("Invalid token")
	}

	return nil
}

func getClaimsFromToken(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(utils.GetEnvVar("SECRET_KEY")), nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, err
}

//#endregion

func Register(db *gorm.DB, user *types.User) (*string, error) {

	//Make sure we have the fields we care about
	if user.Username == nil {
		return nil, errors.New("No username provided")
	}

	if user.Password == nil {
		return nil, errors.New("No password provided")
	}

	//Make sure there is not an existing user with the given username
	var foundUsers = []types.User{}

	err := services.GetUsers(db, &foundUsers, &[]utils.FilterExpression{
		{Field: "Username", Operator: "eq", FilterValue: *user.Password},
	})

	if err != nil {
		return nil, err
	}

	if len(foundUsers) > 0 {
		return nil, errors.New("User with username already exists")
	}

	//Hash and save the new user entity
	hashedPassword, err := hashPassword(*user.Password)

	if err != nil {
		return nil, err
	}

	user.Password = &hashedPassword

	serviceBuffer := []*types.User{user}

	if err := services.SaveUser(db, serviceBuffer); err != nil {
		return nil, err
	}

	sessionToken, err := createToken(*user.Id)

	if err != nil {
		return nil, errors.New("Could not generate JWT session token for user " + *user.Username)
	}

	return &sessionToken, nil
}

func Login(db *gorm.DB, user *types.User) (*string, error) {

	if user.Username == nil {
		return nil, errors.New("No username provided")
	}

	if user.Password == nil {
		return nil, errors.New("No password provided")
	}

	var foundUsers = []types.User{}

	services.GetUsers(db, &foundUsers, &[]utils.FilterExpression{
		{Field: "Username", Operator: "eq", FilterValue: *user.Username},
	})

	if len(foundUsers) > 1 {
		return nil, errors.New("Somehow multiple users have the same username?!")
	}

	//Actually validate the given provided credentials
	if !verifyPassword(*user.Password, *(foundUsers[0].Password)) {
		return nil, errors.New("Incorrect password")
	}

	sessionToken, err := createToken(*(foundUsers[0].Id))

	if err != nil {
		return nil, errors.New("Could not generate JWT session token for user " + *user.Username)
	}

	//Now that we're good, generate a new session token (eventually)
	return &sessionToken, nil
}

func GetActiveUser(db *gorm.DB, sessionToken string, user *types.User) error {

	claim, err := getClaimsFromToken(sessionToken)

	if err != nil {
		return err
	}

	if claim == nil {
		return errors.New("Could not determine claim for session token")
	}

	//This id cast is terrible, but I just want to get a better working base before
	//adding the actual interface in, since that caused some problems getting the claim
	//to cast
	if err = services.GetUserById(db, int(claim["userId"].(float64)), user); err != nil {
		return err
	}

	return nil
}
