import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useTasks } from "../hooks/useTasks";
import { priorityColors } from "../services/taskService";
import {
  NoFilter,
  HighPriorityFilter,
  MediumPriorityFilter,
  LowPriorityFilter,
  TaskFilterStrategy,
} from "../services/taskFilterStrategy";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const filterOptions: { label: string; value: TaskFilterStrategy }[] = [
  { label: "Todas", value: new NoFilter() },
  { label: "Alta", value: new HighPriorityFilter() },
  { label: "Media", value: new MediumPriorityFilter() },
  { label: "Baja", value: new LowPriorityFilter() },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { tasks, addTask, editTask, deleteTask, loadTasks } = useTasks();
  const [filterStrategy, setFilterStrategy] = useState<TaskFilterStrategy>(
    new NoFilter()
  );
  const fadeAnimations = useRef<{ [key: number]: Animated.Value }>({}).current;

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = (id: number) => {
    if (!fadeAnimations[id]) return;

    Animated.timing(fadeAnimations[id], {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      deleteTask(id);
    });
  };

  const filteredTasks = filterStrategy.filter(tasks);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>

      <Picker
        selectedValue={filterStrategy}
        onValueChange={(value) => setFilterStrategy(value)}
        style={styles.picker}
      >
        {filterOptions.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          if (!fadeAnimations[item.id]) {
            fadeAnimations[item.id] = new Animated.Value(1);
          }

          return (
            <Animated.View
              style={[
                styles.taskContainer,
                {
                  backgroundColor: priorityColors[item.priority],
                  opacity: fadeAnimations[item.id],
                },
              ]}
            >
              <View style={styles.taskContent}>
                <Text style={styles.taskText}>{item.title}</Text>
                {item.subtasks && item.subtasks.length > 0 && (
                  <View style={styles.subtasksContainer}>
                    {item.subtasks.map((subtask, index) => (
                      <Text key={index} style={styles.subtaskText}>
                        - {typeof subtask === "string" ? subtask : subtask.title}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("EditTask", { task: item, editTask })}
                  style={styles.editButton}
                >
                  <Text style={styles.editText}>✏️</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteText}>🗑</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          );
        }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTask", { addTask })}
      >
        <Text style={styles.addButtonText}>➕ Agregar Tarea</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e5e5e5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#000000",
  },
  picker: {
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  taskContent: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: "#ffffff",
  },
  subtasksContainer: {
    marginTop: 5,
    paddingLeft: 10,
  },
  subtaskText: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.8,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  editButton: {
    padding: 5,
    backgroundColor: "#fca311",
    borderRadius: 5,
  },
  editText: {
    fontSize: 18,
  },
  deleteButton: {
    padding: 5,
    backgroundColor: "#FF6347",
    borderRadius: 5,
  },
  deleteText: {
    fontSize: 18,
    color: "#FFF",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#004b23",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default HomeScreen;
