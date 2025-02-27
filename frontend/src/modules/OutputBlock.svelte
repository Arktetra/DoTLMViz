<script lang="ts">
	import SideDrawer from '../components/SideDrawer.svelte';
	import BarChart from '../dataviz/BarChart.svelte';
	import { activeComponent, data, global_state, input } from '../state.svelte';
	import ScatterChart from '../dataviz/ScatterChart.svelte';
	import HeatMap from '../dataviz/HeatMap.svelte';
	import MlpNeurons from '../dataviz/MLPNeurons.svelte';
	import DensityPlot from '../dataviz/DensityPlot.svelte';
	import Controls from './Controls.svelte';

	$effect(() => {
		$inspect(activeComponent);
		$inspect(data.tokenProbMappings);
	});
</script>

<SideDrawer bind:openState={global_state.ouputBlockState} width={'25vw'}>
	<div class="flex h-full w-full flex-col items-center justify-evenly pt-12 font-main-a">
		<Controls />
		<hr class="w-full border border-theme" />
		<h1 class="text-md my-2 text-center font-extrabold uppercase text-theme">
			{activeComponent.name}
		</h1>
		<div
			class="flex min-h-[22rem] w-full flex-col items-center justify-evenly rounded-md border bg-theme-g p-3 shadow-inner shadow-gray-400"
		>
			<div class="w-full h-full text-right text-ti font-light">
				{#if input.text === ''}
					Enter Something.
				{:else if activeComponent.name === 'Generate' || activeComponent.name === 'Output Distribution'}
					<BarChart tokens={data.tokenProbMappings} />
				{:else if activeComponent.name === 'Token Embedding' || activeComponent.name === 'Positional Embedding'}
					<ScatterChart data={global_state.embed_output} />
				{:else if activeComponent.name === 'Attention Pattern'}
					<HeatMap data={global_state.attn_patterns[global_state.active_head]} vmax="#03045E" />
				{:else if activeComponent.name === 'MLP (in) Pre-activation' || activeComponent.name === 'GELU Activation'}
					<MlpNeurons data={global_state.data} />
				{:else if activeComponent.name === 'LN1' || activeComponent.name === 'LN2' || activeComponent.name === 'LN Final'}
					<DensityPlot pre={global_state.ln_pre} post={global_state.ln_post} />
				{/if}
			</div>
		</div>
		<span class="my-2 font-bold text-theme"
			>Next Token: <span class="rounded-md bg-theme p-1 px-2 font-light text-theme-w"
				>{global_state.next_token}</span
			></span
		>
	</div>
</SideDrawer>
