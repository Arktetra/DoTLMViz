<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import Popup from '../components/Popup.svelte';
	import GlobalMsg from '../modules/GlobalMsg.svelte';

	let { children } = $props();
	let isSmallScreen: boolean = $state(false);

	function checkWindowWidth() {
		if (window.innerWidth < 780) {
			isSmallScreen = true;
		} else if (window.innerWidth > 780) {
			isSmallScreen = false;
		}
	}

	onMount(() => {
		// checkWindowWidth();
		window.addEventListener('resize', checkWindowWidth);
		return window.removeEventListener('resize', checkWindowWidth);
	});
</script>

<GlobalMsg />
{#if isSmallScreen}
	<Popup onCloseCb={() => {}}>
		<span>Small Screen Not Supported yet! <span>Visit later</span></span>
	</Popup>
{:else}
	{@render children()}
{/if}
