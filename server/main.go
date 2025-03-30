package main

import (
	"log"
	"milktracker/config"
	"milktracker/routes"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello, Gin - Milk Tracker!",
		})
	})

	config.ConnectDatabase()
	routes.RegisterRoutes(r)

	r.Run()
}
