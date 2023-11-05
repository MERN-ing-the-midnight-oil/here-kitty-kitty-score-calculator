// The main component that renders the overall layout and holds the state for the number and color of cats in each zone.

import React, { useState } from "react";
import Zone from "./Zone";

function App() {
	// State to track the number of cats in each zone by color
	const [cats, setCats] = useState({
		yard: { orange: 0, grey: 0, white: 0, black: 0 },
		porch: { orange: 0, grey: 0, white: 0, black: 0 },
		house: { orange: 0, grey: 0, white: 0, black: 0 },
	});

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
		</div>
	);
}

export default App;
