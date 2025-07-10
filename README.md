# Auto Miner - Idle Game

A simple browser-based idle/incremental game where you mine resources and automate your mining operations.

## How to Play

1. **Open the game**: Open `dist/index.html` in your web browser
2. **Start mining**: Click the "Click to Mine 1 Iron" button to begin collecting iron
3. **Automate**: Buy iron miners to automatically generate iron over time
4. **Expand**: Use iron to buy sulfur and drills, then mine silver
5. **Scale up**: Purchase silver miners to automate silver production

## Game Mechanics

### Resources
- **Iron**: The basic resource - mine manually or with automated miners
- **Silver**: Premium resource requiring sulfur and drills to mine
- **Sulfur**: Consumable resource needed for silver mining (costs 50 iron each)
- **Drills**: Equipment needed for silver mining (costs 500 iron each)

### Progression
1. **Iron Mining**: Start by clicking to mine iron manually
2. **Iron Automation**: Buy iron miners (cost increases by 10% per purchase)
3. **Silver Preparation**: Accumulate sulfur and drills
4. **Silver Mining**: Click 5 times to mine 1 silver (requires 10 sulfur + 1 drill)
5. **Silver Automation**: Buy silver miners to automate silver production

### Features
- **Auto-buy**: Enable auto-purchasing for sulfur and drills
- **Real-time feedback**: Buttons highlight when you can't afford purchases
- **Sticky resource display**: Resource counters stay visible while scrolling
- **Progressive costs**: Iron miner prices increase with each purchase

## Goal

Reach the maximum silver production by building an efficient automated mining operation!

## Technical Notes

- No build process required - just open the HTML file
- Game state is not saved between sessions
- Built with vanilla JavaScript and Bulma CSS framework