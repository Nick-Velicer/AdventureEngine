package main

import (
	"AdventureEngineServer/endpointManagers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db := createDB()

	router := gin.Default()
	applyCORSSettings(router)

	endpointManagers.ApplyGeneratedEndpoints(router, db)
	endpointManagers.ApplyCustomEndpoints(router, db)

	router.Run("localhost:8080")
}

func applyCORSSettings(router *gin.Engine) {

	config := cors.DefaultConfig()
	//URLs should eventually be moved out to app config
	config.AllowOrigins = []string{"http://localhost:5173", "*"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}

	router.Use(cors.New(config))
}
