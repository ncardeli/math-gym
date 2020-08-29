import React from "react";
import "./App.css";
import useLocalStorage from "./useLocalStorage";
import gymImage from "./gym.svg";

const STATUS_OK = "ok";
const STATUS_ERROR = "error";
const STATUS_WAITING = "waiting";

function App() {
	const [operands, setOperands] = React.useState({
		left: getRandomNumber(),
		right: getRandomNumber(),
	});
	const [result, setResult] = React.useState("");
	const [operationStatus, setOperationStatus] = React.useState(STATUS_WAITING);
	const [history, setHistory] = useLocalStorage("math-gym-history", "[]");
	const historyArray = JSON.parse(history);

	const handleFormSubmit = (event) => {
		event.preventDefault();
		const numericResult = Number(result);
		if (numericResult === operands.left * operands.right) {
			setOperationStatus(STATUS_OK);
			setOperands({
				left: getRandomNumber(),
				right: getRandomNumber(),
			});
			setResult("");
		} else {
			setOperationStatus(STATUS_ERROR);
		}
		setHistory((history) =>
			JSON.stringify([
				[operands.left, operands.right, numericResult],
				...JSON.parse(history),
			])
		);
	};

	const handleHistoryClearClick = () => setHistory("[]");

	return (
		<div className="App">
			<h1>¿Sabes el resultado?</h1>
			<img className="logo" src={gymImage} alt="Fachada de un gimnasio"></img>
			<form onSubmit={handleFormSubmit}>
				<label htmlFor="result">
					{operands.left} x {operands.right}
				</label>
				=
				<input
					id="result"
					type="text"
					inputMode="numeric"
					value={result}
					onChange={(event) => {
						setResult(event.target.value);
						setOperationStatus(STATUS_WAITING);
					}}
					onClick={(event) => event.target.select()}
					size={2}
				></input>
				<button type="submit">Corregir</button>
			</form>
			<div className="output">
				{operationStatus === STATUS_OK && "Bien! 😀"}
				{operationStatus === STATUS_ERROR &&
					"Ups! Revisala que hay un error 👀"}
				{operationStatus === STATUS_WAITING && ""}
			</div>
			<div className="history">
				{historyArray.length > 0 && (
					<button
						className="history-clear"
						type="button"
						onClick={handleHistoryClearClick}
					>
						Limpiar
					</button>
				)}
				{historyArray.map(
					([historyLeft, historyRight, historyResult], index) => (
						<div className="operation" key={index}>
							{historyLeft}x{historyRight}={historyResult}
							{historyResult === historyLeft * historyRight ? "✅" : "❌"}
						</div>
					)
				)}
			</div>
		</div>
	);
}

function getRandomNumber() {
	return Math.trunc(Math.random() * 10);
}

export default App;
