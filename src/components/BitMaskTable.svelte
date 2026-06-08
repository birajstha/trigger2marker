<script>
  export let groups = {};
  $: typeNames = Object.keys(groups);
  $: numBits = groups[typeNames[0]]?.value.length || 8;
</script>

<h5>Bit Mask Table</h5>
<table class="table table-bordered table-responsive">
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
        <td>{bit}</td>
        {#each typeNames as type}
          <td>{groups[type].value[bit] ?? ''}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
