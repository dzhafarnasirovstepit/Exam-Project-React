import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import './index.css';
import Root, {
	loader as rootLoader,
	action as rootAction
} from './routes/root';
import ErrorPage from './error-page';
import Task, {
	loader as taskLoader,
	action as taskAction,
} from './routes/task';
import EditTask, {
	action as editAction
} from './routes/edit';
import { action as destroyAction } from './routes/destroy';

const rootContainer = document.querySelector('#root');

if (rootContainer === null) throw new Error('Can\'t find root container');

export default function Index() {
	return (
		<p id="zero-state">
			This is a demo for React Router.
			<br />
			Check out{" "}
			<a href="https://reactrouter.com">
				the docs at reactrouter.com
			</a>
			.
		</p>
	);
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{ index: true, element: <Index /> },
					{
						path: "tasks/:taskId",
						element: <Task />,
						loader: taskLoader,
						action: taskAction,
					},
					{
						path: "/tasks/:taskId/edit",
						element: <EditTask />,
						loader: taskLoader,
						action: editAction
					},
					{
						path: "tasks/:taskId/destroy",
						action: destroyAction,
						errorElement: <div>Oops! There was an error.</div>,
					}
				],
			},
		]
	}
]);

const root = createRoot(rootContainer);

root.render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)