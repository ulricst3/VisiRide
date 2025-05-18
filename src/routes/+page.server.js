import db from "$lib/db.js";

export async function load() {
    return {
        homeScreenCounts: await db.getHomeScreenCounts()
    }
}

export const actions = {
    default: async () => {
        await db.clearAllCollections();
        await db.insertDataFromJSON();
        return {reset: true};
    }
};
