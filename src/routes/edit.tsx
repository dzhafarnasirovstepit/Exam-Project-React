import { Form, useLoaderData, redirect, ActionFunctionArgs, useNavigate, } from "react-router-dom";
import TaskType from "src/types/Task";

import { updateTask } from "../tasks";

export async function action({ request, params }: ActionFunctionArgs) {
	const formData = await request.formData();
/* 	const firstName = formData.get("first");
	const lastName = formData.get("last"); */
	const updates = Object.fromEntries(formData);

	updates.name;

	await updateTask(params.taskId, updates);

	return redirect(`/tasks/${params.taskId}`);
}

const EditTask = () => {
	const { task } = useLoaderData() as { task: TaskType };
	const navigate = useNavigate();

	return (
		<Form method="post" id="task-form">
			<p>
				<span>Task Name</span>
				<input
					placeholder="Enter task name..."
					aria-label="Task name"
					type="text"
					name="name"
					defaultValue={task.name}
				/>
			</p>

			<label>
				<span>Description</span>
				<textarea
				placeholder="Describe your task..."
					name="description"
					defaultValue={task.description}
					rows={6}
				/>
			</label>
			<p>
				<button type="submit">Save</button>
				<button
					type="button"
					onClick={() => {
						navigate(-1);
					}}
				>Cancel</button>
			</p>
		</Form>
	);
}

export default EditTask;