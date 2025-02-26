package handlers

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/yourusername/TOHYOKOUHO/database"
	"github.com/yourusername/TOHYOKOUHO/models"
)

// CreateCandidate inserts a new candidate into the database
func CreateCandidate(c *fiber.Ctx) error {
	var candidate models.Candidate

	// リクエストボディを表示
	fmt.Println("📩 Received request body:", string(c.Body()))

	// リクエストのパース
	if err := c.BodyParser(&candidate); err != nil {
		log.Println("❌ BodyParser failed:", err)
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input", "details": err.Error()})
	}

	// パース後のデータを表示
	fmt.Printf("✅ Parsed Candidate: %+v\n", candidate)

	// scandals フィールドが空の場合、NULL に設定
	var scandals interface{}
	if candidate.Scandals.Valid {
		scandals = candidate.Scandals.String
	} else {
		scandals = nil
	}

	// データベースへの挿入クエリ
	query := "INSERT INTO candidates (name, age, party, manifesto, scandals, promises_met) VALUES ($1, $2, $3, $4, $5, $6)"
	_, err := database.DB.Exec(query, candidate.Name, candidate.Age, candidate.Party, candidate.Manifesto, scandals, candidate.PromisesMet)
	if err != nil {
		log.Println("❌ Failed to insert candidate:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Failed to insert candidate"})
	}

	return c.Status(201).JSON(fiber.Map{"message": "Candidate created successfully"})
}

// GetCandidates retrieves all candidates from the database
func GetCandidates(c *fiber.Ctx) error {
	rows, err := database.DB.Query("SELECT id, name, age, party, manifesto, scandals, promises_met FROM candidates")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to query database"})
	}
	defer rows.Close()

	var candidates []models.Candidate
	for rows.Next() {
		var candidate models.Candidate
		err := rows.Scan(&candidate.ID, &candidate.Name, &candidate.Age, &candidate.Party, &candidate.Manifesto, &candidate.Scandals, &candidate.PromisesMet)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to scan row"})
		}

		// scandals が NULL の場合は空文字列を設定
		if !candidate.Scandals.Valid {
			candidate.Scandals.String = "" // scandals が NULL なら空文字列に設定
		}

		candidates = append(candidates, candidate)
	}

	return c.JSON(candidates)
}
