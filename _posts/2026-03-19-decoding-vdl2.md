---
layout: post
title: "Decoding VDL2 - The Next Generation Aviation Datalink"
date: 2026-03-19 17:18:00 +0400
tags: [vdl2, acars, aviation, sdr, vhf, aircraft, decoding, dumpvdl2]
categories: [Aviation]
excerpt: "A comprehensive guide to receiving and decoding VHF Data Link Mode 2 (VDL2) aviation communications using RTL-SDR and dumpvdl2."
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

</style>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-plane section-icon"></i>
    <h1 class="section-title">Introduction</h1>
  </div>

  <p>For decades, <strong>ACARS</strong> (Aircraft Communications Addressing and Reporting System) has been one of the most recognizable digital data systems used in aviation. Traditionally transmitted over <strong>VHF using simple MSK modulation at 2400 bps</strong>, ACARS allowed aircraft and ground stations to exchange short messages such as flight plans, weather reports, position reports, maintenance data, and operational instructions. It was a huge step forward from voice-only communication, reducing cockpit workload and improving airline operational efficiency.</p>

  <p>But as air traffic increased and the demand for data communications grew, legacy ACARS began to show its age. The system was relatively slow, inefficient in its use of spectrum, and increasingly congested in busy airspace. To address these limitations, the aviation industry introduced <strong>VDL Mode 2</strong> — short for <strong>VHF Data Link Mode 2</strong>.</p>

  <div class="hardware-grid" style="margin: 1.5rem 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
  <div class="hardware-item" style="border: 1px solid #00d4ff33; border-radius: 8px; padding: 1.5rem; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); text-align: center; display: flex; flex-direction: column; align-items: center;">
    <i class="fas fa-exchange-alt hardware-icon" style="color: #ff6b35; font-size: 2rem; margin-bottom: 0.75rem; display: block;"></i>
    <strong style="color: #f9fafb; display: block; margin-bottom: 0.75rem; font-size: 1.1rem;">Legacy ACARS</strong>
    <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
      <span class="bandwidth-badge" style="background: #ff6b3522; border: 1px solid #ff6b3533; color: #ff6b35; padding: 0.5rem 0.75rem; border-radius: 4px; font-size: 0.875rem; display: flex; flex-direction: column; align-items: center; min-width: 60px;">
        <span class="bitrate-number" style="font-size: 1.1rem; font-weight: bold; line-height: 1;">2400</span>
        <span class="bitrate-unit" style="font-size: 0.75rem; opacity: 0.9;">bps</span>
      </span>
      <span class="modulation-badge" style="background: #ff6b3522; border: 1px solid #ff6b3533; color: #ff6b35; padding: 0.5rem 0.75rem; border-radius: 4px; font-size: 0.875rem; display: flex; align-items: center; justify-content: center; min-width: 60px;">MSK</span>
    </div>
  </div>
  
  <div class="hardware-item" style="border: 1px solid #00d4ff33; border-radius: 8px; padding: 1.5rem; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); text-align: center; display: flex; flex-direction: column; align-items: center;">
    <i class="fas fa-rocket hardware-icon" style="color: #ff6b35; font-size: 2rem; margin-bottom: 0.75rem; display: block;"></i>
    <strong style="color: #f9fafb; display: block; margin-bottom: 0.75rem; font-size: 1.1rem;">VDL Mode 2</strong>
    <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
      <span class="bandwidth-badge high" style="background: #ff6b3522; border: 1px solid #ff6b3533; color: #ff6b35; padding: 0.5rem 0.75rem; border-radius: 4px; font-size: 0.875rem; display: flex; flex-direction: column; align-items: center; min-width: 60px;">
        <span class="bitrate-number" style="font-size: 1.1rem; font-weight: bold; line-height: 1;">31.5</span>
        <span class="bitrate-unit" style="font-size: 0.75rem; opacity: 0.9;">kbps</span>
      </span>
      <span class="modulation-badge" style="background: #ff6b3522; border: 1px solid #ff6b3533; color: #ff6b35; padding: 0.5rem 0.75rem; border-radius: 4px; font-size: 0.875rem; display: flex; align-items: center; justify-content: center; min-width: 60px;">D8PSK</span>
    </div>
  </div>
</div>

  <p>VDL2 was designed as a more modern and efficient replacement for conventional VHF ACARS data links. While it continues to support many of the same operational message types, the underlying technology is significantly more advanced. Instead of the older ACARS modulation scheme, VDL2 uses <strong>D8PSK (Differential 8-Phase Shift Keying)</strong> and operates at a much higher data rate of <strong>31.5 kbps</strong>, making it far better suited for the growing volume of airline and air traffic communication traffic. It typically operates in the civil aviation VHF band alongside traditional ACARS channels, but with a very different signal structure and protocol stack.</p>

  <div class="info-box">
    <i class="fas fa-lightbulb" style="color: #00d4ff; margin-right: 0.5rem;"></i>
    In simple terms, you can think of VDL2 as the "next-generation" VHF data link for aviation. It was developed not just to carry ACARS-style traffic more efficiently, but also to support the broader move toward <strong>data-driven air traffic management</strong>, including controller-pilot datalink communications and other modern aeronautical networking services.
  </div>

  <p>Compared to regular ACARS, VDL2 offers several clear advantages. Its higher throughput allows more data to be transferred in less time, channel efficiency is improved, and the system handles heavier traffic loads much better in dense airspace. It also supports more structured networking methods rather than the relatively simple character-based message style used by classic ACARS. For airlines, service providers, and air navigation authorities, this means better scalability and improved performance as communication demands continue to grow.</p>

  <div class="warning-box">
    <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
    That said, the move from legacy ACARS to VDL2 is not entirely without trade-offs. Transitioning to VDL2 requires more complex avionics, compatible radios, and supporting ground infrastructure. The signals are also more demanding to decode compared to traditional ACARS, which is one reason hobbyists often find VDL2 especially interesting.
  </div>

  <p>In practice, both systems have coexisted for many years, with classic ACARS still widely active while VDL2 continues to serve as a more capable digital layer for modern aeronautical communications.</p>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-wave-square section-icon"></i>
    <h1 class="section-title">VDL2 Signal Structure</h1>
  </div>

  <div class="video-container">
    <iframe src="https://www.youtube.com/embed/DagaeRzppbU?autoplay=1&mute=1&loop=1&playlist=DagaeRzppbU&playsinline=1" title="VDL2 Spectrum Analysis" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<div class="image-caption" style="margin-top: -1rem; margin-bottom: 1.5rem;">
    <i class="fas fa-video" style="margin-right: 0.5rem;"></i>
    Here's how VDL2 transmissions appear when viewed on a spectrum analyzer and waterfall display
</div>

  <p>On an SDR spectrum display, VDL2 appears as a relatively <strong>wide, solid-looking digital signal</strong> in the VHF airband, typically centered on one of the standard VDL2 channels such as <strong>136.725 MHz</strong> or <strong>136.975 MHz</strong>. Unlike the narrower appearance of classic ACARS, VDL2 occupies noticeably more bandwidth and often looks more "filled in" across its channel rather than showing a simple peaked carrier structure.</p>

  <p>On the waterfall, it usually appears as a <strong>dense vertical block</strong> during transmissions, with a clean, well-defined width and a more uniform texture than analog voice or legacy ACARS bursts. Because it uses a much higher symbol rate and a more complex modulation scheme, the signal tends to look more like a modern high-speed data transmission than the older, simpler ACARS format.</p>

  <div class="hardware-grid">
    <div class="hardware-item">
      <i class="fas fa-broadcast-tower hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">Visual Characteristics</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Wide bandwidth, dense vertical blocks, uniform texture, well-defined edges</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-headphones hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">Audio Signature</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Harsh, broadband digital sound in narrow FM mode (not chirpy like ACARS)</span>
      </div>
    </div>
  </div>

  <p>To the ear, when demodulated in narrow FM mode, it has a <strong>harsh, broadband digital sound</strong> rather than the characteristic chirpy tone many listeners associate with regular ACARS. Once you've seen both side by side on a waterfall, VDL2 becomes fairly easy to spot by its wider footprint, denser visual texture, and distinctly modern digital character.</p>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-laptop-code section-icon"></i>
    <h1 class="section-title">Decoding Software</h1>
  </div>

  <p>When it comes to decoding VDL2, one of the older programs that can do the job is <strong>MultiPSK</strong>. It supports a huge range of digital modes, including aeronautical ones, and for many listeners it was one of the first pieces of software used to experiment with VDL2 reception.</p>

  <div class="hardware-grid">
    <div class="hardware-item" style="border-color: #ff6b3533;">
      <i class="fas fa-history hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">MultiPSK</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Legacy decoder with wide mode support but dated interface, awkward setup, and limited logging capabilities</span>
      </div>
    </div>
    <div class="hardware-item" style="border-color: #22c55e33; background: linear-gradient(135deg, #1a2f1a 0%, #0f1f0f 100%);">
      <i class="fas fa-star hardware-icon" style="color: #22c55e;"></i>
      <div>
        <strong style="color: #f9fafb;">dumpvdl2 ⭐ Recommended</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Purpose-built for VDL2, modern SDR workflows, detailed output, flexible logging, continuous monitoring</span>
      </div>
    </div>
  </div>

  <p>However, while MultiPSK is powerful, it can feel dated, less intuitive, and not especially streamlined for continuous VDL2 monitoring. Its interface is quite old-school, setup can be a little awkward, and it is not as convenient when you want clean logging, easier filtering, or long-term unattended decoding. For casual experimentation, it still has value, but for most people today, it is no longer the most practical choice.</p>

  <p>That is where <strong>dumpvdl2</strong> really stands out. It is purpose-built for VDL2 decoding and much better suited for modern SDR workflows. Paired with a basic RTL-SDR, airband antenna, and a stable signal source, dumpvdl2 can continuously decode VDL2 traffic with detailed output, flexible logging, and compatibility with tools that help visualize or process the received data further.</p>

  <p>Compared to MultiPSK, it feels far more focused and efficient, especially if your goal is to monitor VDL2 seriously rather than just briefly test it. In practice, if you want the easiest path to useful results, <strong>dumpvdl2 is usually the tool worth centering the setup around</strong>.</p>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-terminal section-icon"></i>
    <h1 class="section-title">Software Setup</h1>
  </div>

  <p>Since the installation and basic configuration are already clearly documented on the <a href="https://github.com/szpajder/dumpvdl2" target="_blank" style="color: #00d4ff;">dumpvdl2 GitHub page</a>, there is not much value in repeating every step here. Instead, I'll focus on the command line I found most useful for my own setup with an RTL-SDR, especially for getting detailed, readable output and keeping a proper decoded log for later review.</p>

  <div class="info-box">
    <i class="fas fa-map-marker-alt" style="color: #00d4ff; margin-right: 0.5rem;"></i>
    In my case, I am mainly interested in <strong>136.725 MHz</strong> and <strong>136.975 MHz</strong>, which are the two VDL2 frequencies I can receive here in <strong>Dubai</strong>. Depending on where you are, you may have more VDL2 channels active, so your own frequency list may look different.
  </div>

  <h3 style="color: #00d4ff; font-size: 1.125rem; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-code"></i> Recommended Options
  </h3>

  <div class="code-block">
    <pre>dumpvdl2 --rtlsdr 0 --gain 40.2 --centerfreq 136.800M 136.725M 136.975M --utc --milliseconds --prettify-xml --prettify-json --extended-header --bs-db /home/dragonos/Desktop/VDL2/basestation.sqb --addrinfo verbose --gs-file /home/dragonos/Desktop/VDL2/groundstation.txt --addrinfo verbose --output decoded:text:file:path=/home/dragonos/Desktop/VDL2/dumpvdl2-decoded.log</pre>
  </div>

  <h4 style="color: #f9fafb; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-cogs" style="color: #ff6b35;"></i> Command Breakdown
  </h4>

  <div class="config-section">
    <ul>
      <li><strong>--rtlsdr 0</strong> — Use the first RTL-SDR connected to the system</li>
      <li><strong>--gain 40.2</strong> — Set tuner gain to 40.2 dB</li>
      <li><strong>--centerfreq 136.800M 136.725M 136.975M</strong> — Define monitoring range placing multiple VDL2 channels within sampled bandwidth</li>
      <li><strong>--utc & --milliseconds</strong> — Log timestamps in UTC with millisecond precision</li>
      <li><strong>--prettify-xml --prettify-json</strong> — Make structured message contents easier to read</li>
      <li><strong>--extended-header</strong> — Add extra detail to each decoded entry</li>
      <li><strong>--bs-db</strong> — Point to <strong>basestation.sqb</strong>strong> file for aircraft information resolution</li>
      <li><strong>--gs-file</strong> — Point to <strong>groundstation.txt</strong>strong> file for groundstation identification</li>
      <li><strong>--addrinfo verbose</strong> — Show expanded aircraft & groundstation information</li>
      <li><strong>--output decoded:text:file:path=...</strong> — Write decoded messages as plain text to log file</li>
    </ul>
  </div>

  <div class="warning-box">
  <div class="image-container" style="margin: 0 0 1rem 0; border: 1px solid #ff6b3533;">
    <img src="{{ '/assets/images/VDL2-Database-Ref.png' | relative_url }}" alt="Database Files Loaded" loading="lazy" style="width: auto; max-width: 100%; margin: 0 auto; display: block;">
    <div class="image-caption" style="background: #2f1a1a; border-top: 1px solid #ff6b3533;">
      <i class="fas fa-check-circle" style="margin-right: 0.5rem; color: #22c55e;"></i>
      Both basestation.sqb & groundstation.txt files loaded correctly
    </div>
  </div>
  
  <i class="fas fa-database" style="margin-right: 0.5rem;"></i>
  <strong>Database Files Required:</strong> To get the most useful aircraft and ground-station lookups in dumpvdl2, you will want both an up-to-date <strong>BaseStation database file (basestation.sqb)</strong> and a current <strong>ground station file (groundstation.txt)</strong>. The practical way to obtain a current basestation.sqb file is through <a href="https://www.coaa.co.uk/planeplotter.htm#download" target="_blank" style="color: #00d4ff;">COAA PlanePlotter</a>, using Options > Script > Fetch registration and type database (NS). For the groundstation.txt file, an up-to-date copy can usually be found in the Files section of the <a href="https://acars-vdl2.groups.io/g/main/topics" target="_blank" style="color: #00d4ff;">acars-vdl2 groups.io</a> group.
</div>

  <h4 style="color: #f9fafb; margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
    <i class="fas fa-puzzle-piece" style="color: #00d4ff;"></i> Optional: Fragment Decoding
  </h4>

  <p>One optional switch worth mentioning is <strong>--decode-fragments</strong>. This tells dumpvdl2 to try decoding message fragments that may otherwise be skipped or left incomplete. That can sometimes reveal a bit more traffic, especially under weak-signal or partial-copy conditions.</p>

  <div class="tip-box">
    I personally chose not to use it, since I preferred keeping the output cleaner and limiting partially reconstructed data, but it is there if you want to experiment and squeeze a little more from the received signal.
  </div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-envelope-open-text section-icon"></i>
    <h1 class="section-title">What Kind of Messages Can Be Received</h1>
  </div>

  <div class="video-container" style="position: relative; width: 100%; max-width: 500px; margin: 1.5rem auto; padding-bottom: 177.78%; height: 0; overflow: hidden; background: #000;">
    <iframe
        src="https://www.youtube.com/embed/nRd6DhPBT3U?autoplay=1&mute=1&loop=1&playlist=nRd6DhPBT3U&playsinline=1&modestbranding=1&rel=0"
        title="Live VDL2 Decoding"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        style="
            position: absolute;
            top: 50%;
            left: 50%;
            width: 500%;
            height: 100%;
            transform: translate(-50%, -50%);
            pointer-events: none;
        ">
    </iframe>
</div>

<div class="image-caption" style="margin-top: 0.5rem; margin-bottom: 1.5rem; text-align: center;">
    <i class="fas fa-video" style="margin-right: 0.5rem;"></i>
    This is how live decoded VDL2 messages appear in the terminal
</div>

  <p>Once dumpvdl2 started running, the types of messages you'll see are quite diverse. Most traffic falls into familiar categories:</p>

  <div class="hardware-grid">
    <div class="hardware-item">
      <i class="fas fa-map-marked-alt hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">Position Reports</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Aircraft location and movement data</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-building hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">Airline Operational Messages</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Flight plans, weather reports, maintenance data</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-headset hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">ATC Datalink Communications</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Controller-pilot data link messages (CPDLC)</span>
      </div>
    </div>
    <div class="hardware-item">
      <i class="fas fa-network-wired hardware-icon"></i>
      <div>
        <strong style="color: #f9fafb;">Network Management</strong><br>
        <span style="color: #9ca3af; font-size: 0.875rem;">Link control and connection maintenance</span>
      </div>
    </div>
  </div>

  <p>These messages include metadata such as <strong>aircraft addresses, ground station IDs, timestamps, and protocol headers</strong>. It's important to note that not every decoded frame is immediately "readable" or interesting, because VDL2 carries a fair amount of housekeeping data and protocol overhead.</p>

  <div class="info-box">
    <i class="fas fa-info-circle" style="color: #00d4ff; margin-right: 0.5rem;"></i>
    Unlike simple text-based ACARS messages, much of what you see in VDL2 reflects how the system manages the flow of information. That said, these details can be fascinating if you enjoy seeing the <strong>inner workings of an aviation digital network</strong>, and occasional operational messages give real insight into airline and ATC communications.
  </div>
</div>

<div class="section-card">
  <div class="section-header">
    <i class="fas fa-map-pin section-icon"></i>
    <h1 class="section-title">Real-World Observations from Dubai</h1>
  </div>

  <p>In Dubai, I monitor <strong>136.725 MHz</strong> and <strong>136.975 MHz</strong>, the two VDL2 channels available locally. Both frequencies are <strong>extremely busy throughout the day</strong>, constantly broadcasting a large volume of data. The signal strength is generally strong, but the VHF airband in the area suffers from heavy interference from FM stations.</p>

  <div class="tip-box">
    I use an <strong>FM bandstop filter</strong> to improve reception and get better decoding results. This is highly recommended in urban environments with a strong broadcast FM presence.
  </div>

  <p>Compared to regular ACARS, VDL2 channels are not only busier but also carry much more structured and complex data. While some messages are readable, others appear as very long strings of letters and characters that don't immediately make sense. Occasionally, you'll see lengthy lists of numerical values that are technically interpretable but whose meaning isn't obvious without deep protocol knowledge. This mix of structured information and opaque fragments highlights both the <strong>richness and complexity</strong> of monitoring VDL2 in real-world conditions.</p>

</div>

<div class="section-card" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-color: #00d4ff33;">
  <div class="section-header">
    <i class="fas fa-flag-checkered section-icon" style="color: #ff6b35;"></i>
    <h1 class="section-title" style="color: #ff6b35;">Final Thoughts</h1>
  </div>

  <p style="font-size: 1.125rem; line-height: 1.8;">VDL2 is a great example of how aviation communications have evolved beyond traditional ACARS. It is faster, busier, and much more structured, making it far more capable for modern datalink traffic. Which makes it more interesting to monitor, because there is always something happening on the channel, and the decoded output often reveals just how much digital traffic is flowing between aircraft and ground stations in real time. The combined <strong style="color: #00d4ff;">technical depth</strong>, <strong style="color: #22c55e;">practical usefulness</strong>, and a <strong style="color: #ff6b35;">steady stream of activity</strong> that makes it a rewarding mode to explore with an SDR.</p>
