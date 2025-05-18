<script>
    import dateFormat from "dateformat";

    let {data} = $props();
</script>

<title>Fahrzeug {data.vehicle._id}</title>
<div class="card mx-auto fixed-width-25">
    <img src={data.vehicle.image} class="card-img-top full-width-auto-height" alt="Vehicle"/>
    <div class="card-body">
        <h5 class="card-title">{data.vehicle.brand} {data.vehicle.model}</h5>
        <table class="table table-striped">
            <tbody>
            <tr>
                <td>Erstinverkehrssetzung</td>
                <td>{dateFormat(data.vehicle.year, "mm.yyyy")}</td>
            </tr>
            <tr>
                <td>Preis</td>
                <td>CHF {data.vehicle.price.toLocaleString("de-CH")}.-</td>
            </tr>
            <tr>
                <td>Kilometerstand</td>
                <td>{data.vehicle.mileage.toLocaleString("de-CH")} km</td>
            </tr>
            <tr>
                <td>Getriebe</td>
                <td>{data.vehicle.gearbox}</td>
            </tr>
            <tr>
                <td>Treibstoff</td>
                <td>{data.vehicle.fuelType}</td>
            </tr>
            <tr>
                <td>PS</td>
                <td>{data.vehicle.horsepower}</td>
            </tr>
            <tr>
                <td>Farbe</td>
                <td>{data.vehicle.color}</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>