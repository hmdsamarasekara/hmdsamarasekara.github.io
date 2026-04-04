---
layout: post
title: "Xiegu G90 Digital Modes Setup with DE-19 Interface"
date: 2026-01-16 12:00:00 +0530
tags: [xiegu, g90, hf, digital-modes, ft8, ft4, rtty, olivia, de-19, apartment-ham]
categories: [Ham Radio]
excerpt: "A comprehensive guide to configuring the Xiegu G90 for digital modes using the DE-19 interface."
---

<style>

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
  justify-content: flex-start;
}

.section-icon {
  font-size: 1.5rem;
  color: #00d4ff;
  filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));
  line-height: 1;
  display: flex;
  align-items: center;
}

.section-title {
  border-bottom: none !important;
  text-decoration: none;
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

.config-section {
  background: #0f172a;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.config-section h4 {
  margin: 0 0 1rem 0;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.config-section h4 i {
  color: #ff6b35;
}

.config-section ul {
  margin: 0;
  padding-left: 1.5rem;
}

.config-section li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
  color: #e5e7eb;
}

.steps-list {
  counter-reset: step;
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.steps-list > li {
  position: relative;
  padding-left: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #e5e7eb;
}

.steps-list > li::before {
  counter-increment: step;
  content: counter(step);
  position: absolute;
  left: 0;
  top: 0;
  width: 1.8rem;
  height: 1.8rem;
  background: #00d4ff;
  color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
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

.code-block {
  background: #0f172a;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  color: #00d4ff;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
}

.connection-flow {
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

.settings-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.settings-table th {
  background: linear-gradient(135deg, #00d4ff22 0%, #00d4ff11 100%);
  color: #00d4ff;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.875rem 1rem;
  text-align: left;
  border-bottom: 2px solid #00d4ff33;
}

.settings-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #1f2937;
  color: #e5e7eb;
}

.settings-table tr:hover td {
  background: #1f2937;
  transition: background 0.2s ease;
}

.settings-table tr:last-child td {
  border-bottom: none;
}

.settings-table .value {
  color: #22c55e;
  font-family: 'Courier New', monospace;
  font-weight: 600;
}

.post-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 2px solid #333;
}

.signature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ff6b35;
  font-size: 1.1rem;
}

.signature i {
  font-size: 1.3rem;
}

</style>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-broadcast-tower section-icon"></i>
    <h1 class="section-title">Introduction</h1>
  </div>

  <p>I've been using the <strong>Xiegu G90</strong> as my main HF rig for a while now. Living in an apartment means I can't put up large antennas or run high power, so my setup is pretty limited — but it works. For most of my operating, I stay around <span class="value">15 watts</span>, and I rely heavily on digital modes to make the most of the band conditions and power limitations.</p>

  <p>Because the rig is a Xiegu, I chose to stick with their own <strong>DE-19 interface</strong>, and it's what I've been using for digital modes ever since. Despite the restricted environment, I've logged over <strong>7,000 contacts</strong> across FT8, FT4, RTTY, and Olivia.</p>

  <div class="tip-box">
  <strong>Antenna Setup</strong><br>
    <img src="{{ '/assets/images/DP200.png' | relative_url }}" alt="DP200 Telescopic Dipole Antenna" loading="lazy">
    <div class="image-caption">DP200 Telescopic Dipole - Compact antenna for apartment operation</div>
  My main antenna is a <strong>DP200 telescopic dipole</strong> I picked up from AliExpress. Because of the space available, I can only extend it up to cover <strong>17m</strong> properly. Anything lower than that is basically impossible where I live. Even then, the G90's tuner ends up doing most of the heavy lifting.
</div>

  <div class="info-box">
    <i class="fas fa-lightbulb" style="color: #00d4ff; margin-right: 0.5rem;"></i>
    The settings in this article are the ones that worked best for me with the G90 and DE-19 in my apartment environment. They should serve as a good starting point, but feel free to tweak them for your own setup.
  </div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-microchip section-icon"></i>
    <h1 class="section-title">Understanding the DE-19 Interface</h1>
  </div>

  <div class="image-container">
    <img src="{{ '/assets/images/DE-19.png' | relative_url }}" alt="DE-19 Digital Interface" loading="lazy">
    <div class="image-caption">DE-19 Digital Interface - Xiegu's dedicated solution for digital modes</div>
  </div>

  <p>The <strong>DE-19</strong> is Xiegu's dedicated digital-mode interface for radios like the G90, G90S, G106, and XPA125B. Since my main rig is the G90, I chose to use Xiegu's own interface instead of third-party solutions, and I've been running all my digital modes through it ever since.</p>

  <div class="image-container">
    <img src="{{ '/assets/images/DE-19-Labels.png' | relative_url }}" alt="DE-19 Layout and Labels" loading="lazy">
    <div class="image-caption">DE-19 Layout - Connection indicators</div>
  </div>

  <p>Functionally, the DE-19 is simple, it combines <strong>USB audio</strong>, <strong>PTT</strong>, and <strong>CAT control</strong> into one compact box. You connect two cables to the radio and one USB cable to the PC, and the DE-19 handles everything automatically.</p>

  <div class="hardware-grid">
    <div class="hardware-item">
      <i class="fas fa-headphones hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">USB Audio</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Digital audio interface between PC and radio</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-broadcast-tower hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">PTT Control</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Push-to-talk signaling for transmit</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-terminal hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">CAT Control</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Frequency & Mode control</span>
      </div>
    </div>
  </div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-plug section-icon"></i>
    <h1 class="section-title">Connection Guide</h1>
  </div>

  <ol class="steps-list">
    <li><strong>Install the CH342 driver</strong><br>
    Enables both the virtual COM port.</li>

    <li><strong>Connect DE-19 ACC → G90 ACC port</strong><br>
    Use the included 8-pin Mini-DIN cable. This carries the audio in/out.</li>

    <li><strong>Connect DE-19 CIV → G90 serial port (head unit)</strong><br>
    Use the included 3.5mm TRS 3.5mm cable for CAT/PTT control.</li>

    <li><strong>Connect DE-19 → PC via USB-C</strong><br>
    Provides USB audio + CAT control to the computer.</li>

    <li><strong>Optionally Connect PA OUT → XPA125B amplifier (ACC port)</strong><br>
    Use the L4001 3.5mm TRRS to 8Pin Mini-DIN cable for external amplifier.</li>
  </ol>

  <div class="tip-box">
    The DE-19 uses the <strong>CH342 USB chipset</strong>. If your computer doesn't automatically recognize it, you can download the driver from the Radioddity server: <a href="https://radioddity.s3.amazonaws.com/Xiegu_X6100_Cable_Driver.ZIP" target="_blank" style="color: #22c55e; text-decoration: underline;">Download CH342 Driver</a>
  </div>

  <div class="image-container">
    <img src="{{ '/assets/images/Xiegu-G90-DE-19.png' | relative_url }}" alt="DE-19 and Xiegu G90 Connection Guide" loading="lazy">
    <div class="image-caption">DE-19 connected to Xiegu G90 - Basic setup diagram</div>
  </div>

  <div class="image-container">
    <img src="{{ '/assets/images/Xiegu-G90-DE-19-XPA125B.png' | relative_url }}" alt="DE-19, Xiegu G90 and XPA125B Connection Guide" loading="lazy">
    <div class="image-caption">Full setup with DE-19, G90, and optional XPA125B amplifier</div>
  </div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-cogs section-icon"></i>
    <h1 class="section-title">G90 Menu Configuration for Digital Modes</h1>
  </div>

  <p>To get the Xiegu G90 working reliably with digital modes, a few menu settings need to be adjusted. These ensure clean audio, proper drive levels, and the correct bandwidth for FT8, FT4, RTTY, Olivia, and other digi modes.</p>

  <div class="config-section">
    <h4><i class="fas fa-wave-square"></i> Operating Mode</h4>
    <ul>
      <li><strong>U-D (USB-Digi)</strong> — for most HF digital modes</li>
      <li><strong>L-D (LSB-Digi)</strong> — only on bands where LSB is standard</li>
    </ul>
  </div>

  <div class="config-section">
    <h4><i class="fas fa-volume-up"></i> Audio Input / Output</h4>
    <table class="settings-table">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Value</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Input Source</td>
          <td class="value">LINE</td>
          <td>Use line-in input instead of mic-in input</td>
        </tr>
        <tr>
          <td>AUX IN</td>
          <td class="value">8</td>
          <td>Audio input level from PC → radio</td>
        </tr>
        <tr>
          <td>AUX OUT</td>
          <td class="value">15</td>
          <td>Audio output level from radio → PC</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="config-section">
    <h4><i class="fas fa-broadcast-tower"></i> RF & Power Settings</h4>
    <ul>
      <li><strong>RF Gain:</strong> <span class="value">~80%</span> — Adjust according to the specific band conditions</li>
      <li><strong>Power:</strong> <span class="value">10–15W</span> — Safe and efficient for continuous-duty digital modes</li>
    </ul>
  </div>

  <div class="config-section">
    <h4><i class="fas fa-filter"></i> Filtering & Processing</h4>
    <table class="settings-table">
      <thead>
        <tr>
          <th>Setting</th>
          <th>Value</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Filter Bandwidth</td>
          <td class="value">3 kHz</td>
          <td>Gives digital software the full passband</td>
        </tr>
        <tr>
          <td>Compression</td>
          <td class="value">OFF</td>
          <td>Prevents signal distortion</td>
        </tr>
        <tr>
          <td>Preamp</td>
          <td class="value">OFF</td>
          <td>Avoid overloading frontend</td>
        </tr>
        <tr>
          <td>AGC</td>
          <td class="value">OFF</td>
          <td>Maintain stable audio levels</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="warning-box">
    These settings help maintain a stable and clean audio chain. Processing features like compression and AGC can interfere with digital mode decoding and should be disabled.
  </div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-laptop section-icon"></i>
    <h1 class="section-title">PC Sound Settings</h1>
  </div>

  <p>To avoid distortion and ensure clean audio between the DE-19 and digital-mode software, it's important to configure the USB audio device properly in Windows. These settings help keep proper audio levels and prevent Windows from "enhancing" or altering the signal.</p>

  <div class="config-section">
    <h4><i class="fas fa-volume-up"></i> Playback Device</h4>
    <div class="image-container">
      <img src="{{ '/assets/images/Playback.webp' | relative_url }}" alt="Playback Devices Configuration" loading="lazy">
      <div class="image-caption">Windows Playback Device Configuration</div>
    </div>
    <ol class="steps-list">
      <li>Open Windows Sound Settings → Playback devices</li>
      <li>Select the <strong>USB Audio Device</strong></li>
      <li><strong>Levels tab:</strong> Set audio level to <span class="value">50%</span></li>
      <li><strong>Enhancements tab:</strong> Check <span class="value">Disable all enhancements</span></li>
      <li><strong>Spatial sound tab:</strong> Set spatial sound to <span class="value">Off</span></li>
    </ol>
  </div>

  <div class="config-section">
    <h4><i class="fas fa-microphone"></i> Recording Device</h4>
    <div class="image-container">
      <img src="{{ '/assets/images/Recording.webp' | relative_url }}" alt="Recording Devices Configuration" loading="lazy">
      <div class="image-caption">Windows Recording Device Configuration</div>
    </div>
    <ol class="steps-list">
      <li>Open Windows Sound Settings → Recording devices</li>
      <li>Select the <strong>USB Audio Device</strong></li>
      <li><strong>Listen tab:</strong> Make sure <span class="value">Listen to this device</span> is <strong>NOT</strong> checked</li>
      <li><strong>Custom tab:</strong> Make sure <span class="value">AGC</span> is unchecked</li>
      <li><strong>Levels tab:</strong> Set audio level to <span class="value">50%</span></li>
    </ol>
  </div>

  <div class="tip-box">
  <strong>Audio Level Starting Point</strong><br>
  Begin with playback and recording levels at 50%, then adjust as needed in your digital-mode software to optimize transmit audio and decoding.
</div>
</div>

<div class="section-card" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-color: #00d4ff33;">
  <div class="section-header">
    <i class="fas fa-flag-checkered section-icon" style="color: #00d4ff;"></i>
    <h1 class="section-title" style="color: #00d4ff;">Final Thoughts</h1>
  </div>

  <p style="font-size: 1.125rem; line-height: 1.8;">The Xiegu G90 paired with the DE-19 interface is a compact, effective solution for apartment-based HF digital operation. Despite the limitations of restricted antenna space and QRP power levels, this setup has proven capable of working the world on FT8, RTTY, and other digital modes.</p>

  <p style="font-size: 1.125rem; line-height: 1.8;">The key is in the details: proper audio levels, clean signal chain, and understanding that the G90's internal tuner is your friend when dealing with compromise antennas. The DE-19 simplifies the connection process by integrating audio, CAT, and PTT into a single USB interface—no additional sound cards or serial adapters needed.</p>

  <p style="font-size: 1.125rem; line-height: 1.8;">Whether you're in a high-rise apartment, a HOA-restricted neighborhood, or just prefer a minimal shack, this configuration demonstrates that <strong>you don't need a tower and a kilowatt to enjoy HF digital modes</strong>. The bands are there—sometimes you just need to listen a bit more carefully and let the software do the heavy lifting.</p>
