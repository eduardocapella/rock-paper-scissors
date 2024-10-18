function Winner({ winner }) {
	console.log("winner", winner);
	return (
		<div id="winner">
			{typeof winner === "string" && winner !== null && (
				<p>
					{winner}
					<br /> win!
				</p>
			)}
		</div>
	);
}
export default Winner;
