import { data, active_model, global_state } from '../state.svelte';

// This function will load the model of name passed as param, fallback is to the default model on active_model on state.svelte
export const loadModel = async (model_name: string = active_model.model_name) => {
	try {
		return await fetch('/model/load', {
			method: 'POST',
			body: JSON.stringify({ model_name }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				global_state.isModelLoaded = true;
				res
			})
			.catch((error) => console.log('Something not right ' + error));
	} catch (error) {
		console.log('Unable to fetch ' + error);
		return;
	}
};

export const runModel = async (input_text: string) => {
	try {
		const response = await fetch('/model/run', {
			method: 'POST',
			body: JSON.stringify({ text: input_text }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`${response.status}, ${response.statusText}`);
		}

		return response;
	} catch (error) {
		throw error;
	}
};

export const getAct = async (act_name: string, layer_name: string | null, block: number | null) => {
	try {
		const res = await fetch('/ckpt/act', {
			method: 'POST',
			body: JSON.stringify({ act_name, layer_name, block }),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`);
		}

		let data = await res.json();

		global_state.data = data;
	} catch (error: any) {
		console.log(error.message);
		return;
	}
};

export const getDist = async () => {
	try {
		const res = await fetch('/model/dist');

		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`);
		}

		data.tokenProbMappings = await res.json();
	} catch (error: any) {
		console.error(error.message);
		return;
	}
};

export const getTokens = async (input_text: string) => {
	try {
		const response = await fetch('/model/tokenize', {
			method: "POST",
			body: JSON.stringify({ text: input_text }),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (!response.ok) {
			if (response.status != 500) {
				throw new Error(`${response.status}, ${response.statusText}`);
			}
		}

		let tokens = await response.json();

		global_state.tokens = tokens;
	} catch (error: any) {
		console.error(error.message);

		return;
	}
}