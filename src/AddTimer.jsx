import { useState } from "react";
import TimeCarousel from "./Time_Carousel/TimeCarousel.jsx";

function AddTimer({ onSave, onCancel }) {
	const [timeInMinutes, setTimeInMinutes] = useState(0);

	return (
		<div className="flex flex-col absolute bg-gray-50 rounded-xl w-80 h-60 shadow-2xl">
			<TimeCarousel onChange={setTimeInMinutes} />
			<div className="flex space-x-8 justify-center px-5 mt-4 py-3">
				<button
					className="border-2 px-3 rounded-lg text-lg bg-gray-700 text-gray-50 cursor-pointer"
					onClick={() => onSave(timeInMinutes)}
				>
					Save
				</button>
				<button className="cursor-pointer" onClick={onCancel}>
					Cancel
				</button>
			</div>
		</div>
	);
}

export default AddTimer;
