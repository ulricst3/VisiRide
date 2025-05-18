<script>
    const {data, form} = $props();

    // Select first item in list as default
    let userAvatar = $state(data.users[0].avatar);
    let vehicleImage = $state(data.vehicles[0].image);

    // latitude and longitude of ZHAW Winterthur, variable names have to match API param names
    const latitude = 47.50219746520486;
    const longitude = 8.726152033888113;
    const hourly = "temperature_2m,precipitation";
    const timezone = "Europe/Zurich";
    const forecast_days = 16;

    let forecast = $state("");
    let error = $state("");

    function onUserChange(event) {
        userAvatar = data.users.find(u => u._id === event.target.value).avatar;
    }

    function onVehicleChange(event) {
        vehicleImage = data.vehicles.find(v => v._id === event.target.value).image;
    }

    async function onDateTimeChange(event) {
        forecast = "";
        error = "";
        const isoDateTime = new Date(event.target.value);
        // ISO format is yyyy-MM-ddTHH:mm:ss, so slice string at index 13 and add trailing :00,
        // so we have a usable string to check in the API response
        const dateTime = isoDateTime.toISOString().slice(0, 13) + ":00";

        // Build URL
        const params = new URLSearchParams({
            latitude,
            longitude,
            hourly,
            timezone,
            forecast_days
        });

        // Test URL: https://api.open-meteo.com/v1/forecast?latitude=47.50219746520486&longitude=8.726152033888113&hourly=temperature_2m&timezone=Europe%2FZurich&forecast_days=16
        const url = "https://api.open-meteo.com/v1/forecast?" + params;

        try {
            const result = await fetch(url);
            // Check if result is 200, otherwise throw error
            if (!result.ok) {
                throw new Error(result.status);
            }
            const data = await result.json();

            // Find index of dateTime
            const index = data.hourly.time.indexOf(dateTime);
            if (index === -1) {
                error = "Keine Wettervorhersage gefunden.";
                return;
            }
            forecast = {
                temperature: data.hourly.temperature_2m[index],
                precipitation: data.hourly.precipitation[index],
            };
        } catch (e) {
            alert(e.message)
            error.set("Wetterdaten konnten nicht geladen werden: " + e.message + ".");
        }
    }
</script>

<title>Neuen Besichtigungstermin</title>
<h1>Neuen Besichtigungstermin erstellen</h1>
<form class="row g-3" method="POST" action="?/create">
    <div class="col-md-6">
        <div class="card mx-auto fixed-width-18">
            <img src={userAvatar} alt="user"/>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card mx-auto fixed-width-18">
            <img src={vehicleImage} alt="vehicle"/>
        </div>
    </div>
    <div class="col-md-6">
        <label for="inputUser" class="form-label">Benutzer<span class="red-text">*</span></label>
        <select name="user" id="inputUser" class="form-select" bind:value={data.userId} onchange={onUserChange}
                required>
            {#each data.users as user}
                <option value={user._id}>{user.firstName} {user.lastName}</option>
            {/each}
        </select>
    </div>
    <div class="col-md-6">
        <label for="inputVehicle" class="form-label">Fahrzeug<span class="red-text">*</span></label>
        <select name="vehicle" id="inputVehicle" class="form-select" bind:value={data.vehicleId}
                onchange={onVehicleChange} required>
            {#each data.vehicles as vehicle}
                <option value={vehicle._id}>{vehicle.brand} {vehicle.model}</option>
            {/each}
        </select>
    </div>
    <div class="col-md-6">
        <label for="inputViewingDateTime" class="form-label">Termin<span class="red-text">*</span></label>
        <input name="viewingDateTime" type="datetime-local" class="form-control" id="inputViewingDateTime"
               bind:value={data.viewingDateTime} onchange={onDateTimeChange} required>
        <small class="form-text text-muted">Wettervorhersage bis 15 Tage im Voraus</small>
        {#if error}
            <div class="alert alert-warning mt-3" role="alert">
                {error}
            </div>
        {/if}

        {#if forecast !== "" && error === ""}
            <div class="alert alert-primary mt-3" role="alert">
                <h5 class="alert-heading">Wettervorhersage ZHAW Winterthur</h5>
                <hr>
                <div class="d-flex align-items-center mb-1">
                    {#if forecast.temperature < 0}
                        <i class="bi bi-thermometer fs-3 me-2"></i>
                    {:else if forecast.temperature < 10}
                        <i class="bi bi-thermometer-low fs-3 me-2"></i>
                    {:else if forecast.temperature < 20}
                        <i class="bi bi-thermometer-half fs-3 me-2"></i>
                    {:else}
                        <i class="bi bi-thermometer-high fs-3 me-2"></i>
                    {/if}
                    <span>Temperatur: {forecast.temperature} °C</span>
                </div>
                <div class="d-flex align-items-center">
                    {#if forecast.precipitation === 0}
                        <i class="bi bi-cloud-drizzle fs-3 me-2"></i>
                    {:else if forecast.precipitation < 2.5}
                        <i class="bi bi-cloud-drizzle fs-3 me-2"></i>
                    {:else if forecast.precipitation < 10}
                        <i class="bi bi-cloud-rain fs-3 me-2"></i>
                    {:else}
                        <i class="bi bi-cloud-rain-heavy fs-3 me-2"></i>
                    {/if}
                    <span>Niederschlag: {forecast.precipitation} mm</span>
                </div>
            </div>
        {/if}
    </div>
    <div class="col-md-6">
        <label for="inputMessage" class="form-label">Nachricht<span class="red-text">*</span></label>
        <textarea name="message" class="form-control" id="inputMessage" rows="5" bind:value={data.message}
                  required></textarea>
    </div>
    <div class="col-12">
        <button type="submit" class="btn btn-primary">Speichern</button>
    </div>
</form>
