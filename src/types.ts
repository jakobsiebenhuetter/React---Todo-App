export type TPriority = "low" | "medium" | "high";

export type TTask = {
    id: number,
    text: string,
    completed: boolean,
    createdat: Date | number,
    updating: boolean,
    priority?: TPriority
}
