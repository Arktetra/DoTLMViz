<script>
  import Embedding from "../components/Embedding.svelte";
  import TransformerBlock from "../components/TransformerBlock.svelte";
  import Unembedding from "../components/Unembedding.svelte";
  let showPopup = false;
  function togglePopup() {
    showPopup = !showPopup;
  }
</script>

<button class="a" on:click={togglePopup}>popup</button>

{#if showPopup}
  <div
    class="popup-overlay"
    on:click={togglePopup}
    role="dialog"
    aria-modal="true"
  >
    <div class="popup" on:click|stopPropagation role="document" tabindex="0">
      <button
        class="close-button"
        on:click={togglePopup}
        aria-label="close popup">✖</button
      >
      <p>This is the abc popup content!</p>
    </div>
  </div>
{/if}

<main>
  <div class="grid">
    <Embedding />
    <TransformerBlock />
    <Unembedding />
  </div>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  .grid {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    max-width: 900px;
    width: 100%;
  }

  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  /* Popup content */
  .popup {
    background-color: #5a5a8f;
    color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    position: relative;
    max-width: 400px;
    width: 80%;
    text-align: center;
    animation: fadeIn 0.3s ease-in-out;
  }

  /* Close button */
  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }
</style>
