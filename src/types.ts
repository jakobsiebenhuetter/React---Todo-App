export type TPriority = "low" | "medium" | "high";

export type TTask = {
    uuid: string,
    title: string,
    description: string,
    completed: boolean,
    createdat: Date,
    dueDate?: Date,
    updating: boolean,
    priority?: TPriority
}
