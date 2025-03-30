package routes

import (
	"milktracker/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	userRoutes := r.Group("/users")
	{
		userRoutes.GET("/", controllers.GetUsers)
		userRoutes.POST("/", controllers.CreateUser)
	}

	milkRoutes := r.Group("/milk")
	{
		milkRoutes.GET("/", controllers.GetMilkEntries)
		milkRoutes.POST("/", controllers.CreateMilkEntry)
		milkRoutes.GET(":id", controllers.GetMilkEntry)
		milkRoutes.PUT(":id", controllers.UpdateMilkEntry)
		milkRoutes.DELETE(":id", controllers.DeleteMilkEntry)
	}
}
