<script>
    import UserForm from "$lib/components/UserForm.svelte";

    const {data, form} = $props();
    const isCreation = true;
</script>

<title>Neuen Benutzer</title>
<h1>Neuen Benutzer erstellen</h1>
<UserForm {data} {form} {isCreation}/>