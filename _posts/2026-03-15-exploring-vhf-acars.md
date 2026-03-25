---
layout: post
title: "Exploring Aviation VHF ACARS"
date: 2026-03-15 12:00:00 +0530
tags: [acars, aviation, sdr, vhf, aircraft, decoding, acarsdec]
categories: [Aviation]
excerpt: "A comprehensive guide to understanding and decoding VHF ACARS aviation communications using acarsdec."
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
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid #00d4ff33;
  background: #00d4ff22;
  color: #00d4ff;
  font-weight: 600;
  text-align: center;
}

.bitrate-number {
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
}

.bitrate-unit {
  font-size: 11px;
  opacity: 0.8;
  margin-top: 2px;
}

.bandwidth-badge.high {
  background: #ff6b3522;
  color: #ff6b35;
  border-color: #ff6b3533;
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

.steps-list > * {
  position: relative;
  padding-left: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #e5e7eb;
}

.steps-list > *::before {
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

.download-box {
  display: flex;
  gap: 1rem;
  align-items: center;
  background: #1a2f1a;
  border: 1px solid #22c55e;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.download-box > i {
  font-size: 2rem;
  color: #22c55e;
}

.download-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.download-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #22c55e;
  text-decoration: none;
  font-weight: bold;
}

.download-link:hover {
  color: #66bb6a;
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

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.comparison-table th {
  background: linear-gradient(135deg, #ff6b3522 0%, #ff6b3511 100%);
  color: #ff6b35;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.875rem 1rem;
  text-align: left;
  border-bottom: 2px solid #ff6b3533;
}

.comparison-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #1f2937;
  color: #e5e7eb;
}

.comparison-table tr:hover td {
  background: #1f2937;
  transition: background 0.2s ease;
}

.comparison-table tr:last-child td {
  border-bottom: none;
}

.comparison-table .highlight {
  color: #22c55e;
  font-weight: 600;
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

.modulation-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #00d4ff22;
  border: 1px solid #00d4ff33;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  color: #00d4ff;
  font-weight: 600;
  font-size: 0.875rem;
}

.timeline-item {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 1.5rem;
  border-left: 2px solid #00d4ff33;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 0.5rem;
  width: 10px;
  height: 10px;
  background: #00d4ff;
  border-radius: 50%;
}

.timeline-year {
  color: #ff6b35;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.message-type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.message-type-card {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.message-type-card i {
  color: #00d4ff;
  font-size: 1.25rem;
  margin-top: 0.125rem;
}

.label-badge {
  display: inline-block;
  background: #ff6b3522;
  border: 1px solid #ff6b3533;
  color: #ff6b35;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  font-size: 0.875rem;
}

.mode-badge {
  display: inline-block;
  background: #00d4ff22;
  border: 1px solid #00d4ff33;
  color: #00d4ff;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-weight: 600;
  font-size: 0.875rem;
}

</style>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-broadcast-tower section-icon"></i>
    <h1 class="section-title">What is ACARS?</h1>
  </div>

  <p>The <strong>Aircraft Communications Addressing and Reporting System (ACARS)</strong> is a digital datalink system used by aircraft to exchange short messages with ground stations and airline operations. Introduced in the late 1970s, ACARS was originally designed to automate routine tasks—such as logging departure times—to reduce crew workload and improve operational efficiency.</p>

  <p>At its core, ACARS is a text-based messaging system for aviation. Unlike consumer messaging platforms, however, it is tightly integrated into aircraft avionics and airline infrastructure. Messages can be automatically generated by onboard systems or manually entered by the flight crew, covering everything from engine performance data to gate arrival notifications.</p>

  <div class="info-box">
  <i class="fas fa-lightbulb" style="color: #00d4ff; margin-right: 0.5rem;"></i>
  Today, ACARS operates across multiple communication mediums:
  <ul style="margin-top: 0.75rem; margin-bottom: 0; padding-left: 1.5rem; color: #e5e7eb;">
    <li style="margin-bottom: 0.5rem;"><strong>VHF (Very High Frequency)</strong> — Primary for short-range, line-of-sight communication</li>
    <li style="margin-bottom: 0.5rem;"><strong>HF (High Frequency)</strong> — Used for long-distance oceanic communication</li>
    <li style="margin-bottom: 0;"><strong>SATCOM (Satellite Communication)</strong> — Provides global coverage via systems such as Inmarsat</li>
  </ul>
</div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-history section-icon"></i>
    <h1 class="section-title">The Evolution of ACARS</h1>
  </div>

  <div class="timeline-item">
    <div class="timeline-year">1970s: The Birth of "OOOI"</div>
    <p>ACARS was developed in 1978 by ARINC (now part of Collins Aerospace), and its original purpose was surprisingly simple: time tracking. Airlines needed a reliable, automated way to record four key flight events, known as <strong>OOOI</strong>:</p>
    <div class="hardware-grid" style="margin-top: 1rem;">
      <div class="hardware-item">
        <i class="fas fa-door-open hardware-icon"></i>
        <div><strong style="color: #f9fafb;">Out</strong><br><span style="color: #9ca3af; font-size: 0.875rem;">Aircraft leaves the gate (brakes released)</span></div>
      </div>
      <div class="hardware-item">
        <i class="fas fa-plane-departure hardware-icon"></i>
        <div><strong style="color: #f9fafb;">Off</strong><br><span style="color: #9ca3af; font-size: 0.875rem;">Aircraft takes off (weight-off-wheels)</span></div>
      </div>
      <div class="hardware-item">
        <i class="fas fa-plane-arrival hardware-icon"></i>
        <div><strong style="color: #f9fafb;">On</strong><br><span style="color: #9ca3af; font-size: 0.875rem;">Aircraft lands (weight-on-wheels)</span></div>
      </div>
      <div class="hardware-item">
        <i class="fas fa-door-closed hardware-icon"></i>
        <div><strong style="color: #f9fafb;">In</strong><br><span style="color: #9ca3af; font-size: 0.875rem;">Aircraft arrives at the gate (brakes set)</span></div>
      </div>
    </div>
    <p style="margin-top: 1rem;">This automation eliminated manual logging by pilots, provided accurate flight duration data, and improved payroll and operational efficiency.</p>
  </div>

  <div class="timeline-item">
    <div class="timeline-year">1980s: From Timekeeping to Technical Monitoring</div>
    <p>As avionics advanced, airlines realized ACARS could carry far more than simple timestamps. The system evolved into a teletype-style datalink, enabling:</p>
    <ul style="margin-top: 0.5rem; padding-left: 1.5rem; color: #e5e7eb;">
      <li><strong>Engine Health Monitoring</strong> — Aircraft systems could automatically report faults (e.g., engine temperature exceedances)</li>
      <li><strong>Weather Updates</strong> — Digital weather briefings sent directly to the cockpit</li>
      <li><strong>Pre-Departure Clearances (PDC)</strong> — Reduced long and error-prone voice exchanges with ATC</li>
    </ul>
    <p style="margin-top: 0.5rem;">This marked the transition from a logging system to a true operational communication network.</p>
  </div>

  <div class="timeline-item">
    <div class="timeline-year">1990s: Going Global (Satellite Integration)</div>
    <p>Early ACARS relied heavily on VHF, which works well over land but fails over oceans. The introduction of SATCOM in the 1990s transformed ACARS into a global system:</p>
    <ul style="margin-top: 0.5rem; padding-left: 1.5rem; color: #e5e7eb;">
      <li><strong>Satellite ACARS via Inmarsat</strong> — Enabled communication far beyond VHF range</li>
      <li><strong>FANS (Future Air Navigation System)</strong> — Aircraft could automatically report position via satellite, allowing ATC to track aircraft outside radar coverage</li>
      <li><strong>Global Standardization</strong> — Two major providers—ARINC and SITA—established a worldwide ACARS network</li>
    </ul>
    <p style="margin-top: 0.5rem;">Aircraft were now effectively "always connected," even mid-ocean.</p>
  </div>

  <div class="timeline-item">
  <div class="timeline-year">2000s to Present: The Digital Shift</div>
  <p>The original ACARS system uses MSK modulation at 2400 bps—reliable, but limited. Modern aviation has gradually evolved beyond this constraint:</p>
  
  <div class="hardware-grid" style="margin: 1rem 0;">
    <div class="hardware-item" style="border: 1px solid #22c55e33; background: linear-gradient(135deg, #1a2f1a 0%, #0f1f0f 100%);">
      <i class="fas fa-satellite-dish hardware-icon" style="color: #22c55e;"></i>
      <div>
        <strong style="color: #f9fafb;">VDL Mode 2</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Higher data rates, more efficient spectrum usage</span>
      </div>
    </div>
    <div class="hardware-item" style="border: 1px solid #00d4ff33; background: linear-gradient(135deg, #1a2f1a 0%, #0f1f0f 100%);">
      <i class="fas fa-headset hardware-icon" style="color: #00d4ff;"></i>
      <div>
        <strong style="color: #f9fafb;">CPDLC</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Controller–Pilot Data Link Communications</span>
      </div>
    </div>
  </div>
</div>

<div class="info-box">
  <i class="fas fa-headset" style="color: #00d4ff; margin-right: 0.5rem;"></i>
  <strong>CPDLC</strong> represents a major advancement: ATC instructions sent as digital messages (e.g., "Climb and maintain FL350" delivered as text). Pilots can accept or reject messages and load instructions directly into flight systems. In essence, this is "texting with ATC," reducing voice congestion and miscommunication.
</div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-wave-square section-icon"></i>
    <h1 class="section-title">Types of ACARS Communication</h1>
  </div>

  <div class="hardware-grid">
    <div class="hardware-item">
      <i class="fas fa-broadcast-tower hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">VHF ACARS</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">118 – 137 MHz, MSK modulation, 2400 bps, line-of-sight (~200-300 km range)</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-globe hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">HF ACARS</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">2 – 30 MHz, skywave propagation, oceanic/remote coverage, variable reliability</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-satellite hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">SATCOM ACARS</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">L-band (~1.5 GHz), near-global coverage, higher latency than VHF</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-rocket hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">VDL Mode 2</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">118 – 137 MHz, D8PSK modulation, up to 31.5 kbps, packet-based, line-of-sight (~200-300 km range)</span>
      </div>
    </div>
  </div>

  <div class="info-box" style="margin-top: 1.5rem;">
    <i class="fas fa-network-wired" style="color: #00d4ff; margin-right: 0.5rem;"></i>
    <strong>Multi-Link Operation:</strong> Modern aircraft dynamically switch between available links based on signal strength, availability, cost, and message priority. On ground → VHF. Climbing → VHF. Over ocean → SATCOM or HF. Near destination → back to VHF.
  </div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-laptop-code section-icon"></i>
    <h1 class="section-title">Decoding with acarsdec</h1>
  </div>

<div class="image-container" style="margin: 0 0 1rem 0; border: 1px solid transparent;">
  <img src="{{ '/assets/images/acars.webp' | relative_url }}" alt="ACARS spectrum and waterfall display" loading="lazy" style="width: auto; max-width: 100%; margin: 0 auto; display: block;">
  <div class="image-caption" style="background: transparent; border-top: 1px solid transparent;">
    Here's how ACARS transmissions appear when viewed on a spectrum analyzer and waterfall display
  </div>
</div>

  <p>For decoding VHF ACARS, one of the most reliable and lightweight tools available is <strong>acarsdec</strong>. It is a fast, command-line decoder capable of handling multiple channels simultaneously while maintaining excellent performance—even in busy RF environments like Dubai International Airport.</p>

<div class="tip-box">
  <strong>RF Chain Setup</strong><br>
  <img src="/assets/images/acars-antenna.png" alt="ACARS Antenna Setup" style="max-width: 100%; border-radius: 8px; margin: 10px 0; border: 1px solid #00d4ff;"><br>
  I used the <strong>RTL-SDR Blog's RTL-SDR v3 dongle</strong> paired with their <strong>FM Broadcast Band-Stop Filter</strong> to reduce FM interference. The antenna is their <strong>Dipole Antenna Kit</strong>, adjusted for the airband frequency around <span style="color: #ff6b35; font-weight: bold;">131 MHz</span>. Even without any LNAs, ACARS downlinks were very strong.
</div>

<div class="tip-box">
  <i class="fas fa-external-link-alt" style="color: #22c55e; margin-right: 0.5rem;"></i>
  Installation and build steps for acarsdec are already well documented on its GitHub page.<br>Please check :- <a href="https://github.com/f00b4r0/acarsdec/" target="_blank" style="color: #22c55e; text-decoration: underline;">https://github.com/f00b4r0/acarsdec/</a> for compilation and usage instructions.
</div>

  <div class="code-block">
    <pre>acarsdec -e -t 1800 --output full:file:path=/home/dragonos/Desktop/decoded-acars.log --output monitor:file: --rtlsdr 0 -g 40.2 -c 131.500 131.175 131.475 131.725 131.825</pre>
  </div>

  <h4 style="color: #f9fafb; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-cogs" style="color: #ff6b35;"></i> Command Breakdown
  </h4>

  <div class="config-section">
    <ul>
      <li><strong style="color: #ff6b35;">-e</strong> — Stop outputing empty messages</li>
      <li><strong style="color: #ff6b35;">-t 1800</strong> — Set forget time in seconds on live monitor mode</li>
      <li><strong style="color: #ff6b35;">--output full:file:path=...</strong> — Save full decoded messages to log file</li>
      <li><strong style="color: #ff6b35;">--output monitor:file:</strong> — Display real-time output to terminal</li>
      <li><strong style="color: #ff6b35;">--rtlsdr 0</strong> — Use RTL-SDR device index 0</li>
      <li><strong style="color: #ff6b35;">-g 40.2</strong> — Set tuner gain (adjust for your environment)</li>
      <li><strong style="color: #ff6b35;">-c 131.500</strong> — Set center frequency as 131.500Mhz</li>
    </ul>
  </div>

  <div class="tip-box">
    The command above monitors four ACARS frequencies: 131.175 MHz, 131.475 MHz, 131.725 MHz, and 131.825 MHz. Adjust frequencies based on your local airband activity.
  </div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-envelope-open-text section-icon"></i>
    <h1 class="section-title">ACARS Message Types</h1>
  </div>

  <p>ACARS carries a wide range of operational, technical, and control data between aircraft and ground systems. Here's what you can expect to receive:</p>

  <div class="message-type-grid">
    <div class="message-type-card">
      <i class="fas fa-clock"></i>
      <div>
        <strong>OOOI (Flight Progress)</strong><br>
        <span>Gate departure, takeoff, landing, and arrival timestamps</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-file-alt"></i>
      <div>
        <strong>Operational / Dispatch</strong><br>
        <span>Load sheets, fuel data, delays</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-tools"></i>
      <div>
        <strong>Maintenance Messages</strong><br>
        <span>Faults, warnings, and system performance data</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-tachometer-alt"></i>
      <div>
        <strong>Telemetry Reports</strong><br>
        <span>Engine status, APU usage, system data</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-comments"></i>
      <div>
        <strong>Free Text Messages</strong><br>
        <span>Pilot–dispatch communication</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-cloud-sun"></i>
      <div>
        <strong>ATIS / Weather</strong><br>
        <span>Airport weather and operational info, METARs</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-clipboard-check"></i>
      <div>
        <strong>Pre-Departure Clearance (PDC)</strong><br>
        <span>Digital ATC clearances</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-headset"></i>
      <div>
        <strong>CPDLC Messages</strong><br>
        <span>Digital ATC instructions</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-map-marker-alt"></i>
      <div>
        <strong>Position Reports</strong><br>
        <span>Location, altitude, speed</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-check-double"></i>
      <div>
        <strong>ACK/NAK</strong><br>
        <span>Acknowledgments and retransmission requests</span>
      </div>
    </div>
  </div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-tags section-icon"></i>
    <h1 class="section-title">ACARS Message Labels</h1>
  </div>

  <p>Each ACARS message includes a two-character <strong>label</strong>, which indicates its purpose:</p>

  <div class="message-type-grid">
  <div class="message-type-card">
    <i class="fas fa-cloud"></i>
    <div>
      <strong><span style="color: #ff6b35;">H1</span> – Pilot Weather Report</strong><br>
      <span>PIREPs, turbulence, winds, precision pilot reports</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-plane-departure"></i>
    <div>
      <strong><span style="color: #ff6b35;">SA</span> – Movement / OOOI</strong><br>
      <span>OUT/OFF/ON/IN, gate, takeoff, landing timestamps</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-tools"></i>
    <div>
      <strong><span style="color: #ff6b35;">A4</span> – Maintenance Status</strong><br>
      <span>Fault codes, system health, BITE/CMC reports</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-tachometer-alt"></i>
    <div>
      <strong><span style="color: #ff6b35;">A6</span> – Engine & Performance</strong><br>
      <span>Trend data, fuel burn, engine parameters</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-weight"></i>
    <div>
      <strong><span style="color: #ff6b35;">A9</span> – Load / Fuel / Payload</strong><br>
      <span>Load sheet, fuel, weight & balance</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-warehouse"></i>
    <div>
      <strong><span style="color: #ff6b35;">B6</span> – Ground Handling</strong><br>
      <span>Gate services, load control, service requests</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-map-marked-alt"></i>
    <div>
      <strong><span style="color: #ff6b35;">QP</span> – Position Report</strong><br>
      <span>Lat/long, ETA, speed, auto SATCOM reporting</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-font"></i>
    <div>
      <strong><span style="color: #ff6b35;">QQ</span> – General Text</strong><br>
      <span>Free-text and general-purpose messages</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-cloud-sun"></i>
    <div>
      <strong><span style="color: #ff6b35;">RA</span> – Weather / ATIS</strong><br>
      <span>METAR, airport weather, WX requests</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-file-alt"></i>
    <div>
      <strong><span style="color: #ff6b35;">12</span> – Airline Ops Message</strong><br>
      <span>Dispatch communications, operational data</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-route"></i>
    <div>
      <strong><span style="color: #ff6b35;">13</span> – Flight Plan / ATC</strong><br>
      <span>Flight plan changes, slots, ATC requests</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-clock"></i>
    <div>
      <strong><span style="color: #ff6b35;">14</span> – Delays</strong><br>
      <span>Delay codes, ETD changes, disruption info</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-cogs"></i>
    <div>
      <strong><span style="color: #ff6b35;">16</span> – Technical Data</strong><br>
      <span>Detailed maintenance & engine data</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-user-friends"></i>
    <div>
      <strong><span style="color: #ff6b35;">17</span> – Crew Info</strong><br>
      <span>Crew messages, roster, rest data</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-wind"></i>
    <div>
      <strong><span style="color: #ff6b35;">18</span> – Weather Uplink</strong><br>
      <span>Winds aloft, turbulence forecasts, SIGMET</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-water"></i>
    <div>
      <strong><span style="color: #ff6b35;">19</span> – Oceanic / ATC</strong><br>
      <span>Oceanic clearances, HF/SAT position control</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-exclamation-triangle"></i>
    <div>
      <strong><span style="color: #ff6b35;">1B</span> – Safety / Alert</strong><br>
      <span>Emergency notifications, unusual events</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-satellite"></i>
    <div>
      <strong><span style="color: #ff6b35;">30</span> – FMS / Navigation</strong><br>
      <span>Route, performance & waypoint uplinks</span>
    </div>
  </div>
  <div class="message-type-card">
    <i class="fas fa-cogs"></i>
    <div>
      <strong><span style="color: #ff6b35;">80</span> – Utility / Airline Data</strong><br>
      <span>Internal airline ops and misc system data</span>
    </div>
  </div>
</div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-terminal section-icon"></i>
    <h1 class="section-title">Sample Received Messages</h1>
  </div>

  <p>The following are actual decoded messages received from Dubai International Airport (OMDB) and the surrounding airspace using acarsdec. These examples demonstrate the variety of operational, maintenance, and navigational data flowing through VHF ACARS.</p>

  <div class="section-header">
    <i class="fas fa-cloud-sun section-icon"></i>
    <h2 class="section-title" style="font-size: 1.25rem;">Departure ATIS Information</h2>
  </div>

  <div class="code-block">
    <pre>[#3 (F:131.725 L:-47.8 E:0) 21/03/2026 12:09:37.734 --------------------------------
Mode : 2 Label : A9 Id : D Nak
Aircraft reg: 4R-EXQ 
Reassembly: complete
/GVACBYA.TI2/OMDB DEP ATIS Z
1201Z OMDB DEP Z.
AT TIME 1200.
DEP RWY 30 RIGHT.
SFC WIND 100 DEG, 7 KT, VRB BTN 060 AND 130 DEG.
VIS CAVOK.
T 29.
DP 19.
QNH 1009 HPA.
NOSIG.
ADZ ACFT TYPE ON FST CTC.
PILOTS MUST REPORT READY FOR PUSHBACK ON DELIVERY 120. 35.
DURING PUSHBACK AND TAXI SQUAWK ASSIGNED TRANSPONDER CODE.
DEPARTURES MUST REMAIN ON TOWER FREQ AFTER TAKEOFF.
DXB VFR FREQ 126. 775.
TWY M AND N HLDG POSITION RESTRICTIONS AS PER AERONAUTICAL INFO,,,,,,,,,,,,,, PUBLICATION SECTION 2 POINT 8 AND AIRFIELD CHARTS
MNM RWY OCCUPANCY REQUIRED.
FLOW CONTROL IN FORCE.
CAUTION BIRD ACT IN THE VICINITY OF THE AERODROME.
TAILWINDS IN EXCESS OF 10 KT REP.
ADVS ATC COPIED Z.A400</pre>
  </div>

  <div class="info-box">
    <i class="fas fa-lightbulb" style="color: #00d4ff; margin-right: 0.5rem;"></i>
    <p>
    This is a <strong>departure ATIS</strong> message sent via ACARS to <strong>4R-EXQ</strong> for <strong>Dubai International Airport (OMDB)</strong>, Information <strong>Z</strong> valid at <strong>1200 UTC</strong>. Departures are on <strong>Runway 30R</strong> with winds 100° at 7 knots (variable 060°–130°), <strong>CAVOK</strong>, temperature 29°C, dew point 19°C, and QNH 1009 hPa, with no significant changes expected.
    </p>
    <p>
    It also includes operational instructions: contact delivery for pushback, squawk assigned code during taxi, and remain on tower frequency after departure. Additional notes include taxiway M/N restrictions, minimum runway occupancy, active flow control, and cautions for bird activity and tailwinds above 10 knots.
    </p>
</div>
</div>

  <div class="section-header">
    <i class="fas fa-plane-arrival section-icon"></i>
    <h2 class="section-title" style="font-size: 1.25rem;">Flight Summary Report</h2>
  </div>

  <div class="code-block">
    <pre>[#1 (F:131.175 L:-58.6 E:1) 21/03/2026 13:20:52.059 --------------------------------
Mode : 2 Label : 80 Id : 8 Nak
Aircraft reg: VT-IWV Flight id: 6E032E
No: M50B
Reassembly: complete
3501 SUMMRY 094V/21 VABB/OMDB .VT-IWV
/OUT 0950/FOB 0167
/OFF 1008/FOB 0166
/ON  1307/FOB 0093
/IN  1314/FOB 0093
/TKO F.O. /CRW 
/LND F.O. /CRW 
/APP N  /RWY /RVR     /ALT    
/ERR    /ERR    /ERR    
/CPT 74484    /FO  74451    
/SO1          /SO2          
/CHK</pre>
  </div>

  <div class="info-box">
    <i class="fas fa-lightbulb" style="color: #00d4ff; margin-right: 0.5rem;"></i>
    <p>
    This is a <strong>flight summary (post-flight report)</strong> sent via ACARS from aircraft <strong>VT-IWV</strong> operating flight <strong>6E032E</strong> on the route <strong>VABB (Mumbai) to OMDB (Dubai)</strong>. It logs key flight events, including departure (OUT 0950, OFF 1008) and arrival times (ON 1307, IN 1314), along with fuel on board (FOB) at each stage.
    </p>
    <p>
    Additional details include crew roles during takeoff and landing, crew IDs, and placeholders for approach data. This type of message is typically used by the airline for <strong>operational tracking, fuel monitoring, and post-flight analysis</strong>.
    </p>
  </div>

  <div class="section-header">
    <i class="fas fa-file-alt section-icon"></i>
    <h2 class="section-title" style="font-size: 1.25rem;">Precision Pilot Report</h2>
  </div>

  <div class="code-block">
    <pre>[#2 (F:131.475 L:-40.6 E:0) 21/03/2026 11:41:34.751 --------------------------------
Mode : 2 Label : H1 Id : 7 Nak
Aircraft reg: A6-ENL Flight id: EK0514
No: D42L
Sublabel: DF
Reassembly: complete
&lt;REP512A PRECESION PILOT REPORT - GENERAL PAGE&gt;DATE:21-03-26

LANDING:UAE527     VOHS/OMDB LAT: 25.237,LONG:  55.371,TIME:21,08:28:50,TEMP:  26.9
ENG. SD:UAE527     OMDB/OMDB LAT: 25.244,LONG:  55.349,TIME:21,08:32:14,TEMP:  27.0
TAXIOUT:UAE514     OMDB/VIDP LAT: 25.246,LONG:  55.372,TIME:21,11:19:52,TEMP:  28.4
TO/ROLL:UAE514     OMDB/VIDP LAT: 25.253,LONG:  55.375,TIME:21,11:39:18,TEMP:  28.4

PRI GRD PWR AVAIL    :21,08:39:48 ...
PRI GRD PWR NOT AVAIL:21,10:58:31 ...
SEC GRD PWR AVAIL    :21,08:39:14 ...
SEC GRD PWR NOT AVAIL:21,10:58:32 ...

PRI GRD PWR ON       :21,08:40:06 ...
PRI GRD PWR OFF      :21,10:53:31 ...
SEC GRD PWR ON       :21,08:40:03 ...
SEC GRD PWR OFF      :21,10:44:49 ...

LEFT ENGINE ON       :...
LEFT ENGINE OFF      :21,08:28:50 ...
RIGHT ENGINE ON      :...
RIGHT ENGINE OFF     :21,08:28:50 ...

PARKING BRAKE ON     :21,08:32:22 21,11:21:31 21,11:30:52 21,11:36:46 ...
PARKING BRAKE OFF    :21,11:16:42 21,11:26:45 21,11:35:32 21,11:38:42 ...

APU RUNNING          :21,08:31:38 21,10:44:45 ...
APU NOT RUNNING      :21,08:40:55 21,11:21:47 ...
APU BLEED VLV ON     :21,08:30:52 21,08:32:31 21,08:49:20 21,11:20:02 ...
APU BLEED VLV OFF    :21,08:31:28 21,08:49:19 21,11:19:55 21,11:21:35 ...

REFUELING MODE ON    :...
REFUELING MODE OFF   :...

BEACON LITE ON       :21,11:16:26 ...
BEACON LITE OFF      :21,08:32:41 ...
PWR INTERRUPT:...    :...
****************************** END  OF  REPORT *************************************</pre>
  </div>

  <div class="info-box">
    <i class="fas fa-lightbulb" style="color: #00d4ff; margin-right: 0.5rem;"></i>
    <p>
      This is a <strong>precision pilot report</strong> sent via ACARS from aircraft <strong>A6-ENL</strong> operating flight <strong>EK0514</strong>. It logs detailed events for <strong>21 March 2026</strong>, including landing and engine shutdown times, taxi-out and takeoff times, and temperatures at key positions (LAT/LONG included).
    </p>
    <p>
      The report also tracks primary and secondary ground power availability and usage, engine start/stop times, parking brake operation, APU and bleed valve activity, refueling mode, and beacon lights. Such messages are used for <strong>operational monitoring, post-flight analysis, and aircraft system tracking</strong>.
    </p>
  </div>

<div class="section-card" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-color: #00d4ff33;">
  <div class="section-header">
    <i class="fas fa-flag-checkered section-icon" style="color: #00d4ff;"></i>
    <h1 class="section-title" style="color: #00d4ff;">Final Thoughts</h1>
  </div>

  <p style="font-size: 1.125rem; line-height: 1.8;">ACARS isn't particularly fast, modern, or even efficient by today's standards—but that's not why it's interesting. What makes it compelling is that it's still everywhere. Every decode is a small piece of a much larger system: aircraft reporting their state, airlines coordinating operations, and ground networks quietly routing messages in the background.</p>

  <p style="font-size: 1.125rem; line-height: 1.8;">You're not just receiving data—you're observing a system that has been evolving for decades, still doing its job. In practice, it's also a reminder that real-world RF rarely behaves perfectly. Some messages decode cleanly, others arrive incomplete, and many never make it through at all. Between overlapping transmissions, weak signals, and busy channels, what you see on your screen is only a fraction of what's actually on the air.</p>

  <p style="font-size: 1.125rem; line-height: 1.8;">ACARS sits in an interesting place: <strong>old, but still relevant; simple, but deeply integrated</strong>. Whether you're using it as a first step into SDR or as a way to explore aviation systems more deeply, it offers a direct look at how aircraft communicate beyond voice—imperfect, continuous, and very much alive.</p>
</div>
