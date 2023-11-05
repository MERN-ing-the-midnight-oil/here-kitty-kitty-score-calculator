// A button component for each color.
// Increments the count of cats of that color in the corresponding zone when clicked.
import React from "react";

const ColorButton = ({ color, onClick }) => {
	return (
		<button
			className={`color-button ${color}`}
			onClick={onClick}>
			Add {color} cat
		</button>
	);
};

export default ColorButton;
