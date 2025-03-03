import type { Reading } from "$lib/types";


export async function load({ fetch }) {
    const response = await fetch("/api/readings");
    const posts: Reading[] = await response.json();
    return { posts }
}