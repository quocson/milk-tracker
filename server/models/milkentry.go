package models

import "time"

type MilkEntry struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Datetime  time.Time `json:"datetime"`
	VolumeML  int       `json:"volume_ml"`
	MilkType  string    `json:"milk_type"` // "breast" or "formula"
	CreatedAt time.Time
	UpdatedAt time.Time
}
