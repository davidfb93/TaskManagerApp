import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from "react-native";
import { Task, Priority } from "../types/task";

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (task: Task) => void;
  buttonText: string;
  buttonColor?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onSubmit, buttonText, buttonColor = "004b23"}) => {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [priority, setPriority] = useState<Priority>(initialTask?.priority || "media");
  const [subtasks, setSubtasks] = useState<Task[]>(initialTask?.subtasks || []);
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [editingSubtaskId, setEditingSubtaskId] = useState<number | null>(null);

  const handleSave = () => {
    if (title.trim() === "") {
      Alert.alert("Error", "El título no puede estar vacío.");
      return;
    }

    const task: Task = {
      id: initialTask?.id || Date.now(),
      title,
      completed: initialTask?.completed || false,
      priority,
      subtasks,
    };

    onSubmit(task);
  };

  const addOrUpdateSubtask = () => {
    if (subtaskTitle.trim() === "") {
      Alert.alert("Error", "El título de la subtarea no puede estar vacío.");
      return;
    }

    if (editingSubtaskId !== null) {
      // Actualizar subtarea existente
      setSubtasks(
        subtasks.map((subtask) =>
          subtask.id === editingSubtaskId ? { ...subtask, title: subtaskTitle } : subtask
        )
      );
      setEditingSubtaskId(null); // Reset edición
    } else {
      // Agregar nueva subtarea
      const newSubtask: Task = {
        id: Date.now(),
        title: subtaskTitle,
        completed: false,
        priority: "media",
      };
      setSubtasks([...subtasks, newSubtask]);
    }

    setSubtaskTitle("");
  };

  const removeSubtask = (id: number) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  const editSubtask = (id: number, title: string) => {
    setSubtaskTitle(title);
    setEditingSubtaskId(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título de la tarea:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Prioridad:</Text>
      <View style={styles.priorityContainer}>
        {["alta", "media", "baja"].map((level) => (
          <TouchableOpacity
            key={level}
            style={[styles.priorityButton, priority === level ? styles.selectedPriority : null]}
            onPress={() => setPriority(level as Priority)}
          >
            <Text style={styles.priorityText}>{level.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Subtareas:</Text>
      <View style={styles.subtaskInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Agregar subtarea"
          value={subtaskTitle}
          onChangeText={setSubtaskTitle}
        />
        <TouchableOpacity style={styles.addButton} onPress={addOrUpdateSubtask}>
          <Text style={styles.addButtonText}>{editingSubtaskId !== null ? "✔" : "+"}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={subtasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.subtaskContainer}>
            <TouchableOpacity onPress={() => editSubtask(item.id, item.title)}>
              <Text style={styles.subtaskText}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeSubtask(item.id)}>
              <Text style={styles.removeText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity 
      style={[styles.saveButton, {backgroundColor: `#${buttonColor}`}] } 
      onPress={handleSave}>
        <Text style={styles.saveButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#e5e5e5" },
  label: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, fontSize: 16 },
  priorityContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  priorityButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: "center", marginHorizontal: 5, backgroundColor: "#E0E0E0" },
  selectedPriority: { backgroundColor: "#FFD700" },
  priorityText: { fontSize: 16, fontWeight: "bold", color: "#333" },
  saveButton: { backgroundColor: "#4CAF50", padding: 12, borderRadius: 8, alignItems: "center" },
  saveButtonText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  subtaskInputContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  addButton: { marginLeft: 10, padding: 10, backgroundColor: "#004b23", borderRadius: 5 },
  addButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  subtaskContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, borderBottomWidth: 1 },
  subtaskText: { fontSize: 16 },
  removeText: { color: "red", fontSize: 16, fontWeight: "bold" },
});

export default TaskForm;
