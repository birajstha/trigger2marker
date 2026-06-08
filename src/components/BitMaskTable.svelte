<script>
  export let groups = {};
  $: typeNames = Object.keys(groups);
  $: numBits = groups[typeNames[0]]?.value.length || 8;
</script>

<div class=bit-mask>
  <h4>Bit Mask Table</h4>
  <div class=table-wrap>
    <table>
      <thead>
        <tr>
          <th>Bit</th>
          {#each typeNames as type}
            <th>{type}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each Array(numBits) as _, bit}
          <tr>
            <td class=bit-cell>{bit}</td>
            {#each typeNames as type}
              <td class=value-cell class:active={groups[type].value[bit] === 1}>
                {groups[type].value[bit] ?? ''}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .bit-mask { margin-bottom: 24px; }
  .bit-mask h4 { margin-bottom: 12px; font-size: 0.95rem; }
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
  th, td { padding: 6px 10px; text-align: center; border: 1px solid #1a3a55; }
  th { color: #8899aa; font-weight: 500; text-transform: uppercase; font-size: 0.75rem; }
  .bit-cell { font-weight: 600; background: #0d1f2d; }
  .value-cell { min-width: 40px; }
  .value-cell.active { background: rgba(58,123,213,0.2); color: #5a9df5; font-weight: 600; }
</style>
