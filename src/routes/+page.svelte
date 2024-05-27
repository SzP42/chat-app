<script>
    import { goto } from "$app/navigation"
    import "$lib/chatStyle.css"

    let username = "";

    function navigate(url) {
        goto(url)
    }
</script>

<body>

<div class="form-container">
    <h1>Hi, Welcome to the chat!</h1>
            <label for="name">Username:</label>
            <input type="text" id="name" name="name" bind:value={username} on:keydown={(event) => {
                if (event.key == 'Enter') {
                    navigate(`/chat?username=${username}`)
                }
            }} required>
        <br>
        <br>
        <button on:click={() => navigate(`/chat?username=${username}`)}>Let's chat!</button>
        <hr>
        <a href="https://github.com/SzP42/chat-app">GitHub</a>
        <a href="https://linkedin.com/in/patrik-szabó-328a0b248">LinkedIn</a>
    </div>

</body>
