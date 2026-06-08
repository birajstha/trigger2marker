<script>
  import { createEventDispatcher } from 'svelte';
  export let validated = {};
  export let activeTrigger = null;
  const dispatch = createEventDispatcher();

  const ROWS = 16, COLS = 16;

  function handleHover(trigger) {
    dispatch('hover', trigger);
  }

  function handleLeave() {
    dispatch('leave');
  }

  function handleClick(trigger) {
    dispatch('select', trigger);
  }
</script>

<table>
  <tbody>
    {#each Array(ROWS) as _, row}
      <tr>
        {#each Array(COLS) as _, col}
          {@const trigger = row * COLS + col}
          {@const v = validated[trigger]}
          {@const active = trigger === activeTrigger}
          <td
            class="cell"
            class:cell-selected={active}
            class:cell-valid={!active && v?.one2one === 1 && v?.duplicate !== 1}
            class:cell-duplicate={!active && v?.duplicate === 1}
            on:mouseenter={() => handleHover(trigger)}
            on:mouseleave={handleLeave}
            on:click={() => handleClick(trigger)}
          >{trigger}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  .cell {
    text-align: center;
    vertical-align: middle;
    font-size: 0.65rem;
    padding: 2px 1px;
    cursor: pointer;
    border: 1px solid #1a3a55;
    user-select: none;
    transition: box-shadow 0.1s ease, background-color 0.1s ease;
    line-height: 1.9;
    overflow: hidden;
  }

  .cell:hover {
    box-shadow: inset 0 0 0 2px #5a9df5;
    background-color: rgba(58, 123, 213, 0.22);
  }

  .cell-valid {
    background: rgba(34, 197, 94, 0.25);
  }
  .cell-valid:hover {
    background: rgba(34, 197, 94, 0.4);
    box-shadow: inset 0 0 0 2px #22c55e;
  }

  .cell-duplicate {
    background: rgba(234, 179, 8, 0.25);
  }
  .cell-duplicate:hover {
    background: rgba(234, 179, 8, 0.4);
    box-shadow: inset 0 0 0 2px #eab308;
  }

  .cell-selected {
    background: #1a3a55;
    color: #fff;
    font-weight: 600;
  }
  .cell-selected:hover {
    background: #254d6b;
    box-shadow: inset 0 0 0 2px #5a9df5;
  }
</style>