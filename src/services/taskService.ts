import { Task, Priority } from "../types/task";

// 🔹 Colores por prioridad para la UI
export const priorityColors: Record<Priority, string> = {
  alta: "#c1121f", // Rojo
  media: "#ffc300", // Naranja
  baja: "#31572c", // Verde
};

// 🔹 Función para obtener una prioridad aleatoria
export const getRandomPriority = (): Priority => {
  const priorities: Priority[] = ["alta", "media", "baja"];
  return priorities[Math.floor(Math.random() * priorities.length)];
};

// 🔹 Obtener tareas desde la API
export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    const data = await response.json();
    return data.map((task: any) => ({
      id: task.id,
      title: task.title,
      completed: task.completed ?? false,
      priority: getRandomPriority(),
      subtasks: [],
    }));
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    return [];
  }
};

// 🔹 Agregar una nueva tarea (API)
export const createTask = async (task: Task): Promise<Task | null> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        ...task,
        subtasks: task.subtasks || [],
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

// 🔹 Editar una tarea en la API (No funcional en JSONPlaceholder, solo ejemplo)
export const updateTask = async (updatedTask: Task): Promise<Task | null> => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${updatedTask.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTask),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    return null;
  }
};
