<script lang="ts">
	import { ArrowRightAltOutline } from 'flowbite-svelte-icons';
	import { MLPPostCallback, MLPPreCallback } from '../callbacks.svelte';

	import BlockBase from '../components/BlockBase.svelte';
</script>

<div class="flex h-full w-full flex-col items-center justify-between rounded-lg bg-theme-w p-5">
	<h1
		class="mb-5 w-full bg-theme-g-alt p-4 text-center font-main-a text-2xl font-bold uppercase text-theme"
	>
		Multi-layer Perceptron (MLP)
	</h1>
	<div class="flex h-[15rem] flex-row items-center py-10">
		<ArrowRightAltOutline class="h-10 w-10 animate-pulse text-theme" />
		<BlockBase
			label="Linear"
			height={'75%'}
			width={'5rem'}
			href="/read/mlp-linear"
			clickEventCb={MLPPreCallback}
		/>
		<ArrowRightAltOutline class="h-6 w-6 animate-pulse text-theme" />
		<BlockBase
			label="GELU"
			height={'100%'}
			width={'7rem'}
			href="/read/mlp-gelu"
			clickEventCb={MLPPostCallback}
		/>
		<ArrowRightAltOutline class="h-6 w-6 animate-pulse text-theme" />
		<BlockBase label="Linear" height={'75%'} width={'5rem'} href="/read/mlp-linear" />
		<ArrowRightAltOutline class="h-10 w-10 animate-pulse text-theme" />
	</div>
</div>
