---
title: Blossom
category: Prototyping
year: 2026
subhead: A plant-care tracker that surfaces who needs water today, resets schedules with one tap, and lets you grow a collection from quick-pick templates.
cardDescription: Built a mobile plant watering app with priority care cards, live countdowns, Healthy / Soon / Water today badges, and an Add Plant flow with species templates — React, Vite, Tailwind, and a DESIGN.md token system.
liveUrl: https://initialize-plant-watering-dashboard.vercel.app/
repoUrl:
coverAlt: Blossom home screen with Needs watering today priority card and My plants grid
role: Product Designer & Developer
tools: React, Vite, Tailwind, React Router
processSteps:
  - Discover
  - Design
  - Develop
  - Deliver
---

## Overview

Blossom is a mobile-first plant watering app I designed and built for ARTGR 5840, starting from a Figma Make export and refining it through vibe coding. It helps plant owners see who needs water today, mark plants as watered in one tap, and add new plants from quick-pick templates or custom details. I owned the full experience — home dashboard, watering interaction, Add Plant flow, plant state logic, and a DESIGN.md-driven visual system — using React, Vite, Tailwind, and React Router with client-side state and no backend.

## Challenge

Houseplant owners forget watering schedules until leaves droop — and juggling different frequencies for Monstera, Peace Lily, and succulents makes a simple reminder feel messy.

I needed a focused prototype that felt like a phone app, not a marketing dashboard, without accounts or a database. The constraints were clear: front-end only, a Home + Add Plant flow, status badges (Healthy / Soon / Water today), live countdown timers, and a calm botanical UI grounded in a written design system rather than one-off styles.

## Solution

I shipped a React SPA with a compact home screen: Blossom leaf wordmark, time-based greeting, and a one-line care summary. Plants due today rise into a dark-green priority card with a white Watered button; the My plants grid shows icons, scientific names, next-water countdowns, and status badges. Tapping Watered resets the plant’s interval, flips the badge to Healthy, disables the button until the next cycle, and shows a brief confirmation — watering from the priority section transforms that card into a “Well done!” success state. Add Plant offers Quick pick templates (Monstera, Peace Lily, Sunflower, Succulent, Fern, Cactus) plus name and watering-frequency fields, initializing new plants so their Watered control matches their schedule.

## Process

I worked through four phases — discover, design, develop, and deliver — from a Figma Make starter to a token-aligned mobile prototype on Vercel.

**Discover** — Scoped Home (/) and Add Plant flows, plant model (name, scientific name, frequencyDays, lastWateredDate), and status derived from next-water timing; no login or backend.

**Design** — Authored DESIGN.md (green-first palette, Nunito, bubbly radii, flat borders) and restyled the UI to match — renaming Verdant → Blossom, replacing the web “Dashboard” hero with a compact app header, and elevating the priority card with dark green (#3B6D11).

**Develop** — Implemented mark-as-watered with countdown reset, badge/button state changes, section-scoped confirmation animation, new-plant initial state fixes, and Quick pick + Details on Add Plant.

**Deliver** — Tightened mobile spacing, fixed surface contrast so white cards read on mint, polished primary CTAs, and deployed the Vite build to Vercel.

## AI-Assisted Development

A look at some of the actual prompts used to build this app with AI assistance — from watering interaction and bug fixes to design-system restyle and mobile polish.

1. **Implementing the watering flow**  
   Prompt: Implement the watering feature for the following task: START: User is on the Home Page (/). User sees a plant card that needs watering (status is "Water today" or "Soon"). User clicks the "Watered" button on the plant card. System resets the countdown timer to the plant's default watering interval. System changes the button from black to grey (disabled state). System updates the status badge from "Water today" or "Soon" to "Healthy". If the plant was in the "Needs watering today" section at the top, remove it from that section. System briefly shows a "✅ Watered!" confirmation animation or toast message on the card. END.  
   Result: Worked well. Countdown reset, badge/button states, and confirmation animation shipped; later prompts refined priority-section behavior.

2. **Scoping the Watered animation to the clicked card**  
   Prompt: There's a bug: when I click "Watered" on a plant card in the "My Plants" section, the card in the "Needs watering today" section at the top also turns green and shows the animation. They should be independent. The green "Watered!" animation should only appear on the exact card that was clicked, not on any other card. Please fix this.  
   Result: Fixed by keying flash state to plant ID + section (priority vs grid) so only the clicked card animates.

3. **Priority card success state**  
   Prompt: When user clicks "Mark as watered" on the card in the "Needs watering today" section, don't remove the card. Instead, keep the card here but change it. For example, show a message like "Well done! 🌿 No plants need water today" with a green background, and hide the button.  
   Result: Priority card transforms into a success banner; heading hides when nothing remains due.

4. **Restyling to DESIGN.md and renaming to Blossom**  
   Prompt: Use DESIGN.md as the single source of truth for all styling in this project. Restyle the entire UI to fully follow the design system defined in DESIGN.md. Do not invent new colors, typography styles, border radii, or component patterns. Then: The "Verdant" logo at the top is stuck in an ugly boxed header with a border around it. Just show the Verdant wordmark cleanly on the header. Then change Verdant to Blossom. Follow DESIGN.md for the styles.  
   Result: Token-aligned restyle landed; wordmark sits on the page canvas as Blossom without a boxed header bar.

5. **Mobile home header and priority card contrast**  
   Prompt: The home screen has a "Dashboard" title. It looks like a web page, not a phone app. Remove the word "Dashboard" and the long subtitle. Instead put a small app header with the "Blossom" name and a leaf icon at the top, then a short greeting like "Good morning" with a one-line summary like "1 plant needs water today". Keep it compact. Follow DESIGN.md. The "Needs watering today" card should use a dark green background to stand out, with white text and a white "Watered" button with green text.  
   Result: Compact greeting + summary replaced the web hero; dark priority card became the clear urgent call-to-action.

## Outcomes

Blossom demonstrates end-to-end interaction design for a care-habit loop: status at a glance, one-tap watering with clear confirmation, and a low-friction add flow. The app runs as a Vite/React build on Vercel, keeps plant state in the client, and ships with sample plants plus empty and all-caught-up home states for demos.

## Reflection

Vibe coding Blossom worked best when prompts described exact start/end states — the watering task, animation scoping, and DESIGN.md restyle were faster than vague “make it nicer” requests. Treating DESIGN.md as the single source of truth kept the mint canvas, white cards, and dark priority card coherent after the Figma Make export. Next time I would persist plants in localStorage, add per-plant edit/delete, and support custom watering intervals beyond the preset frequencies. The main takeaway: a written design system plus precise interaction prompts turns a starter export into a product that feels intentional on a phone.

## Style guide

Blossom follows a calm botanical system — soft mint `bg-page`, warm off-white cards, and a 10-step green scale for text and primary actions. Nunito carries the UI; bubbly pill buttons and hairline borders replace shadows. Status badges use sky (“Soon”) and clay/cream (“Water today”) accents sparingly; the priority card uses deep green (#3B6D11) with a white Watered control so urgent care never blends into the grid.

## Gallery

Four screens from the live app:
1. Needs watering today — Peace Lily priority card with overdue timer and Watered CTA (`screenshot1_blossom.png`)
2. Just watered — confirmation overlay on Monstera and Healthy / Soon badges in the grid (`screenshot2_blossom.png`)
3. Add a plant — Quick pick templates plus name and watering frequency (`screenshot3_blossom.png`)
4. All caught up — Well done banner and My plants grid with next-water countdowns (`screenshot4_blossom.png`)

## Deployment

The app is a Vite + React single-page app (Tailwind, React Router) deployed to Vercel. Live at [initialize-plant-watering-dashboard.vercel.app](https://initialize-plant-watering-dashboard.vercel.app/).
