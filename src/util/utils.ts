import { TTask } from "../types";

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