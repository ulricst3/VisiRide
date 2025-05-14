import { fail } from "@sveltejs/kit";
import { validateUserForm } from "$lib/form/Validator.js";
import db from "$lib/db.js";

export async function prepareUserFormResponse(request, isCreation) {
    const formData = await request.formData();

    let user = {
        _id: formData.get("_id") || undefined,
        avatar: formData.get("avatar") || "/images/user_placeholder.png",
        firstName: formData.get("firstName").trim(),
        lastName: formData.get("lastName").trim(),
        birthday: formData.get("birthday").trim(),
        role: formData.get("role").trim()
    }

    const errors = validateUserForm(user);
    if (Object.keys(errors).length) {
        return fail(400, {user, errors})
    }

    if (isCreation) {
        await db.createUser(user)
    } else {
        await db.updateUser(user);
    }

    // Transform user._id from object to string
    if (user._id != null && typeof user._id !== "string" && typeof user._id.toString === "function") {
        user._id = user._id.toString();
    }
    return {
        success: true, user
    }
}