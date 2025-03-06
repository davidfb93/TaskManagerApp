import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import EditTaskScreen from "../screens/EditTaskScreen";
import { Task } from "../types/task";

export type RootStackParamList = {
  Home: { addTask: (task: Task) => void } | undefined;
  AddTask: { addTask: (task: Task) => void };
  EditTask: { task: Task; editTask: (updatedTask: Task) => void };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options = {{ title: ' ' }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options = {{ title: 'Agregar nueva tarea' }}/>
        <Stack.Screen name="EditTask" component={EditTaskScreen} options = {{ title: 'Editar tarea' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
