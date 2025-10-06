package main

import (
	"database/sql"
	"errors"
	"fmt"
	"io/fs"
	"log"
	"os"
	"path/filepath"

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

	migrationsPath := "./generatedMigrations"

	err = filepath.WalkDir(migrationsPath, func(path string, child fs.DirEntry, err error) error {
		if err != nil {
			return fmt.Errorf("error accessing path %q: %w", path, err)
		}

		if !child.IsDir() {
			executeMigrationFromFile(db, migrationsPath+"/"+child.Name())
		}

		return nil
	})

	if err != nil {
		log.Fatalf("Migrations could not be applied, has regenerateMigrations.py been run?")
	}

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

	_, err = result.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Successfully executed " + filePath + ":")
	//log.Println(strconv.FormatInt(rows, 10) + " rows affected")
}
