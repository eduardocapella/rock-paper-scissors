import "./Score.css";

function Score({ playerName, pointsP1, pointsP2, turns, victoryPoints }) {
	return (
		<>
			<div id="score">
				<p
					className={`player score-p1 ${pointsP1 === victoryPoints ? "winner" : ""}`}
				>
					{playerName}
				</p>
				<p id="score-numbers">
					<span>{pointsP1}</span> x <span>{pointsP2}</span>
				</p>
				<p
					className={`player score-p2 ${pointsP2 === victoryPoints ? "winner" : ""}`}
				>
					Player 2
				</p>
			</div>
			<div id="turns">{turns}</div>
		</>
	);
}
export default Score;
