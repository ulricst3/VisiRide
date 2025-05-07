<script>
    let { data } = $props();
</script>

<h1>Benutzer</h1>

<div style="max-height: 600px; overflow-y: auto;">
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Vor- und Nachname</th>
                <th scope="col">Geburtsdatum</th>
                <th scope="col">Rolle</th>
                <th scope="col" class="border-start narrow-th">Bearbeiten</th>
                <th scope="col" class="narrow-th">Löschen</th>
            </tr>
        </thead>
        <tbody>
            {#each data.users as user}
                <tr>
                    <th>{user.id}</th>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(user.birthday))}</td>
                    <td>{user.role === "buyer" ? "Käufer" : "Verkäufer"}</td>
                    <td class="text-center border-start">
                        <a href={"/users/" + user.id} class="btn btn-warning" data-bs-toggle="tooltip" title="Bearbeiten" aria-label="Bearbeiten">
                          <i class="bi bi-pencil"></i>
                        </a>
                    </td>
                    <td class="text-center">
                        <form method="POST" action="?/delete">
                            <input type="hidden" name="id" value={user.id} />
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