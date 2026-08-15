import { TTask } from "../types";

export function fillTasks(arr): TTask[] {
    const tasks: TTask[] = [];

    arr.forEach((item) => {
        const task: TTask = {
            id: item.id,
            text: item.text,
            completed: item.completed,
            createdat: new Date(item.createdat),
            updating: item.updating,
            priority: item.priority
        }
        tasks.push(task);
    });

    return tasks;
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

function transformDate([...arr]: TTask[], inDate: boolean = false): TTask[] {
    // const copy = [...arr];

    arr.forEach((item) => {
        if(item.createdat instanceof Date && !inDate) {
            item.createdat = convertDateToSeconds(item.createdat);
        } else {
            item.createdat = convertMSecondsToDate(item.createdat as number);
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

