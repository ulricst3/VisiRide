import {validateUserForm} from "$lib/form/Validator.js";
import db from "$lib/db.js";

export async function prepareUserFormResponse(request, isCreation) {
    const data = await request.formData();
    let user = {
        _id: data.get("_id"),
        avatar: "/images/user_placeholder.png",
        firstName: data.get("firstName").trim(),
        lastName: data.get("lastName").trim(),
        birthday: data.get("birthday").trim(),
        role: data.get("role").trim()
    }
    let validationErrors = validateUserForm(user)
    let success = false;
    if (validationErrors.size === 0) {
        if (isCreation) {
            await db.createUser(user)
        } else {
            await db.updateUser(user);
        }
        success = true;
    }

    // Transform user._id from object to string
    if (user._id != null && typeof user._id !== "string" && typeof user._id.toString === "function") {
        user._id = user._id.toString();
    }
    return {
        data: { user },
        validationErrors: validationErrors,
        success: success
    }
}