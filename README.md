# Here Kitty Kitty Score Calculator

This application is a digital score calculator for the "Here Kitty Kitty" board game by Fireside Games. It allows players to easily keep track of their scores based on the number and placement of cat figures within various zones.

## Features

- Add or remove cat figures from different zones (Yard, Porch, House).
- Calculate the total score based on the placement of the cats and various bonus conditions.
- User-friendly interface with clickable cat icons and intuitive controls.
- Error handling to prevent adding more than 10 cats of any color.

## Problem Solving and Strategy

### Managing State

One of the primary challenges in building this application was effectively managing the state of the cats within each zone. The game's rules required a dynamic and responsive state that could handle adding, removing, and calculating cats in real-time. I decided to use React's useState hook to manage the state of the cats, which allowed for an efficient and reactive UI.

### Implementing Interactivity

Another challenge was making the cat icons interactive. Players needed to be able to add cats by clicking on color-coded buttons and remove them by clicking on the icons themselves. To accomplish this, I implemented functions that would increment and decrement the cat count based on user interactions. These functions updated the state and subsequently the UI.

### Handling Errors

The app ensures users cannot add an impossible number of cats. I implemented an error handling mechanism that would alert the player if they tried to exceed the limit. This involved a conditional check within the function responsible for adding cats, and if the condition was violated, an error state was updated, triggering a user-friendly alert.

### Score Calculation

The score calculation was a key feature of this application, designed to accurately reflect the unique scoring rules of "Here Kitty Kitty". The logic was centered around the state, which kept track of the number of cats in each zone. The calculation was then tailored to assign different point values to cats depending on their placement, such as in the House or Porch, along with bonus points for certain conditions. This was achieved through a series of functions that efficiently evaluated the state and applied the game's scoring rules to produce an accurate total score.

### Conclusion

Building this application was an exercise in state management, interactivity, error handling, and UI design.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies with `npm install`.
4. Run the application with `npm start`.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
