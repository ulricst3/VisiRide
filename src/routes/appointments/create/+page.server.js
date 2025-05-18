import db from "$lib/db.js";
import {redirect} from "@sveltejs/kit"
import {ObjectId} from "mongodb";

// Load default values in order to load UserForm component.
export async function load() {
    return {
        users: await db.getUsers(),
        vehicles: await db.getVehicles()
    };
}

export const actions = {
    create: async ({request}) => {
        const data = await request.formData();
        let appointment = {
            userId: new ObjectId(data.get("user").trim()),
            vehicleId: new ObjectId(data.get("vehicle").trim()),
            viewingDateTime: data.get("viewingDateTime"),
            message: data.get("message").trim(),
        }
        await db.createAppointment(appointment);
        // Redirect (303 See other) after successful creation
        throw redirect(303, "/appointments")
    }
};