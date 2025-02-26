package models

import (
	"database/sql"
	"encoding/json"
	"fmt"
)

// Candidate は候補者を表す構造体
type Candidate struct {
	ID          int            `json:"id"`
	Name        string         `json:"name"`
	Age         int            `json:"age"`
	Party       string         `json:"party"`
	Manifesto   string         `json:"manifesto"`
	Scandals    sql.NullString `json:"scandals,omitempty"`
	PromisesMet int            `json:"promises_met"`
}

// CreateCandidatesTable は候補者テーブルを作成
func CreateCandidatesTable(db *sql.DB) error {
	query := `
		CREATE TABLE IF NOT EXISTS candidates (
			id SERIAL PRIMARY KEY,
			name VARCHAR(100),
			age INT,
			party VARCHAR(50),
			manifesto TEXT,
			scandals TEXT,
			promises_met INT
		);
	`
	_, err := db.Exec(query)
	if err != nil {
		return fmt.Errorf("failed to create candidates table: %v", err)
	}
	return nil
}

// UnmarshalJSON は Candidate の scandals フィールドを適切に処理するためのカスタムアンマーシャル関数です。
func (c *Candidate) UnmarshalJSON(data []byte) error {
	// 基本的なマッピング
	type Alias Candidate
	aux := &struct {
		Scandals *string `json:"scandals,omitempty"` // scandals を string 型で受け取る
		*Alias
	}{
		Alias: (*Alias)(c),
	}

	// JSON のパース
	if err := json.Unmarshal(data, &aux); err != nil {
		return err
	}

	// scandals が有効な場合、sql.NullString としてセット
	if aux.Scandals != nil {
		c.Scandals = sql.NullString{String: *aux.Scandals, Valid: true}
	} else {
		c.Scandals = sql.NullString{Valid: false} // scandals が nil の場合は Invalid
	}

	return nil
}
