export type TPriority = "low" | "medium" | "high";

export type TTask = {
    id: string,
    text: string,
    completed: boolean,
    createdat: Date | number,
    updating: boolean,
    priority?: TPriority
}
