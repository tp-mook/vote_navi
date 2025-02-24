package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func Connect() {
	// .env ファイルの読み込み
	if err := godotenv.Load(); err != nil {
		log.Println("⚠️ .env file not found. Using system environment variables.")
	}

	// 環境変数を取得
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	// 必須環境変数が設定されているか確認
	if host == "" || port == "" || user == "" || password == "" || dbname == "" {
		log.Fatal("❌ Missing required database environment variables.")
	}

	// DSN（データソースネーム）を作成
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname,
	)

	// DB接続
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal("❌ Failed to open database connection:", err)
	}

	// 接続確認
	if err := db.Ping(); err != nil {
		log.Fatal("❌ Database connection failed:", err)
	}

	DB = db
	fmt.Println("✅ Database connected successfully!")
}
