import { useEffect, useState } from "react";
import "./Desk.css";
import Score from "./Score";
import Winner from "./Winner";

function Desk({
	playerName,
	pointsP1,
	pointsP2,
	updatePlays,
	turns,
	selectedKey,
	className,
	images,
	choicePath,
	setChoicePath,
	winner,
	victoryPoints,
}) {
	function p2Choice() {
		const choicePath = images[Math.floor(Math.random() * images.length)];
		const choice = choicePath.split("/").pop().split("@")[0];

		setChoicePath(choicePath);

		return choice;
	}

	return (
		<div id="desk" className={className}>
			<Score
				playerName={playerName}
				pointsP1={pointsP1}
				pointsP2={pointsP2}
				turns={turns}
				victoryPoints={victoryPoints}
			/>

			<div className="container">
				<div className="row">
					<div className="col">
						<ul id="player1-desk">
							{images.map((path) => {
								const uniqueKey = path.split("/").pop().split("@")[0]; // Extract unique part of the filename
								// console.log("uniqueKey", uniqueKey);
								return (
									<li key={uniqueKey}>
										<button
											type="button"
											className={selectedKey === uniqueKey ? "selected" : ""}
											onClick={() => updatePlays(uniqueKey, p2Choice())}
										>
											<img src={path} alt="play" />
										</button>
									</li>
								);
							})}
						</ul>
					</div>
					<div
						id="player2-desk"
						className={
							selectedKey !== "" && selectedKey !== null
								? "col selected"
								: "col"
						}
					>
						{/* <img src="./src/assets/paper@2x.webp" alt="" /> */}
						<img src={choicePath} alt="" />
					</div>
				</div>
			</div>
			{winner && <Winner winner={winner} />}
		</div>
	);
}
export default Desk;
