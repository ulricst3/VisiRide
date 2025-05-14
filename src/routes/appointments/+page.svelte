<script>
    import dateFormat from "dateformat";
    import {onMount} from "svelte";

    let {data} = $props();

    let selectedAppointment = $state();
    let modalElement;
    let bsModal;

    // Executed after DOM generation
    onMount(() => {
        // Create Bootstrap modal i.e. make use of Bootstrap JS CDN --> see docs: https://getbootstrap.com/docs/5.3/components/modal/
        bsModal = new window.bootstrap.Modal(modalElement);
    });

    function openModal(user) {
        selectedAppointment = user;
        bsModal.show();
    }
</script>

<title>Besichtigungstermine</title>
<h1>Besichtigungstermine</h1>
<a href="/appointments/create" class="btn btn-success">Besichtigungstermin hinzufügen <i
        class="bi bi-calendar-plus"></i></a>
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
                <td>
                    <a href={"/users/" + appointment.user._id}>{appointment.user.firstName} {appointment.user.lastName}</a>
                </td>
                <td>
                    <a href={"/vehicles/" + appointment.vehicle._id}> {appointment.vehicle.brand} {appointment.vehicle.model}</a>
                </td>
                <td>{dateFormat(appointment.viewingDateTime, "dd.mm.yyyy HH:MM")}</td>
                <td>{appointment.message}</td>
                <td class="text-center border-start">
                    <button class="btn btn-danger" data-bs-toggle="tooltip" title="Löschen" aria-label="Löschen"
                            onclick="{() => openModal(appointment)}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>

<!-- Modal -->
<div class="modal fade" tabindex="-1" role="dialog" bind:this={modalElement}>
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Besichtigungstermin löschen</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Bist du sicher, dass du den Besichtigungstermin für
                    <strong>{selectedAppointment?.user.firstName} {selectedAppointment?.user.lastName}</strong> mit dem
                    <strong>{selectedAppointment?.vehicle.brand} {selectedAppointment?.vehicle.model}</strong> wirklich
                    löschen möchtest?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
                <form id="delete-form" method="POST" action="?/delete">
                    <input id="delete-id-input" type="hidden" name="id" value={selectedAppointment?._id}/>
                    <button type="submit" class="btn btn-danger">Löschen</button>
                </form>
            </div>
        </div>
    </div>
</div>