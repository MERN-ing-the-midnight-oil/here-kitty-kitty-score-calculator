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
	const removeCat = (zone, catId) => {
		setCats((prevCats) => ({
			...prevCats,
			[zone]: prevCats[zone].filter((cat) => cat.id !== catId),
		}));
	};

	// Function to calculate total score
	const calculateTotalScore = () => {
		// Calculate score based on cats in house and porch
		let score =
			cats.house.filter((cat) => cat.color === "orange").length * 5 +
			cats.house.filter((cat) => cat.color === "grey").length * 5 +
			cats.house.filter((cat) => cat.color === "white").length * 5 +
			cats.house.filter((cat) => cat.color === "black").length * 5 +
			cats.porch.filter((cat) => cat.color === "orange").length * 3 +
			cats.porch.filter((cat) => cat.color === "grey").length * 3 +
			cats.porch.filter((cat) => cat.color === "white").length * 3 +
			cats.porch.filter((cat) => cat.color === "black").length * 3;

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

		return score;
	};

	return (
		<div className="app">
			<div className="instructions">
				<h1>Here Kitty Kitty Score Calculator</h1>
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
					another 5 points. You can also gain 3 bonus points for having the most
					cats matching a color.
				</p>
				<p>
					Made a mistake? You can click on a cat icon to remove it from the
					area.
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

			<div>
				<input
					type="checkbox"
					checked={hasMostOrangeCats}
					onChange={(e) => setHasMostOrangeCats(e.target.checked)}
				/>
				Most Orange Cats
			</div>
			<div>
				<input
					type="checkbox"
					checked={hasMostGreyCats}
					onChange={(e) => setHasMostGreyCats(e.target.checked)}
				/>
				Most Grey Cats
			</div>
			<div>
				<input
					type="checkbox"
					checked={hasMostWhiteCats}
					onChange={(e) => setHasMostWhiteCats(e.target.checked)}
				/>
				Most White Cats
			</div>
			<div>
				<input
					type="checkbox"
					checked={hasMostBlackCats}
					onChange={(e) => setHasMostBlackCats(e.target.checked)}
				/>
				Most Black Cats
			</div>
			<div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "20px" }}>
				Total Score: {calculateTotalScore()}
			</div>
		</div>
	);
}

export default App;
