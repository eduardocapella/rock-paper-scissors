function DisplayPlays({ playerName, plays, closeStatsBar, className }) {
	return (
		<div id="stats" className={className}>
			<div className="container">
				<button type="button" onClick={closeStatsBar}>
					<span className="material-symbols-outlined">close</span>
				</button>
				<table>
					<thead>
						<tr>
							<th>{playerName}</th>
							<th>Player 2</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{plays.map((element, index) => (
							<tr key={`p-${element}-${index}`} className={element[2]}>
								{element.map((played, subIndex) => {
									if (subIndex === 2) {
										return (
											<td
												key={`${played}-${subIndex}`}
												dangerouslySetInnerHTML={{ __html: played }}
											/>
										);
									}
									return (
										<td key={`${played}-${subIndex}`}>
											{played && played.length > 0
												? played[0].toUpperCase() + played.slice(1)
												: ""}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
				<p>Turns: {plays.length}</p>
			</div>
		</div>
	);
}
export default DisplayPlays;
