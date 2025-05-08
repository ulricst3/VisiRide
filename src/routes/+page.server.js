import db from "$lib/db.js";

export const actions = {
    default: async ({request}) => {
        await db.clearAllCollections();
        await db.insertDataFromJSON();
        return { reset: true };
    }
};

