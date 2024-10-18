import React, { useState, useRef, useEffect } from "react";
import "./LoginForm.css";

function LoginForm({ playerName, setPlayerName, isVisible, setIsVisible }) {
	const inputRef = useRef(null);

	const [usernameLength, setUsernameLength] = useState(
		(localStorage.getItem("playerName") || "").length,
	);

	function limitHandler(e) {
		setUsernameLength(e);
	}

	useEffect(() => {
		if (isVisible && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isVisible]);

	function updatePlayerName(e) {
		setPlayerName(e.target.value);
		limitHandler(e.target.value.length);
	}

	function loginFormNext() {
		localStorage.setItem("playerName", playerName);
		setIsVisible(false);
	}

	return (
		<div id="login-form" className={isVisible ? "visible" : "hidden"}>
			<div id="login-form-container">
				<h1>Rock, Paper, Scissors!</h1>
				<h2>Login Form!</h2>
				<div className="form">
					<div className="form-input">
						<input
							type="text"
							ref={inputRef}
							onChange={updatePlayerName}
							value={playerName}
							placeholder="Please enter your name"
							maxLength="12"
						/>
						<span>{usernameLength} / 12</span>
					</div>
					<button
						type="button"
						onClick={loginFormNext}
						className={playerName.trim().length > 2 ? "" : "disabled"}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
}
export default LoginForm;
