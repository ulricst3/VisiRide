import {prepareUserFormResponse} from "$lib/form/Controller.js";

// Load default values in order to load UserForm component.
export async function load({ params }) {
    return {
        user: {
            id: "Wird bei Speicherung automatisch generiert.",
            avatar: "/images/user_placeholder.png"
        }
    };
}

export const actions = {
    create: async ({ request }) => {
        return prepareUserFormResponse(request, true);
    }
};