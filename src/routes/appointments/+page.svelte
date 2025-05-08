<script>
    import dateFormat from "dateformat";
    let { data } = $props();
</script>

<h1>Besichtigungstermine</h1>
<a href="/appointments/create" class="btn btn-success">Besichtigungstermin hinzufügen <i class="bi bi-calendar-plus"></i></a>
<div class="page-size">
    <table class="table table-hover">
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Vor- und Nachname</th>
            <th scope="col">Marke und Modell</th>
            <th scope="col">Besichtigungstermin</th>
            <th scope="col">Nachricht</th>
            <th scope="col" class="narrow-th border-start">Löschen</th>
        </tr>
        </thead>
        <tbody>
        {#each data.appointments as appointment}
            <tr>
                <td>{appointment._id}</td>
                <td><a href={"/users/" + appointment.user._id}>{appointment.user.firstName} {appointment.user.lastName}</a></td>
                <td><a href={"/vehicles/" + appointment.vehicle._id}> {appointment.vehicle.brand} {appointment.vehicle.model}</a></td>
                <td>{dateFormat(appointment.viewingDateTime, "dd.mm.yyyy HH:MM")}</td>
                <td>{appointment.message}</td>
                <td class="text-center border-start">
                    <form method="POST" action="?/delete">
                        <input type="hidden" name="id" value={appointment._id} />
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