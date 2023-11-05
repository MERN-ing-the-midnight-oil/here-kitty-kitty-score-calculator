// App.js
import React, { useState } from "react";
import Zone from "./Zone";

function App() {
	// State to track the number of cats in each zone by color
	const [cats, setCats] = useState({
		yard: { orange: 0, grey: 0, white: 0, black: 0 },
		porch: { orange: 0, grey: 0, white: 0, black: 0 },
		house: { orange: 0, grey: 0, white: 0, black: 0 },
	});

	// State variables for checkboxes
	const [hasMostOrangeCats, setHasMostOrangeCats] = useState(false);
	const [hasMostGreyCats, setHasMostGreyCats] = useState(false);
	const [hasMostWhiteCats, setHasMostWhiteCats] = useState(false);
	const [hasMostBlackCats, setHasMostBlackCats] = useState(false);

	// Function to increment cat count
	const incrementCatCount = (zone, color) => {
		setCats((prevCats) => ({
			...prevCats,
			[zone]: {
				...prevCats[zone],
				[color]: prevCats[zone][color] + 1,
			},
		}));
	};

	// Function to calculate total score
	const calculateTotalScore = () => {
		// Calculate score based on cats in house and porch
		let score =
			cats.house.orange * 5 +
			cats.house.grey * 5 +
			cats.house.white * 5 +
			cats.house.black * 5 +
			cats.porch.orange * 3 +
			cats.porch.grey * 3 +
			cats.porch.white * 3 +
			cats.porch.black * 3;

		// Add 5 points for 5 or more cats of the same color
		Object.values(cats).forEach((zone) => {
			Object.values(zone).forEach((count) => {
				if (count >= 5) score += 5;
			});
		});

		// Add 5 points for 1 cat of each color
		if (
			Object.values(cats.yard).every((count) => count > 0) ||
			Object.values(cats.porch).every((count) => count > 0) ||
			Object.values(cats.house).every((count) => count > 0)
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
			<Zone
				name="Yard"
				cats={cats.yard}
				incrementCatCount={incrementCatCount}
			/>
			<Zone
				name="Porch"
				cats={cats.porch}
				incrementCatCount={incrementCatCount}
			/>
			<Zone
				name="House"
				cats={cats.house}
				incrementCatCount={incrementCatCount}
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
