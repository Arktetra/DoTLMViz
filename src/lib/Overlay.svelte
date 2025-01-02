<script lang="ts">
    import { fade } from "svelte/transition";
    export let isOverlayOpen : boolean;
</script>

<div transition:fade={{duration:250}} class="w-screen h-screen absolute top-0 left-0 flex flex-col justify-center items-center z-50 bg-gray-300/90">
    <div class="min-w-[30rem] min-h-[20rem] relative bg-theme rounded-md flex flex-col justify-evenly items-center text-theme-w p-2">
        <!-- <button class="absolute -top-8 -right-5 text-4xl font-bold text-theme-r transition-transform hover:scale-110">&times;</button> -->
        <button 
            onclick={()=> isOverlayOpen=false}
            class="absolute -top-1 right-1 text-4xl font-bold text-theme-r transition-transform hover:scale-110"
        >
            &times;
        </button>
        <slot />
    </div>
</div>