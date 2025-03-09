<script lang="ts">
    let { data } = $props();
</script>

<article class="m-8 max-w-[80%]">
    <hgroup>
        <h1 class="bg-theme py-5 text-center font-main-a text-2xl font-extrabold uppercase text-theme-w">
            {data.meta.title}
        </h1>
    </hgroup>
    <div class="prose">
        <data.content />
    </div>
</article>
