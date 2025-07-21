package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	createDB()
	router := gin.Default()
	//router.GET("/quantifier", getQuantifierTest)
	router.Run("localhost:8080")
}
