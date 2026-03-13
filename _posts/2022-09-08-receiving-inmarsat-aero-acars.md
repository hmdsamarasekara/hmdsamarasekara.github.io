---
layout: post
title: "Receiving Inmarsat AERO ACARS"
date: 2022-09-08 12:00:00 +0530
categories: [Inmarsat]
tags: [satellite, radio, sdr, aviation, Inmarsat]
excerpt: "Receiving and decoding Inmarsat AERO ACARS messages using inexpensive SDR hardware."
---

<style>
/* Custom styling for this post */
.post-hero {
  background: linear-gradient(135deg, #0a0e1a 0%, #1a1f2e 100%);
  border: 1px solid #00d4ff33;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.post-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #00d4ff, #ff6b35, #00d4ff);
  background-size: 200% 100%;
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.section-card {
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #00d4ff33;
}

.section-icon {
  font-size: 1.5rem;
  color: #00d4ff;
  filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f9fafb;
  margin: 0;
  letter-spacing: -0.025em;
}

.info-box {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-left: 4px solid #00d4ff;
  border-radius: 0 8px 8px 0;
  padding: 1rem 1.25rem;
  margin: 1rem 0;
}

.tip-box {
  background: linear-gradient(135deg, #1a2f1a 0%, #0f1f0f 100%);
  border-left: 4px solid #22c55e;
  border-radius: 0 8px 8px 0;
  padding: 1rem 1.25rem;
  margin: 1rem 0;
}

.tip-box::before {
  content: '💡 Tip: ';
  font-weight: 700;
  color: #22c55e;
}

.warning-box {
  background: linear-gradient(135deg, #2f1a1a 0%, #1f0f0f 100%);
  border-left: 4px solid #ff6b35;
  border-radius: 0 8px 8px 0;
  padding: 1rem 1.25rem;
  margin: 1rem 0;
}

.warning-box::before {
  content: '⚠️ Important: ';
  font-weight: 700;
  color: #ff6b35;
}

.freq-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.freq-table th {
  background: linear-gradient(135deg, #00d4ff22 0%, #00d4ff11 100%);
  color: #00d4ff;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.875rem 1rem;
  text-align: left;
  border-bottom: 2px solid #00d4ff33;
}

.freq-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #1f2937;
  color: #e5e7eb;
}

.freq-table tr:hover td {
  background: #1f2937;
  transition: background 0.2s ease;
}

.freq-table tr:last-child td {
  border-bottom: none;
}

.hardware-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.hardware-item {
  background: #0f172a;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.hardware-icon {
  color: #ff6b35;
  font-size: 1.25rem;
  margin-top: 0.125rem;
}

.software-flow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background: #0f172a;
  border-radius: 8px;
}

.flow-step {
  background: #1e293b;
  border: 1px solid #00d4ff33;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  color: #00d4ff;
  font-weight: 500;
  font-size: 0.875rem;
}

.flow-arrow {
  color: #ff6b35;
  font-size: 1.25rem;
}

.image-container {
  margin: 1.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #1f2937;
  background: #0f172a;
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
}

.image-caption {
  background: #111827;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #9ca3af;
  text-align: center;
  border-top: 1px solid #1f2937;
}

.bandwidth-badge {
  display: inline-block;
  background: #00d4ff22;
  color: #00d4ff;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid #00d4ff33;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #1f2937;
  margin: 1.5rem 0;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.tag-pill {
  display: inline-block;
  background: linear-gradient(135deg, #ff6b3522 0%, #ff6b3511 100%);
  color: #ff6b35;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ff6b3533;
}

</style>

<div class="post-hero">
  <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
    <i class="fas fa-satellite-dish" style="font-size: 2.5rem; color: #00d4ff; filter: drop-shadow(0 0 12px rgba(0, 212, 255, 0.6));"></i>
    <div>
      <span class="tag-pill">L-BAND</span>
      <span class="tag-pill">AVIATION</span>
      <span class="tag-pill">ACARS</span>
    </div>
  </div>
  <p style="font-size: 1.125rem; color: #9ca3af; margin: 0; line-height: 1.6;">
    Receiving and decoding Inmarsat AERO ACARS messages using inexpensive SDR hardware. 
    A practical guide to tapping into aviation satellite communications from geostationary orbit.
  </p>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-broadcast-tower section-icon"></i>
    <h2 class="section-title">Introduction</h2>
  </div>

  <p>Inmarsat operates a global network of <strong>geostationary satellites</strong> that provide communication services for aviation, maritime, and other remote industries. Unlike terrestrial networks, geostationary satellites remain fixed over a specific point on the Earth's surface, allowing continuous coverage of a region. This makes them ideal for applications where real-time communications are critical, such as aircraft operations and ship navigation.</p>

  <p>In the aviation sector, airlines and air traffic services rely on Inmarsat satellites to exchange messages, voice calls, and data between aircraft and ground stations. These communications cover everything from routine position reporting and flight planning to weather updates, maintenance alerts, and safety-critical messages.</p>

  <div class="info-box">
    <strong>ACARS</strong> — a digital datalink that allows aircraft to automatically send and receive operational messages. ACARS messages are transmitted in packetized form, typically including information such as the aircraft identifier, message type, and content. The system reduces reliance on voice communication over VHF or HF and ensures timely delivery of flight-critical data.
  </div>

  <p><strong>Inmarsat AERO channels</strong> are the satellite-based extension of ACARS. These channels provide global coverage by relaying ACARS messages through Inmarsat satellites:</p>

  <ul style="list-style: none; padding: 0;">
    <li style="margin: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
      <i class="fas fa-plane" style="color: #00d4ff;"></i>
      Aircraft transmit data to the satellite using an <strong>L-band uplink (~1.6 GHz)</strong>
    </li>
    <li style="margin: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
      <i class="fas fa-satellite" style="color: #00d4ff;"></i>
      The satellite relays the signal back to a ground station, which forwards the message to airline operations centers or air traffic control
    </li>
  </ul>

  <div style="background: #0f172a; border: 1px solid #1f2937; border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center; font-family: monospace;">
    <div style="color: #6b7280; margin-bottom: 0.5rem;">Simplified Signal Path</div>
    <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap;">
      <span style="color: #ff6b35;">Aircraft</span>
      <i class="fas fa-arrow-right" style="color: #00d4ff;"></i>
      <span style="color: #9ca3af;">L-band uplink</span>
      <i class="fas fa-arrow-right" style="color: #00d4ff;"></i>
      <span style="color: #00d4ff;">Inmarsat Satellite</span>
    </div>
    <div style="margin: 0.5rem 0; color: #374151;">↓</div>
    <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap;">
      <span style="color: #00d4ff;">Satellite</span>
      <i class="fas fa-arrow-right" style="color: #00d4ff;"></i>
      <span style="color: #9ca3af;">L-band downlink</span>
      <i class="fas fa-arrow-right" style="color: #00d4ff;"></i>
      <span style="color: #22c55e;">Ground Receiver</span>
    </div>
  </div>

  <p>Ground-to-aircraft transmissions also occur in the L-band around <strong>1.5 GHz</strong>, which makes them relatively accessible to radio enthusiasts using inexpensive SDR (Software-Defined Radio) hardware. While the uplink from aircraft requires higher power and more specialized antennas, the downlink signals are sufficiently strong that hobbyists can monitor them with directional L-band antennas and low-noise amplifiers.</p>

  <p>In addition to basic ACARS data, Inmarsat AERO channels can carry higher-bitrate transmissions for voice communications (such as pilot-to-ground calls) and more data-intensive applications, making them a rich source of live aviation information for SDR enthusiasts.</p>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-globe-asia section-icon"></i>
    <h2 class="section-title">Satellite Coverage</h2>
  </div>

  <p>The <strong>Indian Ocean region (IOR)</strong> is served by the geostationary satellite located at <strong>143°E longitude</strong>, currently the <strong>Inmarsat-4 F1</strong>. Geostationary satellites orbit at approximately 35,786 km above the equator, allowing them to remain fixed relative to the Earth's surface. This provides continuous coverage of a large area, unlike low-Earth orbit satellites, which move quickly across the sky.</p>

  <h3 style="color: #00d4ff; font-size: 1.125rem; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-map-marked-alt"></i> Coverage Area
  </h3>

  <p>The 143°E satellite provides:</p>

  <div class="hardware-grid">
    <div class="hardware-item">
      <i class="fas fa-bullseye hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">Primary Coverage</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">India, Southeast Asia, Middle East, eastern Africa, Australia</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-circle-notch hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">Secondary Coverage</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Portions of the Indian Ocean, South Asia, and adjacent maritime regions</span>
      </div>
    </div>
  </div>

  <p style="font-size: 0.875rem; color: #9ca3af;">The exact coverage depends on the satellite's transponder beam footprint, which is designed to maximize service in regions with dense aviation and maritime traffic.</p>

  <div class="image-container">
    <img src="/assets/images/Inmarsat coverage.jpg" alt="Inmarsat Coverage Map">
    <div class="image-caption">
      <i class="fas fa-image" style="margin-right: 0.5rem;"></i>
      Inmarsat geostationary satellite coverage (IOR region)
    </div>
  </div>

  <h3 style="color: #00d4ff; font-size: 1.125rem; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-history"></i> Historical Context
  </h3>

  <p>The <strong>Inmarsat I-4 series</strong>, including I-4 F1, represents the second-generation geostationary satellites replacing earlier I-1 and I-3 generations. Key improvements include:</p>

  <ul style="list-style: none; padding: 0;">
    <li style="margin: 0.75rem 0; padding-left: 1.5rem; position: relative;">
      <i class="fas fa-check-circle" style="position: absolute; left: 0; color: #22c55e;"></i>
      <strong>Greater transponder capacity</strong>, supporting more ACARS channels and voice traffic
    </li>
    <li style="margin: 0.75rem 0; padding-left: 1.5rem; position: relative;">
      <i class="fas fa-check-circle" style="position: absolute; left: 0; color: #22c55e;"></i>
      <strong>Enhanced beam shaping</strong>, allowing reliable communication in both dense and remote regions
    </li>
    <li style="margin: 0.75rem 0; padding-left: 1.5rem; position: relative;">
      <i class="fas fa-check-circle" style="position: absolute; left: 0; color: #22c55e;"></i>
      <strong>Extended lifespan</strong>, typically 15 years, ensuring continuous service for aviation and maritime operations
    </li>
  </ul>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-wave-square section-icon"></i>
    <h2 class="section-title">AERO ACARS Channel Types</h2>
  </div>

  <p>Inmarsat AERO uses L-band channels to transmit ACARS messages and other data. Each channel has a defined bitrate and typical usage, which affects both traffic volume and decoding difficulty.</p>

  <table class="freq-table">
    <thead>
      <tr>
        <th>Bitrate</th>
        <th>Typical Usage</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="bandwidth-badge">600 bps</span></td>
        <td>Low-rate ACARS messages</td>
        <td>Usually used for routine position reports and simple operational messages. Easy to decode even with a small directional antenna.</td>
      </tr>
      <tr>
        <td><span class="bandwidth-badge">1200 bps</span></td>
        <td>Standard ACARS messages</td>
        <td>Higher throughput for more frequent messages or slightly larger payloads.</td>
      </tr>
      <tr>
        <td><span class="bandwidth-badge" style="background: #ff6b3522; color: #ff6b35; border-color: #ff6b3533;">8400 bps</span></td>
        <td>Voice communications (AERO phone)</td>
        <td>Primarily used for pilot-to-ground voice calls or satellite phone traffic. Frequencies may shift dynamically, making reception unpredictable.</td>
      </tr>
      <tr>
        <td><span class="bandwidth-badge" style="background: #ff6b3522; color: #ff6b35; border-color: #ff6b3533;">10500 bps</span></td>
        <td>High-speed data</td>
        <td>Used for bulk data transmissions, maintenance logs, or airline operations systems. Requires good SNR and clean reception.</td>
      </tr>
    </tbody>
  </table>

  <div class="info-box">
    <i class="fas fa-info-circle" style="color: #00d4ff; margin-right: 0.5rem;"></i>
    Higher bitrate channels carry more traffic but require better signal quality and wider SDR bandwidth to decode reliably.
  </div>

  <h3 style="color: #00d4ff; font-size: 1.125rem; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-broadcast-tower"></i> AERO ACARS Frequencies (143°E IOR)
  </h3>

  <p>The Indian Ocean region satellite (143°E) provides multiple ACARS channels across different bitrates.</p>

  <div class="image-container">
    <img src="/assets/images/AERO-Low-Channels.jpg" alt="600bps and 1200bps Channels">
  </div>

  <h4 style="color: #f9fafb; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-signal" style="color: #22c55e;"></i> 600 bps Channels
  </h4>

  <table class="freq-table">
    <thead>
      <tr>
        <th>Channel</th>
        <th>Frequency (MHz)</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>600bps-01</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1545.0032</code></td></tr>
      <tr><td>600bps-02</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1545.1131</code></td></tr>
      <tr><td>600bps-03</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1545.1182</code></td></tr>
      <tr><td>600bps-04</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1545.1283</code></td></tr>
      <tr><td>600bps-05</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1545.1582</code></td></tr>
      <tr><td>600bps-06</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1545.1634</code></td></tr>
      <tr><td>600bps-07</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1545.1834</code></td></tr>
      <tr><td>600bps-08</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1545.1884</code></td></tr>
      <tr><td>600bps-09</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1545.2131</code></td></tr>
      <tr><td>600bps-10</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1545.2182</code></td></tr>
      <tr><td>600bps-11</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1545.2232</code></td></tr>
    </tbody>
  </table>

  <div class="tip-box">
    600 bps channels are typically the most stable and easiest to decode with small patch antennas and low-cost SDRs.
  </div>

  <h4 style="color: #f9fafb; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-signal" style="color: #eab308;"></i> 1200 bps Channels
  </h4>

  <table class="freq-table">
    <thead>
      <tr>
        <th>Channel</th>
        <th>Frequency (MHz)</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>1200bps-01</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1545.1233</code></td></tr>
    </tbody>
  </table>

  <p style="color: #9ca3af; font-size: 0.875rem;">1200 bps channels are slightly busier than 600 bps, carrying more frequent or larger ACARS messages.</p>

  <div class="image-container">
    <img src="/assets/images/AERO-High-Channels.jpg" alt="10500bps Channels">
  </div>

  <h4 style="color: #f9fafb; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-signal" style="color: #ff6b35;"></i> 10500 bps Channels
  </h4>

  <table class="freq-table">
    <thead>
      <tr>
        <th>Channel</th>
        <th>Frequency (MHz)</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>10500bps-01</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1546.0049</code></td></tr>
      <tr><td>10500bps-02</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1546.0205</code></td></tr>
      <tr><td>10500bps-03</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1546.0353</code></td></tr>
      <tr><td>10500bps-04</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1546.0848</code></td></tr>
      <tr><td>10500bps-05</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1546.1004</code></td></tr>
      <tr><td>10500bps-06</td><td><code style="background: #0f172a; padding: 0.25rem 0.5rem; border-radius: 4px; color: #00d4ff;">1546.1149</code></td></tr>
    </tbody>
  </table>

  <div class="tip-box">
    These high-speed channels require wideband SDR reception and a high SNR. They are more sensitive to cable loss, interference, and antenna quality.
  </div>

  <h4 style="color: #f9fafb; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-microphone-alt" style="color: #ff6b35;"></i> 8400 bps Voice Channels
  </h4>

  <p>These channels are mostly used for pilot-to-ground voice or satellite phone calls. Unlike the other fixed ACARS channels, <strong>8400 bps channels are dynamic</strong>:</p>

  <div style="background: #0f172a; border: 1px solid #1f2937; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
      <i class="fas fa-wave-square" style="color: #ff6b35;"></i>
      <strong style="color: #f9fafb;">Frequency Range</strong>
    </div>
    <code style="background: #1f2937; padding: 0.5rem 1rem; border-radius: 4px; color: #00d4ff; font-size: 1.125rem;">1546.125 – 1546.200 MHz</code>
  </div>

  <ul style="list-style: none; padding: 0;">
    <li style="margin: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
      <i class="fas fa-arrows-alt-h" style="color: #9ca3af;"></i>
      Frequencies can shift within this range
    </li>
    <li style="margin: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
      <i class="fas fa-layer-group" style="color: #9ca3af;"></i>
      Channels may appear simultaneously or overlap, depending on satellite traffic
    </li>
    <li style="margin: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
      <i class="fas fa-cog" style="color: #9ca3af;"></i>
      Decoding these requires flexible SDR software (e.g., JAERO) and voice decoding enabled
    </li>
  </ul>

  <div class="warning-box">
    Because the 8400 bps channels are not fixed, hobbyists often have to scan or monitor the spectrum continuously to catch active voice channels.
  </div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-tools section-icon"></i>
    <h2 class="section-title">Hardware Setup</h2>
  </div>

  <p>My setup looked like this:</p>

  <div class="image-container">
    <img src="/assets/images/Inmarsat-Setup.JPG" alt="Antenna Setup">
    <div class="image-caption">
      <i class="fas fa-camera" style="margin-right: 0.5rem;"></i>
      Complete L-band reception setup with active antenna and SDR
    </div>
  </div>

  <div class="hardware-grid">
    <div class="hardware-item" style="border-color: #00d4ff33;">
      <i class="fas fa-satellite-dish hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">RTL-SDR L-band Active Patch Antenna</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Built-in LNA, powered via SDR bias-tee. Good for 600/1200 bps channels.</span>
      </div>
    </div>
  </div>

  <div class="info-box">
    <i class="fas fa-info-circle" style="color: #00d4ff; margin-right: 0.5rem;"></i>
    This antenna works well for decoding <strong>600 bps and 1200 bps channels</strong>, but in my experience it struggles with the higher bitrate channels such as <strong>8400 bps and 10500 bps</strong> due to lower signal-to-noise ratio.
  </div>

  <h3 style="color: #00d4ff; font-size: 1.125rem; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-level-up-alt"></i> Advanced Setup
  </h3>

  <p>A more capable setup involves:</p>

  <div class="hardware-grid">
    <div class="hardware-item">
      <i class="fas fa-bullseye hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">Offset Dish</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">For increased gain and directivity</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-broadcast-tower hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">Helical Feed Antenna</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">3D-printable design for L-band</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-bolt hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">LNA at Feed</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Low noise amplification at antenna</span>
      </div>
    </div>
  </div>

  <div class="warning-box">
    Inmarsat signals use <strong>right-hand circular polarization</strong>, so when using a dish the feed must be <strong>left-hand circularly polarized</strong>.
  </div>

  <div class="tip-box">
    I used Derekcz's 3D-printable helical scaffolding from Thingiverse. The recommended model for Inmarsat is <code style="background: #0f172a; padding: 0.125rem 0.375rem; border-radius: 3px;">"1700L_5.5T_0.14S_4D_10-90M.stl"</code> — <a href="https://www.thingiverse.com/thing:4980180/files" style="color: #00d4ff;">Download here</a>
  </div>

  <div class="image-container">
    <img src="assets/images/ACARS-Diagram.png" alt="Signal Path Diagram">
    <div class="image-caption">
      <i class="fas fa-project-diagram" style="margin-right: 0.5rem;"></i>
      Complete signal path from antenna to decoder
    </div>
  </div>

  <div class="info-box">
    <i class="fas fa-microchip" style="color: #00d4ff; margin-right: 0.5rem;"></i>
    The <strong>Nooelec SAWbird IO</strong> series provides low-noise amplification for L-band signals centered at <strong>1.542 GHz</strong>, with the standard module offering <strong>20 dB gain</strong> and the <strong>SAWbird+ IO</strong> providing <strong>30 dB gain</strong>, along with built-in SAW filtering to reduce out-of-band interference.
  </div>

  <div class="image-container">
    <img src="/assets/images/Sawbird-Comparison.png" alt="SAWbird Comparison">
    <div class="image-caption">
      <i class="fas fa-balance-scale" style="margin-right: 0.5rem;"></i>
      SAWbird iO vs SAWbird+ iO comparison
    </div>
  </div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-laptop-code section-icon"></i>
    <h2 class="section-title">Software Setup</h2>
  </div>

  <p>Three pieces of software are required:</p>

  <table class="freq-table">
    <thead>
      <tr>
        <th>Purpose</th>
        <th>Software</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><i class="fas fa-broadcast-tower" style="color: #00d4ff; margin-right: 0.5rem;"></i> SDR receiver</td>
        <td><strong>SDRSharp</strong> or <strong>SDR++</strong></td>
      </tr>
      <tr>
        <td><i class="fas fa-exchange-alt" style="color: #00d4ff; margin-right: 0.5rem;"></i> Audio routing</td>
        <td><strong>Virtual Audio Cable</strong></td>
      </tr>
      <tr>
        <td><i class="fas fa-unlock-alt" style="color: #00d4ff; margin-right: 0.5rem;"></i> Decoder</td>
        <td><strong>JAERO</strong></td>
      </tr>
    </tbody>
  </table>

  <h3 style="color: #00d4ff; font-size: 1.125rem; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-list-ol"></i> Basic Decoding Workflow
  </h3>

  <div class="software-flow">
    <div class="flow-step">1. Connect SDR</div>
    <i class="fas fa-chevron-right flow-arrow"></i>
    <div class="flow-step">2. Start SDR Software</div>
    <i class="fas fa-chevron-right flow-arrow"></i>
    <div class="flow-step">3. Tune Frequency</div>
    <i class="fas fa-chevron-right flow-arrow"></i>
    <div class="flow-step">4. Route to VAC</div>
    <i class="fas fa-chevron-right flow-arrow"></i>
    <div class="flow-step">5. Configure JAERO</div>
  </div>

  <ol style="padding-left: 1.5rem; color: #e5e7eb;">
    <li style="margin: 0.5rem 0;">Connect the SDR to the computer</li>
    <li style="margin: 0.5rem 0;">Start the SDR software</li>
    <li style="margin: 0.5rem 0;">Tune to one of the AERO ACARS frequencies</li>
    <li style="margin: 0.5rem 0;">Route audio output to <strong>Virtual Audio Cable</strong></li>
    <li style="margin: 0.5rem 0;">Configure JAERO to use the same virtual audio device</li>
  </ol>

  <h3 style="color: #00d4ff; font-size: 1.125rem; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-sliders-h"></i> Recommended Bandwidth Settings
  </h3>

  <table class="freq-table">
    <thead>
      <tr>
        <th>Channel Type</th>
        <th>Bandwidth</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>600 / 1200 bps</td>
        <td><span class="bandwidth-badge">4 kHz</span></td>
      </tr>
      <tr>
        <td>8400 bps</td>
        <td><span class="bandwidth-badge">10 kHz</span></td>
      </tr>
      <tr>
        <td>10500 bps</td>
        <td><span class="bandwidth-badge">15 kHz</span></td>
      </tr>
    </tbody>
  </table>

  <div class="info-box">
    <i class="fas fa-check-circle" style="color: #22c55e; margin-right: 0.5rem;"></i>
    Once configured correctly, JAERO will immediately begin decoding messages.
  </div>

  <div class="image-container">
    <img src="/assets/images/JAERO-VAC-Setup.png" alt="JAERO Setup">
    <div class="image-caption">
      <i class="fas fa-cogs" style="margin-right: 0.5rem;"></i>
      JAERO configuration with Virtual Audio Cable routing
    </div>
  </div>

  <div class="tip-box">
    Occasionally the decoder may require manually clicking the signal peak in the FFT window to obtain lock. The <strong>speed and locking parameters</strong> must also be adjusted according to the channel bitrate.
  </div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-layer-group section-icon"></i>
    <h2 class="section-title">Decoding Multiple Channels Simultaneously</h2>
  </div>

  <p>Decoding a single channel works well, but the Inmarsat band contains <strong>many active channels</strong>. To monitor several channels simultaneously, a different approach is needed.</p>

  <div class="info-box">
    <i class="fas fa-code-branch" style="color: #00d4ff; margin-right: 0.5rem;"></i>
    A useful tool for this purpose is <strong>SDRReceiver</strong> — <a href="https://github.com/jeroenbeijer/SDRReceiver" style="color: #00d4ff;">github.com/jeroenbeijer/SDRReceiver</a>
  </div>

  <p>This software can demodulate multiple signals from a wideband SDR stream and send each one to its own decoder instance.</p>

  <div class="tip-box">
    I followed a guide created by <strong>@thebaldgeek</strong> — <a href="https://thebaldgeek.github.io/SDRReceiver.html" style="color: #00d4ff;">thebaldgeek.github.io/SDRReceiver.html</a> — which explains the process in detail.
  </div>

  <div style="background: #0f172a; border: 1px solid #1f2937; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
      <i class="fas fa-download" style="color: #00d4ff;"></i>
      <strong style="color: #f9fafb;">Configuration File</strong>
    </div>
    <code style="background: #1f2937; padding: 0.5rem 1rem; border-radius: 4px; color: #00d4ff; display: block; margin-top: 0.5rem;">/downloads/143E.ini</code>
  </div>

  <div class="image-container">
    <img src="/assets/images/SDRReceiver.jpg" alt="SDRReceiver Example">
    <div class="image-caption">
      <i class="fas fa-desktop" style="margin-right: 0.5rem;"></i>
      SDRReceiver decoding multiple channels simultaneously
    </div>
  </div>

  <div class="warning-box">
    Running multiple decoders requires significant CPU resources. My <strong>8th-generation Intel i7</strong> system was able to decode all <strong>600 bps and 1200 bps channels simultaneously</strong>, but struggled when the <strong>10500 bps channels</strong> were added.
  </div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-microphone-alt section-icon"></i>
    <h2 class="section-title">Voice Channels</h2>
  </div>

  <p>The <strong>8400 bps channels</strong> typically carry voice communications.</p>

  <p>These may include:</p>

  <div class="hardware-grid">
    <div class="hardware-item">
      <i class="fas fa-headset hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">Pilot-to-Ground Calls</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Operational communications between aircraft and ground stations</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-phone-alt hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">Satellite Phone Calls</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Passenger or crew satellite telephone communications</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-plane-departure hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">Operational Airline Communications</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Flight operations and coordination traffic</span>
      </div>
    </div>
  </div>

  <div class="info-box">
    <i class="fas fa-cog" style="color: #00d4ff; margin-right: 0.5rem;"></i>
    To decode voice, enable <strong>Local Voice Decoding</strong> in the <strong>Voice Settings</strong> tab of JAERO.
  </div>

  <p>The following example shows a decoded voice transmission:</p>

  <div class="video-container">
    <iframe src="https://www.youtube.com/embed/UlLLjb23THs" title="Inmarsat AERO Voice Example" allowfullscreen></iframe>
  </div>
</div>

<div class="section-card" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-color: #00d4ff33;">
  <div class="section-header">
    <i class="fas fa-flag-checkered section-icon" style="color: #ff6b35;"></i>
    <h2 class="section-title" style="color: #ff6b35;">Final Thoughts</h2>
  </div>

  <p style="font-size: 1.125rem; line-height: 1.8;">Inmarsat AERO ACARS signals are one of the <strong style="color: #00d4ff;">easiest satellite communications</strong> to receive using inexpensive SDR hardware.</p>

  <p>With a modest antenna, an SDR receiver, and freely available software, it is possible to monitor aviation data links transmitted <strong style="color: #ff6b35;">thousands of kilometers away</strong> from geostationary satellites.</p>

  <div style="background: #0a0e1a; border: 1px solid #00d4ff33; border-radius: 8px; padding: 1.5rem; margin-top: 1.5rem; text-align: center;">
    <i class="fas fa-satellite" style="font-size: 2rem; color: #00d4ff; margin-bottom: 0.5rem; display: block;"></i>
    <p style="margin: 0; font-style: italic; color: #9ca3af;">For radio enthusiasts interested in satellite monitoring, this is an excellent introduction to the world of <strong style="color: #00d4ff;">L-band satellite communications</strong>.</p>
  </div>
</div>

<div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #1f2937; display: flex; flex-wrap: wrap; gap: 0.5rem;">
  <span style="color: #6b7280; font-size: 0.875rem; margin-right: 1rem;">
    <i class="fas fa-tags" style="margin-right: 0.5rem;"></i>Tags:
  </span>
  <span class="tag-pill">satellite</span>
  <span class="tag-pill">radio</span>
  <span class="tag-pill">sdr</span>
  <span class="tag-pill">aviation</span>
  <span class="tag-pill">inmarsat</span>
  <span class="tag-pill">acars</span>
  <span class="tag-pill">l-band</span>
</div>
