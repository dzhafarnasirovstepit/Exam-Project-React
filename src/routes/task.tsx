import { Form, LoaderFunctionArgs, useLoaderData, ActionFunctionArgs, } from "react-router-dom";
import TaskType from "src/types/Task";
import Nullable from "src/types/Nullable";
import { getTask, updateTask } from "../tasks";



export async function action({ request, params }: ActionFunctionArgs<any>) {
	let formData = await request.formData();
	return updateTask(params.taskId, {
		isDone: formData.get("isDone") === "true",
	});
}

export async function loader({ params }: LoaderFunctionArgs): Promise<{ task: Nullable<TaskType> }> {
	const task = await getTask(params.taskId);
	if (!task) {
	  throw new Response("", {
		status: 404,
		statusText: "Not Found",
	  });
	}
	return { task };
}

const Task = () => {
	const { task } = useLoaderData() as { task: Nullable<TaskType> };

	return (
		<div id="task">

			<div>
				<h1>
					{task?.name ? (
						<>
							{task?.name}
						</>
					) : (
						<i>No Name</i>
					)}
					{" "}

				</h1>

				{task?.description && <p>{task?.description}</p>}

				<div>
					<Form action="edit">
						<button type="submit">Edit</button>
					</Form>
					<Form
						method="post"
						action="destroy"
						onSubmit={(event) => {
							if (
								!window.confirm(
									"Please confirm you want to delete this record."
								)
							) {
								event.preventDefault();
							}
						}}
					>
						<button type="submit">Delete</button>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default Task;