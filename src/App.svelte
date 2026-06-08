<script>
  import { onMount } from 'svelte';
  import { computeBitGroups, computeMarkerValues, validateMarkers, countValidOneToOne } from './lib/decoder.js';
  import DecoderForm from './components/DecoderForm.svelte';
  import BitMaskTable from './components/BitMaskTable.svelte';
  import TriggerGrid from './components/TriggerGrid.svelte';
  import MarkerGrid from './components/MarkerGrid.svelte';
  import DetailPanel from './components/DetailPanel.svelte';

  let groups = {};
  let showComputed = false;
  let markerValues = {};
  let validated = {};
  let hoveredTrigger = null;
  let detailTrigger = null;
  let showCopyright = false;
  let useFullType = false;
  let theme = 'dark';

  onMount(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  });

  function handleUpdate(e) {
    const { enabled, types, useFullType: uf } = e.detail;
    useFullType = uf;
    groups = computeBitGroups(enabled, types);
    markerValues = computeMarkerValues(groups);
    validated = validateMarkers(markerValues);
    showComputed = true;
    hoveredTrigger = null;
    detailTrigger = null;
  }

  function handleHover(e) {
    hoveredTrigger = e.detail;
  }

  function handleLeave() {
    hoveredTrigger = null;
  }

  function handleSelect(e) {
    detailTrigger = e.detail;
  }

  function toggleCopyright() {
    showCopyright = !showCopyright;
  }

  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  $: oneToOneCount = countValidOneToOne(validated);
  $: duplicateCount = Object.values(validated).filter((v) => v.duplicate === 1).length;
</script>

<div class="max-w-6xl mx-auto px-4">
  <div class="mb-5 pt-6">
    <div class="top-row">
      <h1 class="text-3xl font-bold tracking-tight mb-2">TRIGGER2MARKER</h1>
      <button class="theme-toggle-btn" type="button" aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} on:click={toggleTheme}>
        {#if theme === 'dark'}
          <svg viewBox="0 0 24 24" class="theme-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
          </svg>
        {:else}
          <svg viewBox="0 0 24 24" class="theme-icon" fill="currentColor" aria-hidden="true">
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9 9 0 1012 21a8.96 8.96 0 008.354-5.646z"></path>
          </svg>
        {/if}
      </button>
    </div>
    <p class="text-slate-600 mb-3">
      Interactive tool to display the mapping between 8-bit trigger codes and markers for different Digital Port Settings (actiCHamp amplifier family).
    </p>
  </div>

  <div class="row decoder-window">
    <div class="col-12">
      <div class="alert alert-info" role="alert">
        TRIGGER2MARKER is an interactive application to display the mapping between 8-bit trigger codes and markers for different Digital Port Settings (actiCHamp amplifier family). It simulates the decoding behavior of the Digital Port Settings to identify the set of trigger codes/markers that have a one-to-one mapping. To learn more, please see our Support Tip
        <a href="https://pressrelease.brainproducts.com/trigger-code-design/" class="alert-link" target="_blank" rel="noopener"> "How to design trigger codes to obtain accurate markers"</a>
        and related resources at
        <a href="https://www.brainproducts.com/support-resources/" class="alert-link" target="_blank" rel="noopener">Brain Products Support Resources</a>.
      </div>
    </div>

    <div class="col-sm-12 col-md-6">
      <h5>Digital Port Settings</h5>
      <DecoderForm on:update={handleUpdate} />
    </div>

    <div class="col-md-6 bit-mask-table">
      {#if showComputed}
        <BitMaskTable groups={groups} />
      {/if}
    </div>
  </div>

  {#if showComputed}
    <div class="row mt-3">
      <div class="col-12">
        {#if detailTrigger !== null}
          <div class="sticky top-4 z-20 mb-5">
            <DetailPanel
              triggerIndex={detailTrigger}
              markerValues={markerValues}
              validated={validated}
              oneToOneCount={oneToOneCount}
              duplicateCount={duplicateCount}
              useFullType={useFullType}
            />
          </div>
        {/if}

        <div class="row">
          <div class="col-lg-6 col-12">
            <h2 class="grid-heading">Trigger Values</h2>
            <p class="grid-subtitle">Click a cell to send a trigger</p>
            <TriggerGrid
              validated={validated}
              activeTrigger={hoveredTrigger}
              on:hover={handleHover}
              on:leave={handleLeave}
              on:select={handleSelect}
            />
          </div>
          <div class="col-lg-6 col-12 marker-table">
            <h2 class="grid-heading">Corresponding Markers</h2>
            <MarkerGrid
              markerValues={markerValues}
              validated={validated}
              activeTrigger={hoveredTrigger}
              useFullType={useFullType}
              on:hover={handleHover}
              on:leave={handleLeave}
              on:select={handleSelect}
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3 my_footer">
      <div class="col-12 text-center">
        <button class="btn mb-3" on:click={toggleCopyright}>
          {showCopyright ? 'Hide' : 'Show'} Copyright Information
        </button>
        {#if showCopyright}
          <pre class="bg-light p-3 border rounded text-start whitespace-pre-wrap">Copyright 2024 Brain Products GmbH
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</pre>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .theme-toggle-btn {
    height: 36px;
    width: 36px;
    border-radius: 999px;
    border: 1px solid var(--border-color);
    background: var(--surface-2);
    color: var(--text-primary);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .theme-icon {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 640px) {
    .top-row {
      align-items: flex-start;
    }
  }
</style>
