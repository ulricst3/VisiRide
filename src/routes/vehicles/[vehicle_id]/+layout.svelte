<script>
    import {page} from "$app/state"

    const {children} = $props();
</script>

<div class="container mt-3">
    <header>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/vehicles/">Fahrzeuge</a></li>
                <li class="breadcrumb-item active" aria-current="page">{page.data.vehicle._id}</li>
            </ol>
        </nav>
    </header>
    <main>
        <div class="container mt-3">
            {@render children()}
        </div>
    </main>
</div>