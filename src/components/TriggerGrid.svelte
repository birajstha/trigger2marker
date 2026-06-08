<script>
  import { createEventDispatcher } from 'svelte';
  export let validated = {};
  export let selectedTrigger = null;
  const dispatch = createEventDispatcher();

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

<div class="trigger-grid">
  <div class="table-wrap">
    <table>
      <tbody>
        {#each Array(ROWS) as _, row}
          <tr>
            {#each Array(COLS) as _, col}
              {@const trigger = row * COLS + col}
              <td class="grid-cell {getClass(trigger)}" on:click={() => handleClick(trigger)} role="button" tabindex="0" aria-label="Trigger {trigger}">
                {trigger}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .trigger-grid { margin-bottom: 16px; }
  .table-wrap { overflow-x: auto; }
  table { border-collapse: collapse; }
  .grid-cell {
    width: 32px; height: 32px; text-align: center;
    font-size: 0.75rem; cursor: pointer;
    border: 1px solid #1a3a55;
    transition: all 0.15s;
    user-select: none;
  }
  .grid-cell:hover { background: #15354a; }
  .grid-cell:focus-visible { outline: 2px solid #3a7bd5; outline-offset: -2px; }
  .cell-valid { background: rgba(34,197,94,0.25); }
  .cell-duplicate { background: rgba(234,179,8,0.25); }
  .cell-selected { background: #1a3a55; font-weight: 700; }
  @media (max-width: 640px) {
    .grid-cell { width: 22px; height: 22px; font-size: 0.6rem; }
  }
</style>