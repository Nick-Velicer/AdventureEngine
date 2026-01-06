package customControllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"gorm.io/gorm"

	customServices "AdventureEngineServer/customServices"
	dtos "AdventureEngineServer/generatedDTOs"
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

	if err := customServices.Register(db, user); err != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	ctx.IndentedJSON(http.StatusOK, nil)
}

func Login(ctx *gin.Context, db *gorm.DB) {

	DTOBuffer := &dtos.UserDTO{}

	if err := ctx.ShouldBindBodyWith(DTOBuffer, binding.JSON); err != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	user := dtos.UserDTOToUser(DTOBuffer)

	if err := customServices.Login(db, user); err != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}

	ctx.IndentedJSON(http.StatusOK, "Yippee, that worked!")
}
