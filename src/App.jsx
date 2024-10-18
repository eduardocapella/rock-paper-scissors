import { useEffect, useState, useRef } from "react";
import "./App.css";
import LoginForm from "./LoginForm";
import Header from "./Header";
import Desk from "./Desk";
import victorySound from "./assets/victory.wav";
import defeatSound from "./assets/defeat.wav";

function App() {
	const images = [
		"./src/assets/paper@2x.webp",
		"./src/assets/rock@2x.webp",
		"./src/assets/scissors@2x.webp",
	];

	const [playerName, setPlayerName] = useState(
		localStorage.getItem("playerName") || "",
	);

	const [pointsP1, setPointsP1] = useState(0);
	const [pointsP2, setPointsP2] = useState(0);

	const pointsP1Ref = useRef(pointsP1);
	const pointsP2Ref = useRef(pointsP2);

	const [isVisible, setIsVisible] = useState(
		!localStorage.getItem("playerName"),
	);

	const [winner, setWinner] = useState("");

	const victoryPoints = 3;

	const [turns, setTurns] = useState(1);

	const [selectedKey, setSelectedKey] = useState(null);

	const [plays, setPlays] = useState([]);

	const [disableClicks, setDisableClicks] = useState(false);

	const [choicePath, setChoicePath] = useState(images[0]);

	useEffect(() => {
		pointsP1Ref.current = pointsP1;
		pointsP2Ref.current = pointsP2;
	}, [pointsP1, pointsP2]);

	useEffect(() => {
		if (winner === playerName) {
			playVictorySound();
		} else if (winnder === "Player 2") {
			playDefeatSound();
		}
	}, [winner]);

	function playVictorySound() {
		const audio = new Audio(victorySound);
		audio.play();
	}
	function playDefeatSound() {
		const audio = new Audio(defeatSound);
		audio.play();
	}

	function playAgain() {
		setPointsP1(0);
		setPointsP2(0);
		setTurns(1);
		setSelectedKey(null);
		setPlays([]);
		setDisableClicks(false);
		setChoicePath(images[0]);
		setWinner("");
	}

	function handleSelectedKey(uniqueKey) {
		setSelectedKey(uniqueKey);

		setDisableClicks(true);

		const intervalId = setInterval(() => {
			setSelectedKey("");
			// if (pointsP1 !== victoryPoints && pointsP2 !== victoryPoints) {
			if (
				pointsP1Ref.current !== victoryPoints &&
				pointsP2Ref.current !== victoryPoints
			) {
				setDisableClicks(false);
			} else {
				if (pointsP1Ref.current === victoryPoints) {
					setWinner(playerName);
				} else if (pointsP2Ref.current === victoryPoints) {
					setWinner("Player 2");
				}
			}
			clearInterval(intervalId); // Clear the interval after it runs
		}, 1000);

		// console.log("disableClicks", disableClicks);
	}

	function incrementTurns() {
		setTurns(turns + 1);
	}

	function updatePlays(uniqueKey, p2Play) {
		incrementTurns();
		handleSelectedKey(uniqueKey);

		let winnerIcon = "";
		if (
			(uniqueKey === "rock" && p2Play === "scissors") ||
			(uniqueKey === "paper" && p2Play === "rock") ||
			(uniqueKey === "scissors" && p2Play === "paper")
		) {
			setPointsP1(pointsP1 + 1);
			winnerIcon =
				"<span class='material-symbols-outlined color-green'>check</span>";
		} else if (uniqueKey !== p2Play) {
			setPointsP2(pointsP2 + 1);
			winnerIcon =
				"<span class='material-symbols-outlined color-red'>sentiment_sad</span>";
		}

		setPlays((prevPlays) => [...prevPlays, [uniqueKey, p2Play, winnerIcon]]);
	}

	return (
		<>
			<Header
				playerName={playerName}
				setIsVisible={setIsVisible}
				isVisible={isVisible}
				plays={plays}
				victoryPoints={victoryPoints}
			/>
			<LoginForm
				playerName={playerName}
				setPlayerName={setPlayerName}
				isVisible={isVisible}
				setIsVisible={setIsVisible}
			/>
			<Desk
				className={`desk-container ${disableClicks ? "disabled" : ""}`}
				playerName={playerName}
				pointsP1={pointsP1}
				pointsP2={pointsP2}
				updatePlays={updatePlays}
				plays={plays}
				turns={turns}
				selectedKey={selectedKey}
				images={images}
				choicePath={choicePath}
				setChoicePath={setChoicePath}
				playAgain={playAgain}
				disableClicks={disableClicks}
				winner={winner}
				victoryPoints={victoryPoints}
			/>
			<button
				id="play-again"
				type="button"
				onClick={playAgain}
				className={
					pointsP1 !== victoryPoints && pointsP2 !== victoryPoints
						? "hidden"
						: ""
				}
			>
				Play again!
			</button>
		</>
	);
}

export default App;
