export type TPriority = "low" | "medium" | "high";

export type TTask = {
    id: string,
    text: string,
    completed: boolean,
    createdat: Date | string,
    updating: boolean,
    priority?: TPriority
}
