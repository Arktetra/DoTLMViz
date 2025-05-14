<script>
  import Embedding from "./src/components/Embedding.svelte";
  import TransformerBlock from "./src/components/TransformerBlock.svelte";
  import Unembedding from "./src/components/Unembedding.svelte";
</script>

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
</style>
