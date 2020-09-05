import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
	const [state, setState] = useState(initialValue);

	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key);
			if (item) {
				setState(JSON.parse(item));
			}
		} catch (e) {
			console.log("Unexpected error reading from localStorage", e);
		}
	}, [key]);

	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(state));
		} catch (e) {
			console.log("Unexpected error writing into localStorage", e);
		}
	}, [key, state]);

	return [state, setState];
}

export default useLocalStorage;
