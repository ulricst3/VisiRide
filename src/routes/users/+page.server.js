import db from "$lib/db.js";

export async function load() {
    return {
        users: await db.getUsers()
    }
}

export const actions = {
    delete: async ({request}) => {
        const data = await request.formData();
        await db.deleteUser(data.get("id"));
    }
}