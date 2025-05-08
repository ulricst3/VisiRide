<script>
    import dateFormat from "dateformat";
    let { data } = $props();
</script>

<h1>Benutzer</h1>
<a href="/users/create" class="btn btn-success">Benutzer hinzufügen <i class="bi bi-person-add"></i></a>
<div class="page-size">
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Vor- und Nachname</th>
                <th scope="col">Geburtsdatum</th>
                <th scope="col">Rolle</th>
                <th scope="col" class="narrow-th">Gebuchte Besichtigungstermine</th>
                <th scope="col" class="narrow-th border-start">Bearbeiten</th>
                <th scope="col" class="narrow-th">Löschen</th>
            </tr>
        </thead>
        <tbody>
            {#each data.users as user}
                <tr>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{dateFormat(user.birthday, "dd.mm.yyyy")}</td>
                    <td>{user.role === "buyer" ? "Käufer" : "Verkäufer"}</td>
                    <td>{user.appointmentCount}</td>
                    <td class="text-center border-start">
                        <a href={"/users/" + user._id} class="btn btn-warning" data-bs-toggle="tooltip" title="Bearbeiten" aria-label="Bearbeiten">
                          <i class="bi bi-pencil"></i>
                        </a>
                    </td>
                    <td class="text-center">
                        <form method="POST" action="?/delete">
                            <input type="hidden" name="id" value={user._id} />
                            <button class="btn btn-danger" data-bs-toggle="tooltip" title="Löschen" aria-label="Löschen">
                                <i class="bi bi-trash"></i>
                            </button>
                        </form>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>