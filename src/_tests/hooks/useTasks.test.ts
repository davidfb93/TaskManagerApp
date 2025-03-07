import { renderHook, act } from "@testing-library/react-hooks";

type Priority = "alta" | "media" | "baja";
import { useTasks } from "../../hooks/useTasks";
import { fetchTasks, createTask, updateTask } from "../../services/taskService";

// Mock de las funciones del servicio de tareas
jest.mock("../../services/taskService", () => ({
  fetchTasks: jest.fn(),
  createTask: jest.fn(),
  updateTask: jest.fn(),
}));

describe("useTasks Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe cargar las tareas al montar", async () => {
    const mockTasks = [{ id: 1, title: "Test Task", completed: false }];
    (fetchTasks as jest.Mock).mockResolvedValue(mockTasks);

    const { result, waitForNextUpdate } = renderHook(() => useTasks());
    
    await waitForNextUpdate();

    expect(result.current.tasks).toEqual(mockTasks);
  });

  it("debe agregar una tarea", async () => {
    const newTask = { id: 2, title: "New Task", completed: false, priority: "media" as Priority };
    (createTask as jest.Mock).mockResolvedValue(newTask);

    const { result, waitForNextUpdate } = renderHook(() => useTasks());

    await act(async () => {
      await result.current.addTask(newTask);
    });

    expect(result.current.tasks).toContainEqual(newTask);
  });

  it("debe editar una tarea", async () => {
    const initialTasks = [{ id: 1, title: "Task", completed: false }];
    (fetchTasks as jest.Mock).mockResolvedValue(initialTasks);
    (updateTask as jest.Mock).mockResolvedValue({ id: 1, title: "Updated Task", completed: true });

    const { result, waitForNextUpdate } = renderHook(() => useTasks());
    await waitForNextUpdate();

    await act(async () => {
      await result.current.editTask({ id: 1, title: "Updated Task", completed: true, priority: "media" });
    });

    expect(result.current.tasks).toContainEqual({ id: 1, title: "Updated Task", completed: true });
  });

  it("debe eliminar una tarea", () => {
    const initialTasks = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ];

    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.deleteTask(1);
    });

    expect(result.current.tasks).not.toContainEqual({ id: 1, title: "Task 1", completed: false });
  });
});
