<script>
    import UserForm from "$lib/components/UserForm.svelte";
    let { data, form } = $props();
    let isCreation = true;
</script>

<title>Neuen Benutzer</title>
<h1>Neuen Benutzer erstellen</h1>
<UserForm {data} {form} {isCreation}/>