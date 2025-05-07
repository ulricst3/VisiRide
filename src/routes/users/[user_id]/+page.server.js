import db from "$lib/db.js";

export async function load({params}) {
    return {
        user: await db.getUser(params.user_id)
    };
}

export const actions = {
    update: async ({ request }) => {
        const data = await request.formData();
        let user = {
            id: data.get("id"),
            firstName: data.get("firstName").trim(),
            lastName: data.get("lastName").trim(),
            birthday: data.get("birthday").trim(),
            role: data.get("role").trim()
        }
        let validationErrors = validate(user)
        let success = false;
        console.log("validation length: " + validationErrors.length)
        if (validationErrors.size === 0) {
            console.log("updating user")
            await db.updateUser(user);
            success = true;
        }

        return {
            validationErrors: validationErrors,
            success: success
        };
    }
};

function validate(user) {
    let validationErrors = new Map();
    if (user.firstName.length < 3) {
        validationErrors.set("firstName", user.firstName);
    }
    if (user.lastName.length < 3) {
        validationErrors.set("lastName", user.lastName);
    }
    if (user.birthday.length === 0) {
        validationErrors.set("birthday", user.birthday);
    }
    return validationErrors;
}