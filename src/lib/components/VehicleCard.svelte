<script>
    let { vehicle } = $props();
</script>

<div class="card" style="width: 18rem;">
    <img src={vehicle.image} class="card-img-top" alt="image" style="width: 100%; height: auto;" />
    <div class="card-body">
        <h5 class="card-title"><b><a href="/vehicles/{vehicle._id}">{vehicle.brand} {vehicle.model}</a></b></h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Jahr: {vehicle.year}</li>
        <li class="list-group-item">Preis: CHF {vehicle.price}.-</li>
        <li class="list-group-item">Kilometerstand: {vehicle.mileage} km</li>
    </ul>
    <div class="card-footer">
        <a href="/book" class="btn btn-primary">Jetzt termin vereinbaren</a>
    </div>

</div>