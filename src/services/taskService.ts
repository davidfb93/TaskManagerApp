import { Task, Priority } from "../types/task";

export const getRandomPriority = (): Priority => {
  const priorities: Priority[] = ["alta", "media", "baja"];
  return priorities[Math.floor(Math.random() * priorities.length)];
};

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    const data = await response.json();
    return data.map((task: any) => ({
      id: task.id,
      title: task.title,
      completed: task.completed,
      priority: getRandomPriority(),
      subtasks: [] // Inicialmente sin subtareas
    }));
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    return [];
  }
};

export const createTask = async (task: Task): Promise<Task | null> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        ...task,
        subtasks: task.subtasks || [] // Incluir subtareas si existen
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const createdTask = await response.json();
    return { ...task, id: createdTask.id, subtasks: task.subtasks || [] };
  } catch (error) {
    console.error("Error al crear tarea:", error);
    return null;
  }
};

// Exportamos colores por prioridad para usarlas en la UI
export const priorityColors: Record<Priority, string> = {
  alta: "#c1121f", // Rojo
  media: "#ffc300", // Naranja
  baja: "#31572c", // Verde
};
