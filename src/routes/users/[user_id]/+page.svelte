<script>
    import UserForm from "$lib/components/UserForm.svelte";
    let { data, form } = $props();
    let isCreation = false;
</script>

<title>Benutzer bearbeiten</title>
<UserForm {data} {form} {isCreation}/>