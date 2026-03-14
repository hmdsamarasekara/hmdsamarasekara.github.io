---
layout: post
title: "Decoding Inmarsat STD-C Maritime Satellite Messages"
date: 2023-03-05 12:00:00 +0530
tags: [inmarsat, std-c, maritime, sdr, l-band, satellite, decoding]
categories: [Inmarsat]
excerpt: "A comprehensive guide to receiving and decoding Inmarsat STD-C maritime safety messages using SDR hardware and Skytale-C decoder."
---

<div class="content-wrapper">

## Introduction

In a previous post I explored **Inmarsat AERO ACARS reception**, demonstrating how aviation datalink traffic can be received from the Inmarsat satellite network using inexpensive Software Defined Radio (SDR) hardware. While AERO channels primarily serve aircraft communications, the Inmarsat system also supports a number of services designed for the maritime sector.

One of the most widely used of these services is **Inmarsat STD-C**, a low-bandwidth messaging system used by ships, offshore platforms, and maritime authorities to exchange short text messages, operational data, and safety information. STD-C terminals are installed on thousands of vessels worldwide and are a core component of the **Global Maritime Distress and Safety System (GMDSS)**.

STD-C transmissions operate in the **L-band around 1.5 GHz** and use a relatively narrow **1200 bps BPSK data channel**, which makes them surprisingly easy to receive with modest antennas and common SDR hardware.

---

## STD-C Channel Types

<figure class="image-container wide">
  <img src="{{ '/assets/images/STD-C-Full-Range.jpg' | relative_url }}" alt="STD-C Channels View" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> STD-C Channels View
  </figcaption>
</figure>

STD-C traffic is divided into two main types of channels:

**Network Control Station (NCS)** channels act as the primary broadcast channel for the satellite region. These channels transmit **Enhanced Group Call (EGC)** messages, which are broadcast messages intended for groups of vessels within the satellite footprint. Two major EGC services are commonly observed:

* **SafetyNET** – Broadcasts maritime safety information such as weather warnings, navigational hazards, and search-and-rescue alerts.
* **FleetNET** – A commercial messaging service used by fleet operators to distribute operational messages to multiple vessels.

The second type are **Land Earth Station (LES)** channels. These channels carry individual messaging traffic between vessels and shore infrastructure. Messages transmitted on LES channels may include:

* Ship-to-shore communications
* Ship-to-ship messages
* Routine operational data
* Ship Security Alert System (SSAS) notifications

Because these signals are continuously transmitted and relatively strong across most of the satellite footprint, they provide an excellent target for SDR experimentation.

In this post I will demonstrate how **Inmarsat STD-C signals can be received and decoded**, and how multiple channels can be monitored simultaneously using **SDR++ and Skytale-C**.

<div class="note-box">
  <i class="fas fa-info-circle"></i>
  <p>STD-C channels are typically located within the <strong>Inmarsat downlink band between approximately 1537 MHz and 1545 MHz</strong>. Individual channels are narrowband transmissions spaced across this portion of the L-band spectrum. The exact channel assignments depend on the satellite region and network configuration.</p>
</div>

---

## Antenna Setup

<figure class="image-container">
  <img src="{{ '/assets/images/Antenna-Setup.jpg' | relative_url }}" alt="Antenna Options" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> Antenna Options
  </figcaption>
</figure>

Compared to some other L-band services, **Inmarsat STD-C signals are relatively strong**, which makes them accessible using fairly modest receiving equipment. A simple patch antenna designed for the L-band is often sufficient for reliable reception.

One convenient option is the **RTL-SDR Blog L-Band Patch Antenna**, which includes an integrated LNA and filter. The antenna can be powered directly from an SDR that supports **bias-tee power**, making it a compact and easy solution for continuous outdoor operation.

For improved signal quality, a **small satellite dish with an L-band helical feed** can also be used. A dish provides additional gain and better signal-to-noise ratio, which becomes especially useful when attempting to monitor multiple channels simultaneously or when operating in environments with higher RF noise.

Reception can be further improved by adding an **external L-band filtered LNA**, such as the Nooelec SAWbird IO or SAWbird+ IO. These devices provide additional amplification while filtering out strong out-of-band signals that might otherwise degrade reception.

<figure class="image-container">
  <img src="{{ '/assets/images/STD-C-Diagram.png' | relative_url }}" alt="Signal Path Diagram" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> Signal Path Diagram
  </figcaption>
</figure>

More details on antenna construction can be found in my previous post on **Inmarsat AERO ACARS reception**, where the antenna setup is discussed in greater depth.

---

## Software Setup

There are several software options available for decoding Inmarsat STD-C signals, although many of them are proprietary or commercial. A popular free option is **Skytale-C** by microp11, which provides reliable decoding and integrates directly with the **SDR# community package**.

### Basic STD-C Decoding (SDR#)

The easiest way to get started is by using **SDR# (SDRSharp)** together with the Skytale-C plugin.

<figure class="image-container">
  <img src="{{ '/assets/images/Skytale-C-SDRSharp-Setup.png' | relative_url }}" alt="Skytale-C SDRSharp Plug-in" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> Skytale-C SDRSharp Plug-in
  </figcaption>
</figure>

<ol class="steps-list">
  <li>Download the <strong>SDRSharp Community Package</strong>, which already includes the Skytale-C plugin.</li>
  <li>Tune SDR# to an active STD-C channel in the L-band.</li>
  <li>Set the receiver bandwidth to approximately <strong>4 kHz</strong>.</li>
  <li>Open <strong>Skytale-C</strong> from the plugin menu.</li>
  <li>Enable the <strong>"Enabled"</strong> and <strong>"Auto Tracking"</strong> options.</li>
</ol>

When the decoder successfully locks onto the signal, the status indicator in the top-right corner will display <strong>"Locked"</strong>, and the constellation diagram will stabilize. Once locked, Skytale-C will begin decoding STD-C messages automatically.

Clicking the <strong>"Quick UI"</strong> button opens a separate window that displays decoded messages in real time.

<div class="download-box">
  <i class="fas fa-download"></i>
  <div class="download-content">
    <span>Download the <strong>Skytale-C SDRSharp Plug-in</strong> here:</span>
    <a href="{{ '/downloads/x64-SDRSharp.ScytaleC-10213.zip' | relative_url }}" class="download-link">
      <i class="fas fa-file-archive"></i> x64-SDRSharp.ScytaleC-10213.zip
    </a>
  </div>
</div>

<div class="note-box youtube">
  <i class="fab fa-youtube"></i>
  <div>
    <p><strong>Note:</strong> The developer of Skytale-C, microp11, maintains a YouTube channel where he publishes detailed videos demonstrating many of the software's features, configuration options, and advanced usage scenarios. These tutorials are very helpful for understanding the full capabilities of the decoder and for troubleshooting setup issues.</p>
    <a href="https://www.youtube.com/@Paul-microp11" target="_blank" class="external-link">
      <i class="fas fa-external-link-alt"></i> youtube.com/@Paul-microp11
    </a>
  </div>
</div>

---

### Decoding Multiple Channels Simultaneously

It is also possible to decode <strong>multiple STD-C channels simultaneously</strong>. While several approaches exist, using <strong>SDR++ with its built-in network streaming features</strong> is one of the most efficient methods in terms of CPU usage.

<div class="warning-box">
  <i class="fas fa-exclamation-triangle"></i>
  <p>Monitoring multiple channels requires an SDR with sufficient instantaneous bandwidth. Devices such as the <strong>Airspy R2</strong> work well for this purpose, whereas RTL-SDR receivers typically do not have enough bandwidth to cover all STD-C channels at once.</p>
</div>

First download the following software components:

<ul>
  <li><strong>SDR++</strong></li>
  <li><strong>Skytale-C</strong></li>
  <li><strong>Skytale-C Quick UI</strong></li>
</ul>

#### Creating Virtual Receivers in SDR++

Open SDR++ and navigate to the <strong>Module Manager</strong>. Under the <strong>Radio</strong> module:

<figure class="image-container">
  <img src="{{ '/assets/images/SDR++ Radio Setup.png' | relative_url }}" alt="Add new VFO" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> Add new VFO
  </figcaption>
</figure>

<ol class="steps-list">
  <li>Create a new receiver instance and assign it a name (for example <strong>CH01</strong>).</li>
  <li>Click the <strong>"+"</strong> button to add the receiver.</li>
  <li>A new <strong>VFO</strong> will appear in the spectrum display.</li>
  <li>Select the VFO and tune it to the first STD-C channel.</li>
</ol>

#### Streaming IQ Data to Skytale-C

Next, configure the network output:

<figure class="image-container">
  <img src="{{ '/assets/images/SDR++ Sinks Setup.png' | relative_url }}" alt="Audio Routing" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> Audio Routing
  </figcaption>
</figure>

<ol class="steps-list">
  <li>Open the <strong>Sinks</strong> tab in SDR++.</li>
  <li>Select the newly created VFO.</li>
  <li>Choose <strong>Network</strong> as the output type.</li>
  <li>Enter <strong>127.0.0.1</strong> as the destination address.</li>
  <li>Assign a unique <strong>TCP port number</strong>.</li>
  <li>Set the protocol to <strong>TCP</strong>.</li>
  <li>Click <strong>Start</strong>.</li>
</ol>

This will begin streaming the channel's IQ data through the selected TCP port to Skytale-C.

Repeat this process for each STD-C channel you want to monitor.

<figure class="image-container wide">
  <img src="{{ '/assets/images/SDR++ Multi Radio Setup.png' | relative_url }}" alt="SDR++ Multi-VFO Configuration" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> SDR++ Multi-VFO Configuration
  </figcaption>
</figure>

---

### Configuring Skytale-C

Extract the <strong>Skytale-C</strong> archive into a separate folder for each channel and rename the folder to match the corresponding VFO (for example <em>CH01</em>).

<figure class="image-container">
  <img src="{{ '/assets/images/Folder Structure.png' | relative_url }}" alt="Folder structure should look like this" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> Folder structure should look like this
  </figcaption>
</figure>

Inside Skytale-C:

<div class="config-section">
  <h4><i class="fas fa-sign-in-alt"></i> Source Tab</h4>
  <ul>
    <li>Enable the <strong>TCP</strong> input option.</li>
    <li>Enter <strong>127.0.0.1</strong> as the source address.</li>
    <li>Enter the TCP port assigned to that VFO.</li>
  </ul>
</div>

<figure class="image-container">
  <img src="{{ '/assets/images/Skytale-C-Setup.png' | relative_url }}" alt="Skytale-C Setup" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> Skytale-C Setup
  </figcaption>
</figure>

Next configure the output settings:

<div class="config-section">
  <h4><i class="fas fa-sign-out-alt"></i> Destination UDP</h4>
  <ul>
    <li>Enter <strong>127.0.0.1</strong>.</li>
    <li>Assign a unique <strong>UDP port number</strong>.</li>
    <li>Enable the <strong>Transmit</strong> checkbox.</li>
  </ul>
</div>

Press the <strong>Play</strong> button to start decoding.

This configuration forwards decoded messages via UDP to the Skytale-C Quick UI interface.

---

### Configuring Skytale-C Quick UI

Finally, extract and launch the <strong>Skytale-C Quick UI</strong> application.

<figure class="image-container">
  <img src="{{ '/assets/images/Skytale-C-Quick-UI-Setup.png' | relative_url }}" alt="Skytale-C Quick-UI Configuration" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> Skytale-C Quick-UI Configuration
  </figcaption>
</figure>

<ol class="steps-list">
  <li>Open the <strong>Sources</strong> tab.</li>
  <li>Enter the UDP port numbers previously configured in each Skytale-C instance.</li>
  <li>Enable <strong>Log Messages</strong> if you wish to save decoded messages to a file.</li>
</ol>

Click the <strong>Play</strong> button to begin receiving decoded traffic. Active STD-C channel IDs will appear at the top of the interface as messages are received.

<figure class="image-container wide">
  <img src="{{ '/assets/images/Multiple Skytale Instances.png' | relative_url }}" alt="Running Multiple Instances of Skytale-C" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> Running Multiple Instances of Skytale-C
  </figcaption>
</figure>

---

## Decoding Results

Once the receiver and decoder are configured correctly, decoded messages should begin appearing in the Skytale-C Quick UI interface within a few seconds.

<figure class="image-container featured">
  <img src="{{ '/assets/images/STD-C Quick UI.JPG' | relative_url }}" alt="STD-C Quick UI populated with decoded messages" loading="lazy">
  <figcaption>
    <i class="fas fa-image"></i> STD-C Quick UI populated with decoded messages
  </figcaption>
</figure>

During monitoring of the Indian Ocean Region satellite, several types of STD-C traffic can typically be observed, including:

<ul>
  <li><strong>SafetyNET broadcasts</strong> containing maritime safety information such as weather warnings and navigational alerts.</li>
  <li><strong>FleetNET messages</strong> used by commercial operators to communicate with groups of vessels.</li>
  <li><strong>Routine messaging traffic</strong> exchanged between vessels and shore-based Land Earth Stations (LES).</li>
  <li><strong>System signalling messages</strong> related to network control and terminal management.</li>
</ul>

Depending on the satellite footprint and local RF conditions, multiple STD-C channels may be active simultaneously. When using a wideband SDR such as the Airspy R2, it is possible to monitor several of these channels at the same time.

Over extended monitoring periods, the message log can quickly accumulate a large volume of maritime communication data.

---

## Final Thoughts

Receiving and decoding Inmarsat STD-C signals is a rewarding SDR project that demonstrates how accessible satellite communications monitoring has become with modern software-defined radio hardware. Because STD-C channels are relatively narrowband and strong across most of the satellite footprint, they can be received reliably with fairly modest equipment.

During my experiments in the <strong>Indian Ocean Region (IOR)</strong> I was able to monitor multiple STD-C channels simultaneously. In total, <strong>11 channels were observable</strong> in this region — consisting of one Network Control Station (NCS) channel and several Land Earth Station (LES) channels. Using an <strong>Airspy R2</strong>, it was possible to decode all LES channels at the same time by streaming each channel to a separate Skytale-C instance.

The NCS channel, however, was located further away in the spectrum and could not be included within the same receiver bandwidth during my tests. With wider-band SDR hardware such as a <strong>HackRF</strong> or <strong>PlutoSDR</strong>, it may be possible to capture the entire STD-C channel set within a single spectrum window.

Overall, STD-C reception is an excellent introduction to <strong>L-band satellite monitoring</strong> and provides a fascinating glimpse into real-world maritime communications. With the right antenna and a bit of experimentation, it is possible to continuously monitor satellite messaging traffic from ships operating across vast ocean regions.

<div class="post-footer">
  <div class="signature">
    <i class="fas fa-satellite-dish"></i>
    <span>73 de <strong>A65KJ</strong></span>
  </div>
</div>

</div>

<style>
/* Scoped styles for this post only */
.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

/* Image styling */
.image-container {
  margin: 2rem 0;
  background: #0a0a0a;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #333;
}

.image-container.wide {
  max-width: 100%;
}

.image-container.featured {
  border: 2px solid #00d4ff;
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

/* Note box */
.note-box {
  display: flex;
  gap: 1rem;
  background: #1a1a2e;
  border-left: 4px solid #00d4ff;
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 0 8px 8px 0;
  align-items: flex-start;
}

.note-box > i {
  font-size: 1.3rem;
  color: #00d4ff;
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.note-box p {
  margin: 0;
  line-height: 1.6;
}

.note-box.youtube {
  background: #1a1a1a;
  border-left-color: #ff4444;
  flex-direction: column;
}

.note-box.youtube > i {
  color: #ff4444;
}

.external-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: #ff6b35;
  text-decoration: none;
  margin-top: 0.5rem;
}

.external-link:hover {
  color: #00d4ff;
}

/* Steps list - properly structured as ordered list */
.steps-list {
  counter-reset: step;
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.steps-list li {
  position: relative;
  padding-left: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.6;
  list-style: none;
}

.steps-list li::before {
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

/* Download box */
.download-box {
  display: flex;
  gap: 1rem;
  align-items: center;
  background: #1a2f1a;
  border: 1px solid #4caf50;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.download-box > i {
  font-size: 2rem;
  color: #4caf50;
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
  color: #4caf50;
  text-decoration: none;
  font-weight: bold;
}

.download-link:hover {
  color: #66bb6a;
}

/* Warning box */
.warning-box {
  display: flex;
  gap: 1rem;
  background: #2d1a1a;
  border-left: 4px solid #ff4444;
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 0 8px 8px 0;
  align-items: flex-start;
}

.warning-box > i {
  font-size: 1.3rem;
  color: #ff4444;
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.warning-box p {
  margin: 0;
  line-height: 1.6;
}

/* Config sections */
.config-section {
  background: #1a1a1a;
  border: 1px solid #333;
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
}

/* Post footer */
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

/* Headers */
h2 {
  color: #00d4ff;
  border-bottom: 2px solid #333;
  padding-bottom: 0.5rem;
  margin-top: 3rem;
}

h3 {
  color: #fff;
  margin-top: 2rem;
}

h4 {
  color: #ccc;
  margin-top: 1.5rem;
}

/* Strong and emphasis */
strong {
  color: #fff;
}

/* Code inline */
code {
  background: #0a0a0a;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  color: #00d4ff;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

/* Lists */
ul, ol {
  line-height: 1.6;
}

li {
  margin-bottom: 0.5rem;
}

/* Paragraphs */
p {
  line-height: 1.7;
  margin-bottom: 1.2rem;
}

/* Horizontal rule */
hr {
  border: none;
  border-top: 1px solid #333;
  margin: 3rem 0;
}

/* Responsive */
@media (max-width: 768px) {
  .note-box,
  .warning-box,
  .download-box {
    flex-direction: column;
    text-align: center;
  }

  .steps-list li {
    padding-left: 2rem;
  }

  .steps-list li::before {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.8rem;
  }
}
</style>
