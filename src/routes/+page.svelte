<script>
  import { onMount } from 'svelte';
  import { Tween } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  let { data } = $props();

  const allCount = new Tween(0, { duration: 1000, easing: cubicOut });
  const userCount = new Tween(0, { duration: 1000, easing: cubicOut });
  const vehicleCount = new Tween(0, { duration: 1000, easing: cubicOut });
  const appointmentCount = new Tween(0, { duration: 1000, easing: cubicOut });

  onMount(() => {
    allCount.target = data.homeScreenCounts.All;
    setTimeout(() => userCount.target = data.homeScreenCounts.User, 100);
    setTimeout(() => vehicleCount.target = data.homeScreenCounts.Vehicle, 200);
    setTimeout(() => appointmentCount.target = data.homeScreenCounts.Appointment, 300);
  });
</script>

<h1>Willkommen in der Admin-Ansicht von VisiRide!</h1>

<div style="margin-top: 5rem;">
<div class="row justify-content-center mb-4">
  <div class="col-12 col-md-4">
    <div class="card text-center">
      <div class="card-body">
        <h5 class="card-title">Gesamtzahl aller Einträge</h5>
        <h1 class="number">{Math.floor(allCount.current)}</h1>
      </div>
    </div>
  </div>
</div>

<div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Registrierte Benutzer</h5>
        <h1>{Math.floor(userCount.current)}</h1>
        <div class="d-grid gap-2">
          <a class="btn btn-secondary" href="/users">Alle Benutzer</a>
          <a class="btn btn-success" href="/users/create">Neuen Benutzer <i class="bi bi-person-add"></i></a>
        </div>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Hinterlegte Fahrzeuge</h5>
        <h1>{Math.floor(vehicleCount.current)}</h1>
        <div class="d-grid gap-2">
          <a class="btn btn-secondary" href="/vehicles">Alle Fahrzeuge</a>
        </div>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Geplante Besichtigungstermine</h5>
        <h1>{Math.floor(appointmentCount.current)}</h1>
        <div class="d-grid gap-2">
          <a class="btn btn-secondary" href="/appointments">Alle Besichtigungstermine</a>
          <a class="btn btn-success" href="/appointments/create">Neuen Besichtigungstermin <i class="bi bi-calendar-plus"></i></a>
        </div>
      </div>
    </div>
  </div>
</div>
</div>