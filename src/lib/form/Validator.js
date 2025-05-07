export function validateUserForm(user) {
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