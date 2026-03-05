---
layout: post
title: "Receiving HRPT Imagery from Polar Orbiting Satellites"
date: 2022-08-29 12:00:00 +0530
categories: [HRPT, Weather Satellites]
tags: [hrpt, noaa, meteor, satellite imagery, sdr]
excerpt: "A comprehensive guide to setting up an HRPT receiving station using affordable SDR equipment and open-source software."
---

High Resolution Picture Transmission (HRPT) is the highest resolution data transmitted by polar-orbiting weather satellites. Unlike the more commonly received APT signals, HRPT provides stunning high-resolution imagery that rivals professional meteorological services.

## What is HRPT?

HRPT signals are transmitted by satellites in the 1700 MHz L-band frequency range. These signals contain:

- **Visible light imagery** (0.58–0.68 µm)
- **Near-infrared channels** for vegetation analysis
- **Thermal infrared channels** for temperature mapping
- **Water vapor channels** for atmospheric moisture

## Equipment Required

### Hardware

1. **RTL-SDR v3** or better (Airspy R2/Mini recommended)
2. **1.7 GHz LNA** with good noise figure
3. **Parabolic dish** (60cm minimum, 1m+ preferred)
4. **Helical feed** or custom 1.7 GHz feed
5. **High-quality coaxial cable** (LMR400 or similar)

### Software

```bash
# Install dependencies on Ubuntu/Debian
sudo apt-get update
sudo apt-get install libusb-1.0-0-dev cmake

# Build SatDump for decoding
git clone https://github.com/SatDump/SatDump.git
cd SatDump
mkdir build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
make -j$(nproc)
sudo make install
```

## Antenna Setup

The antenna is the most critical component of an HRPT station. I built a 1.2m prime-focus dish with a custom helical feed:

![Antenna Setup](/assets/images/antenna-setup.jpg)

### Key considerations:

- **Dish size**: Larger is better for weak signals
- **Feed positioning**: Critical for optimal signal strength
- **Tracking accuracy**: HRPT requires precise satellite tracking

## Signal Acquisition

Using SatDump, the acquisition process is straightforward:

1. **Calculate passes** using Orbitron or Gpredict
2. **Start recording** 5 minutes before AOS
3. **Auto-track** the satellite across the sky
4. **Stop recording** 5 minutes after LOS

## Sample Results

The imagery quality from HRPT is remarkable. Here's a comparison:

| Channel | Wavelength | Primary Use |
|---------|------------|-------------|
| 1 | 0.58-0.68 µm | Visible (Daytime) |
| 2 | 0.725-1.00 µm | Near IR |
| 3 | 3.55-3.93 µm | Thermal IR |
| 4 | 10.3-11.3 µm | Longwave IR |

## Challenges Faced

### Signal Dropouts

Initially, I experienced frequent signal dropouts caused by:

- **Intermittent USB connections**
- **Thermal drift in the LNA**
- **Tracking inaccuracies**

### Solutions

1. Added ferrite cores to all USB cables
2. Implemented active cooling for the LNA
3. Upgraded to a heavier duty rotator with better precision

## Conclusion

Receiving HRPT is challenging but incredibly rewarding. The quality of imagery obtained makes the effort worthwhile for any serious satellite enthusiast.

**Next steps**: I'm currently working on automating the entire pipeline from acquisition to web publication. Stay tuned for updates!

---

*Have questions about HRPT reception? Drop a comment or reach out on GitHub.*
