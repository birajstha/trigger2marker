<script>
  import { computeBitGroups, computeMarkerValues, validateMarkers, countValidOneToOne, DEFAULT_TYPES, DEFAULT_PRESET } from './lib/decoder.js';
  import DecoderForm from './components/DecoderForm.svelte';
  import BitMaskTable from './components/BitMaskTable.svelte';
  import TriggerGrid from './components/TriggerGrid.svelte';
  import MarkerGrid from './components/MarkerGrid.svelte';
  import DetailPanel from './components/DetailPanel.svelte';

  let bitTypes = [...DEFAULT_TYPES];
  let enabled = Array(8).fill(true);
  let groups = {};
  let showBitMask = false;
  let markerValues = {};
  let validated = {};
  let selectedTrigger = null;

  function handleUpdate(e) {
    const { enabled: en, types: ty } = e.detail;
    enabled = en;
    bitTypes = ty;
    groups = computeBitGroups(enabled, bitTypes);
    markerValues = computeMarkerValues(groups);
    validated = validateMarkers(markerValues);
    showBitMask = true;
    selectedTrigger = null;
  }

  function handleTriggerSelect(e) {
    selectedTrigger = e.detail;
  }

  function handleCloseDetail() {
    selectedTrigger = null;
  }

  let oneToOneCount;
  $: oneToOneCount = countValidOneToOne(validated);
</script>

<div class="t2m-app">
  <div class="container">
    <h1 class="t2m-title">TRIGGER2MARKER</h1>
    <p class="t2m-desc">
      Interactive tool to display the mapping between 8-bit trigger codes and markers
      for different Digital Port Settings (actiCHamp amplifier family).
    </p>
    <div class="alert alert-info">
      Simulates the decoding behavior of the Digital Port Settings to identify the set
      of trigger codes/markers that have a one-to-one mapping.
      <a href="https://pressrelease.brainproducts.com/trigger-code-design/" target="_blank" rel="noopener">Learn more about trigger code design</a>
    </div>

    <div class="row">
      <div class="col-form">
        <DecoderForm on:update={handleUpdate} />
      </div>
      <div class="col-mask">
        {#if showBitMask}
          <BitMaskTable groups={groups} />
        {/if}
      </div>
    </div>

    {#if showBitMask}
      <div class="grid-section">
        <div class="grid-columns">
          <div class="grid-col">
            <h2>Trigger Values</h2>
            <p class="grid-hint">Click to select a trigger value</p>
            <TriggerGrid
              validated={validated}
              selectedTrigger={selectedTrigger}
              on:select={handleTriggerSelect}
            />
          </div>
          <div class="grid-col">
            <h2>Corresponding Markers</h2>
            <MarkerGrid
              markerValues={markerValues}
              validated={validated}
              selectedTrigger={selectedTrigger}
              on:select={handleTriggerSelect}
            />
          </div>
        </div>
      </div>

      {#if selectedTrigger !== null}
        <DetailPanel
          triggerIndex={selectedTrigger}
          markerValues={markerValues}
          validated={validated}
          on:close={handleCloseDetail}
        />
      {/if}

      <div class="stats-bar">
        <div class="stat">
          <span class="stat-dot dot-green"></span>
          One-to-one validated: {oneToOneCount}
        </div>
        <div class="stat">
          <span class="stat-dot dot-yellow"></span>
          Duplicates: {Object.values(validated).filter(v => v.duplicate === 1).length}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #060d14;
    color: #e2e8f0;
    line-height: 1.6;
  }
  :global(a) { color: #3a7bd5; text-decoration: none; }
  :global(a:hover) { color: #5a9df5; }
  :global(.container) { max-width: 1400px; margin: 0 auto; padding: 0 20px; }

  .t2m-app { padding: 32px 0; }
  .t2m-title { font-size: 2rem; font-weight: 800; margin-bottom: 8px; }
  .t2m-desc { color: #8899aa; margin-bottom: 20px; max-width: 800px; }
  .alert {
    background: rgba(58,123,213,0.1);
    border: 1px solid rgba(58,123,213,0.25);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
    font-size: 0.9rem;
    color: #8899aa;
  }
  .alert a { font-weight: 500; }

  .row { display: flex; gap: 24px; margin-bottom: 32px; }
  .col-form { flex: 0 0 auto; min-width: 400px; }
  .col-mask { flex: 1; min-width: 0; }

  .grid-section { margin-bottom: 24px; }
  .grid-columns { display: flex; gap: 24px; }
  .grid-col { flex: 1; min-width: 0; }
  .grid-col h2 { font-size: 1.2rem; margin-bottom: 4px; }
  .grid-hint { font-size: 0.85rem; color: #8899aa; margin-bottom: 12px; }

  .stats-bar {
    display: flex; gap: 24px; padding: 16px 0;
    justify-content: center;
    margin-top: 24px;
    border-top: 1px solid #1a3a55;
  }
  .stat { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; }
  .stat-dot { width: 16px; height: 16px; border-radius: 4px; display: inline-block; }
  :global(.dot-green) { background: #22c55e; }
  :global(.dot-yellow) { background: #eab308; }

  @media (max-width: 900px) {
    .row { flex-direction: column; }
    .col-form { min-width: 0; }
    .grid-columns { flex-direction: column; }
  }
  @media (max-width: 640px) {
    .t2m-title { font-size: 1.4rem; }
    .t2m-app { padding: 16px 0; }
  }
</style>