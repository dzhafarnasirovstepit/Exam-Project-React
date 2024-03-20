import { Form, Outlet, useLoaderData, redirect, NavLink, useNavigation, useFetcher, ActionFunctionArgs } from "react-router-dom";
import { getTasks, createTask } from "../tasks";
import TaskType from "src/types/Task";
import { useState } from "react";
import Nullable from "src/types/Nullable";

export async function action({ }: ActionFunctionArgs<any>): Promise<Response> {
	const task = await createTask();

	return redirect(`/${task.id}/edit`);
}

type loaderProps = {
	request: {
		url: string
	}
}

export async function loader({ request }: loaderProps): Promise<{ tasks: TaskType[] }> {
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	const tasks = await getTasks(q!);

	return { tasks };
}

const Root = () => {
	const [filterType, setFiltertype] = useState('all');
	const { tasks } = useLoaderData() as { tasks: TaskType[] };
	const navigation = useNavigation();

	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has(
			"q"
		);

	/* useEffect(() => {
		(document.getElementById("q") as HTMLInputElement)!.value = q;
	}, [q]); */

	return (
		<>
			<div id="sidebar">
				<h1>React Router Tasks</h1>
				<div>
					<Form id="search-form" role="search">
						<button onClick={() => {
							setFiltertype("done");
						}}>Done tasks</button>

						<button onClick={() => {
							setFiltertype("undone");
						}}>Undone tasks</button>

						<button onClick={() => {
							setFiltertype("all");
						}}>All tasks</button>
						<div
							id="search-spinner"
							aria-hidden
							hidden={!searching}
						/>
						<div
							className="sr-only"
							aria-live="polite"
						></div>
					</Form>
					<Form method="post">
						<button type="submit">New</button>
					</Form>
				</div>
				<nav>
					{tasks.length ? (
						<ul>
							{tasks
								.filter((task) => {
									switch (filterType) {
										case "all":
											return task;
										case "done":
											return task.isDone == true ? task : undefined;
										case "undone":
											return task.isDone == false ? task : undefined;
										default:
											return;
									}
								})

								.map((task) => (
									<li key={task.id}>
										<NavLink to={`/${task.id}`}
											className={({ isActive, isPending }) =>
												isActive
													? "active"
													: isPending
														? "pending"
														: ""
											}
										>

											{task.name ? (
												<>
													{task.name}
												</>
											) : (
												<i>No Name</i>
											)}
											{" "}
											{task.isDone ? <span>Done</span> : <span>Undone</span>}
										</NavLink>

										<div className="button-container">
											<Form action={`/${task.id}/edit`}>
												<button type="submit">Edit</button>
											</Form>
											<Form
												method="post"
												action={`/${task.id}/destroy`}
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
											<IsDone task={task} />
										</div>
									</li>
								))}
						</ul>
					) : (
						<p>
							<i>No tasks</i>
						</p>
					)}
				</nav>
			</div>
			<div
				id="detail"
				className={
					navigation.state === "loading" ? "loading" : ""
				}
			>
				<Outlet />
			</div>
		</>
	);
}

export default Root;

type IsDoneProps = {
	task: Nullable<TaskType>
}

const IsDone = ({ task }: IsDoneProps) => {
	const fetcher = useFetcher();
	// yes, this is a `let` for later
	let isDone = task?.isDone;

	if (fetcher.formData) {
		isDone = fetcher.formData.get("isDone") === "true";
	}

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const form = e.currentTarget.closest('form');
		fetcher.submit(form);
	}

	return (
		<fetcher.Form method="post">
			<input
				type="checkbox"
				name="isDone"
				value={isDone ? "false" : "true"}
				defaultChecked={isDone ? true : false}
				onInput={handleInput}
				aria-label={
					isDone
						? "Remove from isDones"
						: "Add to isDones"
				}
			>
			</input>
			<label htmlFor="isDone">Status: {isDone ? "Done" : "Undone"}</label>

		</fetcher.Form >
	);
}