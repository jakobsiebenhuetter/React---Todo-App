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
    project: string,
}

export type TProject = {
    uuid: string,
    title: string,
    description: string,
    createdat: Date,
}

export type TSortBy = "date" | "priority";