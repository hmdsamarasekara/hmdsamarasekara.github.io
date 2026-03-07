---
layout: post
title: "DSDPlus Complete Guide"
date: 2026-03-07 12:00:00 +0530
categories: [sdr, decoding, dsdplus]
tags: [dsdplus, p25, dmr, nxdn, dstar, trunking, sdr]
excerpt: "Complete interactive guide to DSDPlus setup, protocols, and trunk tracking."
---

<style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@300;400;600;800&display=swap');
    
    :root {
        --neon-cyan: #00f3ff;
        --neon-green: #0aff0a;
        --neon-amber: #ffaa00;
        --dark-bg: #0a0a0f;
        --panel-bg: #12121a;
    }
    
    .dsd-guide {
        font-family: 'Inter', sans-serif;
        background: var(--dark-bg);
        color: #e0e0e0;
        overflow-x: hidden;
    }
    
    .dsd-guide .mono { font-family: 'JetBrains Mono', monospace; }
    
    .dsd-guide .glass-panel {
        background: rgba(18, 18, 26, 0.8);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
    }
    
    .dsd-guide .neon-border {
        position: relative;
        overflow: hidden;
    }
    
    .dsd-guide .neon-border::before {
        content: '';
        position: absolute;
        top: 0; left: -100%;
        width: 100%; height: 2px;
        background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
        animation: scan 3s linear infinite;
    }
    
    @keyframes scan {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    .dsd-guide .grid-bg {
        background-image: 
            linear-gradient(rgba(0, 243, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 243, 255, 0.03) 1px, transparent 1px);
        background-size: 50px 50px;
    }
    
    .dsd-guide .protocol-card {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .dsd-guide .protocol-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 40px rgba(0, 243, 255, 0.2);
        border-color: var(--neon-cyan);
    }
    
    .dsd-guide .protocol-card.active {
        border-color: var(--neon-green);
        box-shadow: 0 0 20px rgba(10, 255, 10, 0.3);
    }
    
    .dsd-guide .step-connector {
        position: absolute;
        left: 24px;
        top: 60px;
        bottom: -20px;
        width: 2px;
        background: linear-gradient(to bottom, var(--neon-cyan), transparent);
    }
    
    .dsd-guide .command-syntax {
        background: #1a1a2e;
        border-left: 3px solid var(--neon-amber);
        padding: 0.75rem;
        border-radius: 4px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.875rem;
    }
    
    .dsd-guide .warning-box {
        background: linear-gradient(135deg, rgba(255, 170, 0, 0.1), rgba(255, 0, 0, 0.05));
        border: 1px solid rgba(255, 170, 0, 0.3);
        border-radius: 8px;
        padding: 1rem;
    }
    
    .dsd-guide .success-box {
        background: linear-gradient(135deg, rgba(10, 255, 10, 0.1), rgba(0, 243, 255, 0.05));
        border: 1px solid rgba(10, 255, 10, 0.3);
        border-radius: 8px;
        padding: 1rem;
    }
    
    .dsd-guide .interactive-file {
        transition: all 0.2s;
        cursor: pointer;
    }
    
    .dsd-guide .interactive-file:hover {
        background: rgba(0, 243, 255, 0.1);
        transform: translateX(10px);
    }
    
    .dsd-guide .pulse-dot {
        width: 12px;
        height: 12px;
        background: var(--neon-green);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--neon-green);
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.2); }
    }
    
    .dsd-guide .tab-content { display: none; }
    .dsd-guide .tab-content.active { display: block; animation: fadeIn 0.4s ease; }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .dsd-guide .tooltip {
        position: relative;
    }
    
    .dsd-guide .tooltip::after {
        content: attr(data-tip);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.85rem;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s;
        border: 1px solid var(--neon-cyan);
    }
    
    .dsd-guide .tooltip:hover::after {
        opacity: 1;
        bottom: calc(100% + 10px);
    }
    
    .dsd-guide .removed-param {
        text-decoration: line-through;
        opacity: 0.5;
        color: #ff4444;
    }

    .dsd-guide .btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: #00f3ff;
        color: #000;
        font-weight: bold;
        border-radius: 8px;
        text-decoration: none;
        transition: all 0.3s;
    }

    .dsd-guide .btn-primary:hover {
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(0, 243, 255, 0.4);
    }

    .dsd-guide .btn-secondary {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border: 1px solid rgba(0, 243, 255, 0.5);
        color: #00f3ff;
        font-weight: bold;
        border-radius: 8px;
        text-decoration: none;
        transition: all 0.3s;
    }

    .dsd-guide .btn-secondary:hover {
        background: rgba(0, 243, 255, 0.1);
    }

    .dsd-guide .nav-link {
        color: #9ca3af;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.875rem;
        transition: color 0.3s;
    }

    .dsd-guide .nav-link:hover {
        color: #00f3ff;
    }

    .dsd-guide .text-cyan { color: #00f3ff; }
    .dsd-guide .text-green { color: #0aff0a; }
    .dsd-guide .text-amber { color: #ffaa00; }
    .dsd-guide .text-purple { color: #a855f7; }
    .dsd-guide .text-red { color: #ef4444; }
    .dsd-guide .text-blue { color: #3b82f6; }
    .dsd-guide .text-orange { color: #f97316; }

    .dsd-guide .bg-cyan-20 { background: rgba(0, 243, 255, 0.2); }
    .dsd-guide .bg-green-20 { background: rgba(10, 255, 10, 0.2); }
    .dsd-guide .bg-amber-20 { background: rgba(255, 170, 0, 0.2); }
    .dsd-guide .bg-purple-20 { background: rgba(168, 85, 247, 0.2); }
    .dsd-guide .bg-blue-20 { background: rgba(59, 130, 246, 0.2); }
    .dsd-guide .bg-orange-20 { background: rgba(249, 115, 22, 0.2); }
    .dsd-guide .bg-red-20 { background: rgba(239, 68, 68, 0.2); }
    .dsd-guide .bg-gray-20 { background: rgba(156, 163, 175, 0.2); }

    .dsd-guide .border-cyan { border-color: #00f3ff; }
    .dsd-guide .border-green { border-color: #0aff0a; }
    .dsd-guide .border-amber { border-color: #ffaa00; }
    .dsd-guide .border-purple { border-color: #a855f7; }

    .dsd-guide .kbd {
        background: rgba(255,255,255,0.1);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-family: 'JetBrains Mono', monospace;
    }

    .dsd-guide input, .dsd-guide select {
        background: rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.2);
        color: white;
        padding: 0.75rem;
        border-radius: 8px;
        width: 100%;
    }

    .dsd-guide input:focus, .dsd-guide select:focus {
        outline: none;
        border-color: #00f3ff;
    }

    .dsd-guide pre {
        background: rgba(0,0,0,0.4);
        padding: 1rem;
        border-radius: 8px;
        overflow-x: auto;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.875rem;
    }

    .dsd-guide table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.875rem;
    }

    .dsd-guide th {
        background: rgba(0, 243, 255, 0.1);
        color: #00f3ff;
        padding: 0.75rem;
        text-align: left;
        font-weight: 700;
        border-bottom: 2px solid rgba(0, 243, 255, 0.3);
    }

    .dsd-guide td {
        padding: 0.75rem;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        color: #d1d5db;
    }

    .dsd-guide tr:hover {
        background: rgba(255,255,255,0.05);
    }
</style>

<div class="dsd-guide grid-bg">

<!-- Navigation -->
<nav style="position: sticky; top: 0; z-index: 50; background: rgba(18, 18, 26, 0.9); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(0, 243, 255, 0.2); padding: 1rem 0; margin-bottom: 2rem;">
    <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div class="pulse-dot"></div>
            <h1 style="font-size: 1.5rem; font-weight: 800; background: linear-gradient(to right, #00f3ff, #0aff0a); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                DSD<span style="color: white;">PLUS</span> GUIDE
            </h1>
        </div>
        <div style="display: flex; gap: 1.5rem;">
            <a href="#setup" class="nav-link">SETUP</a>
            <a href="#protocols" class="nav-link">PROTOCOLS</a>
            <a href="#trunking" class="nav-link">TRUNKING</a>
            <a href="#config" class="nav-link">CONFIG</a>
            <a href="#advanced" class="nav-link">ADVANCED</a>
        </div>
    </div>
</nav>

<!-- Hero Section -->
<section style="padding: 3rem 1rem; position: relative; overflow: hidden;">
    <div style="position: absolute; inset: 0; opacity: 0.2; pointer-events: none;">
        <div style="position: absolute; top: 5rem; left: 2.5rem; width: 18rem; height: 18rem; background: #00f3ff; border-radius: 50%; filter: blur(100px);"></div>
        <div style="position: absolute; bottom: 5rem; right: 2.5rem; width: 24rem; height: 24rem; background: #0aff0a; border-radius: 50%; filter: blur(100px);"></div>
    </div>
    
    <div style="max-width: 1200px; margin: 0 auto; position: relative; z-index: 10;">
        <div class="glass-panel neon-border" style="padding: 3rem;">
            <div style="text-align: center;">
                <div style="display: inline-block; padding: 0.25rem 1rem; background: rgba(0, 243, 255, 0.1); border: 1px solid rgba(0, 243, 255, 0.3); color: #00f3ff; font-size: 0.875rem; font-family: 'JetBrains Mono', monospace; border-radius: 9999px; margin-bottom: 1rem;">
                    v2.547 • PUBLIC RELEASE • FAST LANE
                </div>
                <h2 style="font-size: 3rem; font-weight: 800; margin-bottom: 1.5rem; line-height: 1.2;">
                    Digital Speech Decoder <span class="text-cyan">Plus</span>
                </h2>
                <p style="font-size: 1.25rem; color: #9ca3af; max-width: 800px; margin: 0 auto; line-height: 1.6;">
                    The ultimate interactive guide to decoding P25, DMR, NXDN, D-Star, and more. 
                    From single-conventional monitoring to complex multi-site trunk tracking.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Setup Section -->
<section id="setup" style="padding: 1rem 1rem;">
    <div style="max-width: 1200px; margin: 0 auto;">
        <h2 style="font-size: 2.25rem; font-weight: 700; margin-bottom: 3rem; display: flex; align-items: center; gap: 1rem;">
            <span class="text-cyan">📥</span>
            Installation & Setup
        </h2>

        <div style="display: grid; grid-template-columns: 1fr; gap: 2rem; margin-bottom: 2rem;">
            <!-- Download Steps -->
            <div class="glass-panel">
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem; color: #00f3ff;">1. Initial Setup</h3>
                <div style="display: flex; flex-direction: column; gap: 1rem; position: relative;">
                    <div style="display: flex; gap: 1rem; position: relative;">
                        <div style="flex-shrink: 0; width: 3rem; height: 3rem; border-radius: 50%; background: rgba(0, 243, 255, 0.2); border: 1px solid #00f3ff; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #00f3ff;">1</div>
                        <div style="flex: 1;">
                            <h4 style="font-weight: 700; margin-bottom: 0.25rem;">Create Folder</h4>
                            <p style="font-size: 0.875rem; color: #9ca3af; margin-bottom: 0.5rem;">Create C:\DSDPlus (do not use existing 1.101 folder)</p>
                        </div>
                    </div>

                    <div style="display: flex; gap: 1rem; position: relative;">
                        <div style="flex-shrink: 0; width: 3rem; height: 3rem; border-radius: 50%; background: rgba(0, 243, 255, 0.2); border: 1px solid #00f3ff; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #00f3ff;">2</div>
                        <div style="flex: 1;">
                            <h4 style="font-weight: 700; margin-bottom: 0.25rem;">Download Base Files</h4>
                            <p style="font-size: 0.875rem; color: #9ca3af; margin-bottom: 0.5rem;">Get DSDPlusFull.zip from dsdplus.com</p>
                            <div class="command-syntax">
                                Extract all files to C:\DSDPlus
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 1rem;">
                        <div style="flex-shrink: 0; width: 3rem; height: 3rem; border-radius: 50%; background: rgba(0, 243, 255, 0.2); border: 1px solid #00f3ff; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #00f3ff;">3</div>
                        <div style="flex: 1;">
                            <h4 style="font-weight: 700; margin-bottom: 0.25rem;">Missing Files?</h4>
                            <p style="font-size: 0.875rem; color: #9ca3af; margin-bottom: 0.5rem;">If programs report missing files:</p>
                            <div class="command-syntax">
                                Download DSDPlusBaseFiles.zip<br>
                                Copy all EXE and DLL files to DSD+ folder
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hardware Selection -->
            <div class="glass-panel">
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem; color: #0aff0a;">2. SDR Hardware Setup</h3>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <div class="interactive-file" style="padding: 1rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: space-between;" onclick="selectHardware('rtl')">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <span style="font-size: 1.25rem; color: #00f3ff;">🔌</span>
                            <div>
                                <div style="font-weight: 700;">RTL-SDR Dongle</div>
                                <div style="font-size: 0.75rem; color: #6b7280;">RTL2832U-based • Budget option</div>
                            </div>
                        </div>
                        <div style="font-size: 0.75rem; color: #00f3ff;">Use FMP24</div>
                    </div>

                    <div class="interactive-file" style="padding: 1rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: space-between;" onclick="selectHardware('airspy')">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <span style="font-size: 1.25rem; color: #0aff0a;">📡</span>
                            <div>
                                <div style="font-weight: 700;">Airspy Mini/R2</div>
                                <div style="font-size: 0.75rem; color: #6b7280;">Higher performance • 10/12-bit ADC</div>
                            </div>
                        </div>
                        <div style="font-size: 0.75rem; color: #0aff0a;">Use FMPA</div>
                    </div>

                    <div class="interactive-file" style="padding: 1rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: space-between;" onclick="selectHardware('sdrplay')">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <span style="font-size: 1.25rem; color: #ffaa00;">📻</span>
                            <div>
                                <div style="font-weight: 700;">SDRplay RSP2</div>
                                <div style="font-size: 0.75rem; color: #6b7280;">14-bit ADC • API 3.11</div>
                            </div>
                        </div>
                        <div style="font-size: 0.75rem; color: #ffaa00;">Use FMPP</div>
                    </div>
                </div>

                <div id="hardware-config" style="margin-top: 1.5rem; padding: 1rem; background: rgba(0,0,0,0.3); border-radius: 8px; display: none;">
                    <h4 style="font-weight: 700; color: #00f3ff; margin-bottom: 0.5rem;">Configuration File:</h4>
                    <pre id="hw-config-text" style="font-size: 0.875rem; color: #d1d5db; white-space: pre-wrap;"></pre>
                </div>
            </div>
        </div>

        <!-- DLL Requirements -->
        <div class="glass-panel">
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; color: #ffaa00;">Required DLL Files</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px;">
                    <div style="font-weight: 700; color: #00f3ff; margin-bottom: 0.5rem;">FFTW3</div>
                    <div style="font-size: 0.875rem; color: #9ca3af; margin-bottom: 0.5rem;">Spectrum processing</div>
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #6b7280;">libfftw3f-3.dll</div>
                    <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.5rem;">From: fftw-3.3.5-dll32.zip</div>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px;">
                    <div style="font-weight: 700; color: #0aff0a; margin-bottom: 0.5rem;">RTL-SDR V4</div>
                    <div style="font-size: 0.875rem; color: #9ca3af; margin-bottom: 0.5rem;">RTL-SDR Blog v4 support</div>
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #6b7280;">rtlsdr_V4.dll</div>
                    <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.5rem;">In FMP24 folder</div>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px;">
                    <div style="font-weight: 700; color: #ffaa00; margin-bottom: 0.5rem;">SDRplay API</div>
                    <div style="font-size: 0.875rem; color: #9ca3af; margin-bottom: 0.5rem;">RSP2 support</div>
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #6b7280;">sdrplay_api.dll (v3.11)</div>
                    <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.5rem;">In FMPP folder</div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Protocols Section -->
<section id="protocols" style="padding: 1rem 1rem; background: rgba(0,0,0,0.2);">
    <div style="max-width: 1200px; margin: 0 auto;">
        <h2 style="font-size: 2.25rem; font-weight: 700; margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem;">
            <span class="text-green">〰️</span>
            Supported Protocols
        </h2>
        <p style="color: #9ca3af; margin-bottom: 3rem; max-width: 42rem;">Click any protocol card to see detailed decoding capabilities and configuration requirements.</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;" id="protocol-grid">
            <!-- P25 -->
            <div class="protocol-card glass-panel" onclick="showProtocolDetails('p25')" style="border: 1px solid rgba(255,255,255,0.1); cursor: pointer;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div style="width: 3rem; height: 3rem; border-radius: 8px; background: rgba(59, 130, 246, 0.2); display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 1.25rem;">🏢</span>
                    </div>
                    <span style="font-size: 0.75rem; font-family: 'JetBrains Mono', monospace; background: rgba(59, 130, 246, 0.2); color: #3b82f6; padding: 0.25rem 0.5rem; border-radius: 4px;">PUBLIC SAFETY</span>
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">P25 (Phase I/II)</h3>
                <p style="font-size: 0.875rem; color: #9ca3af; margin-bottom: 1rem;">Project 25 trunked systems used by police, fire, EMS.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">Phase I IMBE</span>
                    <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">Phase II TDMA</span>
                    <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">9600/12000 CC</span>
                </div>
            </div>

            <!-- DMR -->
            <div class="protocol-card glass-panel" onclick="showProtocolDetails('dmr')" style="border: 1px solid rgba(255,255,255,0.1); cursor: pointer;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div style="width: 3rem; height: 3rem; border-radius: 8px; background: rgba(168, 85, 247, 0.2); display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 1.25rem;">💼</span>
                    </div>
                    <span style="font-size: 0.75rem; font-family: 'JetBrains Mono', monospace; background: rgba(168, 85, 247, 0.2); color: #a855f7; padding: 0.25rem 0.5rem; border-radius: 4px;">COMMERCIAL</span>
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">DMR/MotoTRBO</h3>
                <p style="font-size: 0.875rem; color: #9ca3af; margin-bottom: 1rem;">Digital Mobile Radio including Capacity+, Connect+, Tier III.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">Cap+</span>
                    <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">Con+</span>
                    <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">Tier III Std/NonStd</span>
                </div>
            </div>

            <!-- NXDN -->
            <div class="protocol-card glass-panel" onclick="showProtocolDetails('nxdn')" style="border: 1px solid rgba(255,255,255,0.1); cursor: pointer;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div style="width: 3rem; height: 3rem; border-radius: 8px; background: rgba(249, 115, 22, 0.2); display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 1.25rem;">📻</span>
                    </div>
                    <span style="font-size: 0.75rem; font-family: 'JetBrains Mono', monospace; background: rgba(249, 115, 22, 0.2); color: #f97316; padding: 0.25rem 0.5rem; border-radius: 4px;">NEXEDGE</span>
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">NXDN / NEXEDGE</h3>
                <p style="font-size: 0.875rem; color: #9ca3af; margin-bottom: 1rem;">Kenwood/Icom systems with 4800/9600 bps variants.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">4800 bps</span>
                    <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">9600 bps</span>
                    <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">iDAS</span>
                </div>
            </div>

            <!-- D-Star -->
            <div class="protocol-card glass-panel" onclick="showProtocolDetails('dstar')" style="border: 1px solid rgba(255,255,255,0.1); cursor: pointer;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div style="width: 3rem; height: 3rem; border-radius: 8px; background: rgba(10, 255, 10, 0.2); display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 1.25rem;">🎙️</span>
                    </div>
                    <span style="font-size: 0.75rem; font-family: 'JetBrains Mono', monospace; background: rgba(10, 255, 10, 0.2); color: #0aff0a; padding: 0.25rem 0.5rem; border-radius: 4px;">AMATEUR</span>
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">D-Star</h3>
                <p style="font-size: 0.875rem; color: #9ca3af; margin-bottom: 1rem;">Digital Smart Technologies for Amateur Radio.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">GPS Messages</span>
                    <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">Text Messages</span>
                    <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">Routing</span>
                </div>
            </div>

            <!-- Fusion -->
            <div class="protocol-card glass-panel" onclick="showProtocolDetails('fusion')" style="border: 1px solid rgba(255,255,255,0.1); cursor: pointer;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div style="width: 3rem; height: 3rem; border-radius: 8px; background: rgba(239, 68, 68, 0.2); display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 1.25rem;">📡</span>
                    </div>
                    <span style="font-size: 0.75rem; font-family: 'JetBrains Mono', monospace; background: rgba(239, 68, 68, 0.2); color: #ef4444; padding: 0.25rem 0.5rem; border-radius: 4px;">YAESU</span>
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Yaesu Fusion</h3>
                <p style="font-size: 0.875rem; color: #9ca3af; margin-bottom: 1rem;">C4FM modulation with half/full rate voice.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">Full Rate IMBE</span>
                    <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">Half Rate AMBE+2</span>
                </div>
            </div>

            <!-- ProVoice -->
            <div class="protocol-card glass-panel" onclick="showProtocolDetails('provoice')" style="border: 1px solid rgba(255,255,255,0.1); cursor: pointer;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div style="width: 3rem; height: 3rem; border-radius: 8px; background: rgba(156, 163, 175, 0.2); display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 1.25rem;">🛡️</span>
                    </div>
                    <span style="font-size: 0.75rem; font-family: 'JetBrains Mono', monospace; background: rgba(156, 163, 175, 0.2); color: #9ca3af; padding: 0.25rem 0.5rem; border-radius: 4px;">EF JOHNSON</span>
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">ProVoice</h3>
                <p style="font-size: 0.875rem; color: #9ca3af; margin-bottom: 1rem;">EF Johnson legacy IMBE voice synthesis.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">IMBE</span>
                    <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">Simplex/Inbound</span>
                </div>
            </div>
        </div>

        <!-- Protocol Details Panel -->
        <div id="protocol-details" class="glass-panel" style="display: none; border: 1px solid rgba(0, 243, 255, 0.3);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
                <h3 id="detail-title" style="font-size: 1.5rem; font-weight: 700; color: #00f3ff;">Protocol Details</h3>
                <button onclick="closeProtocolDetails()" style="color: #6b7280; background: none; border: none; cursor: pointer; font-size: 1.25rem;">✕</button>
            </div>
            <div id="detail-content"></div>
        </div>
    </div>
</section>

<!-- Trunking Section -->
<section id="trunking" style="padding: 1rem 1rem;">
    <div style="max-width: 1200px; margin: 0 auto;">
        <h2 style="font-size: 2.25rem; font-weight: 700; margin-bottom: 3rem; display: flex; align-items: center; gap: 1rem;">
            <span class="text-amber">🌐</span>
            Trunk Tracking Modes
        </h2>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
            <!-- Single Receiver -->
            <div class="glass-panel" style="border-top: 4px solid #00f3ff;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                    <span style="font-size: 1.5rem; color: #00f3ff;">💻</span>
                    <h3 style="font-size: 1.25rem; font-weight: 700;">Single Receiver</h3>
                </div>
                <p style="font-size: 0.875rem; color: #9ca3af; margin-bottom: 1rem;">One SDR device switches between control channel and voice calls. Uses TCP link exclusively.</p>
                <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; font-size: 0.875rem;">
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280;">Batch File:</span>
                        <span style="color: #00f3ff; font-family: 'JetBrains Mono', monospace;">1R.bat</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280;">Parameter:</span>
                        <span style="color: #00f3ff; font-family: 'JetBrains Mono', monospace;">-r1</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280;">FMP Command:</span>
                        <span style="color: #00f3ff; font-family: 'JetBrains Mono', monospace;">-i1 -o20001</span>
                    </div>
                </div>
                <button onclick="showTrunkingMode('single')" style="width: 100%; padding: 0.5rem; background: rgba(0, 243, 255, 0.2); color: #00f3ff; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.3s;">
                    View Setup
                </button>
            </div>

            <!-- Dual Receiver -->
            <div class="glass-panel" style="border-top: 4px solid #0aff0a;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                    <span style="font-size: 1.5rem; color: #0aff0a;">🥞</span>
                    <h3 style="font-size: 1.25rem; font-weight: 700;">Dual Receiver</h3>
                </div>
                <p style="font-size: 0.875rem; color: #9ca3af; margin-bottom: 1rem;">Dedicated CC and VC receivers for prioritized voice following. Best performance for all system types.</p>
                <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; font-size: 0.875rem;">
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280;">CC Batch:</span>
                        <span style="color: #0aff0a; font-family: 'JetBrains Mono', monospace;">CC.bat (-rc)</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280;">VC Batch:</span>
                        <span style="color: #0aff0a; font-family: 'JetBrains Mono', monospace;">VC.bat (-rv)</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #6b7280;">Hardware:</span>
                        <span style="color: #9ca3af;">2x SDR</span>
                    </div>
                </div>
                <button onclick="showTrunkingMode('dual')" style="width: 100%; padding: 0.5rem; background: rgba(10, 255, 10, 0.2); color: #0aff0a; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.3s;">
                    View Setup
                </button>
            </div>
        </div>

        <!-- Trunking Configuration Panel -->
        <div id="trunking-config" class="glass-panel" style="display: none;">
            <h3 id="trunking-title" style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; color: #ffaa00;">Configuration</h3>
            <div style="display: grid; grid-template-columns: 1fr; gap: 2rem;">
                <div id="trunking-content"></div>
                <div style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; overflow-x: auto;">
                    <div style="color: #6b7280; margin-bottom: 0.5rem;"># Batch File Configuration</div>
                    <pre id="trunking-code" style="color: #0aff0a; margin: 0;"></pre>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Configuration Files Section -->
<section id="config" style="padding: 1rem 1rem; background: rgba(0,0,0,0.2);">
    <div style="max-width: 1200px; margin: 0 auto;">
        <h2 style="font-size: 2.25rem; font-weight: 700; margin-bottom: 2rem; display: flex; align-items: center; gap: 1rem;">
            <span class="text-purple">📄</span>
            Configuration Files
        </h2>

        <!-- File Tabs -->
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">
            <button onclick="switchTab('networks')" class="tab-btn" data-tab="networks" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: rgba(168, 85, 247, 0.2); color: #a855f7; font-weight: 700; border: none; cursor: pointer;">DSDPlus.networks</button>
            <button onclick="switchTab('sites')" class="tab-btn" data-tab="sites" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: transparent; color: #9ca3af; font-weight: 700; border: none; cursor: pointer;">DSDPlus.sites</button>
            <button onclick="switchTab('frequencies')" class="tab-btn" data-tab="frequencies" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: transparent; color: #9ca3af; font-weight: 700; border: none; cursor: pointer;">DSDPlus.frequencies</button>
            <button onclick="switchTab('groups')" class="tab-btn" data-tab="groups" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: transparent; color: #9ca3af; font-weight: 700; border: none; cursor: pointer;">DSDPlus.groups</button>
            <button onclick="switchTab('radios')" class="tab-btn" data-tab="radios" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: transparent; color: #9ca3af; font-weight: 700; border: none; cursor: pointer;">DSDPlus.radios</button>
            <button onclick="switchTab('siteloader')" class="tab-btn" data-tab="siteloader" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: transparent; color: #9ca3af; font-weight: 700; border: none; cursor: pointer;">DSDPlus.siteLoader</button>
            <button onclick="switchTab('p25data')" class="tab-btn" data-tab="p25data" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: transparent; color: #9ca3af; font-weight: 700; border: none; cursor: pointer;">DSDPlus.P25data</button>
        </div>

        <!-- Tab Contents -->
        <div class="glass-panel">
            <div id="tab-networks" class="tab-content active">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div>
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: #a855f7; margin-bottom: 0.5rem;">Network Definitions</h3>
                        <p style="font-size: 0.875rem; color: #9ca3af;">Define trunking systems by protocol, ID, and alias.</p>
                    </div>
                    <span style="font-size: 0.75rem; background: rgba(168, 85, 247, 0.2); color: #a855f7; padding: 0.25rem 0.75rem; border-radius: 9999px;">Required for Trunking</span>
                </div>
                <div style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; margin-bottom: 1rem; overflow-x: auto;">
                    <div style="color: #6b7280;">; Format: Protocol, NetworkID, "Alias" [, options]</div>
                    <div style="color: #0aff0a; margin-top: 0.5rem;">P25, BEE00.1D9, "Palmetto 800"</div>
                    <div style="color: #3b82f6;">Con+, 1234, "ACME Inc"</div>
                    <div style="color: #f97316;">NEXEDGE96, 13, "City Services"</div>
                    <div style="color: #a855f7;">TIIIStd, L13, "Regional Net"</div>
                    <div style="color: #a855f7;">TIIInonStd, L1234:13, "Road Runner"</div>
                    <div style="color: #00f3ff;">Cap+, 9999, "Mayberry PD"</div>
                    <div style="color: #6b7280; margin-top: 0.5rem;">; TIII with CPS-P3 numbering:</div>
                    <div style="color: #a855f7;">TIIIStd, L13, "Coyote LLC", CPS-P3</div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; font-size: 0.875rem;">
                    <div style="padding: 0.75rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <strong style="color: #a855f7;">P25:</strong> WACN.SysID format (hex.hex)
                    </div>
                    <div style="padding: 0.75rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <strong style="color: #a855f7;">DMR:</strong> Decimal system ID
                    </div>
                    <div style="padding: 0.75rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <strong style="color: #a855f7;">TIII:</strong> Add model prefix (T/S/L/H) + optional network prefix (1-4095)
                    </div>
                    <div style="padding: 0.75rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <strong style="color: #a855f7;">Cap+:</strong> Assign unique NID (use RR DB page number)
                    </div>
                </div>
            </div>

            <div id="tab-sites" class="tab-content">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div>
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: #a855f7; margin-bottom: 0.5rem;">Site Definitions</h3>
                        <p style="font-size: 0.875rem; color: #9ca3af;">Define individual sites within networks.</p>
                    </div>
                </div>
                <div style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; margin-bottom: 1rem; overflow-x: auto;">
                    <div style="color: #6b7280;">; Format: Protocol, NetworkID, SiteID, "Alias"</div>
                    <div style="color: #0aff0a; margin-top: 0.5rem;">P25, BEE00.1D9, 1.1, "North Site"</div>
                    <div style="color: #0aff0a;">P25, BEE00.1D9, 1.2, "South Site"</div>
                    <div style="color: #3b82f6;">Con+, 1234, 1, "Site 1"</div>
                    <div style="color: #a855f7;">TIIIStd, L13, 1.1, "HQ"</div>
                    <div style="color: #a855f7;">TIIInonStd, L1234:13, 1, "Home Base"</div>
                    <div style="color: #f97316;">NEXEDGE96, 13, 1, "Downtown"</div>
                </div>
                <div class="warning-box" style="font-size: 0.875rem;">
                    <strong style="color: #ffaa00;">Site Number Formats:</strong><br>
                    P25: RFSS.Site (e.g., 1.1)<br>
                    TIIIStd: Area.Site (e.g., 1.1)<br>
                    TIIInonStd: Site only (e.g., 1)<br>
                    DMR: Decimal site number
                </div>
            </div>

            <div id="tab-frequencies" class="tab-content">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div>
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: #a855f7; margin-bottom: 0.5rem;">Channel Frequencies</h3>
                        <p style="font-size: 0.875rem; color: #9ca3af;">Map channel numbers to frequencies for trunk tracking.</p>
                    </div>
                </div>
                <div style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; margin-bottom: 1rem; overflow-x: auto;">
                    <div style="color: #6b7280;">; Format: Protocol, NetID, Site, Chan, TX Freq, RX Freq, Sort [, DCC]</div>
                    <div style="color: #0aff0a; margin-top: 0.5rem;">P25, BEE00.1D9, 1.1, 1, 853.9875, 808.9875, 0</div>
                    <div style="color: #3b82f6;">Con+, 1234, 1, 1, 451.3125, 456.3125, 0, 12</div>
                    <div style="color: #00f3ff;">Cap+, 9999, 1, 1, 450.5000, 455.5000, 0</div>
                    <div style="color: #a855f7;">TIIIStd, L13, 1.1, 1, 454.7000, 0.0, 0</div>
                    <div style="color: #6b7280; margin-top: 0.5rem;">; Unknown values:</div>
                    <div style="color: #3b82f6;">Con+, 123, 1, ?, 454.6125, 0.0, 0</div>
                    <div style="color: #3b82f6;">Con+, 123, 1, 7, ???.????, 0.0, 0</div>
                </div>
                <div class="success-box" style="font-size: 0.875rem; margin-bottom: 1rem;">
                    <strong style="color: #0aff0a;">Cap+ Setup Tip:</strong> Initially use invalid channel numbers (99) until DSD+ determines correct ordering (e.g., "450.500 is first Cap+ repeater (Ch1 and Ch2)"), then update with correct channel numbers.
                </div>
                <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem; font-size: 0.875rem;">
                    <strong style="color: #00f3ff;">DCC Field:</strong> Optional Digital Color Code for DMR disambiguation when multiple sites share frequencies.
                </div>
            </div>

            <div id="tab-groups" class="tab-content">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div>
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: #a855f7; margin-bottom: 0.5rem;">Talkgroup Definitions</h3>
                        <p style="font-size: 0.875rem; color: #9ca3af;">Auto-populated but editable for aliases and priorities.</p>
                    </div>
                </div>
                <div style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; margin-bottom: 1rem; overflow-x: auto;">
                    <div style="color: #6b7280;">; Format: Protocol, NetID, GroupID, Priority, "Alias"</div>
                    <div style="color: #0aff0a; margin-top: 0.5rem;">P25, BEE00.1D9, 1001, 50, "Dispatch North"</div>
                    <div style="color: #3b82f6;">Con+, 1234, 100, 10, "Security"</div>
                </div>
                <p style="font-size: 0.875rem; color: #9ca3af; margin-bottom: 1rem;">Lower priority numbers = higher priority (1-99). Use HIGH or HOLD for must-monitor groups.</p>
                <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem; font-size: 0.875rem;">
                    <strong style="color: #ffaa00;">TDMA Tagging:</strong> Enable in menus to append " (TDMA)" to talkgroup names for Phase II systems.
                </div>
            </div>

            <div id="tab-radios" class="tab-content">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div>
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: #a855f7; margin-bottom: 0.5rem;">Radio ID Definitions</h3>
                        <p style="font-size: 0.875rem; color: #9ca3af;">Individual radio identifiers with optional aliases.</p>
                    </div>
                </div>
                <div style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; margin-bottom: 1rem; overflow-x: auto;">
                    <div style="color: #6b7280;">; Format: Protocol, NetID, RadioID, "Alias"</div>
                    <div style="color: #0aff0a; margin-top: 0.5rem;">P25, BEE00.1D9, 100001, "Unit 101"</div>
                    <div style="color: #3b82f6;">DMR, 1234, 1001, "*Dispatcher"</div>
                    <div style="color: #6b7280; margin-top: 0.5rem;">; Prefix meanings:</div>
                    <div style="color: #3b82f6;">DMR, 1234, 1002, "~Partial" <span style="color: #6b7280;">; ~ = partially unscrambled</span></div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; font-size: 0.875rem; margin-bottom: 1rem;">
                    <div style="padding: 0.75rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <strong style="color: #00f3ff;">* (Asterisk):</strong> OTA (Over-The-Air) alias from system
                    </div>
                    <div style="padding: 0.75rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <strong style="color: #00f3ff;">~ (Tilde):</strong> Partially unscrambled Motorola alias
                    </div>
                </div>
                <div class="warning-box" style="font-size: 0.875rem;">
                    <strong>Backup Recommended:</strong> Version 2.516+ changed radio file format. Backup DSDPlus.radios before updating - Motorola talker alias data may be discarded during update.
                </div>
            </div>

            <div id="tab-siteloader" class="tab-content">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div>
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: #a855f7; margin-bottom: 0.5rem;">Site Loader</h3>
                        <p style="font-size: 0.875rem; color: #9ca3af;">Quick access list for tuning to sites or conventional channels. Press L in DSD+ to open.</p>
                    </div>
                </div>
                <div style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; margin-bottom: 1rem; overflow-x: auto;">
                    <div style="color: #6b7280;">; Trunked entries (Site 0 = network header):</div>
                    <div style="color: #0aff0a; margin-top: 0.5rem;">P25, BEE00.1D9, 0, "Palmetto 800"</div>
                    <div style="color: #0aff0a;">P25, BEE00.1D9, 1.1, "North Site"</div>
                    <div style="color: #6b7280; margin-top: 0.5rem;">; Conventional entries (Freq first, then mode):</div>
                    <div style="color: #00f3ff;">Conv, 1, 1, "162.550 WX1"</div>
                    <div style="color: #00f3ff;">Conv, 1, 2, "119.150 AM ATIS"</div>
                    <div style="color: #00f3ff;">Conv, 1, 3, "163.830 P25 FBI"</div>
                    <div style="color: #00f3ff;">Conv, 1, 4, "145.17 DMR N2GKG"</div>
                </div>
                <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem; font-size: 0.875rem;">
                    <strong style="color: #00f3ff;">Controls:</strong> Mouse wheel/click to select, Enter to tune, Esc to close. Right-click to tune and keep window open.
                </div>
            </div>

            <div id="tab-p25data" class="tab-content">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div>
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: #a855f7; margin-bottom: 0.5rem;">P25 Data File</h3>
                        <p style="font-size: 0.875rem; color: #9ca3af;">Auto-generated P25 system information (v2.145+).</p>
                    </div>
                </div>
                <div style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; margin-bottom: 1rem; overflow-x: auto;">
                    <div style="color: #6b7280;">; Auto-records:</div>
                    <div style="color: #9ca3af;">- System IDs and bandplans</div>
                    <div style="color: #9ca3af;">- Site numbers and NACs</div>
                    <div style="color: #9ca3af;">- Site BSIs and neighbors</div>
                    <div style="color: #9ca3af;">- Channel usage (CC/SCC/voice/data)</div>
                </div>
                <div class="success-box" style="font-size: 0.875rem;">
                    <strong>Usage:</strong> If a monitored P25 control channel is not broadcasting bandplan data, DSD+ will retrieve it from DSDPlus.P25data. Can be manually edited to add bandplan data.
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Advanced Features -->
<section id="advanced" style="padding: 1rem 1rem;">
    <div style="max-width: 1200px; margin: 0 auto;">
        <h2 style="font-size: 2.25rem; font-weight: 700; margin-bottom: 3rem; display: flex; align-items: center; gap: 1rem;">
            <span class="text-cyan">⚙️</span>
            Advanced Features
        </h2>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
            <!-- LRRP Mapping -->
            <div class="glass-panel">
                <h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; color: #00f3ff;">LRRP GPS Mapping</h3>
                <p style="color: #9ca3af; font-size: 0.875rem; margin-bottom: 1rem;">Location Request/Response Protocol visualization for radio tracking.</p>
                <ul style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; margin-bottom: 1rem; list-style: none; padding: 0;">
                    <li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-green">✓</span> Real-time position plotting</li>
                    <li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-green">✓</span> Historical path tracking</li>
                    <li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-green">✓</span> OpenStreetMap integration</li>
                    <li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-green">✓</span> MaxAge control with [ ] keys</li>
                </ul>
                <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 0.75rem; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;">
                    <span style="color: #6b7280;">Run:</span> <span class="text-cyan">LRRP.exe</span>
                </div>
            </div>

            <!-- Spectrum Survey -->
            <div class="glass-panel">
                <h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; color: #0aff0a;">Spectrum Survey</h3>
                <p style="color: #9ca3af; font-size: 0.875rem; margin-bottom: 1rem;">Analyze 2.4MHz chunks of spectrum over time.</p>
                <ul style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; margin-bottom: 1rem; list-style: none; padding: 0;">
                    <li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-green">✓</span> 3D frequency vs time display</li>
                    <li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-green">✓</span> Peak/average level tracking</li>
                    <li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-green">✓</span> Signal identification</li>
                </ul>
                <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 0.75rem; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;">
                    <span style="color: #6b7280;">In FMP24:</span> <span class="text-green">Press Y</span> <span style="color: #6b7280;">then run</span> <span class="text-green">Survey.exe</span>
                </div>
            </div>

            <!-- Per-Call Recording -->
            <div class="glass-panel">
                <h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; color: #ffaa00;">Per-Call Recording</h3>
                <p style="color: #9ca3af; font-size: 0.875rem; margin-bottom: 1rem;">Automatically record individual calls with metadata.</p>
                <ul style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; margin-bottom: 1rem; list-style: none; padding: 0;">
                    <li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-green">✓</span> WAV or MP3 output</li>
                    <li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-green">✓</span> Aliases in filename (-PTwav, -PRwav, -PBwav)</li>
                    <li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-green">✓</span> SRT subtitle generation</li>
                    <li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-green">✓</span> Metadata headers in audio files</li>
                </ul>
                <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 0.75rem; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;">
                    <span style="color: #6b7280;">Command:</span> <span class="text-amber">-Pwav</span> or <span class="text-amber">-Pmp3</span><br>
                    <span style="color: #6b7280;">With aliases:</span> <span class="text-amber">-PTwav</span> (talkgroup), <span class="text-amber">-PRwav</span> (radio), <span class="text-amber">-PBwav</span> (both)
                </div>
            </div>

            <!-- Talker Alias Server -->
            <div class="glass-panel">
                <h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 1rem; color: #a855f7;">Talker Alias Server</h3>
                <p style="color: #9ca3af; font-size: 0.875rem; margin-bottom: 1rem;">Cloud-based alias decoding for Motorola scrambled aliases (v2.505+).</p>
                <ul style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; margin-bottom: 1rem; list-style: none; padding: 0;">
                    <li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-green">✓</span> Unscrambles Motorola aliases</li>
                    <li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-green">✓</span> Shares data between DSD+ users</li>
                    <li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-green">✓</span> Harris alias decoding</li>
                    <li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-green">✓</span> Offline buffering supported</li>
                </ul>
                <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 0.75rem; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;">
                    <span style="color: #6b7280;">Requires:</span> <span class="text-purple">Internet connection</span><br>
                    <span style="color: #6b7280;">Control:</span> <span class="text-purple">Misc Menu → Alias Server</span>
                </div>
            </div>
        </div>

        <!-- Command Line Reference -->
        <div class="glass-panel">
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem; color: #00f3ff;">Command Line Options (Current Version)</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                <div>
                    <h4 style="font-weight: 700; color: #0aff0a; margin-bottom: 0.75rem;">Active Parameters</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; font-family: 'JetBrains Mono', monospace;">
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                            <span class="text-cyan">-r1</span>
                            <span style="color: #9ca3af;">Single receiver mode</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                            <span class="text-cyan">-rc</span>
                            <span style="color: #9ca3af;">Control channel role</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                            <span class="text-cyan">-rv</span>
                            <span style="color: #9ca3af;">Voice channel role</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                            <span class="text-cyan">-e</span>
                            <span style="color: #9ca3af;">Mute encrypted voice</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                            <span class="text-cyan">-i&lt;linkID&gt;</span>
                            <span style="color: #9ca3af;">Direct connection mode</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                            <span class="text-cyan">-iT&lt;addr:port&gt;</span>
                            <span style="color: #9ca3af;">TCP link to remote PC</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                            <span class="text-cyan">-F&lt;num&gt;</span>
                            <span style="color: #9ca3af;">File modifier (multi-instance)</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                            <span class="text-cyan">-P&lt;T|R|B&gt;&lt;wav|mp3&gt;</span>
                            <span style="color: #9ca3af;">Per-call recording w/ aliases</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                            <span class="text-cyan">-p</span>
                            <span style="color: #9ca3af;">Manual polarity (use with -p-)</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                            <span class="text-cyan">-p-</span>
                            <span style="color: #9ca3af;">Disable auto polarity detection</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                            <span class="text-cyan">-f&lt;a&gt;</span>
                            <span style="color: #9ca3af;">Auto-generate audio output</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                            <span class="text-cyan">-&lt;num&gt;</span>
                            <span style="color: #9ca3af;">Window minimization bitmap</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 style="font-weight: 700; color: #ef4444; margin-bottom: 0.75rem;">Removed Parameters (Do Not Use)</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; font-family: 'JetBrains Mono', monospace;">
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                            <span style="text-decoration: line-through; opacity: 0.5; color: #ef4444;">-t, -T, -E</span>
                            <span style="color: #6b7280;">Removed v2.516</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                            <span style="text-decoration: line-through; opacity: 0.5; color: #ef4444;">-dr, -dh</span>
                            <span style="color: #6b7280;">Removed v2.29</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                            <span style="text-decoration: line-through; opacity: 0.5; color: #ef4444;">-mp</span>
                            <span style="color: #6b7280;">Removed v2.145 (now auto)</span>
                        </div>
                    </div>
                    <div class="warning-box" style="margin-top: 1.5rem;">
                        <h5 style="font-weight: 700; color: #ffaa00; margin-bottom: 0.5rem;">Menu Replacements</h5>
                        <p style="font-size: 0.875rem; color: #9ca3af;">Many old command line options are now menu-controlled:</p>
                        <ul style="font-size: 0.875rem; color: #9ca3af; margin-top: 0.5rem; list-style: none; padding: 0;">
                            <li>• Console/log controls → Misc menu</li>
                            <li>• Call priorities → Control menu</li>
                            <li>• Window/text sizes → Window menu</li>
                            <li>• Threshold, polarity → Active keys</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Keyboard Shortcuts - Table Format -->
        <div class="glass-panel" style="margin-top: 2rem;">
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem; color: #00f3ff;">Essential Keyboard Shortcuts</h3>
            <table>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Function</th>
                        <th>Context</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><kbd class="kbd">L</kbd></td>
                        <td>Open Site Loader</td>
                        <td>Quick tuning to sites/channels</td>
                    </tr>
                    <tr>
                        <td><kbd class="kbd">C</kbd></td>
                        <td>Toggle CC Hunt</td>
                        <td>Switch between CC-only and voice following</td>
                    </tr>
                    <tr>
                        <td><kbd class="kbd">E</kbd></td>
                        <td>Mute Encrypted</td>
                        <td>Silence encrypted transmissions</td>
                    </tr>
                    <tr>
                        <td><kbd class="kbd">V</kbd></td>
                        <td>Call Alerts</td>
                        <td>Toggle call alert sounds</td>
                    </tr>
                    <tr>
                        <td><kbd class="kbd">T</kbd> / <kbd class="kbd">t</kbd></td>
                        <td>Threshold +/-</td>
                        <td>Adjust decoding threshold</td>
                    </tr>
                    <tr>
                        <td><kbd class="kbd">↑</kbd> / <kbd class="kbd">↓</kbd></td>
                        <td>Audio Volume</td>
                        <td>Increase/decrease output volume</td>
                    </tr>
                    <tr>
                        <td><kbd class="kbd">P</kbd></td>
                        <td>Invert Polarity</td>
                        <td>Flip signal polarity manually</td>
                    </tr>
                    <tr>
                        <td><kbd class="kbd">B</kbd></td>
                        <td>Hide Traffic Mode</td>
                        <td>Toggle traffic display filtering</td>
                    </tr>
                    <tr>
                        <td><kbd class="kbd">G</kbd></td>
                        <td>New Tg High Priority</td>
                        <td>Set new talkgroups to high priority</td>
                    </tr>
                    <tr>
                        <td><kbd class="kbd">U</kbd></td>
                        <td>Check Updates</td>
                        <td>Verify current version online</td>
                    </tr>
                    <tr>
                        <td><kbd class="kbd">H</kbd></td>
                        <td>High Contrast</td>
                        <td>Toggle high contrast display mode</td>
                    </tr>
                    <tr>
                        <td><kbd class="kbd">?</kbd></td>
                        <td>Help</td>
                        <td>Show keyboard shortcut reference</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</section>

<!-- FMPx Specific Controls -->
<section style="padding: 1rem 1rem; background: rgba(0,0,0,0.2);">
    <div style="max-width: 1200px; margin: 0 auto;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 2rem; display: flex; align-items: center; gap: 1rem;">
            <span class="text-green">🎛️</span>
            FMP24 / FMPA / FMPP Controls
        </h2>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
            <div class="glass-panel">
                <h3 style="font-size: 1.125rem; font-weight: 700; color: #00f3ff; margin-bottom: 1rem;">FMP24 (RTL-SDR)</h3>
                <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem;">
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                        <kbd class="kbd">t</kbd>
                        <span style="color: #9ca3af;">Toggle bias tee</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                        <kbd class="kbd">E</kbd>
                        <span style="color: #9ca3af;">CPU loading mode</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                        <kbd class="kbd">L</kbd>
                        <span style="color: #9ca3af;">I/Q dropout test</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                        <kbd class="kbd">p/P</kbd>
                        <span style="color: #9ca3af;">PPM correction</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                        <kbd class="kbd">A</kbd>
                        <span style="color: #9ca3af;">Auto center tuning</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                        <kbd class="kbd">Y</kbd>
                        <span style="color: #9ca3af;">Spectrum survey</span>
                    </div>
                </div>
                <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.3); border-radius: 6px; font-size: 0.75rem;">
                    <span style="color: #6b7280;">Serial select:</span> <span class="text-cyan">-i"serial"</span>
                </div>
            </div>

            <div class="glass-panel">
                <h3 style="font-size: 1.125rem; font-weight: 700; color: #0aff0a; margin-bottom: 1rem;">FMPA (Airspy)</h3>
                <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem;">
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                        <kbd class="kbd">t</kbd>
                        <span style="color: #9ca3af;">Toggle bias tee</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                        <kbd class="kbd">A</kbd>
                        <span style="color: #9ca3af;">Auto center tuning</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                        <kbd class="kbd">U</kbd>
                        <span style="color: #9ca3af;">Unlicensed spectrum</span>
                    </div>
                </div>
                <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.3); border-radius: 6px; font-size: 0.75rem;">
                    <span style="color: #6b7280;">Config:</span> <span class="text-green">FMPA.cfg</span> (serial # first line)
                </div>
            </div>

            <div class="glass-panel">
                <h3 style="font-size: 1.125rem; font-weight: 700; color: #ffaa00; margin-bottom: 1rem;">FMPP (SDRplay)</h3>
                <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem;">
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                        <kbd class="kbd">j/J</kbd>
                        <span style="color: #9ca3af;">LNA gain</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                        <kbd class="kbd">k/K</kbd>
                        <span style="color: #9ca3af;">IF gain</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                        <kbd class="kbd">A</kbd>
                        <span style="color: #9ca3af;">Antenna select</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0;">
                        <kbd class="kbd">O</kbd>
                        <span style="color: #9ca3af;">Notch filters</span>
                    </div>
                </div>
                <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0,0,0,0.3); border-radius: 6px; font-size: 0.75rem;">
                    <span style="color: #6b7280;">API:</span> <span class="text-amber">v3.11</span> | <span style="color: #6b7280;">Config:</span> <span class="text-amber">FMPP.cfg</span>
                </div>
            </div>
        </div>

        <div class="glass-panel">
            <h3 style="font-size: 1.125rem; font-weight: 700; color: #a855f7; margin-bottom: 1rem;">Common FMPx Parameters</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; font-size: 0.875rem; font-family: 'JetBrains Mono', monospace;">
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <div style="color: #9ca3af;">-i&lt;num&gt; <span style="color: #6b7280;">Device number</span></div>
                    <div style="color: #9ca3af;">-o&lt;port&gt; <span style="color: #6b7280;">TCP output port</span></div>
                    <div style="color: #9ca3af;">-o&lt;linkID&gt; <span style="color: #6b7280;">Direct connection</span></div>
                    <div style="color: #9ca3af;">-oT&lt;addr:port&gt; <span style="color: #6b7280;">TCP to remote</span></div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <div style="color: #9ca3af;">-f&lt;MHz&gt; <span style="color: #6b7280;">Initial frequency</span></div>
                    <div style="color: #9ca3af;">-b&lt;kHz&gt; <span style="color: #6b7280;">Bandwidth (4/7.6/9.5/12.5/22)</span></div>
                    <div style="color: #9ca3af;">-rc <span style="color: #6b7280;">Control channel role</span></div>
                    <div style="color: #9ca3af;">-rv <span style="color: #6b7280;">Voice channel role</span></div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- System Configuration Generator -->
<section style="padding: 1rem 1rem; background: rgba(0,0,0,0.4);">
    <div style="max-width: 800px; margin: 0 auto;">
        <h2 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 2rem; text-align: center;">System Configuration Generator</h2>
        <div class="glass-panel">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                <div>
                    <label style="display: block; font-size: 0.875rem; font-weight: 700; margin-bottom: 0.5rem; color: #9ca3af;">System Type</label>
                    <select id="sys-type" onchange="updateGenerator()" style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 0.75rem; border-radius: 8px;">
                        <option value="p25">P25 Phase I/II</option>
                        <option value="con+">DMR Connect Plus</option>
                        <option value="cap+">DMR Capacity Plus</option>
                        <option value="nxdn48">NXDN 4800 bps</option>
                        <option value="nxdn96">NXDN 9600 bps</option>
                        <option value="tiiistd">DMR Tier III Standard</option>
                        <option value="tiiinonstd">DMR Tier III Non-Standard</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; font-size: 0.875rem; font-weight: 700; margin-bottom: 0.5rem; color: #9ca3af;">Network ID</label>
                    <input type="text" id="sys-id" oninput="updateGenerator()" placeholder="e.g., BEE00.1D9 or 1234" style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 0.75rem; border-radius: 8px; font-family: 'JetBrains Mono', monospace;">
                </div>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; font-size: 0.875rem; font-weight: 700; margin-bottom: 0.5rem; color: #9ca3af;">System Name</label>
                <input type="text" id="sys-name" oninput="updateGenerator()" placeholder="e.g., City Public Safety" style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 0.75rem; border-radius: 8px;">
            </div>

            <div style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 1.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; overflow-x: auto; border: 1px solid rgba(0, 243, 255, 0.3);">
                <div style="color: #6b7280; margin-bottom: 0.5rem;"># Generated Configuration - Add to DSDPlus.networks:</div>
                <div id="gen-output" style="color: #00f3ff;"></div>
            </div>
        </div>
    </div>
</section>

<!-- Footer -->
<footer style="padding: 3rem 1rem; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
    <div style="max-width: 1200px; margin: 0 auto;">
        <p style="color: #6b7280; font-size: 0.875rem;">
            Based on DSDPlus v2.547 Release Notes. Always refer to <a href="https://www.dsdplus.com" style="color: #00f3ff; text-decoration: none;">dsdplus.com</a> for official updates.
        </p>
        <p style="color: #4b5563; font-size: 0.75rem; margin-top: 1rem;">
            Compiled from official documentation. Remove -t, -T, -E, -dr, -dh, -mp from old scripts.
        </p>
    </div>
</footer>

</div>

<script>
    // Hardware selection
    function selectHardware(type) {
        const config = document.getElementById('hardware-config');
        const text = document.getElementById('hw-config-text');
        
        const configs = {
            rtl: `FMP24.cfg:
2.4
1024
32
10
5000 -6250...
.
.\\FreqList.csv
miles
50
35.0 -90.0

Command line: FMP24 -i1 -o20001 -rc -f450.0

Note: Use -i"serial" for specific dongle`,
            airspy: `FMPA.cfg:
XXXXXXXXXXXXXXXX  ; Airspy serial (16 digit)
2.5
1024
32
5
5000 -6250...
.
.\\FreqList.csv
miles
50
35.0 -90.0

Command line: FMPA -i1 -o20001 -rc -f450.0`,
            sdrplay: `FMPP.cfg:
XXXXXXXXXXXX    ; RSP2 serial
2.5
1024
32
5
5000 -6250...
.
.\\FreqList.csv
miles
50
35.0 -90.0

Command line: FMPP -i1 -o20001 -rc -f450.0

Note: API v3.11 required`
        };
        
        text.textContent = configs[type];
        config.style.display = 'block';
    }

    // Protocol details
    const protocolData = {
        p25: {
            title: 'P25 (Project 25)',
            content: `
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px;">
                            <h4 style="font-weight: 700; color: #0aff0a; margin-bottom: 0.5rem;">Supported Features</h4>
                            <ul style="display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.875rem; color: #d1d5db; list-style: none; padding: 0;">
                                <li>• Phase I (IMBE) voice synthesis</li>
                                <li>• Phase II (AMBE+2) TDMA voice</li>
                                <li>• Control channel (9600/12000 bps)</li>
                                <li>• Inbound control channel (ISPs)</li>
                                <li>• Trunk tracking with priority</li>
                                <li>• Motorola/Harris OTA aliases</li>
                                <li>• GPS/LRRP/AVL messages</li>
                                <li>• Packet data decoding</li>
                                <li>• Harris patch/simulselect</li>
                            </ul>
                        </div>
                        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px;">
                            <h4 style="font-weight: 700; color: #00f3ff; margin-bottom: 0.5rem;">Configuration</h4>
                            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: #d1d5db;">
                                <div style="color: #6b7280;">; Networks:</div>
                                <div style="color: #0aff0a;">P25, BEE00.1D9, "System Name"</div>
                                <div style="color: #6b7280; margin-top: 0.5rem;">; Sites:</div>
                                <div style="color: #0aff0a;">P25, BEE00.1D9, 1.1, "Site 1"</div>
                                <div style="color: #6b7280; margin-top: 0.5rem;">; Note: WACN.SysID (hex.hex)</div>
                                <div style="color: #6b7280;">; Site: RFSS.Site (e.g., 1.1)</div>
                            </div>
                        </div>
                    </div>
                    <div class="warning-box" style="font-size: 0.875rem;">
                        <strong>Dual Receiver Recommended:</strong> For best Phase II performance, use two SDR devices. VC side MUST be RTL-SDR with FMP24 or Airspy with FMPA using TCP link.
                    </div>
                </div>
            `
        },
        dmr: {
            title: 'DMR / MotoTRBO',
            content: `
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; border: 1px solid rgba(168, 85, 247, 0.3);">
                            <h4 style="font-weight: 700; color: #a855f7; margin-bottom: 0.5rem;">Capacity Plus</h4>
                            <p style="font-size: 0.75rem; color: #9ca3af; margin-bottom: 0.5rem;">Single site, LCN based</p>
                            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #a855f7;">Cap+, 9999, "Name"</div>
                            <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.5rem;">No OTA site number</div>
                        </div>
                        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.3);">
                            <h4 style="font-weight: 700; color: #3b82f6; margin-bottom: 0.5rem;">Connect Plus</h4>
                            <p style="font-size: 0.75rem; color: #9ca3af; margin-bottom: 0.5rem;">Multi-site, XPT</p>
                            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #3b82f6;">Con+, 1234, "Name"</div>
                            <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.5rem;">Repeater map decoding</div>
                        </div>
                        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; border: 1px solid rgba(0, 243, 255, 0.3);">
                            <h4 style="font-weight: 700; color: #00f3ff; margin-bottom: 0.5rem;">Tier III</h4>
                            <p style="font-size: 0.75rem; color: #9ca3af; margin-bottom: 0.5rem;">Standard vs Non-Standard</p>
                            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #00f3ff;">TIIIStd / TIIInonStd</div>
                            <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.5rem;">Auto-detected, or force in menu</div>
                        </div>
                    </div>
                    <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px;">
                        <h4 style="font-weight: 700; color: #ffaa00; margin-bottom: 0.5rem;">Key Features</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.875rem; color: #d1d5db;">
                            <div>• Dual Capacity Direct Mode (DCDM)</div>
                            <div>• Rest channel following</div>
                            <div>• Talker alias decoding</div>
                            <div>• GPS/AVL/LRRP messages</div>
                            <div>• Text message decoding</div>
                            <div>• TX Interruptible voice</div>
                            <div>• RAS detection</div>
                            <div>• Hytera XPT (voice only)</div>
                        </div>
                    </div>
                </div>
            `
        },
        nxdn: {
            title: 'NXDN / NEXEDGE',
            content: `
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px;">
                            <h4 style="font-weight: 700; color: #f97316; margin-bottom: 0.5rem;">Variants</h4>
                            <ul style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; list-style: none; padding: 0;">
                                <li style="display: flex; justify-content: space-between;"><span>NEXEDGE48</span> <span style="color: #6b7280;">4800 bps</span></li>
                                <li style="display: flex; justify-content: space-between;"><span>NEXEDGE96</span> <span style="color: #6b7280;">9600 bps</span></li>
                                <li style="display: flex; justify-content: space-between;"><span>iDAS</span> <span style="color: #6b7280;">Icom variant</span></li>
                            </ul>
                        </div>
                        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px;">
                            <h4 style="font-weight: 700; color: #0aff0a; margin-bottom: 0.5rem;">Features</h4>
                            <ul style="display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.875rem; color: #d1d5db; list-style: none; padding: 0;">
                                <li>• Control channel decoding</li>
                                <li>• Distributed control (VOC)</li>
                                <li>• Trunk tracking</li>
                                <li>• Direct Frequency Access (DFA)</li>
                                <li>• OTA radio aliases</li>
                                <li>• GPS/AVL with elevation</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },
        dstar: {
            title: 'D-Star',
            content: `
                <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px;">
                    <h4 style="font-weight: 700; color: #0aff0a; margin-bottom: 0.5rem;">Amateur Radio Features</h4>
                    <ul style="display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.875rem; color: #d1d5db; list-style: none; padding: 0;">
                        <li>• Routing/callsign decoding</li>
                        <li>• Text message decoding</li>
                        <li>• GPS message decoding (passed to LRRP)</li>
                        <li>• DTMF decoding/synthesis</li>
                        <li>• AMBE voice synthesis</li>
                    </ul>
                </div>
                <div class="success-box" style="margin-top: 1rem; font-size: 0.875rem;">
                    <strong>Amateur Settings:</strong> Set default DMR network ID and site number in DSD+ Misc menu for amateur radio DMR stations.
                </div>
            `
        },
        fusion: {
            title: 'Yaesu Fusion',
            content: `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px;">
                        <h4 style="font-weight: 700; color: #ef4444; margin-bottom: 0.5rem;">Modes</h4>
                        <ul style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; list-style: none; padding: 0;">
                            <li style="display: flex; justify-content: space-between; align-items: center;">
                                <span>Full Rate</span>
                                <span style="font-size: 0.75rem; background: rgba(239, 68, 68, 0.2); padding: 0.125rem 0.5rem; border-radius: 4px;">IMBE</span>
                            </li>
                            <li style="display: flex; justify-content: space-between; align-items: center;">
                                <span>Half Rate</span>
                                <span style="font-size: 0.75rem; background: rgba(239, 68, 68, 0.2); padding: 0.125rem 0.5rem; border-radius: 4px;">AMBE+2</span>
                            </li>
                        </ul>
                    </div>
                    <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px;">
                        <h4 style="font-weight: 700; color: #ffaa00; margin-bottom: 0.5rem;">Features</h4>
                        <ul style="display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.875rem; color: #d1d5db; list-style: none; padding: 0;">
                            <li>• Routing/callsign decoding</li>
                            <li>• Link control decoding</li>
                            <li>• Wires-X support</li>
                            <li>• DTMF tone handling</li>
                        </ul>
                    </div>
                </div>
            `
        },
        provoice: {
            title: 'ProVoice',
            content: `
                <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px;">
                    <h4 style="font-weight: 700; color: #9ca3af; margin-bottom: 0.5rem;">EF Johnson Legacy</h4>
                    <p style="font-size: 0.875rem; color: #9ca3af; margin-bottom: 1rem;">IMBE voice synthesis only. Simplex and inbound transmission support.</p>
                    <ul style="display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.875rem; color: #d1d5db; list-style: none; padding: 0;">
                        <li>• IMBE voice synthesis</li>
                        <li>• Simplex decoding</li>
                        <li>• Inbound transmission support</li>
                        <li>• Link control decoding (limited)</li>
                    </ul>
                </div>
            `
        }
    };

    function showProtocolDetails(protocol) {
        const panel = document.getElementById('protocol-details');
        const title = document.getElementById('detail-title');
        const content = document.getElementById('detail-content');
        
        document.querySelectorAll('.protocol-card').forEach(c => c.classList.remove('active'));
        event.currentTarget.classList.add('active');
        
        title.textContent = protocolData[protocol].title;
        content.innerHTML = protocolData[protocol].content;
        panel.style.display = 'block';
        
        panel.scrollIntoView({behavior: 'smooth', block: 'nearest'});
    }

    function closeProtocolDetails() {
        document.getElementById('protocol-details').style.display = 'none';
        document.querySelectorAll('.protocol-card').forEach(c => c.classList.remove('active'));
    }

    // Trunking modes
    const trunkingData = {
        single: {
            title: 'Single Receiver Mode (1R.bat)',
            content: `
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <p style="color: #d1d5db;">One SDR device switches between control/rest channel and voice calls. All communication via TCP link (no file system).</p>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <h4 style="font-weight: 700; color: #00f3ff;">Files to Run:</h4>
                        <ul style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; color: #d1d5db; list-style: none; padding: 0;">
                            <li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-green">▶</span> 1R.bat (starts DSD+ with -r1)</li>
                            <li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-green">▶</span> FMP24-CC.bat (or FMPA-CC.bat)</li>
                        </ul>
                    </div>
                    <div style="background: rgba(0,0,0,0.3); padding: 0.75rem; border-radius: 6px; font-size: 0.875rem;">
                        <strong style="color: #ffaa00;">Operation:</strong> Press <kbd class="kbd">C</kbd> in DSD+ to toggle between CC-only and voice following modes. DSD+ and FMPx can run on separate PCs via TCP.
                    </div>
                    <div style="background: rgba(255,255,255,0.05); padding: 0.75rem; border-radius: 6px; font-size: 0.875rem;">
                        <strong>Note:</strong> Multiple copies can share data files using -F modifier (e.g., -F2 creates DSDPlus2.groups, etc.)
                    </div>
                </div>
            `,
            code: `REM 1R.bat
DSDPlus -r1 -fa

REM FMP24-CC.bat (run first)
FMP24 -i1 -o20001 -rc -f450.0

REM Or for second instance (1Ra.bat):
REM DSDPlus -r1 -F2 -fa
REM FMP24 -i2 -o20002 -rc -f460.0`
        },
        dual: {
            title: 'Dual Receiver Mode (CC.bat + VC.bat)',
            content: `
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <p style="color: #d1d5db;">Dedicated control channel and voice channel receivers. Provides prioritized voice call following on all system types.</p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div style="background: rgba(0, 243, 255, 0.1); padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(0, 243, 255, 0.3);">
                            <h5 style="font-weight: 700; color: #00f3ff; margin-bottom: 0.5rem;">Control Side</h5>
                            <ul style="font-size: 0.875rem; color: #d1d5db; list-style: none; padding: 0;">
                                <li>• CC.bat (-rc)</li>
                                <li>• FMP24-CC.bat (-rc)</li>
                                <li>• Monitors control channel</li>
                                <li>• Directs voice channel tuning</li>
                                <li>• Auto-mutes when VC active</li>
                            </ul>
                        </div>
                        <div style="background: rgba(10, 255, 10, 0.1); padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(10, 255, 10, 0.3);">
                            <h5 style="font-weight: 700; color: #0aff0a; margin-bottom: 0.5rem;">Voice Side</h5>
                            <ul style="font-size: 0.875rem; color: #d1d5db; list-style: none; padding: 0;">
                                <li>• VC.bat (-rv)</li>
                                <li>• FMP24-VC.bat (-rv)</li>
                                <li>• Follows voice calls</li>
                                <li>• Decodes audio</li>
                                <li>• Prioritized call handling</li>
                            </ul>
                        </div>
                    </div>
                    <div class="success-box" style="font-size: 0.875rem;">
                        <strong>Benefit:</strong> Fully prioritized voice following on all system types. For P25, minimal benefit over single receiver, but captures all CC activity.
                    </div>
                </div>
            `,
            code: `REM CC.bat
DSDPlus -rc -fa

REM VC.bat  
DSDPlus -rv -fa

REM FMP24-CC.bat
FMP24 -i1 -o20001 -rc -f853.0

REM FMP24-VC.bat  
FMP24 -i2 -o20002 -rv

REM Note: CC DSD+ auto-tunes VC FMP24 via TCP`
        }
    };

    function showTrunkingMode(mode) {
        const panel = document.getElementById('trunking-config');
        const title = document.getElementById('trunking-title');
        const content = document.getElementById('trunking-content');
        const code = document.getElementById('trunking-code');
        
        title.textContent = trunkingData[mode].title;
        content.innerHTML = trunkingData[mode].content;
        code.textContent = trunkingData[mode].code;
        
        panel.style.display = 'block';
        panel.scrollIntoView({behavior: 'smooth', block: 'nearest'});
    }

    // Tab switching
    function switchTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.style.background = 'transparent';
            b.style.color = '#9ca3af';
        });
        
        document.getElementById(`tab-${tabName}`).classList.add('active');
        event.target.style.background = 'rgba(168, 85, 247, 0.2)';
        event.target.style.color = '#a855f7';
    }

    // System generator
    function updateGenerator() {
        const type = document.getElementById('sys-type').value;
        const id = document.getElementById('sys-id').value || 'NETWORK_ID';
        const name = document.getElementById('sys-name').value || 'System Name';
        
        const templates = {
            p25: `P25, ${id}, "${name}"`,
            'con+': `Con+, ${id}, "${name}"`,
            'cap+': `Cap+, ${id}, "${name}"`,
            nxdn48: `NEXEDGE48, ${id}, "${name}"`,
            nxdn96: `NEXEDGE96, ${id}, "${name}"`,
            tiiistd: `TIIIStd, L${id}, "${name}"`,
            tiiinonstd: `TIIInonStd, L${id}, "${name}"`
        };
        
        document.getElementById('gen-output').textContent = templates[type];
    }
    updateGenerator();

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        });
    });
</script>


