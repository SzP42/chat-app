<script>
    import { goto } from "$app/navigation"

    let username = "";
    $: console.log(username)

    function navigate(url) {
        goto(url)
    }
</script>

    <form id="popupForm">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" bind:value={username} required>
    </form>
    <br>
    <br>
    <button on:click={() => navigate(`/chat?username=${username}`)}>Let's chat!</button>
