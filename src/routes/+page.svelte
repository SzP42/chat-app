<script>
    import { goto } from "$app/navigation"

    let username = "";

    function navigate(url) {
        goto(url)
    }
</script>
<div class="form-container">
    <h1>Hi, Welcome to the chat!</h1>
        <form id="popupForm">
            <label for="name">Username:</label>
            <input type="text" id="name" name="name" bind:value={username} on:keydown={(event) => {
                if (event.key == 'ENTER') {
                    navigate(`/chat?username=${username}`)
                }
            }} required>
        </form>
        <br>
        <br>
        <button on:click={() => navigate(`/chat?username=${username}`)}>Let's chat!</button>
        <hr>
        <a href="https://github.com/SzP42/chat-app">GitHub</a>
        <a href="https://linkedin.com/in/patrik-szabó-328a0b248">LinkedIn</a>
    </div>



<style lang="scss">

.form-container {
  width: 50%; 
  margin: 0 auto;
}

button {
    border-radius: 15%;
  }

  button:hover {
    background-color: rgb(45, 42, 42);
    color: white;
    cursor: pointer;
  }

  a { 
    opacity: 50%;
    color: rgb(126, 120, 120);
  }



</style>