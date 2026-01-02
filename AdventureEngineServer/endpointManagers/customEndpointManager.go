package endpointManagers

import (
	"fmt"
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
		ctx.IndentedJSON(http.StatusBadRequest, "No username provided")
		return
	}

	if user.Password == nil {
		ctx.IndentedJSON(http.StatusBadRequest, "No password provided")
		return
	}

	//Make sure there is not an existing user with the given username
	var foundUsers = []types.User{}

	err := services.GetUsers(db, &foundUsers, &[]utils.FilterExpression{
		{Field: "Username", Operator: "eq", FilterValue: *user.Password},
	})

	if err != nil {
		fmt.Println(err)
		ctx.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	if len(foundUsers) > 0 {
		ctx.IndentedJSON(http.StatusBadRequest, "User with username already exists")
		return
	}

	fmt.Println("hashing")

	//Hash and save the new user entity
	hashedPassword, err := utils.HashPassword(*user.Password)

	fmt.Println(hashedPassword)

	if err != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	user.Password = &hashedPassword

	fmt.Println("Finished hashing")

	serviceBuffer := []*types.User{user}

	if err := services.SaveUser(db, serviceBuffer); err != nil {
		fmt.Println("Error while saving")
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
		ctx.IndentedJSON(http.StatusBadRequest, "No username provided")
		return
	}

	if user.Password == nil {
		ctx.IndentedJSON(http.StatusBadRequest, "No password provided")
		return
	}

	var foundUsers = []types.User{}

	services.GetUsers(db, &foundUsers, &[]utils.FilterExpression{
		{Field: "Username", Operator: "eq", FilterValue: *user.Username},
	})

	fmt.Println(foundUsers)
	fmt.Println(foundUsers[0])
	fmt.Println(foundUsers[0].Username)
	fmt.Println(foundUsers[0].Password)
	fmt.Println(*foundUsers[0].Password)

	if len(foundUsers) > 1 {
		ctx.IndentedJSON(http.StatusInternalServerError, "Somehow multiple users have the same username?!")
		return
	}

	//Actually validate the given provided credentials
	if !utils.VerifyPassword(*user.Password, *foundUsers[0].Password) {
		ctx.IndentedJSON(http.StatusUnauthorized, "Incorrect password")
		return
	}

	//Now that we're good, generate a new session token (eventually)

	ctx.IndentedJSON(http.StatusOK, "Yippee, that worked!")
}
