<script>
    let { data, form } = $props();
    let options = ["buyer", "seller"];
    const roleMapping = {
        buyer: "Käufer",
        seller: "Verkäufer"
    }
</script>

<form class="row g-3" method="POST" action="?/update">
    <!-- Avatar Image -->
    <div class="col-12">
        <img class="img-fluid rounded shadow-lg mx-auto d-block" style="width: 300px; height: 300px;" src={data.user.avatar} alt="User Avatar">
    </div>
    <!-- ID, non-editable -->
    <div class="col-md-6">
        <label for="inputId" class="form-label">Id</label>
        <!-- Two input fields, one hidden in order to pass ID, because fields labeled with 'disabled' don't pass values -->
        <input name="id" type="hidden" class="form-control" bind:value={data.user.id}>
        <input type="text" class="form-control" id="inputId" bind:value={data.user.id} disabled>
    </div>
    <!-- Avatar location, non-editable -->
    <div class="col-md-6">
        <label for="inputAvatar" class="form-label">Avatar</label>
        <input type="text" class="form-control" id="inputAvatar" bind:value={data.user.avatar} disabled>
    </div>
    <!-- FirstName -->
    <div class="col-md-6">
        <label for="inputFirstName" class="form-label" aria-label="Vorname">Vorname</label>
        <input name="firstName" type="text" class="form-control" id="inputFirstName" bind:value={data.user.firstName} required>
        {#if form?.validationErrors.has("firstName")}
            <p style="color: red">Der Vorname muss mindestens 3 Zeichen lang sein</p>
            {data.user.firstName = form?.validationErrors.get("firstName")}
        {/if}
    </div>
    <!-- LastName -->
    <div class="col-md-6">
        <label for="inputLastName" class="form-label" aria-label="Nachname">Nachname</label>
        <input name="lastName" type="text" class="form-control" id="inputLastName" bind:value={data.user.lastName} required>
        {#if form?.validationErrors.has("lastName")}
            <p style="color: red">Der Nachname muss mindestens 3 Zeichen lang sein</p>
            {data.user.lastName = form?.validationErrors.get("lastName")}
        {/if}
    </div>
    <!-- Birthday -->
    <div class="col-md-6">
        <label for="inputBirthday" class="form-label">Geburtstag</label>
        <input name="birthday" type="date" class="form-control" id="inputBirthday" bind:value={data.user.birthday} required>
        {#if form?.validationErrors.has("birthday")}
            <p style="color: red">Bitte gib ein gültiges Geburtsdatum an</p>
            {data.user.birthday = form?.validationErrors.get("birthday")}
        {/if}
    </div>
    <!-- Role -->
    <div class="col-md-6">
        <label for="inputRole" class="form-label">State</label>
        <select name="role" id="inputRole" class="form-select" bind:value={data.user.role} required>
            {#each options as option}
                <option value={option}>{roleMapping[option]}</option>
            {/each}
        </select>
    </div>
    <div class="col-12">
        <button type="submit" class="btn btn-primary">Speichern</button>
    </div>
</form>

{#if form?.validationErrors.has("firstName")}
    <p>
        Please choose a username.
    </p>
    <p>Artist updated</p>
{/if}
