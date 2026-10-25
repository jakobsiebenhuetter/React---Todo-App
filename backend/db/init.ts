import Database from "better-sqlite3";
import { mkdirSync, existsSync } from "node:fs";
// helper functions

function checkDataDir() {
    if(!existsSync("./data")) {
        createDataDir();
    }
}

function createDataDir() {
    mkdirSync("./data", { recursive: true });
}

export default function dbInit() {
    
    checkDataDir();

    const db = new Database("./data/database.db");

    db.exec(
        `CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uuid TEXT NOT NULL,
            created_at DATETIME NOT NULL,
            title TEXT,
            description TEXT,
            completed BOOLEAN NOT NULL DEFAULT 0,
            due_date DATETIME,
            updating BOOLEAN NOT NULL DEFAULT 0,
            priority TEXT,
            link TEXT,
            posindex INTEGER,
            project_uuid TEXT,
            user_uuid TEXT
        );`
    );

    db.exec(
        `CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uuid TEXT NOT NULL,
            created_at DATETIME NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            user_uuid TEXT
        );`
    );
}