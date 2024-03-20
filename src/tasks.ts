import sortBy from "sort-by";
import TaskType from "./types/Task";
import Nullable from "./types/Nullable";
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";

export const getTasks = (): TaskType[] => {
	const tasksStr = localStorage.getItem('tasks');
	let tasks = tasksStr === null ? [] : JSON.parse(tasksStr) as TaskType[];

	return tasks.sort(sortBy("last", "createdAt"));
}

export const getTask = (id?: string): Nullable<TaskType> => {
	let tasks: TaskType[] = getTasks();
	let task = tasks.find(task => task.id === id);

	return task ?? null;
}

export const createTask: CaseReducer<TaskType[]> = (state): TaskType[] => {
	let id = Math.random().toString(36).substring(2, 9);
	let task = { id, createdAt: Date.now(), isDone: false };
	let tasks = state;

	tasks.unshift(task);

	set(tasks);

	return tasks;
}


// id?: string, updates?: TaskType
export const updateTask: CaseReducer<TaskType[], PayloadAction<TaskType>> = (state, action): TaskType[] => {
	let tasks: TaskType[] = state;
	let task = tasks.find(task => task.id === action.payload.id);

	if (!task) throw new Error("No task found for", { cause: action.payload.id });

	delete action.payload.id
	console.log(task,action.payload);

	Object.assign(task, action.payload);

	set(tasks);

	return tasks;
}

export const deleteTask: CaseReducer<TaskType[], PayloadAction<string>> = (state, action): TaskType[] => {
	let tasks: TaskType[] = state;
	let index = tasks.findIndex(task => task.id === action.payload);

	if (index > -1) {
		tasks.splice(index, 1);
		set(tasks);
	}

	return tasks;
}

export const set = (tasks: TaskType[]) => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}