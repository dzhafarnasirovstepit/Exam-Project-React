import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import TaskType from "./types/Task";
import Nullable from "./types/Nullable";

export async function getTasks(query?: string): Promise<TaskType[]> {
	await fakeNetwork(`getTasks:${query}`);

	let tasks: Nullable<TaskType[]> = await localforage.getItem("tasks");

	if (!tasks) tasks = [];
	if (query) {
		tasks = matchSorter(tasks, query, { keys: ["first", "last"] });
	}

	return tasks.sort(sortBy("last", "createdAt"));
}

export async function createTask(): Promise<TaskType> {
	await fakeNetwork();

	let id = Math.random().toString(36).substring(2, 9);
	let task = { id, createdAt: Date.now(), isDone:false };
	let tasks = await getTasks();

	tasks.unshift(task);

	await set(tasks);

	return task;
}

export async function getTask(id?: string): Promise<Nullable<TaskType>> {
	await fakeNetwork(`task:${id}`);

	let tasks: TaskType[] = await localforage.getItem("tasks") ?? [];
	let task = tasks.find(task => task.id === id);

	return task ?? null;
}

export async function updateTask(id?: string, updates?: TaskType): Promise<TaskType> {
	await fakeNetwork();

	let tasks: TaskType[] = await localforage.getItem("tasks") ?? [];
	let task = tasks.find(task => task.id === id);
	
	if (!task) throw new Error("No task found for", {cause: id});
	
	Object.assign(task, updates);
	
	await set(tasks);
	
	return task;
}

export async function deleteTask(id?: string): Promise<boolean> {
	let tasks: TaskType[] = await localforage.getItem("tasks") ?? [];
	let index = tasks.findIndex(task => task.id === id);

	if (index > -1) {
		tasks.splice(index, 1);

		await set(tasks);

		return true;
	}

	return false;
}

function set(tasks: TaskType[]): Promise<TaskType[]> {
	return localforage.setItem("tasks", tasks);
}

// fake a cache so we don't slow down stuff we've already seen
// let fakeCache: {
// 	[key: string]: boolean
// } = {};

let fakeCache: Record<string, boolean> = {}

async function fakeNetwork(key?: string): Promise<Promise<undefined> | undefined> {
	if (!key) {
		fakeCache = {};
	}

	if (fakeCache[key as string]) {
		return;
	}

	fakeCache[key as string] = true;

	return new Promise(res => {
		setTimeout(res, Math.random() * 800);
	});
}