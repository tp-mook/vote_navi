package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/yourusername/TOHYOKOUHO/database"
	"github.com/yourusername/TOHYOKOUHO/models"
	"github.com/yourusername/TOHYOKOUHO/routes"
)

func main() {
	database.Connect()

	// 候補者テーブル作成
	if err := models.CreateCandidatesTable(database.DB); err != nil {
		panic(err)
	}

	app := fiber.New()

	// APIルーティングの設定
	routes.SetupRoutes(app)

	fmt.Println("🚀 Server is running on http://localhost:3001") // ✅ ログ追加
	log.Fatal(app.Listen(":3001"))                              // ✅ `log.Fatal` に変更し、サーバー起動エラーをキャッチ
}
