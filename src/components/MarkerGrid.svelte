<script>
  import { createEventDispatcher } from 'svelte';
  export let markerValues = {};
  export let validated = {};
  export let selectedTrigger = null;
  const dispatch = createEventDispatcher();

  $: typeNames = markerValues[0] ? Object.keys(markerValues[0]) : [];
  const ROWS = 16, COLS = 16;

  function getClass(trigger) {
    const v = validated[trigger];
    if (trigger === selectedTrigger) return 'cell-selected';
    if (v?.duplicate === 1) return 'cell-duplicate';
    if (v?.one2one === 1) return 'cell-valid';
    return '';
  }

  function handleClick(trigger) {
    dispatch('select', trigger);
  }
</script>

{#each typeNames as type}
  <div class="marker-block">
    <h4>Marker: {type[0]} ##</h4>
    <div class="table-wrap">
      <table>
        <tbody>
          {#each Array(ROWS) as _, row}
            <tr>
              {#each Array(COLS) as _, col}
                {@const trigger = row * COLS + col}
                {@const val = markerValues[trigger]?.[type] ?? ''}
                <td class="grid-cell {getClass(trigger)}" class:non-zero={val !== 0} on:click={() => handleClick(trigger)} role="button" tabindex="0">
                  {val}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
{/each}

<style>
  .marker-block { margin-bottom: 20px; }
  .marker-block h4 { margin-bottom: 8px; font-size: 0.9rem; }
  .table-wrap { overflow-x: auto; }
  table { border-collapse: collapse; }
  .grid-cell {
    width: 32px; height: 32px; text-align: center;
    font-size: 0.7rem; cursor: pointer;
    border: 1px solid #1a3a55;
    transition: all 0.15s;
    user-select: none;
  }
  .grid-cell:hover { background: #15354a; }
  .grid-cell:focus-visible { outline: 2px solid #3a7bd5; outline-offset: -2px; }
  .non-zero { color: #5a9df5; }
  .cell-valid { background: rgba(34,197,94,0.25); }
  .cell-duplicate { background: rgba(234,179,8,0.25); }
  .cell-selected { background: #1a3a55; font-weight: 700; }
  @media (max-width: 640px) {
    .grid-cell { width: 22px; height: 22px; font-size: 0.55rem; }
  }
</style>