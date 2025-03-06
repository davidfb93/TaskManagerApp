import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import TaskForm from "../components/TaskForm";
import { Task } from "../types/task";

type Props = NativeStackScreenProps<RootStackParamList, "EditTask">;

const EditTaskScreen = ({ route, navigation }: Props) => {
  const { task, editTask } = route.params;

  const handleEditTask = (updatedTask: Task) => {
    editTask(updatedTask);
    navigation.goBack();
  };

  return <TaskForm initialTask={task} onSubmit={handleEditTask} buttonText="Guardar Cambios" />;
};

export default EditTaskScreen;
