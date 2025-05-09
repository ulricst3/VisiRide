<script>
    import dateFormat from "dateformat";
    import { onMount } from "svelte";
    let { data } = $props();

    let selectedUser = $state();
    let modalElem;
    let bsModal;

    // Executed after DOM generation
    onMount(() => {
        // Create Bootstrap modal i.e. make use of Bootstrap JS CDN --> see docs: https://getbootstrap.com/docs/5.3/components/modal/
        bsModal = new window.bootstrap.Modal(modalElem);
    });

    function openModal(user) {
        console.log("Test")
        selectedUser = user;
        bsModal.show();
    }
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
                    <a href={'/users/' + user._id} class="btn btn-warning" title="Bearbeiten" aria-label="Bearbeiten">
                        <i class="bi bi-pencil"></i>
                    </a>
                </td>
                <td class="text-center">
                    <!-- Nur ein Button pro Zeile, öffnet das Modal -->
                    <button class="btn btn-danger" title="Löschen" aria-label="Löschen"
                            onclick={() => openModal(user)}>
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>

<!-- Ein einziges Formular im Modal -->
<div class="modal fade" tabindex="-1" role="dialog" bind:this={modalElem}>
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Benutzer löschen</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Bist du sicher, dass du {selectedUser?.firstName} {selectedUser?.lastName} wirklich löschen möchtest?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
                <form id="delete-form" method="POST" action="?/delete">
                    <input id="delete-id-input" type="hidden" name="id" value={selectedUser?._id} />
                    <button type="submit" class="btn btn-danger">Löschen</button>
                </form>
            </div>
        </div>
    </div>
</div>