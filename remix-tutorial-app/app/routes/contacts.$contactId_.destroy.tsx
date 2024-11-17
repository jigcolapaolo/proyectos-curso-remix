import { ActionFunction, redirect } from "@remix-run/node"
import invariant from "tiny-invariant";
import { deleteContact } from "~/data";

export const action: ActionFunction = async ({ params }) => {
    invariant(params.contactId, "Missing contactId param");

    deleteContact(params.contactId);

    return redirect("/");
}