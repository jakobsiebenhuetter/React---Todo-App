export type TTask = {
    id: number,
    text: string,
    completed: boolean,
    createdat: Date,
    updating: boolean,
    priority?: "low" | "medium" | "high"
}
