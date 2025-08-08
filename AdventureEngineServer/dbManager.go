package main

import (
	"database/sql"
	"errors"
	"log"
	"os"
	"strconv"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	_ "github.com/mattn/go-sqlite3"
)

const dbPath = "./test-sqlite.db"

func createDB() *gorm.DB {

	_, err := os.Stat(dbPath)

	if err == nil {
		log.Println("Deleting existing database found at " + dbPath + ".")
		os.Remove(dbPath)
		//Eventually return here once we have a set active/pristine db
	}

	if errors.Is(err, os.ErrNotExist) {
		log.Println("No existing database found at " + dbPath + ", creating.")
	}

	file, err := os.Create(dbPath)

	if err != nil {
		log.Fatal(err.Error())
	}

	file.Close()
	log.Println("Successfully created " + dbPath + ".")

	db, _ := sql.Open("sqlite3", dbPath)

	executeMigrationFromFile(db, "./testCreates.sql")
	executeMigrationFromFile(db, "./testInserts.sql")

	db.Close()

	returnGormDB, err := gorm.Open(sqlite.Open(dbPath), &gorm.Config{})

	if err != nil {
		log.Fatal(err.Error())
	}

	return returnGormDB
}

func executeMigrationFromFile(db *sql.DB, filePath string) {

	migration, err := os.ReadFile(filePath)

	if err != nil {
		log.Fatal(err)
	}

	result, err := db.Exec(string(migration))

	if err != nil {
		log.Fatal(err)
	}

	rows, err := result.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Successfully executed " + filePath + ":")
	log.Println(strconv.FormatInt(rows, 10) + " rows affected")
}

func createTable(db *sql.DB) {

	createStudentTableSQL := `CREATE TABLE student (
		"idStudent" integer NOT NULL PRIMARY KEY AUTOINCREMENT,		
		"code" TEXT,
		"name" TEXT,
		"program" TEXT		
	  );` // SQL Statement for Create Table

	log.Println("Create student table...")
	statement, err := db.Prepare(createStudentTableSQL) // Prepare SQL Statement
	if err != nil {
		log.Fatal(err.Error())
	}
	statement.Exec() // Execute SQL Statements
	log.Println("student table created")
}

// We are passing db reference connection from main to our method with other parameters
func insertStudent(db *sql.DB, code string, name string, program string) {
	log.Println("Inserting student record ...")
	insertStudentSQL := `INSERT INTO student(code, name, program) VALUES (?, ?, ?)`
	statement, err := db.Prepare(insertStudentSQL) // Prepare statement.
	// This is good to avoid SQL injections
	if err != nil {
		log.Fatalln(err.Error())
	}
	_, err = statement.Exec(code, name, program)
	if err != nil {
		log.Fatalln(err.Error())
	}
}

func displayStudents(db *sql.DB) {
	row, err := db.Query("SELECT * FROM student ORDER BY name")
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()
	for row.Next() { // Iterate and fetch the records from result cursor
		var id int
		var code string
		var name string
		var program string
		row.Scan(&id, &code, &name, &program)
		log.Println("Student: ", code, " ", name, " ", program)
	}
}
