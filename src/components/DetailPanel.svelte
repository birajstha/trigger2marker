<script>
  import { createEventDispatcher } from 'svelte';
  export let triggerIndex = 0;
  export let markerValues = {};
  export let validated = {};
  const dispatch = createEventDispatcher();

  $: binaryStr = triggerIndex.toString(2).padStart(8, '0');
  $: bits = binaryStr.split('');
  $: markerData = markerValues[triggerIndex] || {};
  $: markerEntries = Object.entries(markerData).filter(([, v]) => v !== 0);
</script>

<div class="detail-panel">
  <div class="detail-header">
    <h3>Trigger Sent: {triggerIndex}</h3>
    <button class="close-btn" on:click={() => dispatch('close')} aria-label="Close">&times;</button>
  </div>
  <p class="binary-label">Binary value: {binaryStr}</p>
  <div class="bits-row">
    {#each bits as bit, i}
      <span class="bit-pill" class:bit-one={bit === '1'} class:bit-zero={bit === '0'}>Bit {7 - i}</span>
    {/each}
    <span class="bit-legend">(bit 7 ← bit 0)</span>
  </div>
  <h4>Markers Generated:</h4>
  <div class="markers-list">
    {#if markerEntries.length === 0}
      <p class="no-markers">No markers for this trigger</p>
    {:else}
      {#each markerEntries as [type, value]}
        <span class="marker-badge">{type[0]} {value}</span>
      {/each}
    {/if}
  </div>
</div>

<style>
  .detail-panel {
    background: #0d1f2d;
    border: 1px solid #1a3a55;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    max-width: 600px;
  }
  .detail-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .detail-header h3 { font-size: 1.05rem; }
  .close-btn {
    background: none; border: none; color: #8899aa;
    font-size: 1.5rem; cursor: pointer; padding: 4px 8px; border-radius: 4px;
    transition: color 0.2s;
  }
  .close-btn:hover { color: #e2e8f0; }
  .binary-label { font-size: 0.85rem; color: #8899aa; margin-bottom: 8px; font-family: monospace; }
  .bits-row { display: flex; align-items: center; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; }
  .bit-pill {
    display: inline-flex; align-items: center; justify-content: center;
    width: 28px; height: 28px; border-radius: 4px;
    font-family: monospace; font-weight: 700; font-size: 0.85rem;
  }
  .bit-one { background: #22c55e; color: white; }
  .bit-zero { background: #1a3a55; color: #8899aa; }
  .bit-legend { margin-left: 8px; font-size: 0.75rem; color: #8899aa; }
  .markers-list { display: flex; gap: 8px; flex-wrap: wrap; }
  .marker-badge {
    padding: 6px 14px;
    background: rgba(58,123,213,0.15);
    border: 1px solid rgba(58,123,213,0.3);
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    color: #5a9df5;
  }
  .no-markers { color: #8899aa; font-size: 0.85rem; }
</style>