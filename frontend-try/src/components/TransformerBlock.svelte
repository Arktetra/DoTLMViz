<script>
  export let layers = ["Attention Layer", "MLP Layer"];
</script>

<div class="transformer-block">
  {#each layers as layer}
    <div class="layer">
      <div class="layer-title">{layer}</div>
      <div class="ln">LN</div>
    </div>
  {/each}
</div>

<style>
  .transformer-block {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color: #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .layer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background-color: #5e35b1;
    color: white;
    border-radius: 4px;
    position: relative;
  }
  .layer-title {
    margin-bottom: 0.5rem;
  }
  .ln {
    position: absolute;
    bottom: -12px;
    background-color: #ff5252;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 2px;
    font-size: 0.8rem;
  }
</style>
