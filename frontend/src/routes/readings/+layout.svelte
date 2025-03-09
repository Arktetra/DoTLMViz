<script lang="ts">
	const { children, data } = $props();
	import { content } from '$lib/content';
	import { ArrowRightOutline, WandMagicSparklesSolid } from 'flowbite-svelte-icons';
	import { fly } from 'svelte/transition';

	const getTitle = () => {
		const temp: string[] = [];
		Object.entries(content).forEach(([title, content]) => {
			temp.push(title);
		});
		return temp;
	};

	let navState = $state<boolean>(true);

	const navToggle = (s?: boolean) => {
		if (s) navState = s;
		navState = !navState;
	};

	let activeInd = $state(-1);
</script>

<button
	onclick={() => navToggle()}
	class="fixed left-4 top-4 z-50 cursor-pointer rounded-md border border-theme bg-theme-w text-theme hover:bg-theme-g"
>
	<ArrowRightOutline
		class="h-7 w-7 transition-transform duration-300 {navState ? 'rotate-180' : 'rotate-0'}"
	/>
</button>
{#if navState}
	<nav
		transition:fly={{ duration: 300 }}
		class="fixed left-0 top-0 flex h-full w-[17rem] flex-col items-center justify-center border-r bg-theme text-left shadow-xl sm:w-[20rem]"
	>
		{#each data.posts as post, ind}
			<a
				href="/readings/{post.slug}"
				onclick={() => (activeInd = ind)}
				class="w-full p-4 text-theme-w hover:bg-theme-alt hover:px-6 {activeInd == ind
					? 'border-l-8 border-theme-w font-extrabold'
					: ''} capitalize transition-all duration-300"
			>
				{post.title}
			</a>
		{/each}
		<!-- {console.log(data)} -->
		<a
			href="/"
			class="w-full p-4 capitalize text-theme-w transition-all duration-300 hover:bg-theme-alt hover:px-6"
			><WandMagicSparklesSolid class="inline-block" /> Lets Rock</a
		>
	</nav>
{/if}
<section
	class="flex min-h-screen w-full flex-col items-center justify-start bg-theme-w transition-all duration-300 {navState
		? 'pl-[20rem]'
		: 'p-0'}"
>
	{#if children}
		{@render children()}
	{/if}
</section>
