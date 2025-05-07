import db from "$lib/db.js";

export async function load({params}) {
    return {
        vehicle: await db.getVehicle(params.vehicle_id)
    };
}
