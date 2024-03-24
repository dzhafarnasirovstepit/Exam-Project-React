import { Form, Outlet, redirect, NavLink, useNavigation } from "react-router-dom";
import { createTask, updateTask } from "../redux/slices/tasksSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import store, { useTypedSelector } from "../store";

export function action() {
	store.dispatch(createTask());
	const tasks = store.getState().tasksReducer;
	const task = tasks[tasks.length - 1];
	return redirect(`/${task!.id}/edit`);
}

const Root = () => {
	const [filterType, setFiltertype] = useState('all');
	const tasks = useTypedSelector((state) => state.tasksReducer);
	const navigation = useNavigation();

	return (
		<>
			<div id="sidebar">
				<h1>React Router Tasks</h1>
				<div className="form-wrapper">
					<Form id="search-form" role="search">
						<div className="filter-buttons">
							<p><b>Filter tasks:</b></p>
							<button className={filterType === 'all' ? 'active' : ''} onClick={() => setFiltertype('all')}>All tasks</button>
							<button className={filterType === 'done' ? 'active' : ''} onClick={() => setFiltertype('done')}>Done tasks</button>
							<button className={filterType === 'undone' ? 'active' : ''} onClick={() => setFiltertype('undone')}>Undone tasks</button>
						</div>

						<div
							className="sr-only"
							aria-live="polite"
						></div>
					</Form>
					<Form method="post">
						<div className="new-task-button">
							<button type="submit">Add new task</button>
						</div>
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
											<IsDone id={task.id ?? ''} />
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
	id: string;
}

const IsDone = ({ id }: IsDoneProps) => {
	const tasks = useTypedSelector((state) => state.tasksReducer);
	const task = tasks.find(task => task.id === id);
	const dispatch = useDispatch();

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.currentTarget;


		dispatch(updateTask({
			id: input.id,
			isDone: !task!.isDone,
		}));
	}

	return (
		<Form action={``}>
			<input
				id={task?.id}
				type="checkbox"
				name="isDone"
				value={task?.isDone ? "true" : "false"}
				defaultChecked={task?.isDone ? true : false}
				onInput={handleInput}
				aria-label={
					task?.isDone
						? "Remove from isDones"
						: "Add to isDones"
				}
			>
			</input>
			<label id={task?.id + '-status-label'} htmlFor="isDone"> {/* {task?.isDone ? "Done" : "Undone"} */}</label>
		</Form>

	);
}

