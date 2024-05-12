<script>
    import { supabase } from "$lib/supabaseClient.js"
    import { page } from '$app/stores';
    import { goto } from "$app/navigation"

    let messages;
    $: messages = []
    
    // gets the page url and derives the username
    const url = $page.url;
    let username = url.searchParams.get("username") 
    console.log(username)
    if (!username) {
        goto("/")
    }

    // subscribes to the broadcast channel and starts receiving messages
    const chat_channel = supabase.channel("chatroom")
    .on("postgres_changes", 
    {
    event: "*", 
    schema:"public", 
    table:"Users"
    }, (payload) => {
        console.log(payload)
        messages.push(payload.new)
    }
).subscribe()

// function sendMessage(message) {
//     supabase.channel("chatroom")
//     .subscribe((status) => {
//     if (status === 'SUBSCRIBED') {
//       channel.send({
//         type: 'broadcast',
//         event: '*',
//         payload: { message },
//       })
//     }
//   })


</script>
{#each messages as m}
    <p>{m}</p>
{/each}
