---
layout: post
title: "Testing the USB2Rig Interface with APRSdroid"
date: 2025-05-17 12:00:00 +0530
categories: [digital-modes, aprs, equipment-review]
tags: [usb2rig, digirig, aprsdroid, android, packet-radio, portable]
excerpt: "A hands-on review of the USB2Rig digital interface, DigiRig-compatible USB audio/serial solution for Digi Modes."
---

<div class="post-intro">
  <p class="lead">Digital interfaces are incredibly useful in modern amateur radio. They allow radios to communicate with computers and smartphones for modes like FT8, RTTY, Winlink, and <strong>APRS</strong>. One of the most well-known compact interfaces in this category is the <strong>DigiRig Mobile</strong>.</p>

  <p>Recently I came across a device called <strong>USB2Rig</strong>, which appears to be a near-identical clone of the DigiRig concept. Curious about how well it works, I decided to try it with <strong>APRS</strong> using my Android Tablet and the APRSdroid application.</p>
</div>

---

## 🔌 What is USB2Rig?

<div class="image-container">
  <img src="/assets/images/USB2Rig.png" alt="USB2Rig Interface" class="post-image">
  <span class="image-caption">The USB2Rig compact digital interface</span>
</div>

USB2Rig is a small USB audio interface designed for radio digital modes. Functionally, it behaves almost exactly like the **DigiRig Mobile**.

<div class="feature-box">
  <h4>Interface Capabilities</h4>
  <ul class="feature-list">
    <li><span class="check">✓</span> USB sound card functionality</li>
    <li><span class="check">✓</span> CAT/PTT control capability</li>
    <li><span class="check">✓</span> Audio input and output between radio and computer/phone</li>
    <li><span class="check">✓</span> Standard radio-specific cable connections</li>
  </ul>
</div>

In practice, the **cable wiring and pinout appear to be identical to DigiRig**, meaning most DigiRig-compatible cables should work with it.

<div class="info-box info">
  <strong>💡 Compatibility Note:</strong> Because of this compatibility, many existing setups designed for DigiRig can be used without modification.
</div>

---

## 🎵 Note About the Audio2Rig Model

<div class="image-container">
  <img src="/assets/images/Audio2Rig.png" alt="Audio2Rig Interface" class="post-image">
  <span class="image-caption">The simplified Audio2Rig model</span>
</div>

USB2Rig is not the only interface in this product line. There is also a simplified model called **Audio2Rig**.

The Audio2Rig is designed as a **basic audio-only interface**, meaning it provides:

- USB sound card functionality  
- Audio input and output between the radio and computer/phone  

<div class="warning-box">
  <strong>⚠️ Important Difference:</strong> Unlike the USB2Rig, <strong>it does not include a serial interface for CAT control or PTT via serial commands</strong>.
</div>

Because of this design, the Audio2Rig appears conceptually similar to the **DigiRig Lite**, which focuses on simple soundcard-based digital modes without the additional serial control features.

<div class="success-box">
  <strong>✅ For APRS Users:</strong> For modes like <strong>APRS using APRSdroid</strong>, an audio-only interface can still work perfectly well since the application handles modulation & demodulation and PTT through the sound card.
</div>

Operators who need **CAT control** may prefer the full USB2Rig model instead.

---

## 🔧 Wiring Diagram

<div class="image-container wide">
  <img src="/assets/images/wiring-diagram.png" alt="USB2Rig Wiring Diagram" class="post-image">
  <span class="image-caption">Detailed wiring diagram for USB2Rig connections</span>
</div>

---

## ⚙️ Serial Interface Mode Selection

Similar to the DigiRig design, the USB2Rig PCB includes a **3×3 solder pad matrix** used to configure the serial interface mode. This allows the interface to support different radio control standards by changing the electrical signaling levels.

<div class="image-container">
  <img src="/assets/images/Serial-Config.jpg" alt="Serial Configuration Pads" class="post-image">
  <span class="image-caption">The 3×3 solder pad matrix for serial mode configuration</span>
</div>

The available modes typically include:

| Mode | Electrical Level | Typical Use |
|:-----|:----------------|:------------|
| **CMOS / TTL** | 0–3.3V or 0–5V logic | Logic-level CAT control used by radios such as Yaesu, Xiegu, and some Baofeng handhelds |
| **RS-232** | ±6V to ±12V | Older radios with standard RS-232 serial ports, such as some Kenwood models with DB9 connectors |
| **CI-V** | Open-collector serial bus | Icom radios using the CI-V control interface |

<div class="info-box tip">
  <strong>🔧 Configuration:</strong> The desired mode is selected by <strong>bridging specific solder pads on the PCB</strong>, which routes the serial signals through the appropriate circuitry.
</div>

<div class="highlight-box">
  <strong>Default Setting:</strong> By default, the interface is configured for <strong>logic-level (CMOS/TTL) serial</strong>, which is suitable for many modern radios that expose CAT control signals at 3.3 V or 5 V logic levels.
</div>

---

## 🧪 Test Setup

For my test, I kept the setup simple and portable.

<div class="equipment-grid">
  <h4>📻 Equipment Used</h4>
  <div class="equipment-list">
    <div class="equipment-item">📱 Android Tablet</div>
    <div class="equipment-item">📡 APRSdroid</div>
    <div class="equipment-item">🔌 USB2Rig interface</div>
    <div class="equipment-item">📻 Amateur radio handheld</div>
    <div class="equipment-item">🔋 USB OTG adapter</div>
  </div>
</div>

---

## 📲 Note on the APRSdroid Version Used

<div class="special-box">
  <h4>🌟 NA7Q Community Fork</h4>
  <p>For my testing, I did not use the standard release of APRSdroid. Instead, I used a <strong>community fork maintained by NA7Q</strong>, which includes additional features and improvements.</p>
</div>

This version adds several useful capabilities, including:

- Direct support for **DigiRig-style interfaces**
- Improved hardware compatibility
- Additional configuration options
- Support for **OpenStreetMap (OSM)** tiles

<div class="link-box">
  <strong>🔗 Download:</strong> <a href="https://na7q.com/aprsdroid-osm/" target="_blank" rel="noopener noreferrer">https://na7q.com/aprsdroid-osm/</a>
</div>

<div class="success-box">
  <strong>✅ Perfect Match:</strong> Since the <strong>USB2Rig behaves like a DigiRig-style interface</strong>, this modified version of APRSdroid worked very well for my setup and simplified configuration.
</div>

If you are experimenting with USB soundcard interfaces or DigiRig-compatible hardware, this version of APRSdroid may be worth trying.

---

## ⚙️ Configuring APRSdroid

Setting up APRSdroid with the USB2Rig was straightforward.

<div class="steps-container">
  <h4>Configuration Steps</h4>
  <ol class="steps-list">
    <li><span class="step-num">1</span> Connect the USB2Rig to the phone using a USB OTG adapter.</li>
    <li><span class="step-num">2</span> Connect the radio cable between the interface and the transceiver.</li>
    <li><span class="step-num">3</span> Open APRSdroid.</li>
    <li><span class="step-num">4</span> Select <strong>AFSK via USB sound card</strong> as the connection type.</li>
    <li><span class="step-num">5</span> Adjust audio levels if necessary.</li>
  </ol>
</div>

Once configured, APRSdroid handled the APRS modulation and demodulation using the USB audio interface.

### APRSdroid Configuration Screenshot

<div class="image-container">
  <img src="/assets/images/aprsdroid-configuration.jpeg" alt="APRSdroid Configuration Screen" class="post-image screenshot">
  <span class="image-caption">APRSdroid configuration settings for USB2Rig</span>
</div>

---

## 📡 On-Air Testing

After configuring everything, I transmitted a few APRS beacons.

<div class="results-box">
  <h4>🎯 Test Results</h4>
  <ul class="results-list">
    <li><span class="icon good">✓</span> APRS packets decoded reliably</li>
    <li><span class="icon good">✓</span> Audio levels were stable</li>
    <li><span class="icon good">✓</span> Transmissions were clean</li>
    <li><span class="icon good">✓</span> No noticeable latency issues</li>
  </ul>
</div>

<div class="conclusion-highlight">
  From a functional standpoint, <strong>the interface behaved exactly like a DigiRig-style device</strong>.
</div>

### Example APRS Decodes

<div class="image-container wide">
  <img src="/assets/images/aprs-decode.jpeg" alt="APRS Packet Decodes" class="post-image">
  <span class="image-caption">Successful APRS packet decodes from on-air testing</span>
</div>

---

## ⚖️ USB2Rig vs DigiRig Mobile

<div class="comparison-table-container">
  <table class="comparison-table">
    <thead>
      <tr>
        <th>Feature</th>
        <th class="col-digirig">DigiRig Mobile</th>
        <th class="col-usb2rig">USB2Rig</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Original Design</td>
        <td class="cell-yes">✓ Yes</td>
        <td class="cell-no">✗ No (clone-style)</td>
      </tr>
      <tr>
        <td>USB Sound Card</td>
        <td class="cell-yes">✓ Yes</td>
        <td class="cell-yes">✓ Yes</td>
      </tr>
      <tr>
        <td>CAT/PTT Control</td>
        <td class="cell-yes">✓ Yes</td>
        <td class="cell-yes">✓ Yes</td>
      </tr>
      <tr>
        <td>Compatible Cables</td>
        <td>DigiRig cables</td>
        <td>DigiRig-compatible</td>
      </tr>
      <tr>
        <td>Android Compatibility</td>
        <td class="cell-yes">✓ Yes</td>
        <td class="cell-yes">✓ Yes</td>
      </tr>
      <tr>
        <td>APRSdroid Support</td>
        <td class="cell-yes">✓ Yes</td>
        <td class="cell-yes">✓ Yes</td>
      </tr>
      <tr>
        <td>Size/Form Factor</td>
        <td>Compact</td>
        <td>Very similar</td>
      </tr>
      <tr class="highlight-row">
        <td>Price</td>
        <td>Higher</td>
        <td><strong>Typically cheaper</strong></td>
      </tr>
    </tbody>
  </table>
</div>

---

## 📝 Field Notes

<div class="field-notes">
  <h4>Practical Observations</h4>

  <div class="note-item">
    <span class="note-icon">🔌</span>
    <p>Android detected the interface immediately as a <strong>USB audio device</strong>.</p>
  </div>

  <div class="note-item">
    <span class="note-icon">📦</span>
    <p>No additional drivers were required.</p>
  </div>

  <div class="note-item">
    <span class="note-icon">🎚️</span>
    <p>Audio levels were fairly forgiving, but transmit audio needed minor adjustment in APRSdroid.</p>
  </div>

  <div class="note-item">
    <span class="note-icon">⏱️</span>
    <p>The interface remained stable during long APRS beacon intervals.</p>
  </div>

  <div class="note-item">
    <span class="note-icon">🔋</span>
    <p>Power consumption was low enough that it worked well from a phone battery.</p>
  </div>

  <div class="note-item">
    <span class="note-icon">🎒</span>
    <p>The setup is compact enough to fit in a small pouch, making it suitable for portable APRS operation.</p>
  </div>
</div>

---

## 🎚️ Audio Level Tuning Tips

<div class="warning-box">
  <strong>🎛️ Critical:</strong> Proper audio levels are important when using soundcard-based packet systems.
</div>

### Transmit Audio Issues

<div class="two-column">
  <div class="column problem">
    <h5>❌ Too High</h5>
    <ul>
      <li>Packets may be distorted</li>
      <li>Nearby stations may not decode your signal</li>
    </ul>
  </div>
  <div class="column problem">
    <h5>❌ Too Low</h5>
    <ul>
      <li>Digipeaters may fail to decode your packets</li>
    </ul>
  </div>
</div>

### Recommended Approach

<div class="steps-container numbered">
  <ol class="tuning-steps">
    <li><span class="step-num">1</span> Start with the APRSdroid audio level around <strong>50%</strong>.</li>
    <li><span class="step-num">2</span> Transmit a beacon.</li>
    <li><span class="step-num">3</span> Monitor your signal with another receiver or SDR.</li>
    <li><span class="step-num">4</span> Increase or decrease the level until the AFSK tones sound clean.</li>
  </ol>
</div>

<div class="success-box">
  <strong>🎯 Target:</strong> The characteristic APRS tones should be <strong>clear and consistent</strong>, without clipping.
</div>

---

## 🗺️ Portable APRS Use Cases

<div class="intro-text">
  A setup like this is surprisingly versatile. Some potential uses include:
</div>

<div class="use-cases-grid">
  <div class="use-case">
    <span class="use-icon">📍</span>
    <h5>Portable APRS Beacons</h5>
  </div>
  <div class="use-case">
    <span class="use-icon">🏔️</span>
    <h5>APRS During Hiking</h5>
  </div>
  <div class="use-case">
    <span class="use-icon">🎒</span>
    <h5>Field Operations</h5>
  </div>
  <div class="use-case">
    <span class="use-icon">🔄</span>
    <h5>Temporary Digipeater</h5>
  </div>
  <div class="use-case wide">
    <span class="use-icon">💬</span>
    <h5><code>A65KJ-7&gt;APDR13,WIDE1-1,WIDE2-1::A61BN-10 :USB2Rig APRS test via Android{01</code></h5><br>
    <h5>APRS Messaging (No Internet Required)</h5>
  </div>
</div>

<div class="highlight-box compact">
  Since everything runs from a phone and a small interface, it makes a <strong>very compact digital station</strong>.
</div>

---

## 📸 Station Setup

<div class="image-container wide featured">
  <img src="/assets/images/station-setup.png" alt="Portable Station Setup" class="post-image">
  <span class="image-caption">Complete portable APRS station in action</span>
</div>

<div class="setup-breakdown">
  <h4>🎒 What's in the Kit</h4>
  <p>A small portable setup like this typically consists of:</p>
  <ul class="setup-list">
    <li>📱 Android phone running APRSdroid</li>
    <li>🔌 USB2Rig interface</li>
    <li>📻 Handheld radio</li>
    <li>🔗 Short radio interface cable</li>
    <li>🔋 USB OTG adapter</li>
  </ul>
  <p class="setup-conclusion">Everything can fit into a small pouch, making it easy to deploy during portable operations or experiments.</p>
</div>

---

## 🏁 Final Thoughts

<div class="final-thoughts">
  <p>After testing the USB2Rig with APRS and examining the hardware inside, it appears to be a <strong>functional and reasonably well-designed digital radio interface</strong>. The device combines a USB audio codec, a USB-to-serial converter, and supporting circuitry behind a small USB hub, allowing it to present itself to the computer as a <strong>USB speaker, microphone, and serial port simultaneously</strong>.</p>

  <p>From a practical standpoint, the interface worked well with APRS using APRSdroid, and the setup process was straightforward once the audio levels were adjusted properly. The hardware design includes the essential components expected in this type of interface, such as <strong>audio isolation, serial level conversion, and configurable control signaling</strong>.</p>

  <p>While the design clearly mirrors the concept of the DigiRig Mobile, the USB2Rig appears to implement the same basic architecture using lower-cost components such as the CH340 serial interface. In terms of functionality, however, it still provides the key features needed for digital operation, including audio input/output and serial-based PTT or CAT control.</p>

  <div class="warning-box caution">
    <strong>⚠️ Documentation Gap:</strong> One notable drawback is the <strong>lack of official documentation</strong>. Important configuration details—such as serial mode selection, solder jumpers, and pinouts—are mostly discovered by examining the PCB or through community discussions. For operators comfortable with a bit of experimentation this may not be a major issue, but beginners might find it confusing.
  </div>

  <p>Overall, the USB2Rig proved to be a <strong>useful and compact interface for digital radio experiments</strong>, particularly for portable setups using a smartphone or small computer. With the right cables and configuration, it can support a wide range of applications including APRS, packet radio, and other soundcard-based digital modes.</p>
</div>

---

<style>
/* Post-specific styling that complements your existing theme */
.post-intro .lead {
  font-size: 1.15em;
  line-height: 1.7;
  color: var(--text-primary, #e0e0e0);
  margin-bottom: 1.5em;
}

.image-container {
  margin: 2em 0;
  text-align: center;
}

.image-container.wide {
  max-width: 100%;
}

.image-container.featured {
  border: 2px solid var(--accent-cyan, #00d4ff);
  border-radius: 8px;
  padding: 1em;
  background: rgba(0, 212, 255, 0.05);
}

.post-image {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.post-image.screenshot {
  border: 1px solid var(--border-color, #333);
}

.image-caption {
  display: block;
  margin-top: 0.75em;
  font-size: 0.9em;
  color: var(--text-secondary, #888);
  font-style: italic;
}

.feature-box, .info-box, .warning-box, .success-box, .special-box, .highlight-box, .link-box {
  margin: 1.5em 0;
  padding: 1em 1.25em;
  border-radius: 6px;
  border-left: 4px solid;
}

.feature-box {
  background: rgba(0, 212, 255, 0.08);
  border-color: var(--accent-cyan, #00d4ff);
}

.info-box {
  background: rgba(0, 150, 255, 0.08);
  border-color: #0096ff;
}

.info-box.tip {
  background: rgba(255, 193, 7, 0.08);
  border-color: #ffc107;
}

.warning-box {
  background: rgba(255, 107, 53, 0.08);
  border-color: var(--accent-orange, #ff6b35);
}

.warning-box.caution {
  background: rgba(255, 152, 0, 0.08);
  border-color: #ff9800;
}

.success-box {
  background: rgba(76, 175, 80, 0.08);
  border-color: #4caf50;
}

.special-box {
  background: linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(255,107,53,0.1) 100%);
  border-color: var(--accent-cyan, #00d4ff);
}

.highlight-box {
  background: rgba(156, 39, 176, 0.08);
  border-color: #9c27b0;
}

.highlight-box.compact {
  margin: 1em 0;
  font-size: 0.95em;
}

.link-box {
  background: rgba(33, 150, 243, 0.08);
  border-color: #2196f3;
}

.link-box a {
  color: var(--accent-cyan, #00d4ff);
  text-decoration: none;
  font-weight: 500;
}

.link-box a:hover {
  text-decoration: underline;
}

.feature-list, .setup-list {
  list-style: none;
  padding-left: 0;
}

.feature-list li, .setup-list li {
  margin: 0.5em 0;
  padding-left: 1.5em;
  position: relative;
}

.check {
  color: #4caf50;
  font-weight: bold;
  margin-right: 0.5em;
}

.equipment-grid {
  background: rgba(255,255,255,0.03);
  border-radius: 8px;
  padding: 1.5em;
  margin: 1.5em 0;
}

.equipment-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75em;
  margin-top: 1em;
}

.equipment-item {
  background: rgba(0,212,255,0.1);
  padding: 0.75em 1em;
  border-radius: 4px;
  border-left: 3px solid var(--accent-cyan, #00d4ff);
}

.steps-container {
  background: rgba(255,255,255,0.02);
  border-radius: 8px;
  padding: 1.5em;
  margin: 1.5em 0;
}

.steps-list, .tuning-steps {
  list-style: none;
  padding-left: 0;
  counter-reset: step;
}

.steps-list li, .tuning-steps li {
  margin: 1em 0;
  padding-left: 3em;
  position: relative;
  line-height: 1.6;
}

.step-num {
  position: absolute;
  left: 0;
  top: 0;
  width: 2em;
  height: 2em;
  background: var(--accent-cyan, #00d4ff);
  color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9em;
}

.results-box {
  background: linear-gradient(135deg, rgba(76,175,80,0.1) 0%, rgba(0,212,255,0.05) 100%);
  border-radius: 8px;
  padding: 1.5em;
  margin: 1.5em 0;
  border: 1px solid rgba(76,175,80,0.3);
}

.results-list {
  list-style: none;
  padding-left: 0;
}

.results-list li {
  margin: 0.75em 0;
  font-size: 1.05em;
}

.icon.good {
  color: #4caf50;
  margin-right: 0.5em;
}

.conclusion-highlight {
  background: rgba(0,212,255,0.15);
  border-left: 4px solid var(--accent-cyan, #00d4ff);
  padding: 1em 1.5em;
  margin: 1.5em 0;
  font-size: 1.1em;
  border-radius: 0 6px 6px 0;
}

.comparison-table-container {
  overflow-x: auto;
  margin: 1.5em 0;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(255,255,255,0.02);
  border-radius: 8px;
  overflow: hidden;
}

.comparison-table th {
  background: rgba(0,212,255,0.2);
  padding: 1em;
  text-align: left;
  font-weight: 600;
  color: var(--accent-cyan, #00d4ff);
}

.comparison-table td {
  padding: 0.875em 1em;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.comparison-table tr:hover {
  background: rgba(255,255,255,0.03);
}

.col-digirig {
  color: var(--accent-orange, #ff6b35);
}

.col-usb2rig {
  color: var(--accent-cyan, #00d4ff);
}

.cell-yes {
  color: #4caf50;
}

.cell-no {
  color: #f44336;
}

.highlight-row {
  background: rgba(255,193,7,0.08);
  font-weight: 500;
}

.field-notes {
  background: rgba(255,255,255,0.02);
  border-radius: 8px;
  padding: 1.5em;
  margin: 1.5em 0;
}

.note-item {
  display: flex;
  align-items: flex-start;
  margin: 1em 0;
  padding: 0.75em;
  background: rgba(255,255,255,0.03);
  border-radius: 6px;
}

.note-icon {
  font-size: 1.5em;
  margin-right: 0.75em;
  line-height: 1;
}

.note-item p {
  margin: 0;
  flex: 1;
}

.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5em;
  margin: 1.5em 0;
}

.column {
  background: rgba(255,255,255,0.03);
  padding: 1em;
  border-radius: 6px;
}

.column h5 {
  margin-top: 0;
  color: var(--accent-orange, #ff6b35);
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1em;
  margin: 1.5em 0;
}

.use-case {
  background: linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(255,107,53,0.05) 100%);
  border: 1px solid rgba(0,212,255,0.2);
  border-radius: 8px;
  padding: 1.25em;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.use-case:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,212,255,0.2);
}

.use-case.wide {
  grid-column: 1 / -1;
}

.use-icon {
  font-size: 2em;
  display: block;
  margin-bottom: 0.5em;
}

.use-case h5 {
  margin: 0;
  font-size: 0.95em;
  color: var(--text-primary, #e0e0e0);
}

.setup-breakdown {
  background: rgba(0,212,255,0.05);
  border-radius: 8px;
  padding: 1.5em;
  margin: 1.5em 0;
  border-left: 4px solid var(--accent-cyan, #00d4ff);
}

.setup-conclusion {
  margin-top: 1em;
  padding-top: 1em;
  border-top: 1px solid rgba(255,255,255,0.1);
  font-style: italic;
  color: var(--text-secondary, #888);
}

.final-thoughts p {
  line-height: 1.8;
  margin-bottom: 1.25em;
}

.post-footer {
  margin-top: 3em;
  padding-top: 2em;
  border-top: 2px solid rgba(0,212,255,0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
}

.callsign-badge {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.callsign-badge .label {
  font-size: 0.75em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-secondary, #888);
  margin-bottom: 0.25em;
}

.callsign-badge .callsign {
  font-size: 1.5em;
  font-weight: bold;
  color: var(--accent-cyan, #00d4ff);
  font-family: 'Courier New', monospace;
  letter-spacing: 0.05em;
}

.post-meta-footer {
  color: var(--text-secondary, #888);
  font-size: 0.9em;
}

.post-meta-footer .separator {
  margin: 0 0.5em;
  color: var(--accent-orange, #ff6b35);
}

@media (max-width: 600px) {
  .two-column {
    grid-template-columns: 1fr;
  }

  .equipment-list {
    grid-template-columns: 1fr;
  }

  .post-footer {
    flex-direction: column;
    text-align: center;
  }

  .callsign-badge {
    align-items: center;
  }
}
</style>
