---
layout: default
title: About
permalink: /about/
---

<div class="container" style="padding: 3rem 0;">
  <div class="post-layout">
    <div class="post-content-wrapper">
      <div class="post-content">
        <h1>About Noise Floor Nomad</h1>
        
        <p>Welcome to <strong>Noise Floor Nomad</strong> — a blog dedicated to practical ham radio, software-defined radio (SDR), and satellite reception experiments.</p>
        
        <h2>Who Am I?</h2>
        
        <p>I'm <strong>A65KJ</strong>, a licensed amateur radio operator exploring the RF spectrum from less-than-ideal locations with improvised antennas and real-world constraints. This blog documents my journey through:</p>
        
        <ul>
          <li><strong>Ham Radio</strong> — HF, VHF, UHF operations and antenna experiments</li>
          <li><strong>SDR</strong> — RTL-SDR, HackRF, and other software-defined radio projects</li>
          <li><strong>Satellite Reception</strong> — Weather satellites, amateur radio satellites, and UHF Satcom monitoring</li>
          <li><strong>Signal Analysis</strong> — Decoding various protocols and transmissions</li>
        </ul>
        
        <h2>Philosophy</h2>
        
        <p>This isn't about perfect setups or expensive equipment. It's about:</p>
        
        <blockquote>
          "What can you receive with a $20 RTL-SDR, some wire, and persistence?"
        </blockquote>
        
        <p>Most of my experiments happen from urban environments with high noise floors, temporary antennas hung from windows, and whatever gear I can scrounge together. If I can decode it from here, you can probably do better from your location.</p>
        
        <h2>Equipment</h2>
        
        <ul>
          <li>RTL-SDR v3 and various dongles</li>
          <li>HackRF One</li>
          <li>Various homebrew antennas (dipoles, discones, QFH)</li>
          <li>Ham It Up upconverter</li>
          <li>LNA4ALL and other low-noise amplifiers</li>
        </ul>
        
        <h2>Contact</h2>
        
        <ul>
          <li><strong>Callsign:</strong> <a href="https://www.qrz.com/db/A65KJ" target="_blank" rel="noopener">A65KJ</a></li>
          <li><strong>QRZ:</strong> <a href="https://www.qrz.com/db/A65KJ" target="_blank" rel="noopener">qrz.com/db/A65KJ</a></li>
          <li><strong>GitHub:</strong> <a href="https://github.com/hmdsamarasekara" target="_blank" rel="noopener">@hmdsamarasekara</a></li>
        </ul>
        
        <p>73!</p>
      </div>
    </div>
    
    <aside class="post-sidebar">
      <div class="sidebar-section">
        <h3>Quick Info</h3>
        <ul style="list-style: none; padding: 0;">
          <li style="margin-bottom: 0.75rem;">
            <strong style="color: var(--accent-cyan); display: block; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.25rem;">Callsign</strong>
            <span style="font-family: var(--font-mono);">A65KJ</span>
          </li>
          <li style="margin-bottom: 0.75rem;">
            <strong style="color: var(--accent-cyan); display: block; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.25rem;">License</strong>
            <span>Amateur Extra</span>
          </li>
          <li style="margin-bottom: 0.75rem;">
            <strong style="color: var(--accent-cyan); display: block; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.25rem;">Location</strong>
            <span>Grid Square: TBD</span>
          </li>
          <li>
            <strong style="color: var(--accent-cyan); display: block; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.25rem;">Active Since</strong>
            <span>2022</span>
          </li>
        </ul>
      </div>
      
      <div class="sidebar-section">
        <h3>Categories</h3>
        <ul style="list-style: none; padding: 0;">
          {% for category in site.categories %}
            <li style="margin-bottom: 0.5rem;">
              <a href="#" style="display: flex; justify-content: space-between;">
                <span>{{ category[0] }}</span>
                <span style="color: var(--text-muted); font-size: 0.85rem;">{{ category[1].size }}</span>
              </a>
            </li>
          {% endfor %}
        </ul>
      </div>
    </aside>
  </div>
</div>
