import { createSlice } from "@reduxjs/toolkit";
import {
	getTasks,
	createTask as createTaskImp,
	updateTask as updateTaskImp,
	deleteTask as deleteTaskImp
} from "../../tasks";


export const tasksSlice = createSlice({
	name: 'tasks',
	initialState: getTasks(),
	reducers: {
		createTask: createTaskImp,
		updateTask: updateTaskImp,
		deleteTask: deleteTaskImp
	}
});

export const { createTask, updateTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;