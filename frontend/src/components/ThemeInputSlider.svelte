<script lang="ts">
	import { onMount } from 'svelte';

	const {
		min = 0,
		max = 1,
		step = 0.1,
		label = '',
		changeEventCb = null,
		inpStyle = '',
	} = $props();

	let inpVal: number = $state(0);

	const updateInpVal = (v: number) => {
		if (changeEventCb) changeEventCb(v);
		inpVal = v;
	};

	const MAX_CHAR_SIZE = 6;

	$effect(() => {
		inpVal = step % 1 === 0 ? Math.floor((max - min) / 2 + min) : (max - min) / 2 + min;
	});
</script>

<div class="mb-4 grid grid-cols-4">
	{#if label}
		<label for={label} title={label} class="font-main-a text-ti font-bold text-theme-r">
			{label.length > MAX_CHAR_SIZE ? label.slice(0, MAX_CHAR_SIZE) + '.' : label}
		</label>
	{/if}
	<div class="relative col-span-3 flex flex-row items-center justify-between text-gray-500">
		<span class="absolute -bottom-3 -start-1 text-ti-s font-bold">{min}</span>
		<input
			type="range"
			bind:value={inpVal}
			{min}
			{max}
			{step}
			onchange={(e: any) => updateInpVal(e.target.value)}
			class="h-[6px] w-full cursor-pointer accent-theme {inpStyle}"
		/>
		<span class="absolute -bottom-3 -end-1 text-ti-s font-bold">{max}</span>
		<span
			style="left: {((inpVal - min) / (max - min)) * 100}%;"
			class={'absolute -bottom-[0.8rem] min-w-[1.8rem] translate-x-[-50%] rounded-md bg-theme text-center text-ti-s text-theme-w '}
		>
			{inpVal}
		</span>
	</div>
</div>
