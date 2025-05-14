<script lang="ts">
  export let title1 = "Positional Embedding";
  export let title2 = "Token Embedding";
</script>

<div class="embedding-block">
  <div class="block">{title1}</div>
  <div class="block">{title2}</div>
</div>

<style>
  .embedding-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background-color: #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .block {
    background-color: #5e35b1;
    color: white;
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
    border-radius: 4px;
    text-align: center;
  }
</style>
