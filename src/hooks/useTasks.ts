import { useState, useEffect } from "react";
import { Task } from "../types/task";
import { fetchTasks, createTask, updateTask } from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Definir la función loadTasks fuera de useEffect
  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  // Cargar tareas al montar el componente
  useEffect(() => {
    loadTasks();
  }, []);

  // Agregar una nueva tarea
  const addTask = async (newTask: Task) => {
    const createdTask = await createTask(newTask);
    if (createdTask) {
      setTasks((prevTasks) => [createdTask, ...prevTasks]);
    }
  };

  //  Editar una tarea existente
  const editTask = async (updatedTask: Task) => {
    const taskUpdated = await updateTask(updatedTask);
    if (taskUpdated) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? taskUpdated : task))
      );
    }
  };

  //  Eliminar una tarea localmente
  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return {
    tasks,
    loadTasks,
    addTask,
    editTask,
    deleteTask,
  };
};
