import db from "$lib/db";

export async function load() {
    return {
        users: await db.getUsers(),
    }
}

export const actions = {
    delete: async ({request}) => {
        const data = await request.formData();
        console.log("deleteme")
        // console.log(data);
        // await db.deleteArtist(data.get("id"));
    }
}