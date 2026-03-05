'''---
layout: post
title: "UHF Satcom Database"
date: 2025-03-06 12:00:00 +0530
categories: [UHF Satcom]
tags: [uhf, satcom, military, database, reference]
excerpt: "Comprehensive database of Military Satellite Communications in the 240-270 MHz range"
---

<style>
.spectrum-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; margin: 1rem 0; }
.spectrum-table th { background: var(--bg-tertiary); padding: 0.5rem; text-align: left; color: var(--accent-primary); border-bottom: 2px solid var(--border-color); }
.spectrum-table td { padding: 0.4rem 0.5rem; border-bottom: 1px solid var(--border-color); }
.spectrum-table tr:hover { background: var(--bg-tertiary); }
.mono { font-family: 'JetBrains Mono', monospace; }
.status-active { color: #00ff88; }
.status-inactive { color: #ff6b6b; }
.filter-btn { background: var(--bg-tertiary); border: 1px solid var(--border-color); color: var(--text-secondary); padding: 0.3rem 0.6rem; margin: 0 0.2rem 0.3rem 0; border-radius: 4px; cursor: pointer; font-size: 0.75rem; }
.filter-btn:hover, .filter-btn.active { background: var(--accent-primary); color: var(--bg-primary); }
#searchBox { width: 100%; max-width: 300px; padding: 0.4rem 0.8rem; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary); font-family: 'JetBrains Mono', monospace; margin-bottom: 0.5rem; }
</style>

## Overview

This database contains **269 verified channels** for Military Satellite Communications (UHF Satcom) in the 240-270 MHz range.

**Key:**
- <span class="status-active">● Active</span> - Currently in use
- <span class="status-inactive">● Inactive</span> - Decommissioned/Off
- **Sensitivity**: Strong (high signal) | Medium (good signal) | Weak (low signal)

## Filters

<input type="text" id="searchBox" placeholder="Search satellite, freq, activity...">

<div>
  <button class="filter-btn active" onclick="filterStatus('all')">All</button>
  <button class="filter-btn" onclick="filterStatus('active')">Active</button>
  <button class="filter-btn" onclick="filterStatus('inactive')">Inactive</button>
</div>

## Database

| Satellite | Position | Uplink | Receive | BW | Sens | Activity | Status |
|-----------|----------|--------|---------|----|------|----------|--------|
| ComSatBw-1 | 63°E | 316.725 | 243.625 | 25 | Medium | RU Traffic | <span class="status-active">Active</span> |
| ComSatBw-2 | 13.2°E | 300.400 | 243.625 | 25 | - | - | <span class="status-inactive">Inactive</span> |
| Intelsat 22 | 72°E | 298.200 | 243.800 | 25 | Medium | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 317.015 | 243.915 | - | Weak | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 317.035 | 243.935 | 6 | Medium | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 317.045 | 243.945 | 6 | - | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 317.055 | 243.955 | 6 | Weak | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 317.065 | 243.965 | 6 | Medium | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 317.075 | 243.975 | 6 | - | - | <span class="status-active">Active</span> |
| FltSatCom F8 | 125.7°W | 317.090 | 243.990 | 6 | - | - | <span class="status-active">Active</span> |
| UFO 10 | 22.9°W | 317.095 | 243.995 | 6 | Weak | - | <span class="status-active">Active</span> |
| Skynet 5B | 24.5°E | 309.410 | 245.800 | 25 | Medium | RU Traffic | <span class="status-active">Active</span> |
| Skynet 5A | 95°E | 314.230 | 245.850 | 25 | Strong | - | <span class="status-active">Active</span> |
| Skynet 5D | 52.7°E | 313.000 | 245.950 | 25 | Medium | Reserve | <span class="status-active">Active</span> |
| Skynet 4C | 33.4°E | 295.600 | 246.250 | 25 | Weak | - | <span class="status-active">Active</span> |
| Skynet 5D | 52.7°E | 298.800 | 247.450 | 25 | Medium | Interesting | <span class="status-active">Active</span> |
| ComSatBw-2 | 13.2°E | 311.975 | 248.750 | 25 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 294.375 | 248.825 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.445 | 248.845 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.455 | 248.855 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.465 | 248.865 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.475 | 248.875 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.485 | 248.885 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.495 | 248.895 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.505 | 248.905 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.515 | 248.915 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.535 | 248.935 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.545 | 248.945 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.555 | 248.955 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.565 | 248.965 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.650 | 249.050 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.700 | 249.100 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.835 | 249.235 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.845 | 249.245 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.855 | 249.255 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.865 | 249.265 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.875 | 249.275 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.885 | 249.285 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.895 | 249.295 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.905 | 249.305 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.915 | 249.315 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.925 | 249.325 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.935 | 249.335 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.945 | 249.345 | 6 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 302.955 | 249.355 | 6 | Strong | - | <span class="status-active">Active</span> |
| ComSatBw-1 | 63°E | 300.975 | 249.400 | 38 | Medium | - | <span class="status-active">Active</span> |
| Skynet 5A | 95°E | 299.000 | 249.450 | 38 | - | - | <span class="status-active">Active</span> |
| Skynet 5B | 24.5°E | 312.850 | 249.490 | 25 | Medium | - | <span class="status-active">Active</span> |
| Intelsat 22 | 72°E | 308.450 | 251.575 | 25 | Medium | RU Traffic | <span class="status-active">Active</span> |
| UFO 2 | 28.7°E | 300.350 | 251.800 | 25 | Weak | UA Ukraine | <span class="status-active">Active</span> |
| Intelsat 22 | 72°E | 293.150 | 252.150 | 25 | Weak | TRISTA | <span class="status-active">Active</span> |
| SICRAL 2 | 37°E | 310.155 | 252.200 | 25 | - | - | <span class="status-active">Active</span> |
| Intelsat 22 | 72°E | 293.300 | 252.300 | 25 | Weak | TRISTA | <span class="status-active">Active</span> |
| SICRAL 1B | 11.8°E | 293.200 | 252.450 | 25 | Strong | - | <span class="status-active">Active</span> |
| SICRAL 1B | 11.8°E | 309.800 | 252.500 | 25 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 294.550 | 253.550 | 25 | - | MOLITVA Prayer | <span class="status-active">Active</span> |
| UFO 2 | 28.7°E | 294.650 | 253.650 | 25 | Weak | RU Traffic | <span class="status-active">Active</span> |
| Intelsat 22 | 72°E | 293.725 | 253.725 | 25 | Medium | RU Traffic | <span class="status-active">Active</span> |
| Skynet 5C | 17.8°W | 294.050 | 253.825 | 25 | Medium | - | <span class="status-active">Active</span> |
| UFO 7 | 22°W | 294.850 | 253.850 | 25 | Medium | - | <span class="status-active">Active</span> |
| Intelsat 22 | 72°E | 294.975 | 253.975 | 6 | Medium | - | <span class="status-active">Active</span> |
| Intelsat 22 | 72°E | 308.100 | 254.500 | 6 | Medium | - | <span class="status-active">Active</span> |
| Intelsat 22 | 72°E | 295.625 | 254.625 | 6 | Medium | - | <span class="status-active">Active</span> |
| Intelsat 22 | 72°E | 311.375 | 257.775 | 25 | Weak | RUS | <span class="status-active">Active</span> |
| UFO 2 | 28.7°E | 299.450 | 258.450 | 25 | Medium | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 299.650 | 258.650 | 25 | Strong | Duty | <span class="status-active">Active</span> |
| SICRAL 1B | 11.8°E | 310.575 | 260.025 | 25 | Strong | - | <span class="status-active">Active</span> |
| SICRAL 1B | 11.8°E | 310.125 | 260.125 | 25 | Strong | - | <span class="status-active">Active</span> |
| UFO 10 | 22.9°W | 294.275 | 260.675 | 25 | Strong | Brazil Music | <span class="status-active">Active</span> |
| Skynet 5D | 52.7°E | 313.050 | 260.900 | 25 | Medium | - | <span class="status-active">Active</span> |
| Skynet 5B | 24.5°E | 294.950 | 261.200 | 25 | Weak | Italian | <span class="status-active">Active</span> |
| UFO 10 | 22.9°W | 295.225 | 261.625 | 25 | Medium | Brazil | <span class="status-active">Active</span> |
| UFO 2 | 28.7°E | 316.900 | 257.250 | 25 | Medium | RU Traffic | <span class="status-active">Active</span> |
| Skynet 5A | 95°E | 305.950 | 257.450 | 25 | - | Romanians | <span class="status-active">Active</span> |
| Skynet 5D | 52.7°E | 316.150 | 257.700 | 25 | Medium | - | <span class="status-active">Active</span> |
| UFO 2 | 28.7°E | 299.300 | 258.225 | 25 | Medium | - | <span class="status-active">Active</span> |
| UFO 7 | 22°W | 299.550 | 258.550 | 25 | Medium | - | <span class="status-active">Active</span> |
| UFO 10 | 22.9°W | 294.825 | 258.600 | 28 | Strong | - | <span class="status-active">Active</span> |
| ComSatBw-1 | 63°E | 317.925 | 259.000 | 25 | Weak | - | <span class="status-active">Active</span> |
| ComSatBw-2 | 13.2°E | 307.450 | 259.050 | 25 | Medium | - | <span class="status-active">Active</span> |
| SICRAL 1B | 11.8°E | 309.700 | 259.975 | 25 | Medium | - | <span class="status-active">Active</span> |
| SICRAL 1B | 11.8°E | 310.275 | 260.075 | 25 | Medium | - | <span class="status-active">Active</span> |
| Skynet 5B | 24.5°E | 314.400 | 260.250 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 7 | 22°W | 294.025 | 260.425 | 28 | Medium | - | <span class="status-active">Active</span> |
| UFO 10 | 22.9°W | 294.175 | 260.575 | 28 | Medium | - | <span class="status-active">Active</span> |
| Skynet 5A | 95°E | 298.380 | 261.100 | 25 | Weak | - | <span class="status-active">Active</span> |
| Intelsat 22 | 72°E | 306.975 | 261.600 | 25 | Weak | - | <span class="status-active">Active</span> |
| Intelsat 22 | 72°E | 309.650 | 261.650 | 25 | Weak | - | <span class="status-active">Active</span> |
| Intelsat 22 | 72°E | 295.400 | 261.750 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 307.075 | 261.775 | 25 | Medium | - | <span class="status-active">Active</span> |
| Intelsat 22 | 72°E | 300.275 | 261.850 | 25 | Weak | - | <span class="status-active">Active</span> |
| Intelsat 22 | 72°E | 307.750 | 261.900 | 25 | Weak | - | <span class="status-active">Active</span> |
| Skynet 5D | 52.7°E | 314.200 | 262.000 | 25 | Weak | - | <span class="status-active">Active</span> |
| FltSatCom F8 | 125.7°W | 295.900 | 262.300 | 575 | Weak | - | <span class="status-active">Active</span> |
| Skynet 5B | 24.5°E | 316.550 | 261.400 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 295.175 | 261.575 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 296.525 | 261.700 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 294.625 | 261.950 | 25 | Medium | - | <span class="status-active">Active</span> |
| UFO 10 | 22.9°W | 295.675 | 262.075 | 25 | - | - | <span class="status-active">Active</span> |
| UFO 10 | 22.9°W | 295.775 | 262.175 | 25 | - | - | <span class="status-active">Active</span> |
| Skynet 5B | 24.5°E | 314.400 | 263.400 | 25 | Weak | - | <span class="status-active">Active</span> |
| Skynet 5B | 24.5°E | 315.200 | 263.500 | 25 | Medium | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 317.130 | 263.600 | 6 | Weak | - | <span class="status-active">Active</span> |
| UFO 2 | 28.7°E | 297.375 | 263.775 | 25 | Weak | UA Ukraine | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 297.250 | 263.800 | 25 | Medium | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 297.425 | 263.825 | 25 | Medium | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 297.525 | 263.925 | 25 | Medium | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 306.250 | 265.250 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 295.100 | 265.325 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 10 | 22.9°W | 306.350 | 265.350 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 7 | 22°W | 306.450 | 265.450 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 306.550 | 265.550 | 25 | Medium | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 306.675 | 265.675 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 306.850 | 265.850 | 25 | Medium | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 316.575 | 266.750 | 25 | Medium | RU Traffic | <span class="status-active">Active</span> |
| UFO 10 | 22.9°W | 307.850 | 266.850 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 7 | 22°W | 307.950 | 266.950 | 25 | - | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 297.500 | 266.975 | 25 | Weak | - | <span class="status-active">Active</span> |
| SICRAL 2 | 37°E | 308.100 | 267.100 | 25 | Medium | - | <span class="status-active">Active</span> |
| SICRAL 2 | 37°E | 308.150 | 267.150 | 25 | Medium | - | <span class="status-active">Active</span> |
| SICRAL 2 | 37°E | 308.250 | 267.250 | 25 | Medium | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 294.900 | 267.400 | 25 | Weak | RU Traffic | <span class="status-active">Active</span> |
| SICRAL 1B | 11.8°E | 310.525 | 267.875 | 25 | - | - | <span class="status-active">Active</span> |
| SICRAL 1B | 11.8°E | 310.075 | 267.950 | 25 | - | RU Traffic | <span class="status-active">Active</span> |
| SICRAL 1B | 11.8°E | 310.325 | 268.050 | 25 | - | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 309.150 | 268.150 | 25 | Medium | - | <span class="status-active">Active</span> |
| UFO 10 | 22.9°W | 309.250 | 268.250 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 7 | 22°W | 309.350 | 268.350 | 25 | Strong | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 297.150 | 268.450 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 310.650 | 269.650 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 295.150 | 269.725 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 10 | 22.9°W | 310.750 | 269.750 | 25 | Medium | - | <span class="status-active">Active</span> |
| UFO 7 | 22°W | 310.850 | 269.850 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 295.550 | 269.925 | 25 | Weak | - | <span class="status-active">Active</span> |
| UFO 11 | 75.6°E | 294.325 | 269.950 | 25 | Weak | - | <span class="status-active">Active</span> |

<script>
function filterStatus(status) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  const rows = document.querySelectorAll('table tbody tr');
  rows.forEach(row => {
    const txt = row.textContent;
    if (status === 'all') row.style.display = '';
    else if (status === 'active' && txt.includes('Active')) row.style.display = '';
    else if (status === 'inactive' && txt.includes('Inactive')) row.style.display = '';
    else row.style.display = 'none';
  });
}
document.getElementById('searchBox').addEventListener('input', function(e) {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll('table tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(term) ? '' : 'none';
  });
});
</script>

## Notes

- **UFO 11 (75.6°E)** has the most channels with strong signals in the 248.8-249.3 MHz range
- **Intelsat 22 (72°E)** carries significant Russian traffic
- **Skynet 5B (24.5°E)** has interesting activity including Italian traffic
- **UFO 2 (28.7°E)** shows Ukrainian traffic
- **FltSatCom F8 (125.7°W)** has a very wide 575 kHz channel at 262.3 MHz

*Last updated: March 2025*
'''