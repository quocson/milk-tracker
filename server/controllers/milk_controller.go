package controllers

import (
	"milktracker/config"
	"milktracker/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func GetMilkEntries(c *gin.Context) {
	var entries []models.MilkEntry
	milkType := c.Query("milk_type")
	startDate := c.Query("start_date")
	endDate := c.Query("end_date")

	db := config.DB

	if milkType != "" {
		db = db.Where("milk_type = ?", milkType)
	}
	if startDate != "" && endDate != "" {
		start, err1 := time.Parse(time.RFC3339, startDate)
		end, err2 := time.Parse(time.RFC3339, endDate)
		if err1 == nil && err2 == nil {
			db = db.Where("datetime BETWEEN ? AND ?", start, end)
		}
	}
	db.Find(&entries)
	c.JSON(http.StatusOK, entries)
}

func CreateMilkEntry(c *gin.Context) {
	var entry models.MilkEntry
	if err := c.ShouldBindJSON(&entry); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&entry)
	c.JSON(http.StatusCreated, entry)
}

func GetMilkEntry(c *gin.Context) {
	var entry models.MilkEntry
	id := c.Param("id")
	if err := config.DB.First(&entry, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Milk entry not found"})
		return
	}
	c.JSON(http.StatusOK, entry)
}

func UpdateMilkEntry(c *gin.Context) {
	var entry models.MilkEntry
	id := c.Param("id")
	if err := config.DB.First(&entry, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Milk entry not found"})
		return
	}

	if err := c.ShouldBindJSON(&entry); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&entry)
	c.JSON(http.StatusOK, entry)
}

func DeleteMilkEntry(c *gin.Context) {
	id := c.Param("id")
	if err := config.DB.Delete(&models.MilkEntry{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete entry"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Entry deleted"})
}
