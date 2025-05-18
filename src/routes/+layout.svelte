<script>
    import "./styles.css";
    import {page} from "$app/state";

    const {children} = $props();
</script>
<!-- Not using class="container mt-3" since navbar jumps around -->
<div class="main-container">
    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">VisiRide</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul class="navbar-nav">
                        <li><a class="nav-item nav-link { page.url.pathname.startsWith('/users') ? 'active' : '' }"
                               href="/users">Benutzer</a></li>
                        <li><a class="nav-item nav-link { page.url.pathname.startsWith('/vehicles') ? 'active' : '' }"
                               href="/vehicles">Fahrzeuge</a></li>
                        <li>
                            <a class="nav-item nav-link { page.url.pathname.startsWith('/appointments') ? 'active' : '' }"
                               href="/appointments">Besichtigungstermine</a></li>
                    </ul>
                </div>
                <form class="form-inline" method="POST" action="/">
                    <button class="btn btn-outline-danger" type="submit">Datenbank zurücksetzen</button>
                </form>
            </div>
        </nav>
    </header>
    <main>
        <!-- Not using class="container mt-3" since content jumps around -->
        <div class="inner-content">
            {@render children()}
        </div>
    </main>
    <!-- Add footer if requird -->
    <!-- <footer>Footer 2025</footer>-->
</div>