package customControllers

import (
	"errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin/binding"

	contextProviders "AdventureEngineServer/contextProviders"
	customServices "AdventureEngineServer/customServices"
	dtos "AdventureEngineServer/generatedDTOs"
	types "AdventureEngineServer/generatedDatabaseTypes"
)

//TODO: eventually have error middleware to translate from business logic errors
//to HTTP errors, for right now not a huge deal since it's just these endpoints

func Register(context *contextProviders.CustomControllerContext[types.User, dtos.UserDTO]) {
	if context == nil {
		panic("No controller context provided")
	}

	DTOBuffer := &dtos.UserDTO{}

	if err := context.RequestContext.ShouldBindBodyWith(DTOBuffer, binding.JSON); err != nil {
		context.RequestContext.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	user := context.DTOFlattener(DTOBuffer)

	sessionToken, err := customServices.Register(context.DatabaseContext, user)

	if err != nil {
		context.RequestContext.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	if sessionToken == nil {
		context.RequestContext.IndentedJSON(http.StatusInternalServerError, "Error generating session token")
		return
	}

	context.RequestContext.SetCookieData(&http.Cookie{
		Name:     "AESession",
		Value:    *sessionToken,
		Path:     "/",
		Expires:  time.Now().Add(24 * time.Hour),
		MaxAge:   86400,
		Secure:   false,
		HttpOnly: false,
		SameSite: http.SameSiteLaxMode,
	})

	context.RequestContext.IndentedJSON(http.StatusOK, nil)
}

func Login(context *contextProviders.CustomControllerContext[types.User, dtos.UserDTO]) {
	if context == nil {
		panic("No controller context provided")
	}

	DTOBuffer := &dtos.UserDTO{}

	if err := context.RequestContext.ShouldBindBodyWith(DTOBuffer, binding.JSON); err != nil {
		context.RequestContext.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	user := context.DTOFlattener(DTOBuffer)

	sessionToken, err := customServices.Login(context.DatabaseContext, user)

	if err != nil {
		context.RequestContext.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	if sessionToken == nil {
		context.RequestContext.IndentedJSON(http.StatusInternalServerError, "Error generating session token")
		return
	}

	context.RequestContext.SetCookieData(&http.Cookie{
		Name:     "AESession",
		Value:    *sessionToken,
		Path:     "/",
		Expires:  time.Now().Add(24 * time.Hour),
		MaxAge:   86400,
		Secure:   false,
		HttpOnly: false,
		SameSite: http.SameSiteLaxMode,
	})

	context.RequestContext.IndentedJSON(http.StatusOK, nil)
}

func GetActiveUser(context *contextProviders.CustomControllerContext[types.User, dtos.UserDTO]) {
	if context == nil {
		panic("No controller context provided")
	}

	sessionToken, err := context.RequestContext.Cookie("AESession")

	if err != nil || len(sessionToken) == 0 {
		context.RequestContext.IndentedJSON(http.StatusInternalServerError, "Session token cookie not found")
		return
	}

	userBuffer := &types.User{}

	userBuffer, err = customServices.GetActiveUser(context.DatabaseContext, sessionToken)

	if userBuffer == nil {
		context.RequestContext.IndentedJSON(http.StatusInternalServerError, errors.New("Could not retrieve a corresponding user for provided session token"))
		return
	}

	if err != nil {
		context.RequestContext.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	userDTOBuffer, err := context.DTOConverter(userBuffer)

	if err != nil {
		context.RequestContext.IndentedJSON(http.StatusInternalServerError, err)
		return
	}

	if userDTOBuffer == nil {
		context.RequestContext.IndentedJSON(http.StatusInternalServerError, errors.New("Failed to convert from User to User DTO"))
		return
	}

	context.RequestContext.IndentedJSON(http.StatusOK, *userDTOBuffer)
}
