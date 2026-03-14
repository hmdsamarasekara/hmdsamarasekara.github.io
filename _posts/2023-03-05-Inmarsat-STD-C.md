---
layout: post
title: "Decoding Inmarsat STD-C Maritime Satellite Messages"
date: 2023-03-05 12:00:00 +0530
tags: [inmarsat, std-c, maritime, sdr, l-band, satellite, decoding]
categories: [Inmarsat]
excerpt: "A comprehensive guide to receiving and decoding Inmarsat STD-C maritime safety messages using SDR hardware and Skytale-C decoder."
---

&lt;div class="stdc-post"&gt;

## Introduction

In a previous post I explored **Inmarsat AERO ACARS reception**, demonstrating how aviation datalink traffic can be received from the Inmarsat satellite network using inexpensive Software Defined Radio (SDR) hardware. While AERO channels primarily serve aircraft communications, the Inmarsat system also supports a number of services designed for the maritime sector.

One of the most widely used of these services is **Inmarsat STD-C**, a low-bandwidth messaging system used by ships, offshore platforms, and maritime authorities to exchange short text messages, operational data, and safety information. STD-C terminals are installed on thousands of vessels worldwide and are a core component of the **Global Maritime Distress and Safety System (GMDSS)**.

STD-C transmissions operate in the **L-band around 1.5 GHz** and use a relatively narrow **1200 bps BPSK data channel**, which makes them surprisingly easy to receive with modest antennas and common SDR hardware.

---

## STD-C Channel Types

&lt;figure class="image-container wide"&gt;
  &lt;img src="{{ '/assets/images/STD-C-Full-Range.jpg' | relative_url }}" alt="STD-C Channels View" loading="lazy"&gt;
  &lt;figcaption&gt;
    &lt;i class="fas fa-image"&gt;&lt;/i&gt; STD-C Channels View
  &lt;/figcaption&gt;
&lt;/figure&gt;

STD-C traffic is divided into two main types of channels:

**Network Control Station (NCS)** channels act as the primary broadcast channel for the satellite region. These channels transmit **Enhanced Group Call (EGC)** messages, which are broadcast messages intended for groups of vessels within the satellite footprint. Two major EGC services are commonly observed:

- **SafetyNET** – Broadcasts maritime safety information such as weather warnings, navigational hazards, and search-and-rescue alerts.
- **FleetNET** – A commercial messaging service used by fleet operators to distribute operational messages to multiple vessels.

The second type are **Land Earth Station (LES)** channels. These channels carry individual messaging traffic between vessels and shore infrastructure. Messages transmitted on LES channels may include:

- Ship-to-shore communications
- Ship-to-ship messages
- Routine operational data
- Ship Security Alert System (SSAS) notifications

Because these signals are continuously transmitted and relatively strong across most of the satellite footprint, they provide an excellent target for SDR experimentation.

In this post I will demonstrate how **Inmarsat STD-C signals can be received and decoded**, and how multiple channels can be monitored simultaneously using **SDR++ and Skytale-C**.

&lt;div class="note-box"&gt;
  &lt;i class="fas fa-info-circle"&gt;&lt;/i&gt;
  &lt;p&gt;STD-C channels are typically located within the &lt;strong&gt;Inmarsat downlink band between approximately 1537 MHz and 1545 MHz&lt;/strong&gt;. Individual channels are narrowband transmissions spaced across this portion of the L-band spectrum. The exact channel assignments depend on the satellite region and network configuration.&lt;/p&gt;
&lt;/div&gt;

---

## Antenna Setup

&lt;figure class="image-container"&gt;
  &lt;img src="{{ '/assets/images/Antenna-Setup.jpg' | relative_url }}" alt="Antenna Options" loading="lazy"&gt;
  &lt;figcaption&gt;
    &lt;i class="fas fa-image"&gt;&lt;/i&gt; Antenna Options
  &lt;/figcaption&gt;
&lt;/figure&gt;

Compared to some other L-band services, **Inmarsat STD-C signals are relatively strong**, which makes them accessible using fairly modest receiving equipment. A simple patch antenna designed for the L-band is often sufficient for reliable reception.

One convenient option is the **RTL-SDR Blog L-Band Patch Antenna**, which includes an integrated LNA and filter. The antenna can be powered directly from an SDR that supports **bias-tee power**, making it a compact and easy solution for continuous outdoor operation.

For improved signal quality, a **small satellite dish with an L-band helical feed** can also be used. A dish provides additional gain and better signal-to-noise ratio, which becomes especially useful when attempting to monitor multiple channels simultaneously or when operating in environments with higher RF noise.

Reception can be further improved by adding an **external L-band filtered LNA**, such as the Nooelec SAWbird IO or SAWbird+ IO. These devices provide additional amplification while filtering out strong out-of-band signals that might otherwise degrade reception.

&lt;figure class="image-container"&gt;
  &lt;img src="{{ '/assets/images/STD-C-Diagram.png' | relative_url }}" alt="Signal Path Diagram" loading="lazy"&gt;
  &lt;figcaption&gt;
    &lt;i class="fas fa-image"&gt;&lt;/i&gt; Signal Path Diagram
  &lt;/figcaption&gt;
&lt;/figure&gt;

More details on antenna construction can be found in my previous post on **Inmarsat AERO ACARS reception**, where the antenna setup is discussed in greater depth.

---

## Software Setup

There are several software options available for decoding Inmarsat STD-C signals, although many of them are proprietary or commercial. A popular free option is **Skytale-C** by microp11, which provides reliable decoding and integrates directly with the **SDR# community package**.

### Basic STD-C Decoding (SDR#)

The easiest way to get started is by using **SDR# (SDRSharp)** together with the Skytale-C plugin.

&lt;figure class="image-container"&gt;
  &lt;img src="{{ '/assets/images/Skytale-C-SDRSharp-Setup.png' | relative_url }}" alt="Skytale-C SDRSharp Plug-in" loading="lazy"&gt;
  &lt;figcaption&gt;
    &lt;i class="fas fa-image"&gt;&lt;/i&gt; Skytale-C SDRSharp Plug-in
  &lt;/figcaption&gt;
&lt;/figure&gt;

&lt;ol class="steps-list"&gt;
  &lt;li&gt;Download the &lt;strong&gt;SDRSharp Community Package&lt;/strong&gt;, which already includes the Skytale-C plugin.&lt;/li&gt;
  &lt;li&gt;Tune SDR# to an active STD-C channel in the L-band.&lt;/li&gt;
  &lt;li&gt;Set the receiver bandwidth to approximately &lt;strong&gt;4 kHz&lt;/strong&gt;.&lt;/li&gt;
  &lt;li&gt;Open &lt;strong&gt;Skytale-C&lt;/strong&gt; from the plugin menu.&lt;/li&gt;
  &lt;li&gt;Enable the &lt;strong&gt;"Enabled"&lt;/strong&gt; and &lt;strong&gt;"Auto Tracking"&lt;/strong&gt; options.&lt;/li&gt;
&lt;/ol&gt;

When the decoder successfully locks onto the signal, the status indicator in the top-right corner will display &lt;strong&gt;"Locked"&lt;/strong&gt;, and the constellation diagram will stabilize. Once locked, Skytale-C will begin decoding STD-C messages automatically.

Clicking the &lt;strong&gt;"Quick UI"&lt;/strong&gt; button opens a separate window that displays decoded messages in real time.

&lt;div class="download-box"&gt;
  &lt;i class="fas fa-download"&gt;&lt;/i&gt;
  &lt;div class="download-content"&gt;
    &lt;span&gt;Download the &lt;strong&gt;Skytale-C SDRSharp Plug-in&lt;/strong&gt; here:&lt;/span&gt;
    &lt;a href="https://github.com/microp11/sdrsharp-scytalec/releases" target="_blank" class="download-link"&gt;
      &lt;i class="fas fa-external-link-alt"&gt;&lt;/i&gt; GitHub Releases (microp11/sdrsharp-scytalec)
    &lt;/a&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;div class="note-box youtube"&gt;
  &lt;i class="fab fa-youtube"&gt;&lt;/i&gt;
  &lt;div&gt;
    &lt;p&gt;&lt;strong&gt;Note:&lt;/strong&gt; The developer of Skytale-C, microp11, maintains a YouTube channel where he publishes detailed videos demonstrating many of the software's features, configuration options, and advanced usage scenarios. These tutorials are very helpful for understanding the full capabilities of the decoder and for troubleshooting setup issues.&lt;/p&gt;
    &lt;a href="https://www.youtube.com/@Paul-microp11" target="_blank" class="external-link"&gt;
      &lt;i class="fas fa-external-link-alt"&gt;&lt;/i&gt; youtube.com/@Paul-microp11
    &lt;/a&gt;
  &lt;/div&gt;
&lt;/div&gt;

---

### Decoding Multiple Channels Simultaneously

It is also possible to decode &lt;strong&gt;multiple STD-C channels simultaneously&lt;/strong&gt;. While several approaches exist, using &lt;strong&gt;SDR++ with its built-in network streaming features&lt;/strong&gt; is one of the most efficient methods in terms of CPU usage.

&lt;div class="warning-box"&gt;
  &lt;i class="fas fa-exclamation-triangle"&gt;&lt;/i&gt;
  &lt;p&gt;Monitoring multiple channels requires an SDR with sufficient instantaneous bandwidth. Devices such as the &lt;strong&gt;Airspy R2&lt;/strong&gt; work well for this purpose, whereas RTL-SDR receivers typically do not have enough bandwidth to cover all STD-C channels at once.&lt;/p&gt;
&lt;/div&gt;

First download the following software components:

- **SDR++**
- **Skytale-C**
- **Skytale-C Quick UI**

#### Creating Virtual Receivers in SDR++

Open SDR++ and navigate to the &lt;strong&gt;Module Manager&lt;/strong&gt;. Under the &lt;strong&gt;Radio&lt;/strong&gt; module:

&lt;figure class="image-container"&gt;
  &lt;img src="{{ '/assets/images/SDR++ Radio Setup.png' | relative_url }}" alt="Add new VFO" loading="lazy"&gt;
  &lt;figcaption&gt;
    &lt;i class="fas fa-image"&gt;&lt;/i&gt; Add new VFO
  &lt;/figcaption&gt;
&lt;/figure&gt;

&lt;ol class="steps-list"&gt;
  &lt;li&gt;Create a new receiver instance and assign it a name (for example &lt;strong&gt;CH01&lt;/strong&gt;).&lt;/li&gt;
  &lt;li&gt;Click the &lt;strong&gt;"+"&lt;/strong&gt; button to add the receiver.&lt;/li&gt;
  &lt;li&gt;A new &lt;strong&gt;VFO&lt;/strong&gt; will appear in the spectrum display.&lt;/li&gt;
  &lt;li&gt;Select the VFO and tune it to the first STD-C channel.&lt;/li&gt;
&lt;/ol&gt;

#### Streaming IQ Data to Skytale-C

Next, configure the network output:

&lt;figure class="image-container"&gt;
  &lt;img src="{{ '/assets/images/SDR++ Sinks Setup.png' | relative_url }}" alt="Audio Routing" loading="lazy"&gt;
  &lt;figcaption&gt;
    &lt;i class="fas fa-image"&gt;&lt;/i&gt; Audio Routing
  &lt;/figcaption&gt;
&lt;/figure&gt;

&lt;ol class="steps-list"&gt;
  &lt;li&gt;Open the &lt;strong&gt;Sinks&lt;/strong&gt; tab in SDR++.&lt;/li&gt;
  &lt;li&gt;Select the newly created VFO.&lt;/li&gt;
  &lt;li&gt;Choose &lt;strong&gt;Network&lt;/strong&gt; as the output type.&lt;/li&gt;
  &lt;li&gt;Enter &lt;strong&gt;127.0.0.1&lt;/strong&gt; as the destination address.&lt;/li&gt;
  &lt;li&gt;Assign a unique &lt;strong&gt;TCP port number&lt;/strong&gt;.&lt;/li&gt;
  &lt;li&gt;Set the protocol to &lt;strong&gt;TCP&lt;/strong&gt;.&lt;/li&gt;
  &lt;li&gt;Click &lt;strong&gt;Start&lt;/strong&gt;.&lt;/li&gt;
&lt;/ol&gt;

This will begin streaming the channel's IQ data through the selected TCP port to Skytale-C.

Repeat this process for each STD-C channel you want to monitor.

&lt;figure class="image-container wide"&gt;
  &lt;img src="{{ '/assets/images/SDR++ Multi Radio Setup.png' | relative_url }}" alt="SDR++ Multi-VFO Configuration" loading="lazy"&gt;
  &lt;figcaption&gt;
    &lt;i class="fas fa-image"&gt;&lt;/i&gt; SDR++ Multi-VFO Configuration
  &lt;/figcaption&gt;
&lt;/figure&gt;

---

### Configuring Skytale-C

Extract the &lt;strong&gt;Skytale-C&lt;/strong&gt; archive into a separate folder for each channel and rename the folder to match the corresponding VFO (for example &lt;em&gt;CH01&lt;/em&gt;).

&lt;figure class="image-container"&gt;
  &lt;img src="{{ '/assets/images/Folder Structure.png' | relative_url }}" alt="Folder structure should look like this" loading="lazy"&gt;
  &lt;figcaption&gt;
    &lt;i class="fas fa-image"&gt;&lt;/i&gt; Folder structure should look like this
  &lt;/figcaption&gt;
&lt;/figure&gt;

Inside Skytale-C:

&lt;div class="config-section"&gt;
  &lt;h4&gt;&lt;i class="fas fa-sign-in-alt"&gt;&lt;/i&gt; Source Tab&lt;/h4&gt;
  &lt;ul&gt;
    &lt;li&gt;Enable the &lt;strong&gt;TCP&lt;/strong&gt; input option.&lt;/li&gt;
    &lt;li&gt;Enter &lt;strong&gt;127.0.0.1&lt;/strong&gt; as the source address.&lt;/li&gt;
    &lt;li&gt;Enter the TCP port assigned to that VFO.&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;

&lt;figure class="image-container"&gt;
  &lt;img src="{{ '/assets/images/Skytale-C-Setup.png' | relative_url }}" alt="Skytale-C Setup" loading="lazy"&gt;
  &lt;figcaption&gt;
    &lt;i class="fas fa-image"&gt;&lt;/i&gt; Skytale-C Setup
  &lt;/figcaption&gt;
&lt;/figure&gt;

Next configure the output settings:

&lt;div class="config-section"&gt;
  &lt;h4&gt;&lt;i class="fas fa-sign-out-alt"&gt;&lt;/i&gt; Destination UDP&lt;/h4&gt;
  &lt;ul&gt;
    &lt;li&gt;Enter &lt;strong&gt;127.0.0.1&lt;/strong&gt;.&lt;/li&gt;
    &lt;li&gt;Assign a unique &lt;strong&gt;UDP port number&lt;/strong&gt;.&lt;/li&gt;
    &lt;li&gt;Enable the &lt;strong&gt;Transmit&lt;/strong&gt; checkbox.&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;

Press the &lt;strong&gt;Play&lt;/strong&gt; button to start decoding.

This configuration forwards decoded messages via UDP to the Skytale-C Quick UI interface.

---

### Configuring Skytale-C Quick UI

Finally, extract and launch the &lt;strong&gt;Skytale-C Quick UI&lt;/strong&gt; application.

&lt;figure class="image-container"&gt;
  &lt;img src="{{ '/assets/images/Skytale-C-Quick-UI-Setup.png' | relative_url }}" alt="Skytale-C Quick-UI Configuration" loading="lazy"&gt;
  &lt;figcaption&gt;
    &lt;i class="fas fa-image"&gt;&lt;/i&gt; Skytale-C Quick-UI Configuration
  &lt;/figcaption&gt;
&lt;/figure&gt;

&lt;ol class="steps-list"&gt;
  &lt;li&gt;Open the &lt;strong&gt;Sources&lt;/strong&gt; tab.&lt;/li&gt;
  &lt;li&gt;Enter the UDP port numbers previously configured in each Skytale-C instance.&lt;/li&gt;
  &lt;li&gt;Enable &lt;strong&gt;Log Messages&lt;/strong&gt; if you wish to save decoded messages to a file.&lt;/li&gt;
&lt;/ol&gt;

Click the &lt;strong&gt;Play&lt;/strong&gt; button to begin receiving decoded traffic. Active STD-C channel IDs will appear at the top of the interface as messages are received.

&lt;figure class="image-container wide"&gt;
  &lt;img src="{{ '/assets/images/Multiple Skytale Instances.png' | relative_url }}" alt="Running Multiple Instances of Skytale-C" loading="lazy"&gt;
  &lt;figcaption&gt;
    &lt;i class="fas fa-image"&gt;&lt;/i&gt; Running Multiple Instances of Skytale-C
  &lt;/figcaption&gt;
&lt;/figure&gt;

---

## Decoding Results

Once the receiver and decoder are configured correctly, decoded messages should begin appearing in the Skytale-C Quick UI interface within a few seconds.

&lt;figure class="image-container featured"&gt;
  &lt;img src="{{ '/assets/images/STD-C Quick UI.JPG' | relative_url }}" alt="STD-C Quick UI populated with decoded messages" loading="lazy"&gt;
  &lt;figcaption&gt;
    &lt;i class="fas fa-image"&gt;&lt;/i&gt; STD-C Quick UI populated with decoded messages
  &lt;/figcaption&gt;
&lt;/figure&gt;

During monitoring of the Indian Ocean Region satellite, several types of STD-C traffic can typically be observed, including:

- **SafetyNET broadcasts** containing maritime safety information such as weather warnings and navigational alerts.
- **FleetNET messages** used by commercial operators to communicate with groups of vessels.
- **Routine messaging traffic** exchanged between vessels and shore-based Land Earth Stations (LES).
- **System signalling messages** related to network control and terminal management.

Depending on the satellite footprint and local RF conditions, multiple STD-C channels may be active simultaneously. When using a wideband SDR such as the Airspy R2, it is possible to monitor several of these channels at the same time.

Over extended monitoring periods, the message log can quickly accumulate a large volume of maritime communication data.

---

## Final Thoughts

Receiving and decoding Inmarsat STD-C signals is a rewarding SDR project that demonstrates how accessible satellite communications monitoring has become with modern software-defined radio hardware. Because STD-C channels are relatively narrowband and strong across most of the satellite footprint, they can be received reliably with fairly modest equipment.

During my experiments in the &lt;strong&gt;Indian Ocean Region (IOR)&lt;/strong&gt; I was able to monitor multiple STD-C channels simultaneously. In total, &lt;strong&gt;11 channels were observable&lt;/strong&gt; in this region — consisting of one Network Control Station (NCS) channel and several Land Earth Station (LES) channels. Using an &lt;strong&gt;Airspy R2&lt;/strong&gt;, it was possible to decode all LES channels at the same time by streaming each channel to a separate Skytale-C instance.

The NCS channel, however, was located further away in the spectrum and could not be included within the same receiver bandwidth during my tests. With wider-band SDR hardware such as a &lt;strong&gt;HackRF&lt;/strong&gt; or &lt;strong&gt;PlutoSDR&lt;/strong&gt;, it may be possible to capture the entire STD-C channel set within a single spectrum window.

Overall, STD-C reception is an excellent introduction to &lt;strong&gt;L-band satellite monitoring&lt;/strong&gt; and provides a fascinating glimpse into real-world maritime communications. With the right antenna and a bit of experimentation, it is possible to continuously monitor satellite messaging traffic from ships operating across vast ocean regions.

&lt;div class="post-footer"&gt;
  &lt;div class="signature"&gt;
    &lt;i class="fas fa-satellite-dish"&gt;&lt;/i&gt;
    &lt;span&gt;73 de &lt;strong&gt;A65KJ&lt;/strong&gt;&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;/div&gt;

&lt;style&gt;
/* Scoped styles for STD-C post only */
.stdc-post {
  max-width: 800px;
  margin: 0 auto;
}

/* Image styling */
.stdc-post .image-container {
  margin: 2rem 0;
  background: #0a0a0a;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #333;
}

.stdc-post .image-container.wide {
  max-width: 100%;
}

.stdc-post .image-container.featured {
  border: 2px solid #00d4ff;
}

.stdc-post .image-container img {
  width: 100%;
  height: auto;
  display: block;
}

.stdc-post .image-container figcaption {
  padding: 0.75rem 1rem;
  background: #1a1a1a;
  color: #888;
  font-size: 0.85rem;
  border-top: 1px solid #333;
}

.stdc-post .image-container figcaption i {
  color: #00d4ff;
  margin-right: 0.3rem;
}

/* Note box */
.stdc-post .note-box {
  display: flex;
  gap: 1rem;
  background: #1a1a2e;
  border-left: 4px solid #00d4ff;
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 0 8px 8px 0;
  align-items: flex-start;
}

.stdc-post .note-box &gt; i {
  font-size: 1.3rem;
  color: #00d4ff;
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.stdc-post .note-box p {
  margin: 0;
  line-height: 1.6;
}

.stdc-post .note-box.youtube {
  background: #1a1a1a;
  border-left-color: #ff4444;
  flex-direction: column;
}

.stdc-post .note-box.youtube &gt; i {
  color: #ff4444;
}

.stdc-post .external-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: #ff6b35;
  text-decoration: none;
  margin-top: 0.5rem;
}

.stdc-post .external-link:hover {
  color: #00d4ff;
}

/* Steps list - properly structured as ordered list */
.stdc-post .steps-list {
  counter-reset: step;
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.stdc-post .steps-list li {
  position: relative;
  padding-left: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.6;
  list-style: none;
}

.stdc-post .steps-list li::before {
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
.stdc-post .download-box {
  display: flex;
  gap: 1rem;
  align-items: center;
  background: #1a2f1a;
  border: 1px solid #4caf50;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.stdc-post .download-box &gt; i {
  font-size: 2rem;
  color: #4caf50;
}

.stdc-post .download-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stdc-post .download-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #4caf50;
  text-decoration: none;
  font-weight: bold;
}

.stdc-post .download-link:hover {
  color: #66bb6a;
}

/* Warning box */
.stdc-post .warning-box {
  display: flex;
  gap: 1rem;
  background: #2d1a1a;
  border-left: 4px solid #ff4444;
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 0 8px 8px 0;
  align-items: flex-start;
}

.stdc-post .warning-box &gt; i {
  font-size: 1.3rem;
  color: #ff4444;
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.stdc-post .warning-box p {
  margin: 0;
  line-height: 1.6;
}

/* Config sections */
.stdc-post .config-section {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.stdc-post .config-section h4 {
  margin: 0 0 1rem 0;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stdc-post .config-section h4 i {
  color: #ff6b35;
}

.stdc-post .config-section ul {
  margin: 0;
  padding-left: 1.5rem;
}

.stdc-post .config-section li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

/* Post footer */
.stdc-post .post-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 2px solid #333;
}

.stdc-post .signature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ff6b35;
  font-size: 1.1rem;
}

.stdc-post .signature i {
  font-size: 1.3rem;
}

/* Headers */
.stdc-post h2 {
  color: #00d4ff;
  border-bottom: 2px solid #333;
  padding-bottom: 0.5rem;
  margin-top: 3rem;
}

.stdc-post h3 {
  color: #fff;
  margin-top: 2rem;
}

.stdc-post h4 {
  color: #ccc;
  margin-top: 1.5rem;
}

/* Strong and emphasis */
.stdc-post strong {
  color: #fff;
}

/* Code inline */
.stdc-post code {
  background: #0a0a0a;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  color: #00d4ff;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

/* Lists */
.stdc-post ul,
.stdc-post ol {
  line-height: 1.6;
}

.stdc-post li {
  margin-bottom: 0.5rem;
}

/* Paragraphs */
.stdc-post p {
  line-height: 1.7;
  margin-bottom: 1.2rem;
}

/* Horizontal rule */
.stdc-post hr {
  border: none;
  border-top: 1px solid #333;
  margin: 3rem 0;
}

/* Responsive */
@media (max-width: 768px) {
  .stdc-post .note-box,
  .stdc-post .warning-box,
  .stdc-post .download-box {
    flex-direction: column;
    text-align: center;
  }

  .stdc-post .steps-list li {
    padding-left: 2rem;
  }

  .stdc-post .steps-list li::before {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.8rem;
  }
}
&lt;/style&gt;
