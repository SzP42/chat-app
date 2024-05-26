<script>
    import { supabase } from "$lib/supabaseClient.js"
    
    // gets the data from the preload function, which includes the chat history and the current username
    export let data
    const username = data['username']

    // used for the input 
    let message;

    // reactive variable that changes when a new message is sent to the database
    $: messages = data['data']

    // initiates a channel that listens for INSERT events in the database, and gets the new messages
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
      data['data'].push(payload['new'])
      data['data'] = data['data']
    }
  )
  .subscribe((status) => {
    console.log(status)

    }
  )

</script>
<div class="messages-container">
{#each messages as message}
  <div>
    <p>{message['id']}</p>
    <h2>{message['username']}</h2>
    <p>{message['message']}</p>
  </div>
  <hr>
{/each}
</div>

<input type="text" bind:value={message}>
<!-- Inserts the message to the database -->
<button on:click={ async () => {
  if (!message) {
    alert('You have to write something!')
  } else {
const { error } = await supabase
  .from('messages')
  .insert({username, message})
  }
  message = ""
}}>Send</button>


