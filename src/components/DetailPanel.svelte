<script>
  export let triggerIndex = 0;
  export let markerValues = {};
  export let validated = {};
  export let oneToOneCount = 0;
  export let duplicateCount = 0;
  export let useFullType = false;

  $: binaryStr = triggerIndex.toString(2).padStart(8, '0');
  $: bits = binaryStr.split('');
  $: markerData = markerValues[triggerIndex] || {};
  $: markerEntries = Object.entries(markerData).filter(([, v]) => v !== 0);
</script>

<div class="panel">
  <div class="panel-inner">
    <div class="section">
      <span class="label">Trigger Sent</span>
      <span class="trigger-val">{triggerIndex}</span>
    </div>
    <div class="section">
      <span class="label">Binary (bit 7 ← 0)</span>
      <div class="bits">
        {#each bits as bit, i}
          <div class="bit-wrap">
            <span class="bit-num">{7 - i}</span>
            <span class="bit" class:on={bit === '1'}>{bit}</span>
          </div>
        {/each}
      </div>
    </div>
    <div class="section">
      <span class="label">Markers Generated</span>
      <div class="markers">
        {#if markerEntries.length === 0}
          <span class="empty">—</span>
        {:else}
          {#each markerEntries as [type, value]}
            <span class="mbadge">{useFullType ? type : type[0]} {value}</span>
          {/each}
        {/if}
      </div>
    </div>
    <div class="section">
      <span class="label">Mapping Stats</span>
      <div class="stats">
        <span class="stat"><span class="dot green"></span> One-to-one: {oneToOneCount}</span>
        <span class="stat"><span class="dot yellow"></span> Duplicates: {duplicateCount}</span>
      </div>
    </div>
  </div>
</div>

<style>
  .panel {
    background: #0d1f2d;
    border: 1px solid #1a3a55;
    border-radius: 0.75rem;
    padding: 0.9rem 1.4rem;
    max-width: 720px;
    margin: 0 auto;
  }

  .panel-inner {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: flex-start;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .label {
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: #8899aa;
  }

  .trigger-val {
    font-size: 1.7rem;
    font-weight: 700;
    color: #e2e8f0;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  .bits {
    display: flex;
    gap: 3px;
    align-items: flex-end;
    flex-wrap: nowrap;
  }

  .bit-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .bit-num {
    font-size: 0.5rem;
    font-family: monospace;
    color: #8899aa;
    line-height: 1;
  }

  .bit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.8rem;
    font-weight: 700;
    background: #1a3a55;
    color: #8899aa;
    flex-shrink: 0;
  }

  .bit.on {
    background: #198754;
    color: #fff;
  }

  .stats {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    color: #c8d8e8;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .dot.green {
    background: #198754;
  }

  .dot.yellow {
    background: #ffc107;
  }

  .markers {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
    padding-top: 2px;
  }

  .mbadge {
    background: rgba(58, 123, 213, 0.15);
    border: 1px solid rgba(58, 123, 213, 0.35);
    color: #5a9df5;
    border-radius: 20px;
    padding: 3px 14px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .empty {
    color: #8899aa;
    font-size: 0.85rem;
  }
</style>