import { supabase } from '../lib/supabaseClient';
import { TProject, TTask } from "../types";

const dataSource = {
    sqlite: 'sqlite',
    supabase: 'supabase'
}

const DATA_SOURCE = dataSource.sqlite;

const isSqlite = DATA_SOURCE === 'sqlite';

export async function getTasks(): Promise<TTask[]> {
    if (!isSqlite) {

        const { data, error } = await supabase.from('Tasks').select('*').order('posindex', { ascending: true });
        if (error) {
            console.error('Error fetching tasks:', error);
            return [];
        }
        return fillTasks(data);
    } else {
        const response = await fetch('/api/data');
        if (!response.ok) {
            console.error('Error fetching tasks:', response.status);
            return [];
        }
        const data = await response.json();

        if (data && Array.isArray(data.todos)) {
            return fillTasks(data.todos);
        }
        return [];
    }
}


export async function getProjects(): Promise<TProject[]> {
    if (DATA_SOURCE === 'supabase') {

        const { data, error } = await supabase.from('projects').select('*');
        if (error) {
            console.error('Error fetching projects:', error);
            return [];
        } else {
            if (data) {
                const projects: TProject[] = data.map((item) => ({
                    uuid: item.uuid,
                    title: item.title,
                    description: item.description,
                    createdat: new Date(item.created_at),
                }));
                return projects;
            }
            return [];
        }
    } else {
        const response = await fetch('/api/data');
        if (!response.ok) {
            console.error('Error fetching projects:', response.status);
            return [];
        }
        const data = await response.json();

        if (data && Array.isArray(data.projects)) {
            // Rohdaten aus SQLite haben created_at, das Frontend erwartet createdat als Date
            return data.projects.map((item) => ({
                uuid: item.uuid,
                title: item.title,
                description: item.description,
                createdat: new Date(item.created_at),
            }));
        }
        return [];
    }
}

// für sqlite einbauen
export async function deleteTaskinSupabase(uuid: string) {
    if (!isSqlite) {
        const { data, error } = await supabase.from('Tasks').delete().eq('uuid', uuid);
        if (error) {
            console.error('Error deleting task:', error);
        } else {
            console.log('Task deleted successfully:', data);
        }
    } else {
        const response = await fetch('/api/delete/Task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uuid })
        });
        if (!response.ok) {
            console.error('Error deleting task:', response.status);
        }
    }
}

// const SIMULATE_DELETE_ERROR = true;
// für sqlite einbauen

export async function deleteProjectinSupabase(uuid: string): Promise<void> {

    // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay for deletion2
    // if (SIMULATE_DELETE_ERROR) {
    //     throw new Error('Simulated delete error');
    // }

    if (!isSqlite) {

        const { error: tasksError } = await supabase.from('Tasks').delete().eq('project_id', uuid);
        if (tasksError) throw tasksError;

        const { error } = await supabase.from('projects').delete().eq('uuid', uuid);
        if (error) throw error;
    } else {
        const response = await fetch('/api/delete/Project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uuid })
        });
        if (!response.ok) {
            console.error('Error deleting project:', response.status);
        }
    }
}

// für sqlite einbauen

export async function update(task: TTask) {
    if (!isSqlite) {

        console.log("Updating task:", task);
        const { data, error } = await supabase.from('Tasks').update({
            title: task.title,
            description: task.description,
            completed: task.completed,
            priority: task.priority,
            due_date: task.dueDate
        }).eq('uuid', task.uuid);
        if (error) {
            console.error('Error updating task:', error);
        } else {
            console.log('Task updated successfully:', data);
        }
    } else {
        const response = await fetch('/api/update/Task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uuid: task.uuid,
                title: task.title,
                description: task.description,
                completed: +task.completed,
                priority: task.priority,
                dueDate: task.dueDate
            }
            )
        });
        if (!response.ok) {
            console.error('Error updating task:', response.status);
        }
    }
}

export function fillTasks(arr): TTask[] {
    return arr.map((item) => {
        const task: TTask = {
            uuid: item.uuid,
            title: item.title,
            description: item.description,
            // Boolean(): Supabase liefert true/false, SQLite 1/0
            completed: Boolean(item.completed),
            createdat: new Date(item.created_at),
            dueDate: item.due_date ? new Date(item.due_date) : undefined,
            updating: Boolean(item.updating),
            priority: item.priority,
            link: item.link,
            posindex: item.posindex,
            // Spalte heisst in Supabase project_id, in SQLite project_uuid
            project: item.project_id ?? item.project_uuid,
        }
        return task;
    })
};

export async function savePositions(tasks: TTask[]) {

    for (const task of tasks) {
        const { data, error } = await supabase.from('Tasks').update({ posindex: task.posindex }).eq('uuid', task.uuid);
        console.log(data, error);
    }
}



// für sqlite einbauen

export async function getProjectById(uuid: string): Promise<TProject | null> {
    if(!isSqlite) {

        const { data, error } = await supabase.from('projects').select('*').eq('uuid', uuid).single();
        if (error) {
            console.error('Error fetching project by id:', error);
        return null;
    } else {
        if (data) {
            const project: TProject = {
                uuid: data.uuid,
                title: data.title,
                description: data.description,
                createdat: new Date(data.created_at),
            };
            return project;
        }
        return null;
    }
    } else {
        const response = await fetch('/api/get/project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uuid })
        });
        const result = await response.json();
        if (result.project) {
            const project: TProject = {
                uuid: result.project.uuid,
                title: result.project.title,
                description: result.project.description,
                createdat: new Date(result.project.created_at),
            };
            return project;
        }
        return null;
    }
}
// für sqlite einbauen

export async function saveProject(project: TProject): Promise<boolean> {
    if(!isSqlite) {

        const { data, error } = await supabase.from('projects').insert({
            uuid: project.uuid,
            title: project.title,
            description: project.description,
        });
        if (error) {
            return false;
        } else {
            console.log('Project saved successfully:', data);
            return true;
        }
    } else {
        const response = await fetch('/api/save/Project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uuid: project.uuid,
                title: project.title,
                description: project.description
            })
        });
        const result = await response.json();
        return result.success;
    }
}
// für sqlite einbauen

export async function saveTask(task: TTask) {
    if(!isSqlite) {

        const { data, error } = await supabase.from('Tasks').insert({
            uuid: task.uuid,
            title: task.title,
        description: task.description,
        completed: task.completed,
        priority: task.priority,
        link: task.link,
        posindex: task.posindex,
        due_date: task.dueDate,
        project_id: task.project,
    });
    if (error) {
        console.error('Error saving task:', error);
    } else {
        console.log('Task saved successfully:', data);
    }
} else {
    const response = await fetch('/api/save/Task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uuid: task.uuid,
            title: task.title,
            description: task.description,
            completed: +task.completed,
            priority: task.priority,
            link: task.link,
            posindex: task.posindex,
            dueDate: task.dueDate,
            project_uuid: task.project
        })
    });
    const result = await response.json();
    if (!result.success) {
        console.error('Error saving task via API');
    }
}
}

// für sqlite einbauen

export async function getTaskById(uuid: string): Promise<TTask | null> {
    if(!isSqlite) {

        const { data, error } = await supabase.from('Tasks').select('*').eq('uuid', uuid).single();
        console.log(data)
    console.log(error)
    let filledTask: TTask[];
    if (error) {
        return null;

    } else {
        if (data) {
            filledTask = fillTasks([data]);
            return filledTask[0];
        }
        return null;
    }
} else {
    const response = await fetch(`/api/get/task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uuid })
    });
    const result = await response.json();
    if (result.task) {
        const filledTask = fillTasks([result.task]);
        return filledTask[0];
    }
    return null;
}
}

export function sortTasksByCompleted(tasks: TTask[]): TTask[] {
    return tasks;
}

export function sortTasksByPriority(tasks: TTask[]): TTask[] {
    let counter = 0;
    const highPriorityTasks: TTask[] = [];
    const mediumPriorityTasks: TTask[] = [];
    const lowPriorityTasks: TTask[] = [];
    const noPriorityTasks: TTask[] = [];

    while (counter < tasks.length) {
        const task = tasks[counter];

        if (task.priority) {
            if (task.priority === "high") {
                highPriorityTasks.push(task);
            }
            else if (task.priority === "medium") {
                mediumPriorityTasks.push(task);
            }
            else if (task.priority === "low") {
                lowPriorityTasks.push(task);
            }
        }
        else {
            noPriorityTasks.push(task);
        }
        counter++;
    }

    return [...highPriorityTasks, ...mediumPriorityTasks, ...lowPriorityTasks, ...noPriorityTasks];
}

export function sortByDate(tasks: TTask[]): TTask[] {
    const { tasksWithDate, tasksWithoutDate } = seperateNoDateTasks(tasks);
    const transFormedTasks = transformDate(tasksWithDate);
    console.log("Transformed tasks for sorting by date:", transFormedTasks);
    // Bubble Sort Algorithmus

    for (let i = 0; i < transFormedTasks.length; i++) {
        for (let j = 1; j < transFormedTasks.length; j++) {
            if (transFormedTasks[j].createdat > transFormedTasks[j - 1].createdat) {
                const temp = transFormedTasks[j - 1];
                transFormedTasks[j - 1] = transFormedTasks[j];
                transFormedTasks[j] = temp;
            }
        }
    }
    return [...transformDate(transFormedTasks, true), ...tasksWithoutDate];
}

function convertDateToSeconds(date: Date): number {
    return date.getTime();
}

function convertMSecondsToDate(mSeconds: number): Date {
    return new Date(mSeconds);
}

function transformDate([...arr], inDate: boolean = false) {
    // const copy = [...arr];

    arr.forEach((item) => {
        if (item.createdat instanceof Date && !inDate) {
            item.createdat = convertDateToSeconds(item.createdat);
        } else {
            item.createdat = convertMSecondsToDate(Number(item.createdat));
        }
    });

    return arr;
}

function seperateNoDateTasks(tasks: TTask[]): { tasksWithDate: TTask[], tasksWithoutDate: TTask[] } {
    const tasksWithDate: TTask[] = [];
    const tasksWithoutDate: TTask[] = [];

    tasks.forEach((task) => {
        if (task.createdat instanceof Date) {
            tasksWithDate.push(task);
        } else {
            tasksWithoutDate.push(task);
        }
    });

    return { tasksWithDate, tasksWithoutDate };
}

export function getTasksFromLocalStorage(): TTask[] {
    const tasksData = localStorage.getItem('tasks');
    let parsedTasks: TTask[] = [];
    if (tasksData) {
        parsedTasks = fillTasks(JSON.parse(tasksData));
    }
    return parsedTasks;
}

export function saveTasksToLocalStorage(tasks: TTask[]): void {
    const stringTasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', stringTasks);
}

export function fillTasksAfterLocalStorage(arr): TTask[] {
    const tasks: TTask[] = [];

    arr.forEach((item) => {
        const task: TTask = {
            uuid: item.uuid,
            title: item.title,
            description: item.text,
            completed: item.completed,
            createdat: new Date(item.createdat),
            updating: item.updating,
            priority: item.priority,
            link: item.link,
            posindex: item.posindex,
            project: item.project,
        }
        tasks.push(task);
    });
    return tasks;
}

