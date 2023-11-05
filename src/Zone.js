import React from "react";
import ColorButton from "./ColorButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons";

const Zone = ({ name, cats, incrementCatCount, removeCat }) => {
	// Function to generate cat icon elements
	const generateCatIcons = () => {
		return cats.map((cat) => (
			<FontAwesomeIcon
				key={cat.id}
				icon={faCat}
				className={`cat-icon ${cat.color}`}
				onClick={() => removeCat(name.toLowerCase(), cat.id)}
			/>
		));
	};

	return (
		<div className={`zone ${name.toLowerCase()}`}>
			<h2>{name}</h2>
			<div className="cats">
				{/* Render CatIcons based on cats state */}
				{generateCatIcons()}
			</div>
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
		</div>
	);
};

export default Zone;
