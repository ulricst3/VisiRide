<script>
    import UserForm from "$lib/components/UserForm.svelte";

    const {data, form} = $props();
    const isCreation = false;
</script>

<title>Benutzer bearbeiten</title>
<UserForm {data} {form} {isCreation}/>