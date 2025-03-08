<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import { onMount } from 'svelte';

	let { tokens, selected_token } = $props<{
		tokens: { name: string; prob: number }[];
		selected_token: string
	}>();

	let width = $state(500);
	let height = $state(266);

	let xTicks = [0, 0.25, 0.5, 0.75, 1.0];
	let maxLength = $derived(Math.max(...tokens.map((token: {name: string, prob: number}) => token.name.length)));
	const padding = $derived({ top: 20, right: 15, bottom: 20, left: maxLength * 6 + 10 });

	// probabilities along x-axis
	let xScale = $derived(
		scaleLinear()
			.domain([0, 1])
			.range([padding.left, width - padding.right])
	);

	// tokens along y-axis
	let yScale = $derived(
		scaleLinear()
			.domain([0, tokens.length])
			.range([height - padding.bottom, padding.top])
	);

	let innerHeight = $derived(height - (padding.top + padding.bottom));
	let barHeight = $derived(innerHeight / tokens.length);

	onMount(() => {
		const chart = document.querySelector('.chart');

		if (chart) {
			height = chart.clientHeight;
		}
	});
</script>

<div class="chart" bind:clientWidth={width}>
	<svg {width} height="100%">
		{#if tokens.length !== 0}
		<g class="bars">
			{#each tokens as token, i}
				<rect
					x={padding.left}
					y={yScale(tokens.length - i)}
					width={xScale(token.prob) - padding.left}
					height={barHeight * 0.9}
					rx=2
					ry=2
					style="
						stroke-width: {token.name === selected_token ? "1.5" : "0"};
						stroke: #665191;
					"
				/>

				<text x={xScale(token.prob) + 2} y={yScale(tokens.length - i) + barHeight / 1.5}>
					{(token.prob * 100).toFixed(3) + '%'}
				</text>
			{/each}
		</g>

		<g class="axis y-axis">
			<!-- Labels along Y-axis -->
			{#each tokens as token, i}
				<g class="tick">
					<text x={padding.left - 5} y={yScale(tokens.length - i) + barHeight / 1.5}>
						{token.name}
					</text>
				</g>
			{/each}

			<!-- The Y-axis line -->
			<line
				y2={yScale(0)}
				y1={yScale(tokens.length)}
				stroke="black"
				transform="translate({xScale(0)})"
			/>
		</g>

		<g class="axis x-axis">
			<!-- Labels along X-axis -->
			{#each xTicks as tick}
				<g class="tick tick-{tick}" transform="translate({xScale(tick)}, {yScale(0)})">
					<text x="0" y="15">
						{tick}
					</text>
				</g>
			{/each}

			<!-- The X-axis line -->
			<line x1={xScale(0)} x2={xScale(1)} y1={yScale(0)} y2={yScale(0)} />
		</g>
		{/if}
	</svg>
</div>

<style>
	.chart {
		background-color: black;
		height: 100%;
		/* width:  */
	}
	svg {
		color: #6a6af0;
		background-color: aliceblue;
	}

	.y-axis line {
		stroke: #6a6af0;;
		stroke-width: 0.5;
	}

	.x-axis line {
		stroke: #6a6af0;;
		stroke-width: 0.5;
	}

	.x-axis .tick text {
		text-anchor: middle;
		font-size: 11px;
		color: black;
	}

	.bars rect {
		fill: #6a6af0;;
		stroke: none;
	}

	.bars text {
		font-size: 10px;
	}

	.tick {
		font-family: Poppins, sans-serif;
		font-size: 0.725em;
		font-weight: 200;
		color: white;
	}

	.tick text {
		fill: black;
		text-anchor: end;
		/* dominant-baseline: middle; */
		font-size: 11px;
		font-family: monospace;
		color: white;
	}
</style>
