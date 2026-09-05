import { supabase } from '../lib/supabaseClient';
import { TTask } from "../types";

export function fillTasks(arr): TTask[] {
    return arr.map((item) => {
        const task: TTask = {
            uuid: item.uuid,
            title: item.title,
            description: item.description,
            completed: item.completed,
            createdat: new Date(item.created_at),
            dueDate: item.due_date ? new Date(item.due_date) : undefined,
            updating: item.updating,
            priority: item.priority,
            link: item.link,
            posindex: item.posindex
        }
        return task;
    })
};

export async function savePositions(tasks: TTask[]) {

    for(const task of tasks) {
        const {data, error} = await supabase.from('Tasks').update({posindex: task.posindex}).eq('uuid', task.uuid);
        console.log(data, error);
    }
}


export async function deleteTaskinSupabase(uuid: string) {
    const {data, error} = await supabase.from('Tasks').delete().eq('uuid', uuid);
    if(error) {
        console.error('Error deleting task:', error);
    } else {
        console.log('Task deleted successfully:', data);
    }
}
export async function update(task: TTask) {
    console.log("Updating task:", task);
    const {data, error} = await supabase.from('Tasks').update({
        title: task.title,
        description: task.description,
        completed: task.completed,
        priority: task.priority,
        due_date: task.dueDate
    }).eq('uuid', task.uuid);
    if(error) {
        console.error('Error updating task:', error);
    } else {
        console.log('Task updated successfully:', data);
    }
}


export async function saveTask(task: TTask) {
    const {data, error} = await supabase.from('Tasks').insert({
        uuid: task.uuid,
        title: task.title,
        description: task.description,
        completed: task.completed,
        priority: task.priority,
        link: task.link,
        posindex: task.posindex,
        due_date: task.dueDate,
    });
    if(error) {
        console.error('Error saving task:', error);
    } else {
        console.log('Task saved successfully:', data);
    }
}


export async function getTasks(): Promise<TTask[]> {
    const{data, error} = await supabase.from('Tasks').select('*').order('posindex', { ascending: true });
    if(error) {
      console.error('Error fetching tasks:', error);
    } else {
      console.log('Fetched tasks:', data);
    }
    return fillTasks(data);
  }

  export async function getTaskById(uuid: string): Promise<TTask | null> {
    const {data, error} = await supabase.from('Tasks').select('*').eq('uuid', uuid).single();
    let filledTask: TTask[];
    if(error) {
      console.error('Error fetching task by id:', error);
      return null;
    } else {
        if(data) {
            filledTask = fillTasks([data]);
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

    while(counter < tasks.length)
    {
        const task = tasks[counter];

        if(task.priority) 
        {
            if(task.priority === "high")
            { 
                highPriorityTasks.push(task);
            } 
            else if (task.priority === "medium")
            {
                mediumPriorityTasks.push(task);
            }
            else if (task.priority === "low")
            {
                lowPriorityTasks.push(task);
            }       
        }
        else
        {
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

    for(let i = 0; i < transFormedTasks.length; i++)
    {
        for(let j = 1; j < transFormedTasks.length; j++)
        {
            if(transFormedTasks[j].createdat > transFormedTasks[j - 1].createdat)
            {
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
        if(item.createdat instanceof Date && !inDate) {
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
        if(task.createdat instanceof Date) {
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
    if(tasksData) {
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
        }
        tasks.push(task);
    });
    return tasks;
}

