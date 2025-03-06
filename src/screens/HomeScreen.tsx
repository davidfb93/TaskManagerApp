import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Task } from "../types/task";
import { fetchTasks, priorityColors, getRandomPriority } from "../services/taskService";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const fadeAnimations = useRef<{ [key: number]: Animated.Value }>({}).current;

  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    loadTasks();
  }, []);

  const addTask = (newTask: Task) => {
    setTasks([{ ...newTask,  }, ...tasks]);
  };

  const editTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          if (!fadeAnimations[item.id]) {
            fadeAnimations[item.id] = new Animated.Value(1);
          }

          return (
            <Animated.View
              style={[
                styles.taskContainer,
                { backgroundColor: priorityColors[item.priority], opacity: fadeAnimations[item.id] },
              ]}
            >
              <Text style={styles.taskText}>{item.title}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("EditTask", { task: item, editTask })
                  }
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
  taskText: {
    fontSize: 16,
    flex: 1,
    color: "#ffffff",
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
