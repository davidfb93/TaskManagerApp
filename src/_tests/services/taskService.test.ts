import { fetchTasks, createTask, updateTask, getRandomPriority, priorityColors } from "../../services/taskService";
import { Task, Priority } from "../../types/task";

// Mock de fetch
global.fetch = jest.fn() as jest.Mock;

describe("Task Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchTasks debería obtener y mapear tareas correctamente", async () => {
    const mockTasks = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ];
    
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockTasks),
    });

    const tasks = await fetchTasks();
    expect(tasks).toHaveLength(2);
    expect(tasks[0]).toHaveProperty("priority");
    expect(tasks[0]).toHaveProperty("subtasks");
  });

  test("fetchTasks debería retornar un array vacío en caso de error", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
    const tasks = await fetchTasks();
    expect(tasks).toEqual([]);
  });

  test("createTask debería enviar una nueva tarea y retornarla con ID", async () => {
    const newTask = { id: 0, title: "New Task", completed: false, priority: "alta" as Priority, subtasks: [] };
    
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ id: 101 }),
    });

    const createdTask = await createTask(newTask);
    expect(createdTask).toMatchObject({ ...newTask, id: 101 });
  });

  test("createTask debería retornar null en caso de error", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Error creating task"));
    const createdTask = await createTask({ id: 0, title: "Fail Task", completed: false, priority: "baja", subtasks: [] });
    expect(createdTask).toBeNull();
  });

  test("updateTask debería actualizar una tarea y retornarla", async () => {
    const updatedTask = { id: 1, title: "Updated Task", completed: true, priority: "media" as Priority, subtasks: [] };
    
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(updatedTask),
    });

    const result = await updateTask(updatedTask);
    expect(result).toEqual(updatedTask);
  });

  test("updateTask debería retornar null en caso de error", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Error updating task"));
    const result = await updateTask({ id: 1, title: "Fail Update", completed: false, priority: "alta", subtasks: [] });
    expect(result).toBeNull();
  });

  test("getRandomPriority debería devolver un valor válido", () => {
    const priority = getRandomPriority();
    expect(["alta", "media", "baja"]).toContain(priority);
  });

  test("priorityColors debería contener los colores correctos", () => {
    expect(priorityColors.alta).toBe("#c1121f");
    expect(priorityColors.media).toBe("#ffc300");
    expect(priorityColors.baja).toBe("#31572c");
  });
});
