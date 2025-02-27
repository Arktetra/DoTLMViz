<script lang="ts">
	import OutputBlock from '../modules/OutputBlock.svelte';
	import TransformerBlocks from '../modules/TransformerBlocks.svelte';
	import UnembeddingBlock from '../modules/UnembeddingBlock.svelte';
	import EmbeddingBlock from '../modules/EmbeddingBlock.svelte';
	import TokensBlock from '../modules/TokensBlock.svelte';
	import { onMount } from 'svelte';
	import { loadModel } from './fetch.svelte';
	import { InitEventMap } from '../eventstate.svelte';
	import { active_model, global_state } from '../state.svelte';
	import ExpandableDottedBlock from '../components/ExpandableDottedBlock.svelte';
	import Navbar from '../modules/Navbar.svelte';
	import Message from '../components/Message.svelte';
	import { ArrowRightAltOutline } from 'flowbite-svelte-icons';

	// let inpText: string = $state('');
	let activeTokenInd: number = $state(0);

	onMount(() => {
		InitEventMap();
		loadModel(active_model.model_name);
	});

	let showRead = $state(true);
	let flowArrowCount = 5;
</script>

{#if showRead}
	<Message
		type="info"
		ostyle="bg-theme bottom-10 right-[50%] min-w-[60%] z-30 flex flex-row justify-center translate-x-[50%] !text-sm"
		message="Recomendation: Please visit reading section first to understand the basic theories"
	>
		<a href={'/read'} class="ml-5 hover:underline">Visit Now</a>
		<button onclick={() => (showRead = false)} class="ml-5 hover:scale-125">X</button>
	</Message>
{/if}

<Navbar />
<section
	class="flex max-h-screen min-h-[900px] min-w-[1500px] flex-col items-center justify-between pt-[10rem] font-main-a"
>
	<div
		class="flex w-full flex-row items-start justify-evenly space-x-6 transition-all duration-300 xl:min-w-[70%] {global_state.ouputBlockState
			? 'pr-0 xl:pr-[27rem]'
			: 'pr-[5rem]'}"
	>
		<TokensBlock bind:tokenInd={activeTokenInd}>
			<span class="text-sm font-light text-theme-w">
				Index: <span class="text-md font-bold">{activeTokenInd}</span>
			</span>
			<span class="text-sm font-light text-theme-w">
				Token: <span class="text-lg font-bold">'{global_state.tokens[activeTokenInd]}'</span>
			</span>
		</TokensBlock>
		<ExpandableDottedBlock
			label="GPT-2 Small"
			href="/read/gpt2-small"
			titStyle="text-xl font-bold text-black"
			borderSize={'1px'}
			bind:expanded={global_state.viewMode}
			inStyle="min-w-[65rem] !h-[35rem] p-4 pt-14 flex flex-row justify-between items-center"
		>
			<EmbeddingBlock />
			<TransformerBlocks />
			<UnembeddingBlock />
		</ExpandableDottedBlock>
	</div>
	<div class="mb-10 px-10 flex w-full flex-row items-center justify-evenly">
		{#each { length: flowArrowCount } as i}
			<ArrowRightAltOutline class="animate-flow text-theme"/>
		{/each}
	</div>
</section>
<OutputBlock />
