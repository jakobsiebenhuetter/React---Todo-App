export type TPriority = "none" | "low" | "medium" | "high";

export type TTask = {
    uuid: string,
    title: string,
    description: string,
    completed: boolean,
    createdat: Date,
    dueDate?: Date,
    updating: boolean,
    priority: TPriority
    link: string,
    posindex: number,
}

export type TProject = {
    uuid: string,
    name: string,
    description: string,
    createdat: Date,
    tasks: TTask[]
}
