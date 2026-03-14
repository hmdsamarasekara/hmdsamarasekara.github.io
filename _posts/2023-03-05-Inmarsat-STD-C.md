---
layout: post
title: "Decoding Inmarsat STD-C Maritime Satellite Messages"
date: 2023-03-05 12:00:00 +0530
tags: [inmarsat, std-c, maritime, sdr, l-band, satellite, decoding]
categories: [Inmarsat]
excerpt: "A comprehensive guide to receiving and decoding Inmarsat STD-C maritime safety messages using SDR hardware and Skytale-C decoder."
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

</style>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-satellite-dish section-icon"></i>
    <h1 class="section-title">Introduction</h1>
  </div>

  <p>In a previous post I explored <strong><a href="https://hmdsamarasekara.github.io/posts/receiving-inmarsat-aero-acars/">Inmarsat AERO ACARS reception</a></strong>, demonstrating how aviation datalink traffic can be received from the Inmarsat satellite network using inexpensive Software Defined Radio hardware. While AERO channels primarily serve aircraft communications, the Inmarsat system also supports a number of services designed for the maritime sector.</p>

  <p>One of the most widely used of these services is <strong>Inmarsat STD-C</strong>, a low-bandwidth messaging system used by ships, offshore platforms, and maritime authorities to exchange short text messages, operational data, and safety information. STD-C terminals are installed on thousands of vessels worldwide and are a core component of the <strong>Global Maritime Distress and Safety System (GMDSS)</strong>.</p>

  <p>STD-C transmissions operate in the <strong>L-band around 1.5 GHz</strong> and use a relatively narrow <strong>1200 bps BPSK data channel</strong>, which makes them surprisingly easy to receive with modest antennas and common SDR hardware.</p>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-broadcast-tower section-icon"></i>
    <h1 class="section-title">STD-C Channel Types</h1>
  </div>

  <div class="image-container">
    <img src="{{ '/assets/images/STD-C-Full-Range.jpg' | relative_url }}" alt="STD-C Channels View" loading="lazy">
    <div class="image-caption">
      <i class="fas fa-image" style="margin-right: 0.5rem;"></i>
      STD-C Channels Alphasat-4 F1
    </div>
  </div>

  <p>STD-C traffic is divided into two main types of channels:</p>

  <p><strong>Network Control Station (NCS)</strong> channels act as the primary broadcast channel for the satellite region. These channels transmit <strong>Enhanced Group Call (EGC)</strong> messages, which are broadcast messages intended for groups of vessels within the satellite footprint. Two major EGC services are commonly observed:</p>

  <div class="hardware-grid">
    <div class="hardware-item">
      <i class="fas fa-life-ring hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">SafetyNET</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Broadcasts maritime safety information such as weather warnings, navigational hazards, and search-and-rescue alerts.</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-ship hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">FleetNET</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">A commercial messaging service used by fleet operators to distribute operational messages to multiple vessels.</span>
      </div>
    </div>
  </div>

  <p>The second type are <strong>Land Earth Station (LES)</strong> channels. These channels carry individual messaging traffic between vessels and shore infrastructure. Messages transmitted on LES channels may include:</p>

  <ul style="list-style: none; padding: 0;">
    <li style="margin: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
      <i class="fas fa-check-circle" style="color: #22c55e;"></i>
      Ship-to-shore communications
    </li>
    <li style="margin: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
      <i class="fas fa-check-circle" style="color: #22c55e;"></i>
      Ship-to-ship messages
    </li>
    <li style="margin: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
      <i class="fas fa-check-circle" style="color: #22c55e;"></i>
      Routine operational data
    </li>
    <li style="margin: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
      <i class="fas fa-check-circle" style="color: #22c55e;"></i>
      Ship Security Alert System (SSAS) notifications
    </li>
  </ul>

  <p>Because these signals are continuously transmitted and relatively strong across most of the satellite footprint, they provide an excellent target for SDR experimentation.</p>

  <p>In this post I will demonstrate how <strong>Inmarsat STD-C signals can be received and decoded</strong>, and how multiple channels can be monitored simultaneously using <strong>SDR++ and Skytale-C</strong>.</p>

  <div class="info-box">
    <i class="fas fa-info-circle" style="color: #00d4ff; margin-right: 0.5rem;"></i>
    STD-C channels are typically located within the <strong>Inmarsat downlink band between approximately 1537 MHz and 1545 MHz</strong>. Individual channels are narrowband transmissions spaced across this portion of the L-band spectrum. The exact channel assignments depend on the satellite region and network configuration.
  </div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-tools section-icon"></i>
    <h1 class="section-title">Antenna Setup</h1>
  </div>

  <div class="image-container">
    <img src="{{ '/assets/images/Antenna-Setup.jpg' | relative_url }}" alt="Antenna Options" loading="lazy">
    <div class="image-caption">
      <i class="fas fa-image" style="margin-right: 0.5rem;"></i>
      Antenna Options
    </div>
  </div>

  <p>Compared to some other L-band services, <strong>Inmarsat STD-C signals are relatively strong</strong>, which makes them accessible using fairly modest receiving equipment. A simple patch antenna designed for the L-band is often sufficient for reliable reception.</p>

  <div class="hardware-grid">
    <div class="hardware-item" style="border-color: #00d4ff33;">
      <i class="fas fa-satellite-dish hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">RTL-SDR Blog L-Band Patch Antenna</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Includes integrated LNA and filter. Can be powered directly from the SDR bias-tee. Compact and weatherproof for continuous outdoor operation.</span>
      </div>
    </div>
  </div>

  <p>For improved signal quality, a <strong>small satellite dish with an L-band helical feed</strong> can also be used. A dish provides additional gain and a better signal-to-noise ratio, which becomes especially useful when attempting to monitor multiple channels simultaneously or when operating in environments with higher RF noise.</p>

  <p>Reception can be further improved by adding an <strong>external L-band filtered LNA</strong>, such as the Nooelec SAWbird IO or SAWbird+ IO. These devices provide additional amplification while filtering out strong out-of-band signals that might otherwise degrade reception.</p>

  <div class="image-container">
    <img src="{{ '/assets/images/STD-C-Diagram.png' | relative_url }}" alt="Signal Path Diagram" loading="lazy">
    <div class="image-caption">
      <i class="fas fa-project-diagram" style="margin-right: 0.5rem;"></i>
      Signal Path Diagram
    </div>
  </div>

  <div class="tip-box">
    More details on antenna construction can be found in my previous post on <strong><a href="https://hmdsamarasekara.github.io/posts/receiving-inmarsat-aero-acars/">Inmarsat AERO ACARS reception</a></strong>, where the antenna setup is discussed in greater depth.
  </div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-laptop-code section-icon"></i>
    <h1 class="section-title">Software Setup</h1>
  </div>

  <p>There are several software options available for decoding Inmarsat STD-C signals, although many of them are proprietary or commercial. A popular free option is <strong>Skytale-C</strong> by microp11, which provides reliable decoding and integrates directly with the <strong>SDR# community package</strong>.</p>

  <h3 style="color: #00d4ff; font-size: 1.125rem; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-cog"></i> Basic STD-C Decoding (SDR#)
  </h3>

  <p>The easiest way to get started is by using <strong>SDR# (SDRSharp)</strong> together with the Skytale-C plugin.</p>

  <div class="image-container">
    <img src="{{ '/assets/images/Skytale-C-SDRSharp-Setup.png' | relative_url }}" alt="Skytale-C SDRSharp Plug-in" loading="lazy">
    <div class="image-caption">
      <i class="fas fa-image" style="margin-right: 0.5rem;"></i>
      Skytale-C SDRSharp Plug-in
    </div>
  </div>

  <div class="steps-list">
    <div>Download the <strong>SDRSharp Community Package</strong>, which already includes the Skytale-C plugin.</div>
    <div>Tune SDR# to an active STD-C channel in the L-band.</div>
    <div>Set the receiver bandwidth to approximately <strong>4 kHz</strong>.</div>
    <div>Open <strong>Skytale-C</strong> from the plugin menu.</div>
    <div>Enable the <strong>"Enabled"</strong> and <strong>"Auto Tracking"</strong> options.</div>
  </div>

  <p>When the decoder successfully locks onto the signal, the status indicator in the top-right corner will display <strong>"Locked"</strong>, and the constellation diagram will stabilize. Once locked, Skytale-C will begin decoding STD-C messages automatically.</p>

  <p>Clicking the <strong>"Quick UI"</strong> button opens a separate window that displays decoded messages in real time.</p>

  <div class="download-box">
    <i class="fas fa-download"></i>
    <div class="download-content">
      <span>Download the <strong>Skytale-C SDRSharp Plug-in</strong> here:</span>
      <a href="/downloads/x64-SDRSharp.ScytaleC-10213.zip" class="download-link">
        <i class="fas fa-file-archive"></i> x64-SDRSharp.ScytaleC-10213.zip
      </a>
    </div>
  </div>

  <div class="info-box">
    <i class="fab fa-youtube" style="color: #ff4444; margin-right: 0.5rem;"></i>
    <strong>Note:</strong> The developer of Skytale-C, microp11, maintains a YouTube channel where he publishes detailed videos demonstrating many of the software's features, configuration options, and advanced usage scenarios. These tutorials are very helpful for understanding the full capabilities of the decoder and for troubleshooting setup issues.
    <br><br>
    <a href="https://www.youtube.com/@Paul-microp11" target="_blank" style="color: #00d4ff; text-decoration: none;">
      <i class="fas fa-external-link-alt" style="margin-right: 0.3rem;"></i> youtube.com/@Paul-microp11
    </a>
  </div>

  <h3 style="color: #00d4ff; font-size: 1.125rem; margin-top: 2rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-layer-group"></i> Decoding Multiple Channels Simultaneously
  </h3>

  <p>It is also possible to decode <strong>multiple STD-C channels simultaneously</strong>. While several approaches exist, using <strong>SDR++ with its built-in network streaming features</strong> is one of the most efficient methods in terms of CPU usage.</p>

  <div class="warning-box">
    Monitoring multiple channels requires an SDR with sufficient instantaneous bandwidth. Devices such as the <strong>Airspy R2</strong> work well for this purpose, whereas RTL-SDR receivers typically do not have enough bandwidth to cover all STD-C channels at once.
  </div>

  <p>First download the following software components:</p>

  <div class="hardware-grid">
    <div class="hardware-item">
      <i class="fas fa-broadcast-tower hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">SDR++</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Wideband SDR receiver with network streaming</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-unlock-alt hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">Skytale-C</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">STD-C decoder</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-desktop hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">Skytale-C Quick UI</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Message display interface</span>
      </div>
    </div>
  </div>

  <h4 style="color: #f9fafb; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-plus-circle" style="color: #00d4ff;"></i> Creating Virtual Receivers in SDR++
  </h4>

  <p>Open SDR++ and navigate to the <strong>Module Manager</strong>. Under the <strong>Radio</strong> module:</p>

  <div class="image-container">
    <img src="{{ '/assets/images/SDR++ Radio Setup.png' | relative_url }}" alt="Add new VFO" loading="lazy">
    <div class="image-caption">
      <i class="fas fa-image" style="margin-right: 0.5rem;"></i>
      Add new VFO
    </div>
  </div>

  <div class="steps-list">
    <div>Create a new receiver instance and assign it a name (for example <strong>CH01</strong>).</div>
    <div>Click the <strong>"+"</strong> button to add the receiver.</div>
    <div>A new <strong>VFO</strong> will appear in the spectrum display.</div>
    <div>Select the VFO and tune it to the first STD-C channel.</div>
  </div>

  <h4 style="color: #f9fafb; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-network-wired" style="color: #00d4ff;"></i> Streaming IQ Data to Skytale-C
  </h4>

  <p>Next, configure the network output:</p>

  <div class="image-container">
    <img src="{{ '/assets/images/SDR++ Sinks Setup.png' | relative_url }}" alt="Audio Routing" loading="lazy">
    <div class="image-caption">
      <i class="fas fa-image" style="margin-right: 0.5rem;"></i>
      Audio Routing
    </div>
  </div>

  <div class="steps-list">
    <div>Open the <strong>Sinks</strong> tab in SDR++.</div>
    <div>Select the newly created VFO.</div>
    <div>Choose <strong>Network</strong> as the output type.</div>
    <div>Enter <strong>127.0.0.1</strong> as the destination address.</div>
    <div>Assign a unique <strong>TCP port number</strong>.</div>
    <div>Set the protocol to <strong>TCP</strong>.</div>
    <div>Click <strong>Start</strong>.</div>
  </div>

  <p>This will begin streaming the channel's IQ data through the selected TCP port to Skytale-C.</p>

  <p>Repeat this process for each STD-C channel you want to monitor.</p>

  <div class="image-container">
    <img src="{{ '/assets/images/SDR++ Multi Radio Setup.png' | relative_url }}" alt="SDR++ Multi-VFO Configuration" loading="lazy">
    <div class="image-caption">
      <i class="fas fa-image" style="margin-right: 0.5rem;"></i>
      SDR++ Multi-VFO Configuration
    </div>
  </div>

  <h4 style="color: #f9fafb; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-sliders-h" style="color: #ff6b35;"></i> Configuring Skytale-C
  </h4>

  <p>Extract the <strong>Skytale-C</strong> archive into a separate folder for each channel and rename the folder to match the corresponding VFO (for example <em>CH01</em>).</p>

  <div class="image-container">
    <img src="{{ '/assets/images/Folder Structure.png' | relative_url }}" alt="Folder structure should look like this" loading="lazy">
    <div class="image-caption">
      <i class="fas fa-image" style="margin-right: 0.5rem;"></i>
      Folder structure should look like this
    </div>
  </div>

  <p>Inside Skytale-C:</p>

  <div class="config-section">
    <h4><i class="fas fa-sign-in-alt"></i> Source Tab</h4>
    <ul>
      <li>Enable the <strong>TCP</strong> input option.</li>
      <li>Enter <strong>127.0.0.1</strong> as the source address.</li>
      <li>Enter the TCP port assigned to that VFO.</li>
    </ul>
  </div>

  <div class="image-container">
    <img src="{{ '/assets/images/Skytale-C-Setup.png' | relative_url }}" alt="Skytale-C Setup" loading="lazy">
    <div class="image-caption">
      <i class="fas fa-image" style="margin-right: 0.5rem;"></i>
      Skytale-C Setup
    </div>
  </div>

  <p>Next configure the output settings:</p>

  <div class="config-section">
    <h4><i class="fas fa-sign-out-alt"></i> Destination UDP</h4>
    <ul>
      <li>Enter <strong>127.0.0.1</strong>.</li>
      <li>Assign a unique <strong>UDP port number</strong>.</li>
      <li>Enable the <strong>Transmit</strong> checkbox.</li>
    </ul>
  </div>

  <p>Press the <strong>Play</strong> button to start decoding.</p>

  <p>This configuration forwards decoded messages via UDP to the Skytale-C Quick UI interface.</p>

  <h4 style="color: #f9fafb; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-desktop" style="color: #22c55e;"></i> Configuring Skytale-C Quick UI
  </h4>

  <p>Finally, extract and launch the <strong>Skytale-C Quick UI</strong> application.</p>

  <div class="image-container">
    <img src="{{ '/assets/images/Skytale-C-Quick-UI-Setup.png' | relative_url }}" alt="Skytale-C Quick-UI Configuration" loading="lazy">
    <div class="image-caption">
      <i class="fas fa-image" style="margin-right: 0.5rem;"></i>
      Skytale-C Quick-UI Configuration
    </div>
  </div>

  <div class="steps-list">
    <div>Open the <strong>Sources</strong> tab.</div>
    <div>Enter the UDP port numbers previously configured in each Skytale-C instance.</div>
    <div>Enable <strong>Log Messages</strong> if you wish to save decoded messages to a file.</div>
  </div>

  <p>Click the <strong>Play</strong> button to begin receiving decoded traffic. Active STD-C channel IDs will appear at the top of the interface as messages are received.</p>

  <div class="image-container">
    <img src="{{ '/assets/images/Multiple Skytale Instances.png' | relative_url }}" alt="Running Multiple Instances of Skytale-C" loading="lazy">
    <div class="image-caption">
      <i class="fas fa-image" style="margin-right: 0.5rem;"></i>
      Running Multiple Instances of Skytale-C
    </div>
  </div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-chart-line section-icon"></i>
    <h1 class="section-title">Decoding Results</h1>
  </div>

  <p>Once the receiver and decoder are configured correctly, decoded messages should begin appearing in the Skytale-C Quick UI interface within a few seconds.</p>

  <div class="image-container">
    <img src="{{ '/assets/images/STD-C Quick UI.JPG' | relative_url }}" alt="STD-C Quick UI populated with decoded messages" loading="lazy">
    <div class="image-caption">
      <i class="fas fa-image" style="margin-right: 0.5rem;"></i>
      STD-C Quick UI populated with decoded messages
    </div>
  </div>

  <p>During monitoring of the Indian Ocean Region satellite, several types of STD-C traffic can typically be observed, including:</p>

  <div class="hardware-grid">
    <div class="hardware-item">
      <i class="fas fa-life-ring hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">SafetyNET broadcasts</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Containing maritime safety information such as weather warnings and navigational alerts.</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-ship hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">FleetNET messages</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Used by commercial operators to communicate with groups of vessels.</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-exchange-alt hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">Routine messaging traffic</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Exchanged between vessels and shore-based Land Earth Stations (LES).</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-cogs hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">System signalling messages</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Related to network control and terminal management.</span>
      </div>
    </div>
  </div>

  <p>Depending on the satellite footprint and local RF conditions, multiple STD-C channels may be active simultaneously. When using a wideband SDR such as the Airspy R2, it is possible to monitor several of these channels at the same time.</p>

  <div class="tip-box">
    Over extended monitoring periods, the message log can quickly accumulate a large volume of maritime communication data.
  </div>
</div>

<div class="section-card" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-color: #00d4ff33;">
  <div class="section-header">
    <i class="fas fa-flag-checkered section-icon" style="color: #ff6b35;"></i>
    <h1 class="section-title" style="color: #ff6b35;">Final Thoughts</h1>
  </div>

  <p style="font-size: 1.125rem; line-height: 1.8;">Receiving and decoding Inmarsat STD-C signals is a <strong style="color: #00d4ff;">rewarding SDR project</strong> that demonstrates how accessible satellite communications monitoring has become with modern software-defined radio hardware. Because STD-C channels are relatively narrowband and strong across most of the satellite footprint, they can be received reliably with fairly modest equipment.</p>

  <p>During my experiments in the <strong>Indian Ocean Region (IOR)</strong> I was able to monitor multiple STD-C channels simultaneously. In total, <strong>11 channels were observable</strong> in this region — consisting of one Network Control Station (NCS) channel and several Land Earth Station (LES) channels. Using an <strong>Airspy R2</strong>, it was possible to decode all LES channels at the same time by streaming each channel to a separate Skytale-C instance.</p>

  <p>The NCS channel, however, was located further away in the spectrum and could not be included within the same receiver bandwidth during my tests. With wider-band SDR hardware such as a <strong>HackRF</strong> or <strong>PlutoSDR</strong>, it may be possible to capture the entire STD-C channel set within a single spectrum window.</p>

  <p>Overall, STD-C reception is an excellent introduction to <strong style="color: #ff6b35;">L-band satellite monitoring</strong> and provides a fascinating glimpse into real-world maritime communications. With the right antenna and a bit of experimentation, it is possible to continuously monitor satellite messaging traffic from ships operating across vast ocean regions.</p>

  <div class="post-footer">
    <div class="signature">
      <i class="fas fa-satellite-dish"></i>
      <span>73 de <strong>A65KJ</strong></span>
    </div>
  </div>
</div>
