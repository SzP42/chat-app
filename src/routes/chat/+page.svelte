<script>
    import { supabase } from "$lib/supabaseClient.js"
    import { onMount } from "svelte";
    import "$lib/chatStyle.css"
    
    // gets the data from the preload function, which includes the chat history and the current username
    export let data
    const username = data['username']

    // used for the input
    let message;
    // used for the scroll down function
    let messagesContainer;

    // reactive variable that changes when a new message is sent to the database
    let messages = data['data']
    $: messages = messages

    // scrolls to the bottom when the page is loaded
    onMount(() => {
      messagesContainer.scroll({ top: messagesContainer.scrollHeight, behavior: 'smooth' });
  });
    
  async function sendMessage() {
  if (!message) {
    alert('You have to write something!')
  } else {
const { error } = await supabase
  .from('messages')
  .insert({username, message})
  }
  message = ""
  }

  async function deleteMessage(mess) {
    const { error } = await supabase
        .from('messages')
        .update({'message': '!#DELETED#!'})
        .eq('id', mess['id'])
  }

    // listens for new and deleted messages, updates the database and the display
    const channelA = supabase.channel("chatroom")
    
    channelA
    .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
    },
    (payload) => {
      messages.push(payload['new'])
      messages = messages
    }
  ) 
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'messages',
    },
    async (payload) => {
      try {
        const { data, error } = await supabase
          .schema('public')
          .from('messages')
          .select("*")
          .order('id', {ascending: true})
          messages = data
            } catch (err) {
                console.error(err)
            }
    }
  )
  .subscribe((status) => {
    console.log(status)
    }
  )

</script>

<body>

<br>
<br>
<div class="messages-container" bind:this={messagesContainer}>
{#each messages as message}
  <div>
    {#if message['message'] != '!#DELETED#!'}
    <label for="message">{message['username']}</label>
    <h4 id="message">{message['message']}</h4>
    
      {#if message['username'] == username}
      <button class="delete-button" on:click={() => {deleteMessage(message)}}>delete</button>
      {/if}
    {:else}
    <p><i>{message['username']} deleted a message</i></p>
    {/if}
  </div>
  <hr>
{/each}
</div>

<input type="text" bind:value={message} on:keydown={async (event) => {
  if (event.key == 'Enter') {
    await sendMessage()
  }
}}>

<button class="send-button" on:click={sendMessage}>Send</button>


</body>