import Database from "better-sqlite3";
import { mkdirSync, existsSync } from "node:fs";
import { testTodos, testProjects, type TTodo, type TProject } from "./testdata.ts";
// helper functions

function checkDataDir() {
    if(!existsSync("./data")) {
        createDataDir();
    }
}

function createDataDir() {
    mkdirSync("./data", { recursive: true });
}

checkDataDir();
const db = new Database("./data/database.db");


export function getDb() {
    return db;
}

// db.exec() liefert keine Zeilen zurueck -> fuer SELECT prepare().get() / .all() verwenden
function containsTasks(): boolean {
    const row = db.prepare("SELECT COUNT(*) AS count FROM todos").get() as any;
    return row.count > 0;
}

function containsProjects(): boolean {
    const row = db.prepare("SELECT COUNT(*) AS count FROM projects").get() as any;
    return row.count > 0;
}



export function insertProject(project: TProject): void {
    const sql = `INSERT INTO projects (uuid, created_at, title, description, user_uuid)
         VALUES (?, ?, ?, ?, ?)`;

    db.prepare(sql).run(project.uuid,
        project.createdAt.toISOString(),
        project.title,
        project.description,
        project.userUuid);
}

export function insertTodo(todo: TTodo): void {
    const sql = `INSERT INTO todos (uuid, created_at, title, description,
         completed, due_date, updating, priority, link, posindex, project_uuid, user_uuid)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
         db.prepare(sql).run(todo.uuid,
            todo.createdAt.toISOString(),
            todo.title,
            todo.description,
            todo.completed ? 1 : 0,
            todo.dueDate ? todo.dueDate.toISOString() : null,
            todo.updating ? 1 : 0,
            todo.priority,
            todo.link,
            todo.posindex,
            todo.projectUuid,
            todo.userUuid);
        }

export function dbInit() {

    db.exec(
        `CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uuid TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
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

    // Projekte zuerst, damit Todos mit projectUuid ein vorhandenes Projekt haben
    if(containsProjects()) {
        console.log("Projects exist in the database.");
    } else {
        insertProject(testProjects[0]!);   
    }

    if(containsTasks()) {
        console.log("Todos exist in the database.");
    } else {
        insertTodo(testTodos[0]!);    
    }
}
