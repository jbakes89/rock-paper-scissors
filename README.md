# Rock Paper Scissors

## for The Odin Project

---

This was completed as part of the Odin Project Foundations course as an exercise in basic programming principles using JavaScript.

### Things I've learned/practised:
- How to setup a basic game loop
- How to receive, process, and respond to user input
- A way to implement enums in JavaScript (not sure if this is a good method or not though...)

### Things to add/improve:
- GUI
- Tracking historical results
- Smarter AI that learns from user patterns(?)

---

## Adding GUI using Javascript
starting Jan 19th, 2021

In this update, instead of running the game in the console, we will had a GUI using Javascript to allow the user to play the game in the browser.

This is part of the **DOM Manipulation** lesson in the Odin Project Foundations course.

### Note (Feb 24th, 2021)
I made a bit of a mess of CSS selectors trying to implement BEM. I know these aren't being used properly at the moment, but I got a bit ahead of myself trying to learn best practices, and I'm at risk of going to far down the rabbit hole and spending too much time on things that maybe aren't so important at this stage of my learning.\
TLDR; Don't expect names to make as much sense as implied by their superficial structure.

### TODO (updated Mar 23rd, 2021)
- Reset score label on game restart
- Add more information to commentary (e.g., round number, player and computer choices)
- Visual presentation
    - Put commentary in a scroll box (only show last 2/3 lines)??
    - And/or show older commentary items in a lighter colour
    - Make/find icons for 'rock', 'paper', 'scissors' options
    - Overall fonts, colours, hover styles, etc.
    - Maybe just get rid of start screen
- Extras
    - Enable keyboard input ('R', 'P', 'S' buttons)
    - Flair (animations, sound effects, etc.) - DON'T OVERCOMPLICATE!
    - e.g., animated colour change for button container to show round result