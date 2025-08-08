package main

import (
	"AdventureEngineServer/endpointManagers"

	"github.com/gin-gonic/gin"
)

func main() {
	db := createDB()
	router := gin.Default()

	endpointManagers.ApplyGeneratedEndpoints(router, db)
	endpointManagers.ApplyCustomEndpoints(router, db)

	router.Run("localhost:8080")
}
