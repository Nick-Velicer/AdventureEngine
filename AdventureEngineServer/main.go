package main

import (
	"AdventureEngineServer/endpointManagers"
	"flag"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func main() {
	shouldRegenerateDB := flag.Bool("regenerate", false, "a string flag")

	flag.Parse()

	var db *gorm.DB = nil

	if *shouldRegenerateDB {
		db = createDB()
	} else {
		db = GetAppDBContext()
	}

	router := gin.Default()
	applyCORSSettings(router)

	endpointManagers.ApplyGeneratedEndpoints(router, db)
	endpointManagers.ApplyCustomEndpoints(router, db)

	router.Run("localhost:8080")
	//router.RunTLS(":8080", "certs/server.crt", "certs/server.key")
}

func applyCORSSettings(router *gin.Engine) {

	config := cors.DefaultConfig()
	//URLs should eventually be moved out to app config
	config.AllowCredentials = true
	config.AllowOrigins = []string{"http://localhost:5173"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}

	router.Use(cors.New(config))
}
