export function validateUserForm(user) {
    let errors = {};
    if (user.firstName.length < 3) {
        errors.firstName = 'Der Vorname muss mindestens 3 Zeichen lang sein.';
        // validationErrors.set("firstName", user.firstName);
    }
    if (user.lastName.length < 3) {
        errors.lastName = 'Der Nachname muss mindestens 3 Zeichen lang sein.';
        // validationErrors.set("lastName", user.lastName);
    }
    if (user.birthday.length === 0 || new Date(user.birthday) >= new Date()) {
        errors.birthday = 'Bitte gib ein gültiges Geburtsdatum in der Vergangenheit an.';
        // validationErrors.set("birthday", user.birthday);
    }
    return errors;
}