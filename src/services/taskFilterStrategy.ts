import { Task } from "../types/task";

export interface TaskFilterStrategy {
  filter(tasks: Task[]): Task[];
}

export class HighPriorityFilter implements TaskFilterStrategy {
  filter(tasks: Task[]): Task[] {
    return tasks.filter((task) => task.priority === "alta");
  }
}

export class MediumPriorityFilter implements TaskFilterStrategy {
  filter(tasks: Task[]): Task[] {
    return tasks.filter((task) => task.priority === "media");
  }
}

export class LowPriorityFilter implements TaskFilterStrategy {
  filter(tasks: Task[]): Task[] {
    return tasks.filter((task) => task.priority === "baja");
  }
}

export class NoFilter implements TaskFilterStrategy {
  filter(tasks: Task[]): Task[] {
    return tasks;
  }
}
