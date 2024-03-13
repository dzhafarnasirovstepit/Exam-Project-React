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
import Contact, {
	loader as contactLoader,
	action as contactAction,
} from './routes/contact';
import EditContact, {
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
						path: "contacts/:contactId",
						element: <Contact />,
						loader: contactLoader,
						action: contactAction,
					},
					{
						path: "/contacts/:contactId/edit",
						element: <EditContact />,
						loader: contactLoader,
						action: editAction
					},
					{
						path: "contacts/:contactId/destroy",
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