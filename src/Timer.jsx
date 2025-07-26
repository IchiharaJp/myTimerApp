import { useState, useCallback, useEffect } from "react";
import { useTimer } from "react-use-precision-timer";
import {
	buildStyles,
	CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Icons from "./Icons";
import useSound from "use-sound";
import { BellRing } from "./BellRing";

const ringTone = "/sound/ringtone1.mp3";

function getClockTime(sec) {
	if (!sec) return <BellRing />;

	const padZeros = (num, count = 2) => String(num).padStart(count, "0");
	const minutes = Math.floor(sec / 60);
	const hours = Math.floor(minutes / 60);
	let clockTime = hours ? `${hours}:` : "";
	clockTime += minutes ? `${padZeros(minutes % 60, hours ? 2 : 1)}:` : "";
	clockTime += sec ? `${padZeros(sec % 60)}` : "";

	return clockTime;
}

function Timer({ length, onDelete }) {
	const [time, setTime] = useState(Math.floor(parseInt(length) * 60));
	const [play, setPlay] = useState(false);
	const [playSound, { stop }] = useSound(ringTone, { volume: 0.3 });
	const increment = useCallback(() => {
		setTime((current) => {
			if (current > 0) {
				return (current -= 1);
			} else {
				playSound();
				setPlay(false);
				timer.pause();
				return 0;
			}
		});
	}, []);
	const timer = useTimer({ delay: 1000 }, increment);
	const maxTime = Math.floor(length * 60);
	const progress = ((maxTime - time) / maxTime) * 100;

	useEffect(() => {
		if (length == null) return;
		timer.start();
		timer.pause();
	}, []);

	const togglePlay = () => {
		if (time == 0) return;
		setPlay(!play);
		!play ? timer.resume() : timer.pause();
	};

	const reset = () => {
		if (play) return;
		stop();
		setTime(Math.floor(length * 60));
	};

	useEffect(() => {
		if (length == null) return;
		timer.start();
		timer.pause();
	}, []);

	return (
		<div className="embla__slide">
			<div className="flex flex-col items-center justify-center card-bg w-2xs p-6 rounded-3xl shadow-lg relative sm:w-xs md:w-sm lg:w-md xl:w-lg 2xl:w-xl">
				<div className="flex justify-center items-center border-3 border-red-50 rounded-full w-32 h-32 shadow-lg sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-46 lg:h-46 xl:w-54 xl:h-54 2xl:w-60 2xl:h-60">
					<CircularProgressbarWithChildren
						value={progress}
						strokeWidth={6}
						styles={buildStyles({
							pathColor: "hsl(262, 100%, 78%)",
							trailColor: "hsl(360, 100%, 97%)",
						})}
					>
						<h1 className="text-3xl text-gray-50 shadow-xl p-1 rounded-md md:scale-110 lg:scale-120 xl:scale-140 2xl:scale-150">
							{getClockTime(time)}
						</h1>
					</CircularProgressbarWithChildren>
				</div>
				<button
					onClick={togglePlay}
					className="bg-purple-500 text-purple-50 hover:bg-purple-600 active:bg-purple-700 active:text-purple-200 
                        duration-300 absolute left-10 bottom-2 rounded-full p-2 shadow-lg border-2 border-purple-50/60 cursor-pointer disabled:opacity-50 
						md:scale-110 md:mb-2 lg:mx-4 lg:scale-120 xl:mx-8 xl:scale-125 2xl:scale-135 2xl:mb-4 2xl:mx-10"
					disabled={time == 0}
				>
					{!play ? Icons.play : Icons.pause}
				</button>
				<button
					onClick={reset}
					className={`hover:bg-gray-200 active:bg-gray-300 active:text-gray-800 duration-300 absolute bottom-2 right-10 
                        bg-gray-100 rounded-full p-2 shadow-sm border-1 border-gray-900/20 text-gray-700 cursor-pointer md:scale-110 md:mb-2 lg:mx-4 lg:scale-120 xl:mx-8
						 xl:scale-125 2xl:scale-135 2xl:mb-4 2xl:mx-10 disabled:opacity-50
														${time == 0 ? "animate-pulse" : ""}
													}`}
					disabled={play}
				>
					{Icons.reset}
				</button>
				<button
					onClick={onDelete}
					className="absolute right-2 bottom-3 text-gray-200 opacity-75 cursor-pointer md:scale-120"
				>
					{Icons.trash}
				</button>
				<button
					onClick={onDelete}
					className="absolute right-0 top-0 text-gray-200 opacity-80 cursor-pointer md:scale-120"
				>
					{Icons.xCircle}
				</button>
			</div>
		</div>
	);
}

export default Timer;
