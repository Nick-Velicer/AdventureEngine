package endpointManagers

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	customControllers "AdventureEngineServer/customControllers"
)

func ApplyCustomEndpoints(router *gin.Engine, db *gorm.DB) {
	router.POST("/register", ProduceDBContextInjectedEndpoint(router, db, customControllers.Register))
	router.POST("/login", ProduceDBContextInjectedEndpoint(router, db, customControllers.Login))
}
