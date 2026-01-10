package customControllers

import (
	"errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"gorm.io/gorm"

	customServices "AdventureEngineServer/customServices"
	dtos "AdventureEngineServer/generatedDTOs"
	types "AdventureEngineServer/generatedDatabaseTypes"
)

//TODO: eventually have error middleware to translate from business logic errors
//to HTTP errors, for right now not a huge deal since it's just these endpoints

func Register(ctx *gin.Context, db *gorm.DB) {

	DTOBuffer := &dtos.UserDTO{}

	if err := ctx.ShouldBindBodyWith(DTOBuffer, binding.JSON); err != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	user := dtos.UserDTOToUser(DTOBuffer)

	sessionToken, err := customServices.Register(db, user)

	if err != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	if sessionToken == nil {
		ctx.IndentedJSON(http.StatusInternalServerError, "Error generating session token")
		return
	}

	ctx.SetCookieData(&http.Cookie{
		Name:     "AESession",
		Value:    *sessionToken,
		Path:     "/",
		Expires:  time.Now().Add(24 * time.Hour),
		MaxAge:   86400,
		Secure:   false,
		HttpOnly: false,
		SameSite: http.SameSiteLaxMode,
	})

	ctx.IndentedJSON(http.StatusOK, nil)
}

func Login(ctx *gin.Context, db *gorm.DB) {

	DTOBuffer := &dtos.UserDTO{}

	if err := ctx.ShouldBindBodyWith(DTOBuffer, binding.JSON); err != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	user := dtos.UserDTOToUser(DTOBuffer)

	sessionToken, err := customServices.Login(db, user)

	if err != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	if sessionToken == nil {
		ctx.IndentedJSON(http.StatusInternalServerError, "Error generating session token")
		return
	}

	ctx.SetCookieData(&http.Cookie{
		Name:     "AESession",
		Value:    *sessionToken,
		Path:     "/",
		Expires:  time.Now().Add(24 * time.Hour),
		MaxAge:   86400,
		Secure:   false,
		HttpOnly: false,
		SameSite: http.SameSiteLaxMode,
	})

	ctx.IndentedJSON(http.StatusOK, nil)
}

func GetActiveUser(ctx *gin.Context, db *gorm.DB) {

	sessionToken, err := ctx.Cookie("AESession")

	if err != nil || len(sessionToken) == 0 {
		ctx.IndentedJSON(http.StatusInternalServerError, "Session token cookie not found")
		return
	}

	userBuffer := &types.User{}

	if err := customServices.GetActiveUser(db, sessionToken, userBuffer); err != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	userDTOBuffer := dtos.UserToUserDTO(db, userBuffer, []string{})

	if userDTOBuffer == nil {
		ctx.IndentedJSON(http.StatusInternalServerError, errors.New("Failed to convert from User to User DTO"))
		return
	}

	ctx.IndentedJSON(http.StatusOK, *userDTOBuffer)
}
