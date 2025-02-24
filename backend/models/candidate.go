package models

import (
	"database/sql"
)

type Candidate struct {
	ID          int            `json:"id"`
	Name        string         `json:"name"`
	Age         int            `json:"age"`
	Party       string         `json:"party"`
	Manifesto   string         `json:"manifesto"`
	Scandals    sql.NullString `json:"scandals,omitempty"`
	PromisesMet int            `json:"promises_met"`
}

func CreateCandidatesTable(db *sql.DB) error {
	query := `
	CREATE TABLE IF NOT EXISTS candidates (
		id SERIAL PRIMARY KEY,
		name TEXT NOT NULL,
		age INT NOT NULL,
		party TEXT NOT NULL,
		manifesto TEXT NOT NULL,
		scandals TEXT,
		promises_met INT NOT NULL
	);
	`
	_, err := db.Exec(query)
	return err
}
