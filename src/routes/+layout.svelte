<script>
    import "./styles.css";
    import { page } from "$app/state";
    let { children } = $props();
</script>

<div class="container mt-3">
    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">VisiRide</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-item nav-link { page.url.pathname === '/users' ? 'active' : '' }" href="/users">Benutzer</a>
                        <a class="nav-item nav-link { page.url.pathname === '/vehicles' ? 'active' : '' }" href="/vehicles">Fahrzeuge</a>
                        <a class="nav-item nav-link { page.url.pathname === '/appointments' ? 'active' : '' }" href="/appointments">Besichtigungstermine</a>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <main>
        <div class="container mt-3">
            {@render children()}
        </div>
    </main>
    <!-- Add footer if requird -->
    <!-- <footer>Footer 2025</footer>-->
</div>