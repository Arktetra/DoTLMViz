<script lang="ts">
    import { activeComponent, dimred, global_state } from "../state.svelte";
	import {
	embedCallback,
		kSliderCallback,
		MLPPostCallback,
		MLPPreCallback,
		posEmbedCallback,
		pSliderCallback,
		temperatureSliderCallback
	} from '../callbacks.svelte';
	import ThemeInputSlider from '../components/ThemeInputSlider.svelte';
	import ThemeToggle from '../components/ThemeToggle.svelte';
	import DropDown from '../components/DropDown.svelte';

    import { QuestionCircleSolid } from "flowbite-svelte-icons";

	// here true represent the top p and false mean k
	let topPorK = $state(false);
	const dimredMethod = ["PCA", "t-SNE"]

    function condEmbedCallback() {
        if (activeComponent.name === "Token Embedding") {
            embedCallback();
        } else {
            posEmbedCallback();
        }
    }

    // this function will be called by dropdown change with the option name as param
    const onMethodChange = (name: string) => {
        // invoke sampling backend method here..
        dimred.method = name;

        condEmbedCallback();
    }

    // function invoked by slider on change with its current value passed as params
    const onPerplexityChange = (num: number) => {
        // invoke other method for perplexity value change
        dimred.perplexity = +num;
        condEmbedCallback();
    }
</script>

{#if activeComponent.name === 'MLP (in) Pre-activation' || activeComponent.name === 'GELU Activation'}
    <div class="flex flex-row items-center justify-evenly space-x-4">
        <label for="neuron">Neuron:</label>
        <input
            id="neuron"
            name="neuron"
            type="number"
            min="0"
            max="3072"
            bind:value={global_state.neuron}
            onchange={() => {
                if (activeComponent.name === "MLP (in) Pre-activation") {
                    return MLPPreCallback();
                } else {
                    return MLPPostCallback();
                }
            }}
            class="rounded-md border border-theme px-1 text-lg text-theme outline-none"
        />
        <div class="flex flex-col">
            <span class="text-ti">3072</span>
            <span class="text-ti">0</span>
        </div>
    </div>
{:else if activeComponent.name === 'Output Distribution'}
    <div class="relative w-full rounded-md bg-theme-g p-2 shadow-inner shadow-theme-g-alt">
        <a
            target="_blank"
            href="/readings/decoding"
            title="Control Parameter"
            class="absolute end-1 top-1 text-theme"
        >
            <QuestionCircleSolid size={'sm'} />
        </a>
        <span
            class="mb-4 flex flex-row justify-around text-center text-sm font-extrabold uppercase text-theme underline"
        >
            Control Parameters
            <ThemeToggle
                bind:state={topPorK}
                style="z-50 text-ti-s"
                leftlabel="Top k"
                rightlabel="Top p"
            />
        </span>
        <ThemeInputSlider
            label={'Temperature'}
            min={-2}
            max={2}
            step={0.1}
            changeEventCb={temperatureSliderCallback}
        />
        <hr class="my-1 border border-theme-w" />
        {#if topPorK}
            <ThemeInputSlider
                label={'Top K'}
                min={1}
                max={10}
                step={1}
                changeEventCb={kSliderCallback}
            />
        {:else}
            <ThemeInputSlider
                label={'Top P'}
                min={0}
                max={1}
                step={0.05}
                changeEventCb={pSliderCallback}
            />
        {/if}
    </div>
{:else if activeComponent.name === 'Token Embedding' || activeComponent.name === 'Positional Embedding'}
    <div class="w-full space-y-4 p-2">
        <DropDown
            value={dimred.method}
            label={"Sampling Methods"}
            options={dimredMethod}
            onChangeCb={onMethodChange}
        />
        {#if dimred.method === "t-SNE" && global_state.embed_output.length > 2}
            <!-- please descibe the range and the callback as per appropriate -->
            <ThemeInputSlider
                min={1}
                max={global_state.embed_output.length - 1}
                step={0.05}
                changeEventCb={onPerplexityChange}
                label="Perplexity"
            />
        {/if}
    </div>
{/if}