<script lang="ts">
    let { data } = $props();
</script>

<article>
    <hgroup>
        <h1 class="bg-theme py-5 text-center font-main-a text-2xl font-extrabold uppercase text-theme-w">
            {data.meta.title}
        </h1>
    </hgroup>
    <div class="prose">
        <data.content />
    </div>
</article>

<style>
    /* article {
        max-inline-size: 1em;
        margin-inline: auto;
    } */

    h1 {
        text-transform: capitalize;

    }

    article {
        margin: 1em;
    }
</style>