export type Priority = "alta" | "media" | "baja";

export interface Task {
    id: number;
    title: string;
    completed: boolean;
    priority: Priority;
}