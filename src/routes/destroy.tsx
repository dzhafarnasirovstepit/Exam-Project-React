import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteTask } from "../tasks";

export async function action({ params }: ActionFunctionArgs) {
  await deleteTask(params.taskId);
  
  return redirect("/");
}