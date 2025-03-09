<script lang="ts">
	import DottedBlockBase from '../components/DottedBlockBase.svelte';
	import ThemeNumberOptions from '../components/ThemeNumberOptions.svelte';
	import BlockBase from '../components/BlockBase.svelte';
	import AttentionHeads from './AttentionHeads.svelte';
	import Mlp from './MLP.svelte';
	import { global_state } from '../state.svelte';
	import {
		attnHeadCallback,
		LN1Callback,
		LN2Callback,
		TransformerBlockCallback
	} from '../callbacks.svelte';

	let pulse: boolean = $state(false);

	const _transformerBlock = [
		{
			label: 'Attention Heads',
			href: '/readings/transformer-blocks#:~:text=moves%20between%20positions.-,Attention%20Layer,-Each%20attention%20layer'
		},
		{
			label: 'MLP',
			href: '/readings/transformer-blocks#:~:text=the%20above%20figure.-,MLP,-The%20MLP%20operates'
		}
	];

	const blockChange = () => {
		pulse = true;
		TransformerBlockCallback();
		setTimeout(() => (pulse = false), 300);
	};
</script>

{#if global_state.viewMode}
	<DottedBlockBase label="Transformer Blocks" inStyle="p-2 py-4 flex-col">
		<ThemeNumberOptions
			count={12}
			bind:activeIndex={global_state.active_block}
			clickEventCb={blockChange}
		/>
		<DottedBlockBase
			label="Block: '{global_state.active_block}'"
			borderSize={'1px'}
			titStyle="text-md top-[-1.35rem]"
			inStyle="m-2 mt-10 !max-h-full flex flex-row transition-all duration-200  {pulse
				? 'animate-pulse [transform:rotateX(90deg)]'
				: ''}"
		>
			<div class="flex flex-col items-start justify-evenly space-y-10">
				<BlockBase
					blockContent={AttentionHeads}
					style="p-2 min-w-[12rem] min-h-[10rem]"
					href={_transformerBlock[0].href}
					clickEventCb={attnHeadCallback}
				>
					<span>{_transformerBlock[0].label}</span>
				</BlockBase>
				<BlockBase
					width={'4rem'}
					height={'4rem'}
					href={'readings/transformer-blocks#:~:text=the%20above%20figure.-,LayerNorm,-LayerNorm%20is%20a'}
					clickEventCb={LN1Callback}
				>
					<span>LN1</span>
				</BlockBase>
			</div>
			<div class="ml-10 flex flex-col items-start justify-evenly space-y-10">
				<BlockBase
					blockContent={Mlp}
					style="p-4 min-w-[12rem] min-h-[10rem]"
					href={_transformerBlock[1].href}
				>
					<span>{_transformerBlock[1].label}</span>
				</BlockBase>
				<BlockBase
					width={'4rem'}
					height={'4rem'}
					href={'readings/transformer-blocks#:~:text=the%20above%20figure.-,LayerNorm,-LayerNorm%20is%20a'}
					clickEventCb={LN2Callback}
				>
					<span>LN2</span>
				</BlockBase>
			</div>
		</DottedBlockBase>
	</DottedBlockBase>
{:else}
	<DottedBlockBase
		label="Transformer Blocks"
		inStyle="!h-[80%] w-[40%] justify-evenly shadow-lg z-0 relative bg-white rounded-xl"
	>
		<span class="text-3xl font-extrabold">x12</span>
		<div
			class="absolute left-3 top-3 -z-10 h-full w-full rounded-xl border border-dashed border-theme bg-white shadow-sm shadow-theme"
		></div>
		<div
			class="absolute left-6 top-6 -z-20 h-full w-full rounded-xl border border-dashed border-theme bg-white shadow-sm shadow-theme"
		></div>
	</DottedBlockBase>
{/if}
