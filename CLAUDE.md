# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an idle/incremental browser game called "Auto Miner" where players mine iron and silver. The game features:
- Manual clicking to mine resources
- Automated miners that can be purchased
- Resource conversion (iron → sulfur, sulfur + drill → silver)
- Progressive cost scaling for miners
- Auto-buy functionality for resources

## Architecture

### File Structure
- `dist/` - Production build files
  - `index.html` - Main game interface using Bulma CSS framework
  - `game.js` - All game logic in vanilla JavaScript (398 lines)
  - `img/` - Game assets (beam.png, iron-bar.png, jewelry.png, pick-axe.webp)

### Code Organization
The game is built as a single-page application with:
- **HTML Structure**: Bulma CSS framework with custom styles, sections for each game mechanic
- **JavaScript Architecture**: Single file with global state management
  - Game state variables (iron, silver, sulfur, drill_units, workers)
  - Click handlers for manual mining and purchasing
  - Timer-based automation using `AdjustingInterval` class
  - Real-time UI updates every second

### Key Components
- **Resource Management**: Iron and silver as primary currencies
- **Mining Systems**: Manual clicking + automated workers
- **Progression**: Linear cost scaling for iron miners (10% per purchase)
- **UI Features**: Sticky resource display, progress bars, auto-buy checkboxes

## Development Workflow

### Testing the Game
- Open `dist/index.html` in a browser
- No build process required - direct file serving
- Enable DEBUG mode by setting `DEBUG=true` in game.js for testing with resources

### Making Changes
- Edit `dist/game.js` for game logic
- Edit `dist/index.html` for UI/styling
- Changes take effect immediately on browser refresh
- No package.json or build tools detected

## Key Game Mechanics

### Resource Flow
1. Iron (manual click/miners) → Sulfur (50 iron each)
2. Sulfur + Drill → Silver (10 sulfur + 1 drill per silver)
3. Silver → Silver miners (for automation)

### Cost Scaling
- Iron miners: `10 * (1.1)^(miners/10)` iron each
- Silver miners: Fixed 10 silver each
- Sulfur: Fixed 50 iron each
- Drills: Fixed 500 iron each

### Timer System
Uses custom `AdjustingInterval` class (lines 43-67) to handle drift-resistant timing for:
- Resource generation from miners
- UI updates
- Auto-buy functionality