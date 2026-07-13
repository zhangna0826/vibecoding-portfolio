---
title: MovieMatcher
category: Prototyping
year: 2026
subhead: A mood-based movie quiz that recommends films and saves picks to a personal watchlist.
cardDescription: Built a vanilla JavaScript web app with a three-step quiz, weighted matching algorithm, personalized results, and localStorage watchlist — designed for quick "what should I watch tonight?" decisions.
liveUrl: https://moviefilmmatcher.netlify.app/
coverAlt: MovieMatcher home screen with hero, genre tags, and featured movie grid
role: Product Designer & Developer
tools: HTML, CSS, JavaScript
processSteps:
  - Discover
  - Design
  - Develop
  - Deliver
---

## Overview

MovieMatcher is a lightweight film recommendation app I designed and built for ARTGR 5840. It helps indecisive viewers pick a movie in under a minute by asking three questions about mood, film type, and company, then surfacing a scored match from a curated catalog. I owned the full experience — quiz flow, recommendation engine, watchlist persistence, and responsive UI — using plain HTML, CSS, and JavaScript with no framework dependencies.

## Challenge

Streaming libraries are overwhelming; most people spend more time browsing than watching.

I needed a focused prototype that felt personal without requiring accounts or a backend. The constraints were clear: four routes (home, quiz, result, watchlist), a 12-film catalog with real metadata, localStorage for saved films, and a matching algorithm transparent enough to explain in a case study.

## Solution

I shipped a multi-page static app with a stepped quiz UI, progress tracker, and auto-advance on answer selection. A weighted scoring function ranks films by mood, type, and company tags, returning the top match plus three "you might also like" suggestions. The result page shows poster, rating, genres, and synopsis with save-to-watchlist and try-again actions. The watchlist supports filter tabs (all, to watch, watched), toggle watched status, and summary stats. The home page adds genre browsing and a featured grid sorted by rating.

## Process

I worked through four phases — discover, design, develop, and deliver — to move from a vague “help me pick a movie” problem to a shipped static app.

**Discover** — Scoped four routes, a 12-film catalog with real metadata, localStorage persistence, and a transparent matching algorithm before writing code.

**Design** — Mapped the home-to-quiz-to-result journey, then designed radio options, a three-step progress tracker, and auto-advance on answer selection.

**Develop** — Built shared modules for movie data, localStorage helpers, and a `scoreMovie` function with rating tie-breaks; wired the multi-page flow in plain HTML, CSS, and JavaScript.

**Deliver** — Added poster fallbacks, watchlist filter tabs, empty states, and popup confirmations, then deployed the static build to Netlify.

## AI-Assisted Development

A look at some of the actual prompts used to build this app with AI assistance — from multipage initialization and quiz flow logic to interaction refinements and home-page filtering.

1. **Initializing the multipage structure**  
   Prompt: Help me initialize a multipage web application with following blank pages. Do not use any framework. You should only use HTML, css and JS. Step 1: Initiate document structure. Home Page: /. Quiz Page: /quiz. Result Page: /result. Watchlist Page: /watchlist.  
   Result: Worked as expected. However, the Result page showed as a parallel nav tab. It should only be reached after completing the quiz. This will be addressed in a later prompt.

2. **Building the quiz-to-result user flow logic**  
   Prompt: Please implement a feature that support following user flow: quiz answers → scored match → result page.  
   Result: No issues found.

3. **Refining the quiz interaction**  
   Prompt: Swap answer options between Question 1 and Question 2; auto-advance on answer selection; add Previous; remove Next.  
   Result: Worked well. The options were correctly swapped between the two questions.

4. **Adding featured movies and genre filtering**  
   Prompt: Add Featured Movies grid and clickable genre tags that filter and highlight the active selection.  
   Result: Worked well. Movie cards with posters appeared in a grid layout, and clicking a genre tag correctly filtered the displayed movies. The active genre was highlighted to show the current selection.

## Outcomes

MovieMatcher demonstrates end-to-end interaction design with a real recommendation engine and persistent client-side state. The app runs from any static file server, loads in under a second, and degrades gracefully when poster URLs are unavailable.

## Reflection

Building MovieMatcher solo forced clear scope decisions early — a 12-film catalog and three quiz questions kept the matching logic explainable and the case study honest. Auto-advancing the quiz reduced friction without hiding progress, which worked well for a “pick something tonight” use case. Next time I would connect a live catalog via TMDB, surface streaming availability on the result page, and add shareable result cards so recommendations can leave the browser. The main takeaway: a constrained prototype with transparent scoring taught more about product judgment than a larger feature set would have.

## Style guide

MovieMatcher uses a clean light interface — white surfaces on a soft gray page background, system UI typography, and blue as the single primary action color. Cards and buttons share an 8px radius; genre tags and ratings use muted secondary styling so the movie poster stays the focal point.

## Gallery

Four screens from the live app:
1. Home — hero, genre browse, featured films (`screenshot1_moviematcher.png`)
2. Quiz — Type step with Mood / Type / Company stepper (`screenshot2_moviematcher.png`)
3. Result — “Your Match” for *Get Out*, save / try again, related picks (`screenshot3_moviematcher.png`)
4. Watchlist — All / To watch / Watched filters, saved films, summary stats (`screenshot4_moviematcher.png`)

## Deployment

The app is a static multi-page site built with plain HTML, CSS, and JavaScript — no build step or backend required. Deployed at [moviefilmmatcher.netlify.app](https://moviefilmmatcher.netlify.app/).
