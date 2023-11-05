// Represents a single zone (Yard, Porch, House).
// Renders the ColorButton components and the CatIcons based on the state.

import React from "react";
import ColorButton from "./ColorButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons";

const Zone = ({ name, cats, incrementCatCount }) => {
	// Function to generate cat icon strings
	const generateCatIcons = (color, count) => {
		return Array(count).fill(
			<FontAwesomeIcon
				icon={faCat}
				className={color}
			/>
		);
	};

	return (
		<div className={`zone ${name.toLowerCase()}`}>
			<h2>{name}</h2>
			<div className="buttons">
				<ColorButton
					color="orange"
					onClick={() => incrementCatCount(name.toLowerCase(), "orange")}
				/>
				<ColorButton
					color="grey"
					onClick={() => incrementCatCount(name.toLowerCase(), "grey")}
				/>
				<ColorButton
					color="white"
					onClick={() => incrementCatCount(name.toLowerCase(), "white")}
				/>
				<ColorButton
					color="black"
					onClick={() => incrementCatCount(name.toLowerCase(), "black")}
				/>
			</div>
			<div className="cats">
				{/* Render CatIcons based on cats state */}
				{Object.entries(cats).map(([color, count]) =>
					generateCatIcons(color, count)
				)}
			</div>
		</div>
	);
};

export default Zone;
