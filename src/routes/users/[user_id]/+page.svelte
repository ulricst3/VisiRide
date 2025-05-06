<script>
    let { data } = $props();
</script>

<div class="card" style="width: 25rem;">
    <img class="card-img-top" src={data.user.avatar} alt="User Avatar">
    <div class="card-body">
        <h5 class="card-title">{data.user.firstName} {data.user.lastName}</h5>
        <p class="card-text">Geburtsdatum: {new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(data.user.birthday))}</p>
        <p class="card-text">Rolle: {data.user.role === "buyer" ? "Käufer" : "Verkäufer"}</p>
        <a href="/bearbeiten" class="btn btn-primary">Bearbeiten</a>
        <a href="/loeschen" class="btn btn-danger">Löschen</a>
    </div>
</div>

