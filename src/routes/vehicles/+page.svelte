<script>
    import VehicleCard from "$lib/components/VehicleCard.svelte";
    let { data } = $props();
</script>

<h1>Fahrzeuge</h1>

<div class="page-size container mt-3">
    <div class="row row-cols-4">
        {#each data.vehicles as vehicle}
            <div class="col mb-4 px-2">
                <VehicleCard {vehicle} />
            </div>
        {/each}
    </div>
</div>