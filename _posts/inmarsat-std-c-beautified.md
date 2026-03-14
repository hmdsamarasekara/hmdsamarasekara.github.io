---
layout: post
title: "Decoding Inmarsat STD-C Maritime Satellite Messages"
date: 2026-03-14 12:00:00 +0530
tags: [inmarsat, std-c, maritime, sdr, l-band, satellite, decoding]
categories: [Inmarsat]
excerpt: "A comprehensive guide to receiving and decoding Inmarsat STD-C maritime safety messages using SDR hardware and Skytale-C decoder."
---

<div class="post-hero">
  <div class="frequency-badge">
    <i class="fas fa-satellite-dish"></i>
    <span>1537 - 1545 MHz</span>
  </div>
  <h1 class="post-title">Decoding Inmarsat STD-C <span class="highlight">Maritime Satellite Messages</span></h1>
  <div class="meta-bar">
    <span class="meta-item"><i class="fas fa-calendar-alt"></i> {{ page.date | date: "%B %d, %Y" }}</span>
    <span class="meta-item"><i class="fas fa-user"></i> {{ page.author }}</span>
    <span class="meta-item"><i class="fas fa-tags"></i> L-Band, Maritime, STD-C</span>
  </div>
</div>

<div class="content-wrapper">

<div class="intro-panel">
  <div class="panel-icon">
    <i class="fas fa-broadcast-tower"></i>
  </div>
  <div class="panel-content">
    <p>In a previous post I explored <strong>Inmarsat AERO ACARS reception</strong>, demonstrating how aviation datalink traffic can be received from the Inmarsat satellite network using inexpensive Software Defined Radio (SDR) hardware. While AERO channels primarily serve aircraft communications, the Inmarsat system also supports a number of services designed for the maritime sector.</p>
  </div>
</div>

<p>One of the most widely used of these services is <strong>Inmarsat STD-C</strong>, a low-bandwidth messaging system used by ships, offshore platforms, and maritime authorities to exchange short text messages, operational data, and safety information. STD-C terminals are installed on thousands of vessels worldwide and are a core component of the <strong>Global Maritime Distress and Safety System (GMDSS)</strong>.</p>

<div class="spec-grid">
  <div class="spec-card">
    <div class="spec-icon"><i class="fas fa-wave-square"></i></div>
    <div class="spec-label">Frequency</div>
    <div class="spec-value">~1.5 GHz</div>
    <div class="spec-detail">L-Band</div>
  </div>
  <div class="spec-card">
    <div class="spec-icon"><i class="fas fa-tachometer-alt"></i></div>
    <div class="spec-label">Data Rate</div>
    <div class="spec-value">1200 bps</div>
    <div class="spec-detail">BPSK Modulation</div>
  </div>
  <div class="spec-card">
    <div class="spec-icon"><i class="fas fa-ship"></i></div>
    <div class="spec-label">Primary Users</div>
    <div class="spec-value">Maritime</div>
    <div class="spec-detail">GMDSS Safety</div>
  </div>
</div>

<p>STD-C transmissions operate in the <strong>L-band around 1.5 GHz</strong> and use a relatively narrow <strong>1200 bps BPSK data channel</strong>, which makes them surprisingly easy to receive with modest antennas and common SDR hardware.</p>

---

## <i class="fas fa-layer-group"></i> STD-C Channel Types

<figure class="image-container wide">
  <img src="{{ '/assets/images/STD-C-Full-Range.jpg' | relative_url }}" alt="STD-C Channels View" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> STD-C Channels View
  </figcaption>
</figure>

<div class="channel-types">
  <div class="channel-card ncs">
    <div class="channel-header">
      <i class="fas fa-broadcast-tower"></i>
      <h3>Network Control Station (NCS)</h3>
      <span class="channel-badge primary">Primary</span>
    </div>
    <div class="channel-body">
      <p>Act as the primary broadcast channel for the satellite region. These channels transmit <strong>Enhanced Group Call (EGC)</strong> messages, which are broadcast messages intended for groups of vessels within the satellite footprint.</p>

      <div class="service-list">
        <div class="service-item safetynet">
          <div class="service-icon"><i class="fas fa-life-ring"></i></div>
          <div class="service-info">
            <h4>SafetyNET</h4>
            <p>Broadcasts maritime safety information such as weather warnings, navigational hazards, and search-and-rescue alerts.</p>
          </div>
        </div>
        <div class="service-item fleetnet">
          <div class="service-icon"><i class="fas fa-network-wired"></i></div>
          <div class="service-info">
            <h4>FleetNET</h4>
            <p>A commercial messaging service used by fleet operators to distribute operational messages to multiple vessels.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="channel-card les">
    <div class="channel-header">
      <i class="fas fa-satellite"></i>
      <h3>Land Earth Station (LES)</h3>
      <span class="channel-badge secondary">Individual</span>
    </div>
    <div class="channel-body">
      <p>These channels carry individual messaging traffic between vessels and shore infrastructure. Messages transmitted on LES channels may include:</p>

      <ul class="feature-list">
        <li><i class="fas fa-check-circle"></i> Ship-to-shore communications</li>
        <li><i class="fas fa-check-circle"></i> Ship-to-ship messages</li>
        <li><i class="fas fa-check-circle"></i> Routine operational data</li>
        <li><i class="fas fa-check-circle"></i> Ship Security Alert System (SSAS) notifications</li>
      </ul>
    </div>
  </div>
</div>

<div class="info-box frequency-range">
  <div class="info-icon"><i class="fas fa-info-circle"></i></div>
  <div class="info-content">
    <strong>Frequency Range:</strong> STD-C channels are typically located within the <strong>Inmarsat downlink band between approximately 1537 MHz and 1545 MHz</strong>. Individual channels are narrowband transmissions spaced across this portion of the L-band spectrum. The exact channel assignments depend on the satellite region and network configuration.
  </div>
</div>

<p>Because these signals are continuously transmitted and relatively strong across most of the satellite footprint, they provide an excellent target for SDR experimentation.</p>

<p>In this post I will demonstrate how <strong>Inmarsat STD-C signals can be received and decoded</strong>, and how multiple channels can be monitored simultaneously using <strong>SDR++ and Skytale-C</strong>.</p>

---

## <i class="fas fa-satellite-dish"></i> Antenna Setup

<figure class="image-container">
  <img src="{{ '/assets/images/Antenna-Setup.jpg' | relative_url }}" alt="Antenna Options" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> Antenna Options
  </figcaption>
</figure>

<div class="highlight-box">
  <i class="fas fa-signal"></i>
  <p>Compared to some other L-band services, <strong>Inmarsat STD-C signals are relatively strong</strong>, which makes them accessible using fairly modest receiving equipment. A simple patch antenna designed for the L-band is often sufficient for reliable reception.</p>
</div>

<div class="equipment-grid">
  <div class="equipment-card recommended">
    <div class="equipment-badge"><i class="fas fa-star"></i> Recommended</div>
    <h4><i class="fas fa-microchip"></i> RTL-SDR Blog L-Band Patch</h4>
    <ul>
      <li>Integrated LNA and filter</li>
      <li>Bias-tee powered</li>
      <li>Compact outdoor solution</li>
    </ul>
  </div>

  <div class="equipment-card">
    <h4><i class="fas fa-bullseye"></i> Small Satellite Dish</h4>
    <ul>
      <li>L-band helical feed</li>
      <li>Additional gain</li>
      <li>Better SNR for multi-channel</li>
    </ul>
  </div>

  <div class="equipment-card">
    <h4><i class="fas fa-plus-circle"></i> External LNA</h4>
    <ul>
      <li>Nooelec SAWbird IO/+IO</li>
      <li>Additional amplification</li>
      <li>Out-of-band filtering</li>
    </ul>
  </div>
</div>

<figure class="image-container">
  <img src="{{ '/assets/images/STD-C-Diagram.png' | relative_url }}" alt="Signal Path Diagram" loading="lazy">
  <figcaption>
    <i class="fas fa-project-diagram"></i> Signal Path Diagram
  </figcaption>
</figure>

<div class="tip-box">
  <i class="fas fa-lightbulb"></i>
  <p>More details on antenna construction can be found in my previous post on <strong>Inmarsat AERO ACARS reception</strong>, where the antenna setup is discussed in greater depth.</p>
</div>

---

## <i class="fas fa-laptop-code"></i> Software Setup

<div class="software-intro">
  <p>There are several software options available for decoding Inmarsat STD-C signals, although many of them are proprietary or commercial. A popular free option is <strong>Skytale-C</strong> by microp11, which provides reliable decoding and integrates directly with the <strong>SDR# community package</strong>.</p>
</div>

### <i class="fas fa-play-circle"></i> Basic STD-C Decoding (SDR#)

<div class="method-card">
  <div class="method-header sdrsharp">
    <i class="fas fa-headphones"></i>
    <span>SDR# + Skytale-C Plugin</span>
  </div>

  <figure class="image-container">
    <img src="{{ '/assets/images/Skytale-C-SDRSharp-Setup.png' | relative_url }}" alt="Skytale-C SDRSharp Plug-in" loading="lazy">
    <figcaption>
      <i class="fas fa-image"></i> Skytale-C SDRSharp Plug-in
    </figcaption>
  </figure>

  <p>The easiest way to get started is by using <strong>SDR# (SDRSharp)</strong> together with the Skytale-C plugin.</p>

  <div class="steps">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">
        <strong>Download</strong> the <strong>SDRSharp Community Package</strong>, which already includes the Skytale-C plugin.
      </div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">
        <strong>Tune</strong> SDR# to an active STD-C channel in the L-band.
      </div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">
        Set the receiver <strong>bandwidth</strong> to approximately <code>4 kHz</code>.
      </div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content">
        Open <strong>Skytale-C</strong> from the plugin menu.
      </div>
    </div>
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content">
        Enable the <strong>"Enabled"</strong> and <strong>"Auto Tracking"</strong> options.
      </div>
    </div>
  </div>

  <div class="status-indicator">
    <div class="status locked">
      <i class="fas fa-lock"></i>
      <span>When locked, the status indicator displays <strong>"Locked"</strong></span>
    </div>
  </div>

  <p>When the decoder successfully locks onto the signal, the status indicator in the top-right corner will display <strong>"Locked"</strong>, and the constellation diagram will stabilize. Once locked, Skytale-C will begin decoding STD-C messages automatically.</p>

  <p>Clicking the <strong>"Quick UI"</strong> button opens a separate window that displays decoded messages in real time.</p>
</div>

<div class="download-box">
  <i class="fas fa-download"></i>
  <div class="download-content">
    <h4>Download Skytale-C SDRSharp Plug-in</h4>
    <a href="/downloads/x64-SDRSharp.ScytaleC-10213.zip" class="download-btn">
      <i class="fas fa-file-archive"></i> x64-SDRSharp.ScytaleC-10213.zip
    </a>
  </div>
</div>

<div class="tip-box youtube">
  <i class="fab fa-youtube"></i>
  <p><strong>Note:</strong> The developer of Skytale-C, microp11, maintains a YouTube channel where he publishes detailed videos demonstrating many of the software's features, configuration options, and advanced usage scenarios. These tutorials are very helpful for understanding the full capabilities of the decoder and for troubleshooting setup issues.</p>
  <a href="https://www.youtube.com/@Paul-microp11" target="_blank" class="yt-link">
    <i class="fab fa-youtube"></i> youtube.com/@Paul-microp11
  </a>
</div>

---

### <i class="fas fa-layer-group"></i> Decoding Multiple Channels Simultaneously

<div class="highlight-box multi">
  <i class="fas fa-clone"></i>
  <p>It is also possible to decode <strong>multiple STD-C channels simultaneously</strong>. While several approaches exist, using <strong>SDR++ with its built-in network streaming features</strong> is one of the most efficient methods in terms of CPU usage.</p>
</div>

<div class="warning-box">
  <i class="fas fa-exclamation-triangle"></i>
  <p>Monitoring multiple channels requires an SDR with sufficient instantaneous bandwidth. Devices such as the <strong>Airspy R2</strong> work well for this purpose, whereas RTL-SDR receivers typically do not have enough bandwidth to cover all STD-C channels at once.</p>
</div>

<div class="software-requirements">
  <h4><i class="fas fa-box-open"></i> Required Software</h4>
  <div class="req-grid">
    <div class="req-item">
      <i class="fas fa-check"></i>
      <span><strong>SDR++</strong></span>
    </div>
    <div class="req-item">
      <i class="fas fa-check"></i>
      <span><strong>Skytale-C</strong></span>
    </div>
    <div class="req-item">
      <i class="fas fa-check"></i>
      <span><strong>Skytale-C Quick UI</strong></span>
    </div>
  </div>
</div>

#### <i class="fas fa-sliders-h"></i> Creating Virtual Receivers in SDR++

<figure class="image-container">
  <img src="{{ '/assets/images/SDR++ Radio Setup.png' | relative_url }}" alt="Add new VFO" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> Add new VFO
  </figcaption>
</figure>

<div class="steps sdrpp-steps">
  <div class="step">
    <div class="step-number">1</div>
    <div class="step-content">
      Open SDR++ and navigate to the <strong>Module Manager</strong>. Under the <strong>Radio</strong> module:
    </div>
  </div>
  <div class="step">
    <div class="step-number">2</div>
    <div class="step-content">
      Create a new receiver instance and assign it a name (for example <code>CH01</code>).
    </div>
  </div>
  <div class="step">
    <div class="step-number">3</div>
    <div class="step-content">
      Click the <strong>"+"</strong> button to add the receiver.
    </div>
  </div>
  <div class="step">
    <div class="step-number">4</div>
    <div class="step-content">
      A new <strong>VFO</strong> will appear in the spectrum display.
    </div>
  </div>
  <div class="step">
    <div class="step-number">5</div>
    <div class="step-content">
      Select the VFO and tune it to the first STD-C channel.
    </div>
  </div>
</div>

#### <i class="fas fa-network-wired"></i> Streaming IQ Data to Skytale-C

<figure class="image-container">
  <img src="{{ '/assets/images/SDR++ Sinks Setup.png' | relative_url }}" alt="Audio Routing" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> Audio Routing
  </figcaption>
</figure>

<div class="config-grid">
  <div class="config-step">
    <div class="config-icon"><i class="fas fa-door-open"></i></div>
    <div class="config-text">Open the <strong>Sinks</strong> tab in SDR++</div>
  </div>
  <div class="config-step">
    <div class="config-icon"><i class="fas fa-mouse-pointer"></i></div>
    <div class="config-text">Select the newly created VFO</div>
  </div>
  <div class="config-step">
    <div class="config-icon"><i class="fas fa-ethernet"></i></div>
    <div class="config-text">Choose <strong>Network</strong> as output type</div>
  </div>
  <div class="config-step">
    <div class="config-icon"><i class="fas fa-map-marker-alt"></i></div>
    <div class="config-text">Enter <code>127.0.0.1</code> as destination</div>
  </div>
  <div class="config-step">
    <div class="config-icon"><i class="fas fa-plug"></i></div>
    <div class="config-text">Assign unique <strong>TCP port number</strong></div>
  </div>
  <div class="config-step">
    <div class="config-icon"><i class="fas fa-exchange-alt"></i></div>
    <div class="config-text">Set protocol to <strong>TCP</strong></div>
  </div>
  <div class="config-step">
    <div class="config-icon"><i class="fas fa-play"></i></div>
    <div class="config-text">Click <strong>Start</strong></div>
  </div>
</div>

<p>This will begin streaming the channel's IQ data through the selected TCP port to Skytale-C.</p>

<div class="repeat-box">
  <i class="fas fa-redo"></i>
  <span>Repeat this process for each STD-C channel you want to monitor.</span>
</div>

<figure class="image-container wide">
  <img src="{{ '/assets/images/SDR++ Multi Radio Setup.png' | relative_url }}" alt="SDR++ Multi-VFO Configuration" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> SDR++ Multi-VFO Configuration
  </figcaption>
</figure>

---

### <i class="fas fa-cogs"></i> Configuring Skytale-C

<figure class="image-container">
  <img src="{{ '/assets/images/Folder Structure.png' | relative_url }}" alt="Folder structure should look like this" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> Folder structure should look like this
  </figcaption>
</figure>

<div class="setup-instructions">
  <p>Extract the <strong>Skytale-C</strong> archive into a separate folder for each channel and rename the folder to match the corresponding VFO (for example <em>CH01</em>).</p>
</div>

<figure class="image-container">
  <img src="{{ '/assets/images/Skytale-C-Setup.png' | relative_url }}" alt="Skytale-C Setup" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> Skytale-C Setup
  </figcaption>
</figure>

<div class="config-sections">
  <div class="config-section">
    <h4><i class="fas fa-sign-in-alt"></i> Source Tab Configuration</h4>
    <ul class="check-list">
      <li><i class="fas fa-check-square"></i> Enable the <strong>TCP</strong> input option</li>
      <li><i class="fas fa-check-square"></i> Enter <code>127.0.0.1</code> as the source address</li>
      <li><i class="fas fa-check-square"></i> Enter the TCP port assigned to that VFO</li>
    </ul>
  </div>

  <div class="config-section">
    <h4><i class="fas fa-sign-out-alt"></i> Destination UDP Configuration</h4>
    <ul class="check-list">
      <li><i class="fas fa-check-square"></i> Enter <code>127.0.0.1</code></li>
      <li><i class="fas fa-check-square"></i> Assign a unique <strong>UDP port number</strong></li>
      <li><i class="fas fa-check-square"></i> Enable the <strong>Transmit</strong> checkbox</li>
    </ul>
  </div>
</div>

<div class="action-box">
  <i class="fas fa-play-circle"></i>
  <span>Press the <strong>Play</strong> button to start decoding.</span>
</div>

<p>This configuration forwards decoded messages via UDP to the Skytale-C Quick UI interface.</p>

---

### <i class="fas fa-desktop"></i> Configuring Skytale-C Quick UI

<figure class="image-container">
  <img src="{{ '/assets/images/Skytale-C-Quick-UI-Setup.png' | relative_url }}" alt="Skytale-C Quick-UI Configuration" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> Skytale-C Quick-UI Configuration
  </figcaption>
</figure>

<div class="quickui-steps">
  <div class="step-card">
    <div class="step-icon"><i class="fas fa-file-export"></i></div>
    <div class="step-info">
      <h5>1. Extract & Launch</h5>
      <p>Extract and launch the <strong>Skytale-C Quick UI</strong> application.</p>
    </div>
  </div>

  <div class="step-card">
    <div class="step-icon"><i class="fas fa-cog"></i></div>
    <div class="step-info">
      <h5>2. Configure Sources</h5>
      <p>Open the <strong>Sources</strong> tab and enter the UDP port numbers previously configured in each Skytale-C instance.</p>
    </div>
  </div>

  <div class="step-card">
    <div class="step-icon"><i class="fas fa-save"></i></div>
    <div class="step-info">
      <h5>3. Enable Logging (Optional)</h5>
      <p>Enable <strong>Log Messages</strong> if you wish to save decoded messages to a file.</p>
    </div>
  </div>

  <div class="step-card">
    <div class="step-icon"><i class="fas fa-play"></i></div>
    <div class="step-info">
      <h5>4. Start Receiving</h5>
      <p>Click the <strong>Play</strong> button to begin receiving decoded traffic.</p>
    </div>
  </div>
</div>

<p>Active STD-C channel IDs will appear at the top of the interface as messages are received.</p>

<figure class="image-container wide">
  <img src="{{ '/assets/images/Multiple Skytale Instances.png' | relative_url }}" alt="Running Multiple Instances of Skytale-C" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> Running Multiple Instances of Skytale-C
  </figcaption>
</figure>

---

## <i class="fas fa-chart-line"></i> Decoding Results

<div class="results-intro">
  <p>Once the receiver and decoder are configured correctly, decoded messages should begin appearing in the Skytale-C Quick UI interface within a few seconds.</p>
</div>

<figure class="image-container featured">
  <img src="{{ '/assets/images/STD-C Quick UI.JPG' | relative_url }}" alt="STD-C Quick UI populated with decoded messages" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> STD-C Quick UI populated with decoded messages
  </figcaption>
</figure>

<div class="traffic-types">
  <h4><i class="fas fa-list-ul"></i> Observed Traffic Types</h4>
  <p>During monitoring of the Indian Ocean Region satellite, several types of STD-C traffic can typically be observed, including:</p>

  <div class="traffic-grid">
    <div class="traffic-card safetynet">
      <div class="traffic-icon"><i class="fas fa-life-ring"></i></div>
      <h5>SafetyNET</h5>
      <p>Maritime safety information, weather warnings, navigational alerts</p>
    </div>
    <div class="traffic-card fleetnet">
      <div class="traffic-icon"><i class="fas fa-network-wired"></i></div>
      <h5>FleetNET</h5>
      <p>Commercial operator messages to vessel groups</p>
    </div>
    <div class="traffic-card routine">
      <div class="traffic-icon"><i class="fas fa-comments"></i></div>
      <h5>Routine Messaging</h5>
      <p>Vessel-shore LES communications</p>
    </div>
    <div class="traffic-card system">
      <div class="traffic-icon"><i class="fas fa-cogs"></i></div>
      <h5>System Signalling</h5>
      <p>Network control and terminal management</p>
    </div>
  </div>
</div>

<div class="info-box">
  <i class="fas fa-info-circle"></i>
  <p>Depending on the satellite footprint and local RF conditions, multiple STD-C channels may be active simultaneously. When using a wideband SDR such as the Airspy R2, it is possible to monitor several of these channels at the same time.</p>
</div>

<div class="data-volume">
  <i class="fas fa-database"></i>
  <p>Over extended monitoring periods, the message log can quickly accumulate a large volume of maritime communication data.</p>
</div>

---

## <i class="fas fa-flag-checkered"></i> Final Thoughts

<div class="conclusion-panel">
  <p>Receiving and decoding Inmarsat STD-C signals is a rewarding SDR project that demonstrates how accessible satellite communications monitoring has become with modern software-defined radio hardware. Because STD-C channels are relatively narrowband and strong across most of the satellite footprint, they can be received reliably with fairly modest equipment.</p>
</div>

<div class="experiment-stats">
  <div class="stat-card region">
    <div class="stat-icon"><i class="fas fa-globe-asia"></i></div>
    <div class="stat-content">
      <div class="stat-value">IOR</div>
      <div class="stat-label">Indian Ocean Region</div>
    </div>
  </div>
  <div class="stat-card channels">
    <div class="stat-icon"><i class="fas fa-broadcast-tower"></i></div>
    <div class="stat-content">
      <div class="stat-value">11</div>
      <div class="stat-label">Channels Observable</div>
    </div>
  </div>
  <div class="stat-card hardware">
    <div class="stat-icon"><i class="fas fa-microchip"></i></div>
    <div class="stat-content">
      <div class="stat-value">Airspy R2</div>
      <div class="stat-label">Primary SDR Used</div>
    </div>
  </div>
</div>

<div class="channel-breakdown">
  <h4><i class="fas fa-sitemap"></i> Channel Breakdown</h4>
  <div class="breakdown-grid">
    <div class="breakdown-item ncs">
      <span class="breakdown-count">1</span>
      <span class="breakdown-type">NCS Channel</span>
      <span class="breakdown-note">(Spectrum edge)</span>
    </div>
    <div class="breakdown-item les">
      <span class="breakdown-count">10</span>
      <span class="breakdown-type">LES Channels</span>
      <span class="breakdown-note">(Simultaneously decoded)</span>
    </div>
  </div>
</div>

<div class="highlight-box potential">
  <i class="fas fa-rocket"></i>
  <p>The NCS channel, however, was located further away in the spectrum and could not be included within the same receiver bandwidth during my tests. With wider-band SDR hardware such as a <strong>HackRF</strong> or <strong>PlutoSDR</strong>, it may be possible to capture the entire STD-C channel set within a single spectrum window.</p>
</div>

<div class="final-summary">
  <p>Overall, STD-C reception is an excellent introduction to <strong>L-band satellite monitoring</strong> and provides a fascinating glimpse into real-world maritime communications. With the right antenna and a bit of experimentation, it is possible to continuously monitor satellite messaging traffic from ships operating across vast ocean regions.</p>
</div>

<div class="post-footer">
  <div class="qrz-badge">
    <i class="fas fa-id-card"></i>
    <span>73 de <strong>A65KJ</strong></span>
  </div>
  <div class="post-tags">
    <span class="tag"><i class="fas fa-tag"></i> Inmarsat</span>
    <span class="tag"><i class="fas fa-tag"></i> STD-C</span>
    <span class="tag"><i class="fas fa-tag"></i> Maritime</span>
    <span class="tag"><i class="fas fa-tag"></i> L-Band</span>
    <span class="tag"><i class="fas fa-tag"></i> SDR</span>
  </div>
</div>

</div>

<style>
/* Post-specific styling that complements your existing theme */
.post-hero {
  text-align: center;
  padding: 3rem 0;
  border-bottom: 2px solid var(--border-color, #333);
  margin-bottom: 2rem;
}

.frequency-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #00d4ff22, #ff6b3522);
  border: 1px solid #00d4ff;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #00d4ff;
  margin-bottom: 1rem;
}

.frequency-badge i {
  color: #ff6b35;
}

.post-title {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.post-title .highlight {
  color: #00d4ff;
  display: block;
  font-size: 1.5rem;
  margin-top: 0.5rem;
}

.meta-bar {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  color: #888;
  font-size: 0.9rem;
}

.meta-item i {
  color: #ff6b35;
  margin-right: 0.3rem;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.intro-panel {
  display: flex;
  gap: 1.5rem;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-left: 4px solid #00d4ff;
  padding: 1.5rem;
  border-radius: 0 8px 8px 0;
  margin: 2rem 0;
}

.panel-icon {
  font-size: 2rem;
  color: #00d4ff;
  flex-shrink: 0;
}

.panel-content p {
  margin: 0;
  line-height: 1.6;
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.spec-card {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s, border-color 0.2s;
}

.spec-card:hover {
  transform: translateY(-2px);
  border-color: #00d4ff;
}

.spec-icon {
  font-size: 1.5rem;
  color: #ff6b35;
  margin-bottom: 0.5rem;
}

.spec-label {
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.spec-value {
  font-size: 1.3rem;
  font-weight: bold;
  color: #00d4ff;
  margin: 0.3rem 0;
}

.spec-detail {
  font-size: 0.85rem;
  color: #666;
}

h2 {
  color: #00d4ff;
  border-bottom: 2px solid #333;
  padding-bottom: 0.5rem;
  margin-top: 3rem;
}

h2 i {
  margin-right: 0.5rem;
  color: #ff6b35;
}

h3 {
  color: #fff;
  margin-top: 2rem;
}

h3 i {
  color: #00d4ff;
  margin-right: 0.5rem;
}

.image-container {
  margin: 2rem 0;
  background: #0a0a0a;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #333;
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
}

.image-container figcaption {
  padding: 0.75rem 1rem;
  background: #1a1a1a;
  color: #888;
  font-size: 0.85rem;
  border-top: 1px solid #333;
}

.image-container figcaption i {
  color: #00d4ff;
  margin-right: 0.3rem;
}

.channel-types {
  display: grid;
  gap: 1.5rem;
  margin: 2rem 0;
}

.channel-card {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
}

.channel-card.ncs {
  border-left: 4px solid #00d4ff;
}

.channel-card.les {
  border-left: 4px solid #ff6b35;
}

.channel-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #0f0f0f;
  border-bottom: 1px solid #333;
}

.channel-header i {
  font-size: 1.3rem;
  color: #00d4ff;
}

.channel-header h3 {
  margin: 0;
  flex: 1;
  font-size: 1.1rem;
}

.channel-badge {
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}

.channel-badge.primary {
  background: #00d4ff22;
  color: #00d4ff;
  border: 1px solid #00d4ff;
}

.channel-badge.secondary {
  background: #ff6b3522;
  color: #ff6b35;
  border: 1px solid #ff6b35;
}

.channel-body {
  padding: 1.5rem;
}

.service-list {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.service-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #0f0f0f;
  border-radius: 6px;
  border: 1px solid #222;
}

.service-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a2e;
  border-radius: 50%;
  flex-shrink: 0;
}

.service-item.safetynet .service-icon {
  color: #00d4ff;
}

.service-item.fleetnet .service-icon {
  color: #ff6b35;
}

.service-info h4 {
  margin: 0 0 0.3rem 0;
  color: #fff;
}

.service-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #aaa;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
}

.feature-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #222;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.feature-list li:last-child {
  border-bottom: none;
}

.feature-list i {
  color: #00d4ff;
}

.info-box {
  display: flex;
  gap: 1rem;
  background: #1a1a2e;
  border: 1px solid #00d4ff44;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.info-box.frequency-range {
  background: linear-gradient(135deg, #1a1a2e, #0f1419);
}

.info-icon {
  font-size: 1.5rem;
  color: #00d4ff;
  flex-shrink: 0;
}

.info-content {
  line-height: 1.6;
}

.highlight-box {
  display: flex;
  gap: 1rem;
  background: linear-gradient(135deg, #ff6b3511, #ff6b3522);
  border-left: 4px solid #ff6b35;
  padding: 1.5rem;
  border-radius: 0 8px 8px 0;
  margin: 2rem 0;
}

.highlight-box i {
  font-size: 1.5rem;
  color: #ff6b35;
  flex-shrink: 0;
}

.highlight-box p {
  margin: 0;
}

.equipment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.equipment-card {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
  position: relative;
}

.equipment-card.recommended {
  border-color: #00d4ff;
  background: linear-gradient(135deg, #1a1a1a, #00d4ff08);
}

.equipment-badge {
  position: absolute;
  top: -10px;
  right: 1rem;
  background: #00d4ff;
  color: #000;
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: bold;
}

.equipment-card h4 {
  margin: 0 0 1rem 0;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.equipment-card h4 i {
  color: #00d4ff;
}

.equipment-card ul {
  margin: 0;
  padding-left: 1.2rem;
  color: #aaa;
  font-size: 0.9rem;
}

.equipment-card li {
  margin-bottom: 0.3rem;
}

.tip-box {
  display: flex;
  gap: 1rem;
  background: #2d2d1a;
  border: 1px solid #555533;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.tip-box i {
  font-size: 1.5rem;
  color: #ffcc00;
  flex-shrink: 0;
}

.tip-box.youtube {
  flex-direction: column;
  background: linear-gradient(135deg, #1a1a1a, #ff000011);
  border-color: #ff000044;
}

.tip-box.youtube i {
  color: #ff0000;
}

.yt-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #ff6b35;
  text-decoration: none;
  margin-top: 0.5rem;
  font-weight: bold;
}

.yt-link:hover {
  color: #00d4ff;
}

.method-card {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
  margin: 2rem 0;
}

.method-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: #0f0f0f;
  border-bottom: 1px solid #333;
  font-weight: bold;
}

.method-header.sdrsharp {
  background: linear-gradient(90deg, #6720b3, #4a148c);
  color: #fff;
}

.method-header i {
  font-size: 1.2rem;
}

.steps {
  padding: 1.5rem;
}

.step {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: flex-start;
}

.step:last-child {
  margin-bottom: 0;
}

.step-number {
  width: 28px;
  height: 28px;
  background: #00d4ff;
  color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  line-height: 1.5;
}

.step-content code {
  background: #0a0a0a;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  color: #00d4ff;
  font-family: 'Courier New', monospace;
}

.status-indicator {
  padding: 0 1.5rem 1.5rem 1.5rem;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.status.locked {
  background: #00d4ff22;
  border: 1px solid #00d4ff;
  color: #00d4ff;
}

.status i {
  font-size: 1rem;
}

.download-box {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  background: linear-gradient(135deg, #1a2f1a, #0f1f0f);
  border: 2px dashed #4caf50;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.download-box > i {
  font-size: 2.5rem;
  color: #4caf50;
}

.download-content h4 {
  margin: 0 0 0.5rem 0;
  color: #4caf50;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #4caf50;
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s;
}

.download-btn:hover {
  background: #66bb6a;
}

.warning-box {
  display: flex;
  gap: 1rem;
  background: #2d1a1a;
  border: 1px solid #ff4444;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.warning-box i {
  font-size: 1.5rem;
  color: #ff4444;
  flex-shrink: 0;
}

.software-requirements {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.software-requirements h4 {
  margin: 0 0 1rem 0;
  color: #00d4ff;
}

.req-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.req-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: #0f0f0f;
  border-radius: 4px;
}

.req-item i {
  color: #4caf50;
}

.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.config-step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #0f0f0f;
  border-radius: 6px;
  border: 1px solid #222;
}

.config-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a2e;
  border-radius: 50%;
  color: #00d4ff;
  font-size: 0.9rem;
}

.config-text code {
  background: #1a1a1a;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  color: #ff6b35;
}

.repeat-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #1a1a2e;
  border: 1px solid #00d4ff44;
  border-radius: 6px;
  padding: 1rem;
  margin: 1.5rem 0;
  color: #00d4ff;
}

.config-sections {
  display: grid;
  gap: 1.5rem;
  margin: 2rem 0;
}

.config-section {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
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

.check-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.check-list li {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.check-list i {
  color: #4caf50;
}

.action-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(90deg, #00d4ff22, transparent);
  border-left: 4px solid #00d4ff;
  padding: 1rem 1.5rem;
  margin: 2rem 0;
  border-radius: 0 8px 8px 0;
}

.action-box i {
  color: #00d4ff;
  font-size: 1.2rem;
}

.quickui-steps {
  display: grid;
  gap: 1rem;
  margin: 2rem 0;
}

.step-card {
  display: flex;
  gap: 1rem;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
  transition: border-color 0.2s;
}

.step-card:hover {
  border-color: #00d4ff;
}

.step-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #00d4ff22, #00d4ff11);
  border: 1px solid #00d4ff;
  border-radius: 50%;
  color: #00d4ff;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.step-info h5 {
  margin: 0 0 0.3rem 0;
  color: #fff;
}

.step-info p {
  margin: 0;
  color: #aaa;
  font-size: 0.9rem;
}

.results-intro {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 2rem 0;
}

.traffic-types {
  margin: 2rem 0;
}

.traffic-types h4 {
  color: #00d4ff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.traffic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.traffic-card {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s;
}

.traffic-card:hover {
  transform: translateY(-2px);
}

.traffic-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  border-radius: 50%;
  font-size: 1.3rem;
}

.traffic-card.safetynet .traffic-icon {
  background: #00d4ff22;
  color: #00d4ff;
  border: 1px solid #00d4ff;
}

.traffic-card.fleetnet .traffic-icon {
  background: #ff6b3522;
  color: #ff6b35;
  border: 1px solid #ff6b35;
}

.traffic-card.routine .traffic-icon {
  background: #4caf5022;
  color: #4caf50;
  border: 1px solid #4caf50;
}

.traffic-card.system .traffic-icon {
  background: #ffcc0022;
  color: #ffcc00;
  border: 1px solid #ffcc00;
}

.traffic-card h5 {
  margin: 0 0 0.5rem 0;
  color: #fff;
}

.traffic-card p {
  margin: 0;
  font-size: 0.85rem;
  color: #888;
}

.data-volume {
  display: flex;
  gap: 1rem;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  align-items: center;
}

.data-volume i {
  font-size: 2rem;
  color: #00d4ff;
}

.data-volume p {
  margin: 0;
}

.conclusion-panel {
  background: linear-gradient(135deg, #1a1a2e, #0f0f1a);
  border: 1px solid #00d4ff33;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
}

.experiment-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
}

.stat-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #00d4ff22, #ff6b3522);
  border-radius: 50%;
  font-size: 1.3rem;
  color: #00d4ff;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
}

.stat-label {
  font-size: 0.85rem;
  color: #888;
}

.channel-breakdown {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.channel-breakdown h4 {
  margin: 0 0 1rem 0;
  color: #00d4ff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breakdown-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.breakdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: #0f0f0f;
  border-radius: 6px;
  text-align: center;
}

.breakdown-item.ncs {
  border: 1px solid #00d4ff44;
}

.breakdown-item.les {
  border: 1px solid #ff6b3544;
}

.breakdown-count {
  font-size: 2rem;
  font-weight: bold;
  color: #00d4ff;
}

.breakdown-item.les .breakdown-count {
  color: #ff6b35;
}

.breakdown-type {
  font-weight: bold;
  color: #fff;
  margin: 0.3rem 0;
}

.breakdown-note {
  font-size: 0.8rem;
  color: #666;
}

.final-summary {
  background: linear-gradient(135deg, #1a2f1a, #0f1f0f);
  border-left: 4px solid #4caf50;
  padding: 1.5rem;
  border-radius: 0 8px 8px 0;
  margin: 2rem 0;
  line-height: 1.6;
}

.post-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 2px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.qrz-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #1a1a1a;
  border: 1px solid #ff6b35;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #ff6b35;
}

.qrz-badge i {
  font-size: 1.2rem;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: #1a1a1a;
  border: 1px solid #333;
  padding: 0.3rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  color: #888;
}

.tag i {
  color: #00d4ff;
  font-size: 0.7rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .post-title {
    font-size: 1.8rem;
  }

  .post-title .highlight {
    font-size: 1.2rem;
  }

  .meta-bar {
    gap: 1rem;
  }

  .intro-panel {
    flex-direction: column;
    text-align: center;
  }

  .channel-header {
    flex-wrap: wrap;
  }

  .post-footer {
    flex-direction: column;
    text-align: center;
  }
}
</style>
