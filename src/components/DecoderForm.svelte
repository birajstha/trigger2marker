<script>
  import { createEventDispatcher } from 'svelte';
  import { DEFAULT_TYPES, DEFAULT_PRESET } from '../lib/decoder.js';

  const dispatch = createEventDispatcher();
  let bitTypes = [...DEFAULT_TYPES];
  let enabled = Array(8).fill(true);
  let eventType = 'All Event';
  let useFullType = false;

  function handlePresetChange(e) {
    eventType = e.target.value;
    if (eventType === 'Default') {
      bitTypes = [...DEFAULT_PRESET];
    } else {
      bitTypes = Array(8).fill('Event');
    }
  }

  function handleTypeChange(index, value) {
    bitTypes[index] = value;
    bitTypes = [...bitTypes];
    eventType = 'Custom';
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch('update', { enabled: [...enabled], types: [...bitTypes], useFullType });
  }

  function toggleEnabled(index) {
    enabled[index] = !enabled[index];
    enabled = [...enabled];
  }
</script>

<form on:submit={handleSubmit}>
  <table class="table table-bordered table-responsive" id="decoder-table">
    <thead>
      <tr>
        <th>Bit</th>
        <th>Enabled</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      {#each Array(8) as _, i}
        <tr>
          <td>{i}</td>
          <td>
            <input type="checkbox" checked={enabled[i]} on:change={() => toggleEnabled(i)} />
          </td>
          <td>
            <input
              type="text"
              class="form-control"
              value={bitTypes[i]}
              on:input={(e) => handleTypeChange(i, e.target.value)}
            />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="d-flex items-center gap-2 mb-2">
    <input type="checkbox" id="useFullType" bind:checked={useFullType} />
    <label for="useFullType" style="font-size: 0.85rem; cursor: pointer; user-select: none;">Use full type name as marker label</label>
  </div>
  <div class="d-flex justify-content-between items-center gap-3">
    <button type="submit" class="btn btn-primary">Update</button>
    <select value={eventType} on:change={handlePresetChange} class="form-select ml-2 custom-select-width">
      <option value="All Event">All Event</option>
      <option value="Default">Default</option>
    </select>
  </div>
</form>
