import { redirect } from '@sveltejs/kit';

export const load = async (loadEvent) => {
    const { data, url} = loadEvent
    let username = url.searchParams.get("username") 
    if (!username) {
        redirect(302, "/")
    }
    data['username'] = username
    return data
}