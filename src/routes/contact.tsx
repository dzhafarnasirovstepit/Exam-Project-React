import { Form, LoaderFunctionArgs, useLoaderData, useFetcher, ActionFunctionArgs, } from "react-router-dom";
import ContactType from "src/types/Contact";
import Nullable from "src/types/Nullable";
import { getContact, updateContact } from "../contacts";



export async function action({ request, params }: ActionFunctionArgs<any>) {
	let formData = await request.formData();
	return updateContact(params.contactId, {
		favorite: formData.get("favorite") === "true",
	});
}

export async function loader({ params }: LoaderFunctionArgs): Promise<{ contact: Nullable<ContactType> }> {
	const contact = await getContact(params.contactId);
	if (!contact) {
	  throw new Response("", {
		status: 404,
		statusText: "Not Found",
	  });
	}
	return { contact };
}

const Contact = () => {
	const { contact } = useLoaderData() as { contact: Nullable<ContactType> };

	return (
		<div id="contact">
			<div>
				<img
					key={contact?.avatar}
					src={contact?.avatar}
				/>
			</div>

			<div>
				<h1>
					{contact?.first || contact?.last ? (
						<>
							{contact?.first} {contact?.last}
						</>
					) : (
						<i>No Name</i>
					)}
					{" "}
					<Favorite contact={contact} />
				</h1>

				{contact?.twitter && (
					<p>
						<a
							target="_blank"
							href={`https://twitter.com/${contact?.twitter}`}
						>
							{contact?.twitter}
						</a>
					</p>
				)}

				{contact?.notes && <p>{contact?.notes}</p>}

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

export default Contact;

type FavoriteProps = {
	contact: Nullable<ContactType>
}

const Favorite = ({ contact }: FavoriteProps) => {
	const fetcher = useFetcher();
	// yes, this is a `let` for later
	let favorite = contact?.favorite;

	if (fetcher.formData) {
		favorite = fetcher.formData.get("favorite") === "true";
	}

	return (
		<fetcher.Form method="post">
			<button
				name="favorite"
				value={favorite ? "false" : "true"}
				aria-label={
					favorite
						? "Remove from favorites"
						: "Add to favorites"
				}
			>
				{favorite ? "★" : "☆"}
			</button>
		</fetcher.Form >
	);
}