import type { Reading } from "$lib/types";
import type { PageServerLoad } from "./$types";


export async function load({ fetch }) {
    const response = await fetch("api/readings");
    const posts: Reading[] = await response.json();
    return { posts }
}

// export const load: PageServerLoad = async () =