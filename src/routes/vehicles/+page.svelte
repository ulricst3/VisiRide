<script>
    let { data } = $props();
</script>

<h1>Fahrzeuge</h1>
<div class="page-size">
    {#each data.vehicles as vehicle}
        <div class="card mb-2">
            <div class="row g-0">
                <div class="col-md-2">
                    <img src={vehicle.image} class="img-fluid rounded-start rounded-end" style="height: 200px; width: 200px;" alt="Vehicle">
                </div>
                <div class="col-md-4">
                    <div class="card-body">
                        <h5 class="card-title">{vehicle.brand} {vehicle.model}</h5>
                        <table class="table table-striped">
                            <tbody>
                                <tr>
                                    <th>Baujahr</th>
                                    <td>{vehicle.year}</td>
                                </tr>
                                <tr>
                                    <th>Preis</th>
                                    <td>{vehicle.price}</td>
                                </tr>
                                <tr>
                                    <th>Kilometerstand</th>
                                    <td>{vehicle.mileage}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card-body">
                        <form class="mb-4">
                            <button class="btn btn-warning" data-bs-toggle="tooltip" title="Bearbeiten" aria-label="Bearbeiten">
                                <i class="bi bi-pencil"></i>
                            </button>
                        </form>
                        <form>
                            <button class="btn btn-danger" data-bs-toggle="tooltip" title="Löschen" aria-label="Löschen">
                                <i class="bi bi-trash"></i>
                            </button>
                        </form>
                    </div>
                </div>
                <div class="card-footer">
                    <small class="text-body-secondary">n Personen haben einen Besichtigungstermin für dieses Fahrzeug vereinbart!</small>
                </div>
            </div>
        </div>
    {/each}
</div>