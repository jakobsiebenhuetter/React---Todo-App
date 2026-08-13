export type TPriority = "low" | "medium" | "high";

export type TTask = {
    id: number,
    text: string,
    completed: boolean,
    createdat: Date,
    updating: boolean,
    priority?: TPriority
}
