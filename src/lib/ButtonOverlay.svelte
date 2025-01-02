<script lang="ts">
    import Overlay from "./Overlay.svelte";
    let { label, children = null } = $props();
    let isOverlayOpen : boolean = $state(false);
    // let label = "Click me";
</script>

<button
    onclick={()=> isOverlayOpen=true}
    class="bg-theme text-theme-w p-2 px-4 my-4 rounded-md hover:scale-105 transition-transform"
>
    {label}
</button>
{#if isOverlayOpen}
    <Overlay bind:isOverlayOpen={isOverlayOpen}>
        <!-- <slot /> -->
        {#if children}
            {@render children()}
        {/if}
    </Overlay>
{/if}