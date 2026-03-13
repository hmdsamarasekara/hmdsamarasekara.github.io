---
layout: post
title: "📡 UHF Satcom Piracy"
date: 2022-09-05 12:00:00 +0530
categories: [UHF Satcom]
tags: [satcom, satellite, radio, piracy]
excerpt: "Listening to pirate radio activity on UHF military communication satellites"
---

<p style="text-align: justify;">
The United States military operates a worldwide UHF geostationary satellite communication network using the <strong style="color: #ff6b35;">243–270 MHz</strong> band for downlinks and <strong style="color: #ff6b35;">292–318 MHz</strong> for uplinks. These satellites act as simple bent-pipe repeaters, relaying FM voice communications between military ground stations, ships, aircraft, and other assets around the world.
</p>

<p style="text-align: justify;">
Because these satellites function much like radio repeaters and historically lacked strict access control on the uplink, they have occasionally been misused by unauthorized users. For decades, radio monitoring hobbyists have reported hearing pirate activity on these channels, ranging from truck drivers and fishermen to illegal loggers and various other groups who discovered their radios could reach the satellites.
</p>

---

## <i class="fas fa-history" style="color: #00d4ff;"></i> A Brief History of UHF Military Satcom

<p style="text-align: justify;">
The modern UHF military satellite network traces its origins back to the late 1970s with the launch of the <strong>Fleet Satellite Communications System (FLTSATCOM)</strong>. These satellites were designed primarily for the United States Navy to provide reliable global communications for ships operating far from shore.
</p>

<p style="text-align: justify;">
FLTSATCOM satellites were placed in geostationary orbit and carried multiple UHF transponders that acted as simple repeaters. UHF frequencies were chosen because they propagate well through foliage and require only small antennas, making them ideal for mobile platforms such as ships, aircraft, and ground vehicles.
</p>

<p style="text-align: justify;">
In the 1990s the system was expanded with the <strong>UHF Follow-On (UFO)</strong> satellite constellation, and later the newer <strong>MUOS</strong> system began replacing legacy services. However, several older analog transponders remain active, which is why these signals can still be received by hobbyists today.
</p>

---

<figure style="margin: 2rem 0; text-align: center;">
  <img src="/assets/images/UHF-Satcom-Map.jpg" alt="UHF Satcom Constellation" style="width: 100%; max-width: 800px; height: auto; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 212, 255, 0.2);">
  <figcaption style="text-align: center; margin-top: 1rem; font-style: italic; color: #888;">
    <i class="fas fa-globe" style="color: #00d4ff; margin-right: 5px;"></i> UHF Satcom Constellation
  </figcaption>
</figure>

<div class="external-link" style="background: rgba(255, 107, 53, 0.1); border-left: 3px solid #ff6b35; padding: 1rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0;">
  <p style="text-align: center; margin: 0;">
    <i class="fas fa-external-link-alt" style="color: #ff6b35; margin-right: 8px;"></i>
    More technical information about the UHF military satellite constellation can be found 
    <a href="http://www.satellitenwelt.de/uhfmilsat.htm" style="color: #00d4ff; text-decoration: none; font-weight: bold;">here</a>.
  </p>
</div>

---

## <i class="fas fa-search" style="color: #00d4ff;"></i> How I Discovered UHF Satcom Activity

<div class="discovery-section" style="background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0; border: 1px solid rgba(0, 212, 255, 0.2);">
  <p style="text-align: justify; margin-bottom: 1rem;">
    <i class="fas fa-tools" style="color: #ffb347; margin-right: 8px;"></i>
    At the time I was experimenting with antenna designs for a small <strong>SatNOGS ground station</strong> I was planning to build. Since many satellite systems use circular polarization, I decided to experiment with building a simple <strong>UHF eggbeater antenna</strong>.
  </p>

  <p style="text-align: justify; margin: 0;">
    <i class="fas fa-broadcast-tower" style="color: #00d4ff; margin-right: 8px;"></i>
    While testing the antenna with an RTL-SDR receiver, I started scanning the 243–270 MHz satellite downlink range and quickly discovered the very active <strong style="color: #ff6b35;">255.550 MHz</strong> channel, where pirate radio traffic could often be heard throughout the day.
  </p>
</div>

---

## <i class="fas fa-question-circle" style="color: #00d4ff;"></i> Why an Eggbeater Antenna Works Well

<p style="text-align: justify;">
Many satellite transmissions use circular polarization. The eggbeater antenna is well suited for this because it naturally produces circular polarization and has a wide radiation pattern pointed toward the sky.
</p>

<p style="text-align: justify;">
This makes it ideal for satellite reception since it does not require precise pointing and can receive signals from a large portion of the sky.
</p>

<figure style="margin: 2rem 0; text-align: center;">
  <img src="/assets/images/Eggbeater.JPG" alt="Homebrew UHF Eggbeater Antenna" style="width: 100%; max-width: 600px; height: auto; border-radius: 8px; box-shadow: 0 4px 20px rgba(255, 107, 53, 0.2);">
  <figcaption style="text-align: center; margin-top: 1rem; font-style: italic; color: #888;">
    <i class="fas fa-home" style="color: #ff6b35; margin-right: 5px;"></i> My homebrew UHF eggbeater antenna
  </figcaption>
</figure>

---

## <i class="fas fa-database" style="color: #00d4ff;"></i> UHF Satcom Frequency Database

<div class="database-section" style="background: linear-gradient(135deg, #1a1a2e 0%, #0f0f23 100%); padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0; border: 1px solid rgba(255, 107, 53, 0.3);">
  <p style="text-align: justify; margin-bottom: 1.5rem;">
    <i class="fas fa-list-alt" style="color: #ffb347; margin-right: 8px;"></i>
    Over time I compiled a list of commonly monitored UHF Satcom downlink frequencies shared within the radio monitoring community. The list was gathered from various online sources and monitoring groups, including UHF Satcom communities on Telegram.
  </p>

  <div style="text-align: center; margin: 2rem 0;">
    <a href="/posts/uhf-satcom-database/" style="display: inline-block; background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%); color: #fff; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3); transition: all 0.3s ease;">
      <i class="fas fa-satellite-dish" style="margin-right: 8px;"></i>
      View the UHF Satcom Frequency Database
    </a>
  </div>
</div>

---

## <i class="fas fa-headphones" style="color: #00d4ff;"></i> Listen Online (WebSDR)

<p style="text-align: justify; margin-bottom: 1.5rem;">
  <i class="fas fa-globe-americas" style="color: #00d4ff; margin-right: 8px;"></i>
  If you don't have the equipment to receive these satellites yourself, you can still listen using several public WebSDR receivers around the world.
</p>

<div class="websdr-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
  <div class="websdr-card" style="background: rgba(26, 26, 46, 0.9); border-radius: 8px; padding: 1.5rem; border: 1px solid rgba(0, 212, 255, 0.3); text-align: center;">
    <i class="fas fa-map-marker-alt" style="color: #ff6b35; font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
    <h4 style="margin: 0.5rem 0; color: #00d4ff;">Crimea WebSDR</h4>
    <a href="https://rikmotik.ru/#freq=3673000,mod=lsb,sql=-150" style="color: #ffb347; text-decoration: none; font-size: 0.9rem; word-break: break-all;">
      <i class="fas fa-external-link-alt" style="margin-right: 5px;"></i>rikmotik.ru
    </a>
  </div>

  <div class="websdr-card" style="background: rgba(26, 26, 46, 0.9); border-radius: 8px; padding: 1.5rem; border: 1px solid rgba(255, 107, 53, 0.3); text-align: center;">
    <i class="fas fa-map-marker-alt" style="color: #00d4ff; font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
    <h4 style="margin: 0.5rem 0; color: #ff6b35;">Brazil WebSDR</h4>
    <a href="http://sdr.saltonet.inf.br:8073/#freq=29250000,mod=am,sql=-150" style="color: #ffb347; text-decoration: none; font-size: 0.9rem; word-break: break-all;">
      <i class="fas fa-external-link-alt" style="margin-right: 5px;"></i>sdr.saltonet.inf.br
    </a>
  </div>

  <div class="websdr-card" style="background: rgba(26, 26, 46, 0.9); border-radius: 8px; padding: 1.5rem; border: 1px solid rgba(255, 179, 71, 0.3); text-align: center;">
    <i class="fas fa-map-marker-alt" style="color: #ffb347; font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
    <h4 style="margin: 0.5rem 0; color: #ffb347;">Lithuania WebSDR</h4>
    <a href="https://sdr.gudynas.lt/#freq=102555000,mod=wfm,sql=-150" style="color: #00d4ff; text-decoration: none; font-size: 0.9rem; word-break: break-all;">
      <i class="fas fa-external-link-alt" style="margin-right: 5px;"></i>sdr.gudynas.lt
    </a>
  </div>
</div>

---

## <i class="fas fa-play-circle" style="color: #00d4ff;"></i> Example Recording

<div class="recording-section" style="background: rgba(0, 0, 0, 0.5); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid rgba(0, 212, 255, 0.2);">
  <h4 style="margin-top: 0; color: #ff6b35; text-align: center;">
    <i class="fas fa-volume-up" style="margin-right: 8px;"></i>
    A short recording of activity heard on the 255.550 MHz downlink
  </h4>

  <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; margin-top: 1rem;">
  <iframe
    loading="lazy"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    src="https://www.youtube.com/embed/-4OtyN1FBRA?autoplay=1&mute=1&loop=1&playlist=-4OtyN1FBRA&playsinline=1"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>

<br>
---

## <i class="fas fa-shield-alt" style="color: #00d4ff;"></i> Disclaimer

<div class="disclaimer" style="background: linear-gradient(135deg, #2d1f3d 0%, #1a1a2e 100%); border-left: 4px solid #ff6b35; padding: 1.5rem; border-radius: 0 12px 12px 0; margin: 2rem 0;">
  <p style="text-align: justify; margin: 0; color: #c0c0c0; line-height: 1.8;">
    <i class="fas fa-info-circle" style="color: #ffb347; margin-right: 8px; font-size: 1.2rem;"></i>
    Receiving satellite downlinks is legal in many countries. However, transmitting to these satellites without authorization is illegal and may interfere with legitimate communications. This post is intended for educational and hobbyist radio monitoring purposes only.
  </p>
</div>

<div class="post-tags" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(0, 212, 255, 0.2);">
  <span style="color: #888; font-size: 0.9rem;">
    <i class="fas fa-tags" style="color: #00d4ff; margin-right: 5px;"></i>
    Tags: 
    <span style="background: rgba(0, 212, 255, 0.2); color: #00d4ff; padding: 0.2rem 0.6rem; border-radius: 12px; margin: 0 0.3rem; font-size: 0.85rem;">satcom</span>
    <span style="background: rgba(255, 107, 53, 0.2); color: #ff6b35; padding: 0.2rem 0.6rem; border-radius: 12px; margin: 0 0.3rem; font-size: 0.85rem;">satellite</span>
    <span style="background: rgba(255, 179, 71, 0.2); color: #ffb347; padding: 0.2rem 0.6rem; border-radius: 12px; margin: 0 0.3rem; font-size: 0.85rem;">radio</span>
    <span style="background: rgba(0, 212, 255, 0.2); color: #00d4ff; padding: 0.2rem 0.6rem; border-radius: 12px; margin: 0 0.3rem; font-size: 0.85rem;">piracy</span>
  </span>

</div>


