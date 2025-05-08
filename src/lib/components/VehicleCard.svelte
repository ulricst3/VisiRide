<script>
    let { vehicle } = $props();
</script>

<div class="card" style="width: 18rem;">
    <img src={vehicle.image} class="card-img-top" alt="Vehicle" style="width: 100%; height: auto;" />
    <div class="card-body">
        <h5 class="card-title"><b><a href={"/vehicles/" + vehicle._id}>{vehicle.brand} {vehicle.model}</a></b></h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Preis: CHF {vehicle.price.toLocaleString('de-CH')}.-</li>
        <li class="list-group-item">Kilometerstand: {vehicle.mileage.toLocaleString('de-CH')} km</li>
    </ul>
    {#if vehicle.appointmentCount > 0}
        <div class="card-footer">
            <small class="text-muted">Wurde bereits {vehicle.appointmentCount}-mal gebucht!</small>
        </div>
    {/if}
</div>