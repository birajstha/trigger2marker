<script>
  import { createEventDispatcher } from 'svelte';
  export let markerValues = {};
  export let validated = {};
  export let activeTrigger = null;
  export let useFullType = false;
  const dispatch = createEventDispatcher();

  $: typeNames = markerValues[0] ? Object.keys(markerValues[0]) : [];
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

{#each typeNames as type}
  <div class="marker-block">
    <h2>Marker : {useFullType ? type : type[0]} ##</h2>
    <table>
      <tbody>
        {#each Array(ROWS) as _, row}
          <tr>
            {#each Array(COLS) as _, col}
              {@const trigger = row * COLS + col}
              {@const val = markerValues[trigger]?.[type] ?? ''}
              {@const v = validated[trigger]}
              {@const active = trigger === activeTrigger}
              {@const hasVal = val !== 0}
              <td
                class="cell"
                class:cell-selected={active}
                class:cell-valid={!active && hasVal && v?.one2one === 1 && v?.duplicate !== 1}
                class:cell-duplicate={!active && hasVal && v?.duplicate === 1}
                on:mouseenter={() => handleHover(trigger)}
                on:mouseleave={handleLeave}
                on:click={() => handleClick(trigger)}
              >{val}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/each}

<style>
  .marker-block {
    margin-bottom: 1.25rem;
  }

  h2 {
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
    color: #8899aa;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

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