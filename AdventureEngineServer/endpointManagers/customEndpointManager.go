package endpointManagers

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	contextProviders "AdventureEngineServer/contextProviders"
	customControllers "AdventureEngineServer/customControllers"
	customServices "AdventureEngineServer/customServices"
	dtos "AdventureEngineServer/generatedDTOs"
)

func ApplyCustomEndpoints(router *gin.Engine, db *gorm.DB) {
	router.POST("/register", contextProviders.ProduceContextInjectedCustomController(db, customServices.Register, dtos.UserToUserDTO, dtos.UserDTOToUser, customControllers.Register))
	router.POST("/login", contextProviders.ProduceContextInjectedCustomController(db, customServices.Login, dtos.UserToUserDTO, dtos.UserDTOToUser, customControllers.Login))
	router.GET("/getActiveUser", contextProviders.ProduceContextInjectedCustomController(db, customServices.GetActiveUser, dtos.UserToUserDTO, dtos.UserDTOToUser, customControllers.GetActiveUser))
}
