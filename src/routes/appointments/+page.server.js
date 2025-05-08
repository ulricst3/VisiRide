import db from "$lib/db.js"

export async function load() {
    return {
        appointments: await db.getAppointments()
    }
}

export const actions = {
    delete: async ({request}) => {
        const data = await request.formData();
        await db.deleteAppointment(data.get("id"));
    }
}