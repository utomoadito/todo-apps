interface TodosType {
    id: number
    task: string
    status: boolean
    date: string
}

interface TodoType {
    task: string
    status: boolean
}

interface TodoTypeWithId extends TodoType {
    id: number
}

export { TodosType, TodoType, TodoTypeWithId }