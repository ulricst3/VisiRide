<script>
    let { data, form } = $props();

    // Select first item in list as default
    let userAvatar = $state(data.users[0].avatar);
    let vehicleImage = $state(data.vehicles[0].image);

    function onUserChange(event) {
        userAvatar = data.users.find(u => u._id === event.target.value).avatar;
    }
    function onVehicleChange(event) {
        vehicleImage = data.vehicles.find(v => v._id === event.target.value).image;
    }
</script>

<title>Neuen Besichtigungstermin</title>
<h1>Neuen Besichtigungstermin erstellen</h1>
<form class="row g-3" method="POST" action="?/create">
    <div class="col-md-6">
        <div class="card mx-auto" style="width: 18rem;">
            <img src={userAvatar} alt="user" />
        </div>
    </div>
    <div class="col-md-6">
        <div class="card mx-auto" style="width: 18rem;">
            <img src={vehicleImage} alt="vehicle" />
        </div>
    </div>
    <!-- Role -->
    <div class="col-md-6">
        <label for="inputUser" class="form-label">Benutzer</label>
        <select name="user" id="inputUser" class="form-select" bind:value={data.userId} onchange={onUserChange} required>
            {#each data.users as user}
                <option value={user._id}>{user.firstName} {user.lastName}</option>
            {/each}
        </select>
    </div>
    <div class="col-md-6">
        <label for="inputVehicle" class="form-label">Fahrzeug</label>
        <select name="vehicle" id="inputVehicle" class="form-select" bind:value={data.vehicleId} onchange={onVehicleChange} required>
            {#each data.vehicles as vehicle}
                <option value={vehicle._id}>{vehicle.brand} {vehicle.model}</option>
            {/each}
        </select>
    </div>
    <div class="col-md-6">
        <label for="inputViewingDateTime" class="form-label">Besichtigungstermin</label>
        <input name="viewingDateTime" type="datetime-local" class="form-control" id="inputViewingDateTime" bind:value={data.viewingDateTime} required>
    </div>
    <div class="col-md-6">
        <label for="inputMessage" class="form-label">Nachricht</label>
        <textarea name="message" class="form-control" id="inputMessage" rows="5" bind:value={data.message} required></textarea>
    </div>
    <div class="col-12">
        <button type="submit" class="btn btn-primary">Speichern</button>
    </div>
</form>
