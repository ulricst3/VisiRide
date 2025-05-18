<script>
  import { onMount } from 'svelte';
  import { Tween } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  let { data } = $props();

  const counts = [
    { key: "All", delay: 0},
    { key: "User", label: "Registrierte Benutzer", delay: 100 },
    { key: "Vehicle", label: "Hinterlegte Fahrzeuge", delay: 200 },
    { key: "Appointment", label: "Geplante Besichtigungstermine", delay: 300 },
  ];

  const tweens = $state({});
  // Create tweens based on entries in counts.
  counts.forEach(({ key }) => {
    tweens[key] = new Tween(0, {duration: 1000, easing: cubicOut})
  })

  onMount(() => {
    counts.forEach(({ key, delay }) => {
      // set variable after n ms
      setTimeout(() => {
        tweens[key].target = data.homeScreenCounts[key];
      }, delay);
    });
  });
</script>

<title>Home</title>
<h1>Willkommen in der Admin-Ansicht von VisiRide!</h1>
<div style="margin-top: 5rem;">
  <div class="row justify-content-center mb-4">
    <div class="col-12 col-md-4">
      <div class="card text-center">
        <div class="card-body">
          <h5 class="card-title">Gesamtzahl aller Einträge</h5>
          <h1 class="number">{Math.floor(tweens["All"].current)}</h1>
        </div>
      </div>
    </div>
  </div>

  <div class="row row-cols-1 row-cols-md-3 g-4" style="margin-top: 5rem;">
    <!-- skip first item -->
    {#each counts.slice(1) as { key, label }}
      <div class="col">
        <div class="card">
          <div class="card-body text-center">
            <h5 class="card-title">{label}</h5>
            <h1>{Math.floor(tweens[key].current)}</h1>
            <div class="d-grid gap-2">
              {#if key === "User"}
                <a class="btn btn-secondary" href="/users">Alle Benutzer</a>
                <a class="btn btn-success" href="/users/create">Neuen Benutzer <i class="bi bi-person-add"></i></a>
              {:else if key === "Vehicle"}
                <a class="btn btn-secondary" href="/vehicles">Alle Fahrzeuge</a>
              {:else if key === "Appointment"}
                <a class="btn btn-secondary" href="/appointments">Alle Besichtigungstermine</a>
                <a class="btn btn-success" href="/appointments/create">Neuen Besichtigungstermin <i class="bi bi-calendar-plus"></i></a>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>