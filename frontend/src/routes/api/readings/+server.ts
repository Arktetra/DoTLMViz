import type { Reading } from "$lib/types";
import { json } from "@sveltejs/kit"

async function getPosts() {
    let readings: Reading[] = [];

    const paths = import.meta.glob("/src/readings/*.md", { eager: true });

    for (const path in paths) {
        const file = paths[path]
        const slug = path.split("/").at(-1)?.replace(".md", "");

        if (file && typeof file == "object" && "metadata" in file && slug) {
            const metadata = file.metadata as Omit<Reading, "slug">;
            const reading = { ...metadata, slug } satisfies Reading;
            reading.published && readings.push(reading)
        }
    }

    readings = readings.sort(
        (first, second) => first.order - second.order
    )

    return readings;

}

export async function GET() {
    const readings = await getPosts();
    return json(readings);
}