import { useState } from "react";
import Carousel from "./Carousel";
import Timer from "./Timer";
import Icons from "./Icons";
import AddTimer from "./AddTimer";

function App() {
	const [bg, setBg] = useState(0);
	const [timers, setTimers] = useState([{ id: 1, length: 5 }]);
	const [showAddTimer, setShowAddTimer] = useState(false);

	const removeTimer = (id) => {
		setTimers((prev) => prev.filter((timer) => timer.id !== id));
	};

	const handleAddTimer = (timeInMinutes) => {
		setTimers((prev) => [...prev, { id: Date.now(), length: timeInMinutes }]);
		setShowAddTimer(false);
	};

	return (
		<div
			className={`h-screen flex flex-col items-center justify-center bg-[url(bg/bg${bg}.jpg)] relative`}
		>
			<Carousel>
				{timers.map(({ id, length }) => (
					<Timer key={id} length={length} onDelete={() => removeTimer(id)} />
				))}
			</Carousel>

			<button
				className={`absolute bottom-6 right-6 border p-2 rounded-full cursor-pointer text-gray-50 bg-blue-600 hover:bg-blue-700 transition btn-grad z-50 
				sm:scale-120 xl:scale-130 xl:mx-2 2xl:scale-160 2xl:m-2 2xl:mx-4 ${
					timers.length == 0 ? "animate-pulse" : ""
				}`}
				onClick={() => setShowAddTimer(true)}
				aria-label="Add timer"
			>
				{Icons.plus}
			</button>

			<button
				onClick={() => setBg((bg) => (bg + 1) % 5)}
				className="text-gray-50 absolute bottom-6 left-6 cursor-pointer p-2 scale-120 hover:text-gray-200 active:text-gray-300 sm:scale-150 xl:scale-160 xl:mx-2 2xl:scale-200 2xl:mx-6 2xl:mb-1"
			>
				{Icons.photo}
			</button>

			{showAddTimer && (
				<div
					className="fixed inset-0 flex justify-center items-center z-10"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
				>
					<AddTimer
						onSave={handleAddTimer}
						onCancel={() => setShowAddTimer(false)}
					/>
				</div>
			)}
		</div>
	);
}

export default App;
