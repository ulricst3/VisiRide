import db from "$lib/db.js";
import {prepareUserFormResponse} from "$lib/form/Controller.js";

export async function load({params}) {
    return {
        user: await db.getUser(params.user_id)
    };
}

export const actions = {
    update: async ({request}) => {
        return prepareUserFormResponse(request, false);
    }
};