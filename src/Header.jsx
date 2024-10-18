import React, { useEffect, useState } from "react";
import "./Header.css";
import DisplayPlays from "./DisplayPlays";

function Header({ playerName, setIsVisible, plays }) {
	const [stats, setStats] = useState(false);

	function editName() {
		setIsVisible(true);
	}

	function openStatsBar() {
		setStats(true);
	}

	function closeStatsBar() {
		setStats(false);
	}

	useEffect(() => {
		console.log("stats", stats);
	}, [stats]);

	return (
		<header>
			<div className="container">
				<h1>Rock, Paper, Scissors!</h1>
				<div className="player-name">
					<button type="button" onClick={editName}>
						<span className="material-symbols-outlined">edit</span>
					</button>
					<p>{playerName}</p>
				</div>
				<div className="game-stats">
					<button type="button" onClick={openStatsBar}>
						<span className="material-symbols-outlined">settings</span>Stats
					</button>
				</div>
			</div>
			<DisplayPlays
				playerName={playerName}
				plays={plays}
				closeStatsBar={closeStatsBar}
				stats={stats}
				className={stats ? "show" : ""}
			/>
		</header>
	);
}
export default Header;
