---
layout: post
title: "Exploring VHF ACARS: Decoding Aircraft Communications"
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

  <p>For decoding VHF ACARS, one of the most reliable and lightweight tools available is <strong>acarsdec</strong>. It is a fast, command-line decoder capable of handling multiple channels simultaneously while maintaining excellent performance—even in busy RF environments like Dubai International Airport.</p>

<div class="tip-box">
  <i class="fas fa-external-link-alt" style="color: #22c55e; margin-right: 0.5rem;"></i>
  Installation and build steps for acarsdec are already well documented on its GitHub page — please check <a href="https://github.com/f00b4r0/acarsdec/" target="_blank" style="color: #22c55e; text-decoration: underline;">https://github.com/f00b4r0/acarsdec/</a> for the latest compilation instructions and dependencies.
</div>

  <div class="hardware-grid" style="margin: 1.5rem 0;">
    <div class="hardware-item">
      <i class="fas fa-microchip hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">Hardware</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">RTL-SDR Blog V3 dongle with telescopic antenna kit configured as a simple dipole</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-filter hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">Filtering</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">RTL-SDR Blog FM band-stop filter to suppress fm broadcast interference on air band</span>
      </div>
    </div>
  </div>

  <h4 style="color: #f9fafb; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-terminal" style="color: #ff6b35;"></i> Command Worked Best for My Setup
  </h4>

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
    <h1 class="section-title">ACARS Message Types & Labels</h1>
  </div>

  <p>ACARS carries a wide range of operational, technical, and control data between aircraft and ground systems. Here's what you can expect to receive:</p>

  <div class="message-type-grid">
    <div class="message-type-card">
      <i class="fas fa-clock"></i>
      <div>
        <strong style="color: #f9fafb;">OOOI (Flight Progress)</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Gate departure, takeoff, landing, and arrival timestamps</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-file-alt"></i>
      <div>
        <strong style="color: #f9fafb;">Operational / Dispatch</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Load sheets, fuel data, delays</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-tools"></i>
      <div>
        <strong style="color: #f9fafb;">Maintenance Messages</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Faults, warnings, and system performance data</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-tachometer-alt"></i>
      <div>
        <strong style="color: #f9fafb;">Telemetry Reports</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Engine status, APU usage, system data</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-comments"></i>
      <div>
        <strong style="color: #f9fafb;">Free Text Messages</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Pilot–dispatch communication</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-cloud-sun"></i>
      <div>
        <strong style="color: #f9fafb;">ATIS / Weather</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Airport weather and operational info, METARs</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-clipboard-check"></i>
      <div>
        <strong style="color: #f9fafb;">Pre-Departure Clearance (PDC)</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Digital ATC clearances</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-headset"></i>
      <div>
        <strong style="color: #f9fafb;">CPDLC Messages</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Digital ATC instructions</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-map-marker-alt"></i>
      <div>
        <strong style="color: #f9fafb;">Position Reports</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Location, altitude, speed</span>
      </div>
    </div>
    <div class="message-type-card">
      <i class="fas fa-check-double"></i>
      <div>
        <strong style="color: #f9fafb;">ACK/NAK</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Acknowledgments and retransmission requests</span>
      </div>
    </div>
  </div>

  <h4 style="color: #00d4ff; margin-top: 2rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-tags"></i> Understanding Message Labels
  </h4>

  <p>Each ACARS message includes a two-character <strong>label</strong>, which indicates its purpose:</p>

  <table class="freq-table">
    <thead>
      <tr>
        <th>Label</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="label-badge">H1</span></td>
        <td>Flight progress (OOOI and related reports)</td>
      </tr>
      <tr>
        <td><span class="label-badge">A9</span></td>
        <td>ATIS / weather information</td>
      </tr>
      <tr>
        <td><span class="label-badge">Q0</span></td>
        <td>Position reports</td>
      </tr>
      <tr>
        <td><span class="label-badge">B9</span></td>
        <td>ATC-related messages</td>
      </tr>
      <tr>
        <td><span class="label-badge">5U</span></td>
        <td>Weather requests</td>
      </tr>
      <tr>
        <td><span class="label-badge">_d</span></td>
        <td>Acknowledgment / control messages</td>
      </tr>
    </tbody>
  </table>

  <div class="warning-box">
    <i class="fas fa-exclamation-circle" style="margin-right: 0.5rem;"></i>
    Labels are not strictly standardized—meanings can vary slightly by airline and region.
  </div>

  <h4 style="color: #00d4ff; margin-top: 2rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-code"></i> ACARS Mode Types
  </h4>

  <p>In addition to labels, each message includes a <strong>mode</strong>, indicating its general format:</p>

  <table class="freq-table">
    <thead>
      <tr>
        <th>Mode</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="mode-badge">Mode 2</span></td>
        <td>Standard air-to-ground messages (most common)</td>
      </tr>
      <tr>
        <td><span class="mode-badge">Mode A</span></td>
        <td>Ground-to-air broadcasts</td>
      </tr>
      <tr>
        <td><span class="mode-badge">Mode B</span></td>
        <td>Broadcast/network messaging</td>
      </tr>
      <tr>
        <td><span class="mode-badge">Mode C</span></td>
        <td>Control/system-level communication</td>
      </tr>
      <tr>
        <td><span class="mode-badge">Mode D</span></td>
        <td>Air-to-ground with extended routing</td>
      </tr>
    </tbody>
  </table>

  <div class="info-box" style="margin-top: 1.5rem;">
  <i class="fas fa-lightbulb" style="color: #00d4ff; margin-right: 0.5rem;"></i>
  <strong>Common Combinations:</strong>
  <ul style="margin-top: 0.75rem; margin-bottom: 0; padding-left: 0; color: #e5e7eb; list-style: none;">
    <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
      <span class="mode-badge">Mode 2</span> + <span class="label-badge">H1</span> = Flight progress
    </li>
    <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
      <span class="mode-badge">Mode 2</span> + <span class="label-badge">A9</span> = Weather/ATIS
    </li>
    <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
      <span class="mode-badge">Mode 2</span> + <span class="label-badge">Q0</span> = Position reports
    </li>
    <li style="margin-bottom: 0; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
      <span class="mode-badge">Mode 2</span> + <span class="label-badge">B9</span> = ATC communication
    </li>
  </ul>
</div>
</div>

<div class="section-card" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-color: #00d4ff33;">
  <div class="section-header">
    <i class="fas fa-flag-checkered section-icon" style="color: #ff6b35;"></i>
    <h1 class="section-title" style="color: #ff6b35;">Final Thoughts</h1>
  </div>

  <p style="font-size: 1.125rem; line-height: 1.8;">ACARS isn't particularly fast, modern, or even efficient by today's standards—but that's not why it's interesting. What makes it compelling is that it's still everywhere. Every decode is a small piece of a much larger system: aircraft reporting their state, airlines coordinating operations, and ground networks quietly routing messages in the background.</p>

  <p style="font-size: 1.125rem; line-height: 1.8;">You're not just receiving data—you're observing a system that has been evolving for decades, still doing its job. In practice, it's also a reminder that real-world RF rarely behaves perfectly. Some messages decode cleanly, others arrive incomplete, and many never make it through at all. Between overlapping transmissions, weak signals, and busy channels, what you see on your screen is only a fraction of what's actually on the air.</p>

  <p style="font-size: 1.125rem; line-height: 1.8;">ACARS sits in an interesting place: <strong>old, but still relevant; simple, but deeply integrated</strong>. Whether you're using it as a first step into SDR or as a way to explore aviation systems more deeply, it offers a direct look at how aircraft communicate beyond voice—imperfect, continuous, and very much alive.</p>
</div>

<div class="post-footer">
  <div class="signature">
    <i class="fas fa-satellite-dish"></i>
    <span>73 de A65KJ — Noise Floor Nomad</span>
  </div>
</div>
