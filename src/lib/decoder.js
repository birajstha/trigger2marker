/**
 * Trigger2Marker Decoder Logic
 */
export function computeBitGroups(enabled, types) {
  const groups = {};
  const uniqueTypes = [...new Set(types)];
  for (const type of uniqueTypes) {
    const power = Array(8).fill(null);
    const value = Array(8).fill(null);
    let bitIndex = 0;
    for (let bit = 0; bit < 8; bit++) {
      if (enabled[bit] && types[bit] === type) {
        value[bit] = 1;
        power[bit] = Math.pow(2, bitIndex);
        bitIndex++;
      }
    }
    groups[type] = { power, value };
  }
  return groups;
}

export function computeMarkerValues(groups) {
  const result = {};
  for (let trigger = 0; trigger < 256; trigger++) {
    const binary = trigger.toString(2).split('').reverse().join('');
    result[trigger] = {};
    for (const [type, data] of Object.entries(groups)) {
      let value = 0;
      for (let bit = 0; bit < 8; bit++) {
        const bitVal = parseInt(binary[bit]);
        if (!isNaN(bitVal) && data.power[bit] !== null) {
          value += bitVal * data.power[bit];
        }
      }
      result[trigger][type] = value;
    }
  }
  return result;
}

export function validateMarkers(markerValues) {
  const validated = {};
  const reverseMap = {};
  for (let trigger = 0; trigger < 256; trigger++) {
    let count = 0, matchedKey = null;
    for (const [type, value] of Object.entries(markerValues[trigger])) {
      if (value !== 0) { count++; matchedKey = type + value; }
    }
    if (count === 1) {
      validated[trigger] = { one2one: 1 };
      if (reverseMap[matchedKey]) validated[trigger].duplicate = 1;
      else reverseMap[matchedKey] = 1;
    }
  }
  return validated;
}

export function countValidOneToOne(validated) {
  return Object.values(validated).filter(v => v.one2one === 1 && v.duplicate !== 1).length;
}

export const DEFAULT_TYPES = Array(8).fill('Event');
export const DEFAULT_PRESET = ['Stimulus','Stimulus','Stimulus','Stimulus','Response','Response','Response','Response'];
