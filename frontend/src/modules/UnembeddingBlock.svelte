<script lang="ts">
	import DottedBlockBase from '../components/DottedBlockBase.svelte';
	import BlockBase from '../components/BlockBase.svelte';
	import { global_state, activeComponent } from '../state.svelte';
	import { LNFinalCallback } from '../callbacks.svelte';
</script>

{#if global_state.viewMode}
	<DottedBlockBase
		label="Language Modeling Head"
		titStyle="w-full text-center"
		inStyle="flex-col justify-evenly items-center"
	>
		{#if global_state.active_block == 11}
			<BlockBase
				href={'readings/transformer-blocks#:~:text=the%20above%20figure.-,LayerNorm,-LayerNorm%20is%20a'}
				clickEventCb={LNFinalCallback}
			>
				<span>LayerNorm</span>
			</BlockBase>
		{/if}
		<BlockBase
			label="Unembedding"
			width={'12rem'}
			height={'100%'}
			href={'/readings/language-modeling-head'}
			clickEventCb={() => (activeComponent.name = 'Output Distribution')}
		></BlockBase>
	</DottedBlockBase>
{:else}
	<DottedBlockBase
		label="Language Modeling Head"
		titStyle="w-full text-center"
		inStyle="w-[20%] p-8 flex flex-col justify-evenly items-center"
	>
		<h1 class="tracking-tighter">LayerNorm</h1>
		<hr class="w-[80%] border-theme" />
		<h1 class="tracking-tighter">Unembedding</h1>
	</DottedBlockBase>
{/if}
