export function load({params}) {
    return {
        user: {
            id: params.user_id,
            firstName: "Example Vorname",
            lastName: "Example Nachname",
            birthday: "2000-01-01",
            role: "buyer",
            avatar: "/images/user_placeholder.png"
        }
    };
}