# Escape Dungeon

## Contents

- [About](#about)
- [Rationale](#rationale)
  * [Features](#features)
    * [Existing Features](#existing-features)
    * [Future Features](#future-features)
- [User Stories](#user-stories)
- [User Goals](#user-goals)
- [How to Play](#how-to-play)
- [Wireframes](#wireframes)
- [Design](#design)
  * [Typography](#typography)
  * [Colour Scheme](#colour-scheme)
  * [Images](#Images)
  * [Responsiveness](#responsiveness)
- [Technologies Used](#techenologies-used)
  * [Languages](#languages)
  * [tools](#tools)
- [Testing](#testing)
  * [Bug Report](#bug-report)
  * [Responsiveness Test](#responsiveness-test)
  * [Code Validation](#code-validation)
    - [HTML](#html)
    - [CSS](#css)
    - [JavaScript](#javascript)
  * [User Story Testing](#user-story-testing)
  * [Features Testing](#features-testing)
  * [Accessibilty Testing](#acessibility-testing)
  * [Lighthouse Testing](#lighthouse-testing)
  * [Browser Testing](#browser-testing)
- [Deployment](#deployment)
  * [Deploy Project](#deploy-project)
  * [Fork Project](#fork-project)
  * [Clone Project](#clone-project)
- [Credits](#credits)


## About

Escape Dungeon is a multi-puzzle text-based browser game. It is based on the escape room concept, where players must complete different puzzles to escape the dungeon. The game combines story-driven choices with classic puzzles for a fun and challenging experience.

## Rationale 

The aim of this project was to create a unique spin on traditional browser games by incorporating an escape room theme. Adding story elements provides context and motivation for completing puzzles, keeping the experience engaging and fresh. This project is designed 
to be easily extended with new levels and puzzles over time.

### Features

#### Existing Features
- Multi-puzzle system: Hangman, Memory.
- Story progression based on success or failure.
- Retry mechanics for puzzles
- Lives system: Player starts with 5 lives and loses lives upon puzzle failure.
- Clear UI with story text, options and puzzle containers
- Hints implemented in certain puzzles

#### Future Features
- Additional puzzles and story branches.
- Background music and sound effects.
- More visual styling for each puzzle to match story themes.
- Leaderboards or scoring system.

[Back to Top](#contents)

## User Stories

- As a player, I want to make choices that affect the story so I feel engaged.
- As a player, I want clear instructions for puzzles so I can complete them.
- As a player, I want a limited number of lives to add challenge and tension.
- As a developer, I want modular puzzle files so I can add or update puzzles easily.

[Back to Top](#contents)

## User Goals

- Successfully navigate through the dungeon by solving all the puzzles.
- Preserve the lives by completing puzzles efficiently.
- Explore the story fully and experince the narrative outcomes.

[Back to Top](#contents)

## How to Play

Escape Dungeon is a story-driven, multi-puzzle game where your goal is to escape the dungeon by completing each challenge.

1. **Start the Game**
   - Click the **Start** button on the welcom screen to begin.
   - Your lives are displayed at the top; you start with 5 lives.

2. **Follow the Story**
   - Read the story text carefully.
   - Make choices by clicking the available buttons to progress through the dungeon.

3. **Solve Puzzles**
   - Certain story segments will trigger puzzles:
     - **Hangman**: Guess the letters of a hidden word before making 6 mistakes.
     - **Memory Game**: Match all card pairs before time or attempts run out.
   - Each puzzle has retry mechanics if you fail, but failing reduces your lives.

4. **Lives and Game Over**
   - You lose a life each time you fail a puzzle.
   - If all lives are lost, the game ends, and you can restart from the beginning.

5. **Winning the Game**
   - Successfullu complete all puzzles and reach the escape point to win the game.
   - After escaping, you can choose to play again to try for a better run.

6. **Tips**
   - Pay attention to hints in the story, they might help with the puzzles.
   - Use hints in puzzles strategically; some puzzles limit hint usage.
   - Replay puzzles if needed to conserve lives for later challenges.

[Back to Top](#contents)

## Wireframes


## Design

### Typography
- Headings: "Space Mono" was imported from google fonts, a mono type font, bold for emphasis.
- Game text:  "Bitcount prop single" was imported from google fonts, a retro sans-seritf type font, easy-to-read.

### Colour Scheme
- 

### Images
- A dark dungeon as a background image to give the aesthetic of a dungeon.
- Emoji symbols usued in Memory and Hangman puzzles.
- ASCII art for hangman visual.

[Back to Top](#contents)

### Responsiveness
- Layout adapts to various screen widths for desktop, tablets and mobile.

[Back to Top](#contents)


## Technologies Used

### Languages
- [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript ES6+](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript)

[Back to Top](#contents)

### Tools
- [Github](https://github.com/)
- [Balsamiq](https://balsamiq.com/wireframes/)
- [HTML Validation](https://validator.w3.org/)
- [CSS Validation](https://jigsaw.w3.org/css-validator/)
- [JSHint](https://jshint.com/)
- [Am I Responsive](https://ui.dev/amiresponsive)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools)

[Back to Top](#contents)

## Testing

### Bug Report

| Bug no. | Bugs found             | Bug description                                                          | Status of Bug  | Comments                                                                                                                                 |
| ------- | ---------------------- | ------------------------------------------------------------------------ | -------------  | ---------------------------------------------------------------------------------------------------------------------------------------- |
|    1    | Options button         | Story options button displays incorrcttly.                               |     Fixed      | Spelling mistake in script.js was causing this bug. Corrected spelling and button now displays correctly.                                |
|    2    | Memory game not firing | After successfully completing hangman, the memory game UI doesn't load.  |     Fixed      | Encased game scripts with IIFE to isolate the scope and attached functions to "window" (i.e "startHangman") so it is available globally. |
|    3    | Player lives count     | Player life count would continue to decrease past 0 and not end game.    |     Fixed      | The logic was updated so that the failure branch only shows if the player still has lives remaining.                                     |

[Back to Top](#contents)

### Responsiveness Test
- Am I Responsive was used to test the repsonsiveness of suite. Mobile-first Strategy was used when building the site and all changes was verified using Google DevTools.

| Size    | Device Example     | Navigation | Element Alignments | Content Placement | Functionality |
| ------- | ------------------ | ---------- | ------------------ | ----------------- | ------------- |
| Mobile  | iPhone 11 PRO      | Good       | Good               | Good              | Good          |
| Tablet  | iPad Air           | Good       | Good               | Good              | Good          |
| Laptop  | Mackbook Air       | Good       | Good               | Good              | Good          |
| Desktop | Desktop            | Good       | Good               | Good              | Good          |

![Responsiveness Test](docs/screenshot-responsiveness.png)

[Back to top](#contents)

### Code Valdidation

#### HTML

[W3C HTML Validation Service](https://validator.w3.org/ "W3C HTML") was used to validate and test my html file, it came back with no errors.

* HTML Page:
![W3CHTML Validator](docs/screenshot-html-validation.png)

[Back to Top](#contents)

#### CSS

CSS code for the webpage was validated on [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/ "W3C CSS Validator"). It returned no errors.

* CSS:
![W3CCSS Validator](docs/screenshot-css-validation.png)

[Back to Top](#contents)

### User Story Testing
- Verified story progression, options and puzzle triggering.

### Features Testing
- Each puzzle manually tested individually for functionality.

[Back to Top](#contents)

## Deployment

### Deploy Project

Escape Dungeon website will be deployed early on in the web design process using Github pages via the steps below:

1. Navigate to repository on Github and click **Settings**.
2. Once in settings, select **Pages** in the side navigation.
3. In the none dropdown, select **Main**.
4. Click on **Save** button.
5. The website is now live at https://micahindigo.github.io/escape-dungeon-js-game/

_Any changes required for the website, can be made, comitted and pushed to Github._

[Back to Top](#contents)

### Fork Project

Forking the Github repository allows you to duplicate the local repository so changes/modifications can be made to the duplicate repository without compromising the original repository.

1. Login to **Github**
2. Locate the repository.
3. Click to open it.
4. Locate the **fork** button on the **right** side of the mennu.
5. To copy the repository to your Github account, **click** button.

### Clone Project

1. Login to **Github**.
2. Navigate to **Main** page of repository and click **Code**.
3. **Copy URL** of repository.
4. Open your **IDE**.
5. Change current working directory to location you want the cloned directory.
6. Type Git clone and then paste the URL you copied earlier.
7. Press **Enter** to create your local clone.

[Back to Top](#contents)