<script>
	import DottedBlockBase from '../components/DottedBlockBase.svelte';
	import BlockBase from '../components/BlockBase.svelte';
	import { embedCallback, posEmbedCallback } from '../callbacks.svelte';
	import { global_state } from '../state.svelte';

	const _embeddings = [
		{
			label: 'Token Embedding',
			href: '/readings/input-encoding-component#:~:text=input%20positional%20embedding.-,Input%20Token%20Embedding,-A%20token%20embedding',
			callback: embedCallback
		},
		{
			label: 'Positional Embedding',
			href: '/readings/input-encoding-component#:~:text=constructing%20contextual%20representations.-,Positional%20Embedding,-The%20positional%20embedding',
			callback: posEmbedCallback
		}
	];
</script>

{#if global_state.viewMode}
	<DottedBlockBase label="Embeddings" inStyle="flex-col justify-center items-center">
		{#each _embeddings as item}
			<BlockBase label={item.label} href={item.href} clickEventCb={item.callback}></BlockBase>
		{/each}
	</DottedBlockBase>
{:else}
	<DottedBlockBase label="Embedding" inStyle="p-8 flex flex-col justify-evenly items-center">
		<h1 class="tracking-tighter">Token Embedding</h1>
		<hr class="w-[80%] border-theme" />
		<h1 class="tracking-tighter">Positional Embedding</h1>
	</DottedBlockBase>
{/if}
