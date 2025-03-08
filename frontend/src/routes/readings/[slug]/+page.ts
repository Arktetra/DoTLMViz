import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
    try {
        const reading = await import(`../../../readings/${params.slug}.md`);
        return {
            content: reading.default,
            meta: reading.metadata
        }
    } catch (e) {
        error(404, `Could not find ${params.slug}`)
    }
}