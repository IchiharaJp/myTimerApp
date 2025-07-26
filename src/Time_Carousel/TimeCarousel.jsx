import React, { useState, useEffect } from "react";
import { IosPickerItem } from "./pickerItem";
import "./TimeCarousel.css";

const TimeCarousel = ({ loop = false, onChange }) => {
	const [selectedHour, setSelectedHour] = useState(0);
	const [selectedMinute, setSelectedMinute] = useState(0);

	useEffect(() => {
		if (onChange) {
			onChange(selectedHour * 60 + selectedMinute);
		}
	}, [selectedHour, selectedMinute, onChange]);

	return (
		<div className="embla" style={{ display: "flex" }}>
			<IosPickerItem
				slideCount={24}
				perspective="left"
				loop={loop}
				label="hours"
				onSelect={setSelectedHour}
			/>
			<IosPickerItem
				slideCount={60}
				perspective="right"
				loop={loop}
				label="min"
				onSelect={setSelectedMinute}
			/>
		</div>
	);
};

export default TimeCarousel;
