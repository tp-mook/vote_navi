package routes

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/yourusername/TOHYOKOUHO/handlers"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	// ミドルウェアでリクエストをログに出力
	app.Use(func(c *fiber.Ctx) error {
		fmt.Printf("Request: %s %s\n", c.Method(), c.Path())
		return c.Next()
	})

	api.Get("/candidates", handlers.GetCandidates)
	api.Post("/candidates", handlers.CreateCandidate)
}
