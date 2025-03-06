import React from "react";
import { Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import TaskForm from "../components/TaskForm";
import { Task } from "../types/task";
import { createTask } from "../services/taskService"; 

type Props = NativeStackScreenProps<RootStackParamList, "AddTask">;

const AddTaskScreen = ({ navigation, route }: Props) => {
  const handleAddTask = async (newTask: Task) => {
    try {
      const createdTask = await createTask({ ...newTask, subtasks: newTask.subtasks || [] });
      if (createdTask) {
        route.params?.addTask(createdTask);
        navigation.goBack();
      } else {
        Alert.alert("Error", "No se pudo agregar la tarea. Inténtalo de nuevo.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al crear la tarea.");
    }
  };

  return <TaskForm onSubmit={handleAddTask} buttonText="Agregar Tarea" />;
};

export default AddTaskScreen;
