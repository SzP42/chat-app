import { supabase } from "$lib/supabaseClient.js"

export const load = async (serverLoadEvent) => {
    const { fetch } = serverLoadEvent
    try {
        const { data, error } = await supabase
          .schema('public')
          .from('messages')
          .select("*")
          return {data}
            } catch (err) {
                console.error(err)
            }
        

}   