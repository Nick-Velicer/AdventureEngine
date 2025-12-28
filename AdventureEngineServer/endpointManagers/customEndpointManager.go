package endpointManagers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"gorm.io/gorm"

	dtos "AdventureEngineServer/generatedDTOs"
	types "AdventureEngineServer/generatedDatabaseTypes"
	services "AdventureEngineServer/generatedServices"
	utils "AdventureEngineServer/utils"
)

func ApplyCustomEndpoints(router *gin.Engine, db *gorm.DB) {
	router.POST("/register", ProduceDBContextInjectedEndpoint(router, db, register))
	router.POST("/login", ProduceDBContextInjectedEndpoint(router, db, login))
}

func register(ctx *gin.Context, db *gorm.DB) {

	//Attempt to bind the user entity
	DTOBuffer := &dtos.UserDTO{}

	if err := ctx.ShouldBindBodyWith(DTOBuffer, binding.JSON); err != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	user := dtos.UserDTOToUser(DTOBuffer)

	//Make sure we have the fields we care about
	if user.Username == nil {
		ctx.IndentedJSON(http.StatusBadRequest, errors.New("No username provided"))
		return
	}

	if user.Password == nil {
		ctx.IndentedJSON(http.StatusBadRequest, errors.New("No password provided"))
		return
	}

	//Make sure there is not an existing user with the given username
	var foundUsers = []types.User{}

	services.GetUsers(db, &foundUsers, &[]utils.FilterExpression{
		{Field: "Username", Operator: "eq", FilterValue: *user.Password},
	})

	if len(foundUsers) > 0 {
		ctx.IndentedJSON(http.StatusBadRequest, errors.New("User with username already exists"))
		return
	}

	//Hash and save the new user entity
	hashedPassword, err := utils.HashPassword(*user.Password)

	if err != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, err)
		return
	}

	user.Password = &hashedPassword

	serviceBuffer := []*types.User{user}

	if err := services.SaveUser(db, serviceBuffer); err != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	ctx.IndentedJSON(http.StatusOK, nil)
}

func login(ctx *gin.Context, db *gorm.DB) {

	//Attempt to bind/validate the user entity with credential challenge
	DTOBuffer := &dtos.UserDTO{}

	if err := ctx.ShouldBindBodyWith(DTOBuffer, binding.JSON); err != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	user := dtos.UserDTOToUser(DTOBuffer)

	if user.Username == nil {
		ctx.IndentedJSON(http.StatusBadRequest, errors.New("No username provided"))
		return
	}

	if user.Password == nil {
		ctx.IndentedJSON(http.StatusBadRequest, errors.New("No password provided"))
		return
	}

	var foundUsers = []types.User{}

	services.GetUsers(db, &foundUsers, &[]utils.FilterExpression{
		{Field: "Username", Operator: "eq", FilterValue: *user.Password},
	})

	if len(foundUsers) > 1 {
		ctx.IndentedJSON(http.StatusInternalServerError, errors.New("Somehow multiple users have the same username?!"))
		return
	}

	//Actually validate the given provided credentials
	if !utils.VerifyPassword(*user.Password, *foundUsers[0].Password) {
		ctx.IndentedJSON(http.StatusUnauthorized, errors.New("Incorrect password"))
		return
	}

	//Now that we're good, generate a new session token (eventually)

	ctx.IndentedJSON(http.StatusOK, nil)
}
