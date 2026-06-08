<script>
  import { createEventDispatcher } from 'svelte';
  import { DEFAULT_TYPES, DEFAULT_PRESET } from '../lib/decoder.js';

  const dispatch = createEventDispatcher();
  let bitTypes = [...DEFAULT_TYPES];
  let enabled = Array(8).fill(true);
  let eventType = 'All Event';

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
    dispatch('update', { enabled: [...enabled], types: [...bitTypes] });
  }

  function toggleEnabled(index) {
    enabled[index] = !enabled[index];
    enabled = [...enabled];
  }
</script>

<div class=decoder-form>
  <h3>Digital Port Settings</h3>
  <form on:submit={handleSubmit}>
    <div class=table-wrap>
      <table>
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
              <td class=bit-cell>{i}</td>
              <td class=check-cell>
                <input type=checkbox checked={enabled[i]} on:change={() => toggleEnabled(i)} />
              </td>
              <td>
                <input type=text value={bitTypes[i]} on:input={(e) => handleTypeChange(i, e.target.value)} class=type-input />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class=form-actions>
      <button type=submit class=btn-primary>Update</button>
      <select value={eventType} on:change={handlePresetChange} class=preset-select>
        <option value=All Event>All Event</option>
        <option value=Default>Default</option>
      </select>
    </div>
  </form>
</div>

<style>
  .decoder-form {
    background: #0f2a3d;
    border: 1px solid #1a3a55;
    border-radius: 12px;
    padding: 20px;
  }
  .decoder-form h3 { margin-bottom: 16px; font-size: 1rem; }
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; }
  th, td { padding: 8px 12px; text-align: left; border-bottom: 1px solid #1a3a55; }
  th { font-size: 0.8rem; color: #8899aa; text-transform: uppercase; letter-spacing: 0.5px; }
  .bit-cell { font-weight: 600; width: 40px; }
  .check-cell { width: 60px; }
  input[type=checkbox] { width: 18px; height: 18px; accent-color: #3a7bd5; }
  .type-input {
    width: 100%;
    padding: 6px 10px;
    background: #060d14;
    border: 1px solid #1a3a55;
    border-radius: 6px;
    color: #e2e8f0;
    font-size: 0.9rem;
  }
  .type-input:focus { outline: none; border-color: #3a7bd5; box-shadow: 0 0 0 2px rgba(58,123,213,0.2); }
  .form-actions { display: flex; gap: 12px; align-items: center; margin-top: 16px; }
  .btn-primary {
    padding: 10px 24px;
    background: #3a7bd5;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-primary:hover { background: #2d65b8; }
  .preset-select {
    padding: 10px 14px;
    background: #060d14;
    border: 1px solid #1a3a55;
    border-radius: 8px;
    color: #e2e8f0;
    font-size: 0.9rem;
  }
  @media (max-width: 640px) {
    .decoder-form { padding: 14px; }
    th, td { padding: 6px 8px; }
    .form-actions { flex-direction: column; }
    .preset-select { width: 100%; }
  }
</style>
