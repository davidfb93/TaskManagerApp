import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TaskForm from "../../components/TaskForm";

describe("TaskForm Component", () => {
  test("Debe renderizar correctamente con valores iniciales", () => {
    const { getByText, getByPlaceholderText } = render(
      <TaskForm onSubmit={jest.fn()} buttonText="Agregar" />
    );

    expect(getByText("Título de la tarea:")).toBeTruthy();
    expect(getByPlaceholderText("Agregar subtarea")).toBeTruthy();
    expect(getByText("AGREGAR")).toBeTruthy();
  });

  test("Debe permitir ingresar un título", () => {
    const { getByLabelText } = render(
      <TaskForm onSubmit={jest.fn()} buttonText="Agregar" />
    );

    const input = getByLabelText("Título de la tarea:");
    fireEvent.changeText(input, "Nueva tarea");

    expect(input.props.value).toBe("Nueva tarea");
  });

  test("Debe cambiar la prioridad correctamente", () => {
    const { getByText } = render(
      <TaskForm onSubmit={jest.fn()} buttonText="Agregar" />
    );

    fireEvent.press(getByText("ALTA"));
    fireEvent.press(getByText("MEDIA"));

    expect(getByText("MEDIA")).toBeTruthy();
  });

  test("Debe agregar una subtarea correctamente", () => {
    const { getByPlaceholderText, getByText } = render(
      <TaskForm onSubmit={jest.fn()} buttonText="Agregar" />
    );

    const input = getByPlaceholderText("Agregar subtarea");
    fireEvent.changeText(input, "Subtarea 1");
    fireEvent.press(getByText("+"));

    expect(getByText("Subtarea 1")).toBeTruthy();
  });

  test("Debe eliminar una subtarea correctamente", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <TaskForm onSubmit={jest.fn()} buttonText="Agregar" />
    );

    const input = getByPlaceholderText("Agregar subtarea");
    fireEvent.changeText(input, "Subtarea a eliminar");
    fireEvent.press(getByText("+"));

    fireEvent.press(getByText("X"));

    expect(queryByText("Subtarea a eliminar")).toBeNull();
  });

  test("Debe llamar a onSubmit con los datos correctos", () => {
    const mockOnSubmit = jest.fn();
    const { getByLabelText, getByText } = render(
      <TaskForm onSubmit={mockOnSubmit} buttonText="Agregar" />
    );

    const input = getByLabelText("Título de la tarea:");
    fireEvent.changeText(input, "Tarea de prueba");

    fireEvent.press(getByText("AGREGAR"));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      id: expect.any(Number),
      title: "Tarea de prueba",
      completed: false,
      priority: "media",
      subtasks: [],
    });
  });
});
