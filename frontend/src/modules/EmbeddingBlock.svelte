<script>
	import DottedBlockBase from '../components/DottedBlockBase.svelte';
	import BlockBase from '../components/BlockBase.svelte';

	const _embeddings = [
		{
			label: 'Token Embedding',
			href: '/read/token-embedding'
		},
		{
			label: 'Positional Embedding',
			href: '/read/positional-embedding'
		}
	];
</script>

<DottedBlockBase label="Embeddings" inStyle="flex-col">
	{#each _embeddings as item}
		<BlockBase label={item.label} href={item.href}>
			<h1 class="bg-theme p-4">{item.label}</h1>
		</BlockBase>
	{/each}
</DottedBlockBase>
