// App.js
import React, { useState } from "react";
import Zone from "./Zone";

function App() {
	// State to track the number of cats in each zone by color
	const [cats, setCats] = useState({
		yard: [],
		porch: [],
		house: [],
	});

	// State variables for checkboxes
	const [hasMostOrangeCats, setHasMostOrangeCats] = useState(false);
	const [hasMostGreyCats, setHasMostGreyCats] = useState(false);
	const [hasMostWhiteCats, setHasMostWhiteCats] = useState(false);
	const [hasMostBlackCats, setHasMostBlackCats] = useState(false);

	// State to track error messages
	const [error, setError] = useState("");

	// Function to increment cat count by adding cat objects
	const incrementCatCount = (zone, color) => {
		// Calculate total cats of the same color across all zones
		const totalCatsOfColor = Object.values(cats).reduce((sum, zoneCats) => {
			return sum + zoneCats.filter((cat) => cat.color === color).length;
		}, 0);

		// Check if adding another cat exceeds the limit
		if (totalCatsOfColor >= 10) {
			// Show an alert message
			alert(
				`That's too many ${color} cats! "Here Kitty-Kitty" only uses 10 of each colored cat in game-play.`
			);
			return; // Exit the function early
		}

		// Add the new cat as usual
		const newCat = { id: Date.now(), color }; // Use timestamp for unique id
		setCats((prevCats) => ({
			...prevCats,
			[zone]: [...prevCats[zone], newCat],
		}));
	};

	//This function takes the zone and the catId as arguments and updates the state by filtering out the cat with the matching catId.
	//this is a function that is passed down to zone component as a prop
	const removeCat = (zone, catId) => {
		setCats((prevCats) => ({
			...prevCats,
			[zone]: prevCats[zone].filter((cat) => cat.id !== catId),
		}));
	};

	const calculateTotalScore = () => {
		// Calculate score based on cats in house and porch
		let score =
			cats.house.length * 5 + // 5 points for each cat in the house
			cats.porch.length * 3; // 3 points for each cat on the porch

		// Add 5 points for 5 or more cats of the same color
		["orange", "grey", "white", "black"].forEach((color) => {
			let count = cats.yard
				.concat(cats.porch, cats.house)
				.filter((cat) => cat.color === color).length;
			if (count >= 5) score += 5;
		});

		// Add 5 points for 1 cat of each color
		if (
			["orange", "grey", "white", "black"].every((color) =>
				cats.yard
					.concat(cats.porch, cats.house)
					.some((cat) => cat.color === color)
			)
		) {
			score += 5;
		}

		// Add points for having the most cats of each color
		score += hasMostOrangeCats ? 3 : 0;
		score += hasMostGreyCats ? 3 : 0;
		score += hasMostWhiteCats ? 3 : 0;
		score += hasMostBlackCats ? 3 : 0;

		// Bonus points logic for all cats in the house being the same color
		const getUniqueColorCount = (catsArray) => {
			const colorTally = catsArray.reduce((tally, cat) => {
				tally[cat.color] = (tally[cat.color] || 0) + 1;
				return tally;
			}, {});
			return Object.keys(colorTally).length;
		};

		const areAllHouseCatsSameColor = getUniqueColorCount(cats.house) === 1;
		if (areAllHouseCatsSameColor) {
			score += 10; // Add 10 bonus points if all cats in the house are the same color
		}

		// Return the final score after all calculations
		return score;
	};

	return (
		<div className="app">
			<div className="instructions">
				<h1>"Here Kitty Kitty" Score Calculator</h1>
				<p>
					This tool calculates your score at the end of playing
					<a
						href="https://boardgamegeek.com/boardgame/187289/here-kitty-kitty"
						target="_blank"
						rel="noopener noreferrer">
						{" "}
						"Here Kitty Kitty"
					</a>{" "}
					by Fireside Games.
				</p>
				<p>
					Add cats to each zone by clicking on the color buttons. Each cat in
					the house scores 5 points, and each cat on the porch scores 3 points.
					If you have 5 or more cats of the same color, you score an additional
					5 points. Having at least one cat of each color on your property adds
					another 5 points. Each color where you are the player with the most
					cats earns you 3 more points. If all cats in the house are the same
					color, score an extra 10 points.
				</p>
				<p>
					Made a mistake?{" "}
					<div style={{ fontSize: "16px", fontWeight: "bold" }}>
						just click on any extra cat icon to delete it!
					</div>
				</p>
			</div>
			<Zone
				name="Yard"
				cats={cats.yard}
				incrementCatCount={incrementCatCount}
				removeCat={removeCat}
			/>
			<Zone
				name="Porch"
				cats={cats.porch}
				incrementCatCount={incrementCatCount}
				removeCat={removeCat}
			/>
			<Zone
				name="House"
				cats={cats.house}
				incrementCatCount={incrementCatCount}
				removeCat={removeCat}
			/>
			<div style={{ paddingTop: "20px" }}>
				{" "}
				<div>
					<input
						type="checkbox"
						checked={hasMostOrangeCats}
						onChange={(e) => setHasMostOrangeCats(e.target.checked)}
					/>
					I am the player with the most ORANGE cats.
				</div>
				<div>
					<input
						type="checkbox"
						checked={hasMostGreyCats}
						onChange={(e) => setHasMostGreyCats(e.target.checked)}
					/>
					I am the player with the most GREY cats.
				</div>
				<div>
					<input
						type="checkbox"
						checked={hasMostWhiteCats}
						onChange={(e) => setHasMostWhiteCats(e.target.checked)}
					/>
					I am the player with the most WHITE cats.
				</div>
				<div>
					<input
						type="checkbox"
						checked={hasMostBlackCats}
						onChange={(e) => setHasMostBlackCats(e.target.checked)}
					/>
					I am the player with the most BLACK cats.
				</div>
			</div>

			<div style={{ fontSize: "36px", fontWeight: "bold", marginTop: "20px" }}>
				Total Score: {calculateTotalScore()}
			</div>
		</div>
	);
}

export default App;
