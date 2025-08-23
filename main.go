package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Candidate 候補者情報を表現する構造体
type Candidate struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Party     string `json:"party"`
	Promises  string `json:"promises"`
	Execution int    `json:"execution"`
	Scandals  string `json:"scandals"`
}

// ダミーデータ（本来はデータベースから取得）
var candidates = []Candidate{
	{ID: "1", Name: "山田 太郎", Party: "A党", Promises: "子育て支援の強化", Execution: 3, Scandals: "過去の金銭問題"},
	{ID: "2", Name: "佐藤 花子", Party: "B党", Promises: "地方創生の推進", Execution: 5, Scandals: "特になし"},
}

func main() {
	// Ginのデフォルトルーターを作成
	router := gin.Default()

	// エンドポイントの設定
	// 全候補者情報を取得するAPI
	router.GET("/api/v1/candidates", getCandidates)

	// 特定の候補者情報を取得するAPI
	router.GET("/api/v1/candidates/:id", getCandidateByID)

	// サーバーを起動
	router.Run("localhost:8080")
}

// getCandidates は全ての候補者情報をJSON形式で返します。
func getCandidates(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, candidates)
}

// getCandidateByID は指定されたIDの候補者情報をJSON形式で返します。
func getCandidateByID(c *gin.Context) {
	id := c.Param("id")

	for _, a := range candidates {
		if a.ID == id {
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "candidate not found"})
}
