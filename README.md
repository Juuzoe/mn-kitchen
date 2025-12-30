<div align="center">

<svg width="980" height="140" viewBox="0 0 980 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MN Kitchen">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#0f172a">
        <animate attributeName="stop-color" values="#0f172a;#111827;#0f172a" dur="10s" repeatCount="indefinite"/>
      </stop>
      <stop offset="50%" stop-color="#1f2937">
        <animate attributeName="stop-color" values="#1f2937;#0b1220;#1f2937" dur="10s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" stop-color="#0b1220">
        <animate attributeName="stop-color" values="#0b1220;#0f172a;#0b1220" dur="10s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>

    <linearGradient id="ring" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#e5e7eb" stop-opacity="0.25"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#e5e7eb" stop-opacity="0.25"/>
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="980" height="140" rx="18" fill="url(#bg)"/>

  <g opacity="0.85">
    <circle cx="92" cy="70" r="44" fill="none" stroke="url(#ring)" stroke-width="10"/>
    <circle cx="92" cy="70" r="28" fill="none" stroke="#ffffff" stroke-opacity="0.10" stroke-width="8"/>
    <circle cx="92" cy="70" r="16" fill="#ffffff" fill-opacity="0.06"/>
    <animateTransform attributeName="transform" type="rotate" from="0 92 70" to="360 92 70" dur="18s" repeatCount="indefinite"/>
  </g>

  <g opacity="0.75">
    <circle cx="888" cy="70" r="44" fill="none" stroke="url(#ring)" stroke-width="10"/>
    <circle cx="888" cy="70" r="28" fill="none" stroke="#ffffff" stroke-opacity="0.10" stroke-width="8"/>
    <circle cx="888" cy="70" r="16" fill="#ffffff" fill-opacity="0.06"/>
    <animateTransform attributeName="transform" type="rotate" from="360 888 70" to="0 888 70" dur="22s" repeatCount="indefinite"/>
  </g>

  <text x="490" y="78" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="40" fill="#ffffff" fill-opacity="0.92">
    MN Kitchen
  </text>
  <text x="490" y="108" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="14" fill="#ffffff" fill-opacity="0.62">
    menu and basket flow designed to connect to a Telegram bot
  </text>
</svg>

<p>
  <a href="https://juuzoe.github.io/mn-kitchen/">
    <img alt="Open the app" src="https://img.shields.io/badge/Open%20the%20app-juuzoe.github.io%2Fmn--kitchen-22c55e">
  </a>
  <a href="https://github.com/Juuzoe/mn-kitchen">
    <img alt="Repository" src="https://img.shields.io/badge/Repository-GitHub-334155">
  </a>
</p>

</div>

## What this is

MN Kitchen is a web app I use with my girlfriend to pick dishes, add them to a basket, and turn that basket into an order without rewriting the same message every time.

The About page in the app explains the motivation in plain terms and the direction I want to take it next.

Live app  
https://juuzoe.github.io/mn-kitchen/

## How it works

The app keeps the menu data in one place and keeps basket state in one place. Cards on the menu can expand to show details, and adding to basket does not toggle the card content. A separate basket view lets you adjust quantities and review what is currently selected.

Routes used by the UI

- `/` menu
- `/basket` basket view
- `/about` background and motivation

## UI motion and feedback

Animations are driven by Framer Motion and are tied to user actions. Examples include entrance motion for page content, hover motion for cards and buttons, and toast messages that animate when basket actions happen. Motion is controlled through React state, not timers that run independently, so feedback matches what the user actually clicked.


## Telegram bot plan

This project is set up for a Telegram bot connection. The basket is already a single source of truth and can be exported as a compact order payload. The planned flow is

Open the site  
Add items to the basket  
Press an order button that exports the basket  
Send the payload to a Telegram bot endpoint  
Let the bot format and post the order in chat

## Forking and reuse

Forks are welcome. If you want your own version, the fastest way is to replace menu data and images, then deploy on your own static host.

## Local setup

Requirements  
Node.js and npm

Install and run

- `npm install`
- `npm start`

Build

- `npm run build`

## Editing the menu

Menu items are stored in `src/data/menuItems.ts`. Images are served from `public/images` and referenced by the items. Nutrition macros and item options live next to the item definition, so a dish can carry its own data without spreading it across multiple files. To easily add a menu item, when NODE_ENV !== 'production', Dev Panel will appear at the bottom of the website. 

## Generating dish images

Dish images follow a fixed size and format so cards and layouts do not shift while scrolling.

When you add a new dish, generate an image through AI using a prompt in this shape

*600x400, webp, pixel-art like, similar background to (any picture from the project)*

In code, use *function name* to generate the prompt string you pass into your image generator. If you do not have this helper yet, add a small function that returns the exact prompt format you want and reuse it for every new dish.

Example prompt

600x400, webp, pixel art, same background style as existing dish images in the project, plate centered, dish readable, no text, no watermark

## Deployment notes

The live site is hosted on GitHub Pages under a repository path. If you fork and rename the repo, check the base path used by your build so routes and image assets keep resolving.
