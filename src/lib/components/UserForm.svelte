<script>
    let { data, form, isCreation } = $props();
    let options = ["buyer", "seller"];
    const roleMapping = {
        buyer: "Käufer",
        seller: "Verkäufer"
    }
    // Merge loaded data.user with form.data.user (if present), letting submitted values override defaults with spread operator (known from React)
    // Basically load all data.user data into user and replace existing values with form.data.user if key exist.
    const user = {
        ...data.user, // 1. Spread every own property from `data.user` into this object
        ...form?.user // 2. If `form.data.user` exists, spread its properties here
    };
</script>

<form class="row g-3" method="POST" action={isCreation ? "?/create" : "?/update"}>
    <!-- Avatar Image -->
    <div class="col-12">
        <img class="img-fluid rounded shadow-lg mx-auto d-block avatar" src={user.avatar} alt="User Avatar">
    </div>

    <!-- Show ID & avatar only, if profile is being edited. -->
    {#if !isCreation}
        <!-- ID, non-editable (only shown for update mode) -->
            <div class="col-md-6">
                <label for="inputId" class="form-label">Id</label>
                <input name="_id" type="hidden" class="form-control" bind:value={user._id}>
                <input type="text" class="form-control" id="inputId" value={user._id} disabled>
            </div>

        <!-- Avatar location, non-editable (only shown for update mode) -->
        <div class="col-md-6">
            <label for="inputAvatar" class="form-label">Avatar</label>
            <input name="avatar" type="hidden" class="form-control" id="inputAvatar" bind:value={user.avatar}>
            <input  type="text" class="form-control" id="inputAvatar" value={user.avatar} disabled>
        </div>
    {/if}

    <!-- FirstName -->
    <div class="col-md-6">
        <label for="inputFirstName" class="form-label" aria-label="Vorname">Vorname<span class="red-text">*</span></label>
        <input name="firstName" type="text" class="form-control" id="inputFirstName" bind:value={user.firstName} required>
        {#if form?.errors?.firstName}
            <p class="red-text">{form.errors.firstName}</p>
        {/if}
    </div>

    <!-- LastName -->
    <div class="col-md-6">
        <label for="inputLastName" class="form-label" aria-label="Nachname">Nachname<span class="red-text">*</span></label>
        <input name="lastName" type="text" class="form-control" id="inputLastName" bind:value={user.lastName} required>
        {#if form?.errors?.lastName}
            <p class="red-text">{form.errors.lastName}</p>
        {/if}
    </div>

    <!-- Birthday -->
    <div class="col-md-6">
        <label for="inputBirthday" class="form-label">Geburtstag<span class="red-text">*</span></label>
        <input name="birthday" type="date" class="form-control" id="inputBirthday" bind:value={user.birthday} required>
        {#if form?.errors?.birthday}
            <p class="red-text">{form.errors.birthday}</p>
        {/if}
    </div>

    <!-- Role -->
    <div class="col-md-6">
        <label for="inputRole" class="form-label">Rolle<span class="red-text">*</span></label>
        <select name="role" id="inputRole" class="form-select" bind:value={user.role} required>
            {#each options as option}
                <option value={option}>{roleMapping[option]}</option>
            {/each}
        </select>
    </div>

    <div class="col-12">
        <button type="submit" class="btn btn-primary">Speichern</button>
    </div>
</form>

<br />

{#if form?.success}
    <div class="alert alert-success" role="alert">
        {isCreation ? "Benutzer wurde erfolgreich gespeichert!" : "Benutzer wurde erfolgreich aktualisiert!"}
    </div>
{/if}