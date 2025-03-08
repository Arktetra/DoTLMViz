import type { Reading } from "$lib/types";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ fetch }) => {
    const response = await fetch("/api/readings");
    const posts: Reading[] = await response.json();
    return { posts }
}