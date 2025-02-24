package main

import (
	"github.com/yourusername/TOHYOKOUHO/database"

	"github.com/gofiber/fiber/v2"
)

func main() {
	database.Connect()

	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "Hello, TOHYOKOUHO!"})
	})

	app.Listen(":3001")
}
