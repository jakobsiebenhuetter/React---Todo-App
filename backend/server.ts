import express from "express";

import {dbInit, getDb} from "./db/init.ts";
import type { TTodo, TProject } from "./db/testdata.ts";
const app = express();
const port = Number(process.env.PORT) || 3000;

dbInit();

// api calls
function getTodos() {
    const db = getDb();
    const todos = db.prepare("SELECT * FROM todos ORDER BY posindex").all();
    console.log(todos);
    return todos;
}

export function getProjects(): TProject[] {
    return getDb().prepare("SELECT * FROM projects").all() as TProject[];
}

app.use(express.json());

app.get("/api/data", (_req, res) => {
    getTodos();
    getProjects();
    res.json({
        todos: getTodos(),
        projects: getProjects()
    });
});

app.post("/api/save/Task", (req, res) => {
    const { uuid, title, description, completed, priority, dueDate, link, posindex, project } = req.body;
    const db = getDb();
    const result = db.prepare("INSERT INTO todos (uuid, title, description, completed, priority, due_date, link, posindex, project_uuid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").run(uuid, title, description, completed, priority, dueDate, link, posindex, project);
    console.log(result);
    res.json({ success: result.changes > 0 });
});

app.post("/api/save/Project", (req, res) => {
    const { uuid, title, description } = req.body;
    const db = getDb();
    const result = db.prepare("INSERT INTO projects (uuid, title, description) VALUES (?, ?, ?)").run(uuid, title, description);
    res.json({ success: result.changes > 0 });
});

app.post("/api/delete/Task", (req, res) => {
    const { uuid } = req.body;
    const db = getDb();
    const result = db.prepare("DELETE FROM todos WHERE uuid = ?").run(uuid);
    res.json({ success: result.changes > 0 });
})

app.post("/api/delete/Project", (req, res) => {
    const { uuid } = req.body;
    const db = getDb();
    const result = db.prepare("DELETE FROM projects WHERE uuid = ?").run(uuid);
    res.json({ success: result.changes > 0 });
});

app.post("/api/update/Task", (req, res) => {
    const {uuid, title, description, completed, priority, dueDate} = req.body;
    const db = getDb();
    const result = db.prepare("UPDATE todos SET title = ?, description = ?, completed = ?, priority = ?, due_date = ? WHERE uuid = ?").run(title, description, completed, priority, dueDate, uuid);
    res.json({ success: result.changes > 0 });
});

app.post("/api/update/Project", (req, res) => {
    const {uuid, title, description} = req.body;
    const db = getDb();
    const result = db.prepare("UPDATE projects SET title = ?, description = ? WHERE uuid = ?").run(title, description, uuid);
    res.json({ success: result.changes > 0 });
});

app.post("/api/get/task", (req, res) => {
    const { uuid } = req.body;
    const db = getDb();
    const task = db.prepare("SELECT * FROM todos WHERE uuid = ?").get(uuid);
    res.json({ task });
})

app.post("/api/get/project", (req, res) => {
    const { uuid } = req.body;
    const db = getDb();
    const project = db.prepare("SELECT * FROM projects WHERE uuid = ?").get(uuid);
    res.json({ project });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
