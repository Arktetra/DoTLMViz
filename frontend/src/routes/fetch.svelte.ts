import axios from 'axios';
import { data, active_model, global_state, params, dimred } from '../state.svelte';

type ICallback = (d: any) => void;

// This is the abstract base class for wrapper around axios for get and post request, base url are preconfiged
abstract class _Axios {
	public static axiosB = axios.create({});

	public static async Get(url: string, setRes: ICallback, setInfo?: ICallback): Promise<any> {
		return await this.axiosB
			.get(url)
			.then((res) => {
				setRes(res.data);
				if (setInfo) setInfo('Successful get over ' + url);
				else global_state.info = { message: 'Successful get over ' + url, code: 'success' };

				return res.data;
			})
			.catch((error) => {
				console.log(error);
				if (setInfo) setInfo('Get error over ' + url);
				else global_state.info = error;

				return error;
			});
	}

	public static async Post(
		url: string,
		data: any,
		setRes?: ICallback,
		setInfo?: ICallback
	): Promise<any> {
		return await this.axiosB
			.post(url, data)
			.then((res) => {
				if (setRes) setRes(res.data);

				if (setInfo) setInfo('Successful post over ' + url);
				else global_state.info = { message: 'Successful post over ' + url, code: 'success' };

				return res.data;
			})
			.catch((error) => {
				console.log(error);
				if (setInfo) setInfo('Post error over ' + url);
				else global_state.info = error;

				return error;
			});
	}
}

// This function will load the model of name passed as param, fallback is to the default model on active_model on state.svelte
export const loadModel = async (model_name: string = active_model.model_name) => {
	return _Axios.Post('/model/load', { model_name }, (d) => {
		global_state.isModelLoaded = true;
	});
};

export const runModel = async (input_text: string) => {
	return _Axios.Post('/model/run', { text: input_text });
};

export const getAct = async (act_name: string, layer_name: string | null, block: number | null) => {
	const data = await _Axios.Post('/ckpt/act', { act_name, layer_name, block });
	console.log(data);

	if (act_name === 'pattern') {
		let attnPatterns: HeatMapData[] = [];

		for (let i = 0; i < data.length; i++) {
			let attnPattern: HeatMapData = [];
			for (let j = 0; j < data[i].length; j++) {
				for (let k = 0; k < data[i][j].length; k++) {
					attnPattern.push({
						x: k,
						y: j,
						source: global_state.tokens[k],
						destination: global_state.tokens[j],
						score: data[i][j][k]
					});
				}
			}
			attnPatterns.push(attnPattern);
		}

		global_state.attn_patterns = attnPatterns;
	} else if (act_name === 'resid_pre') {
		global_state.ln_pre = data;
	} else {
		global_state.data = data;
	}
};

export const getEmbed = async (embed_name: string) => {
	const data = await _Axios.Post(
		"/embed/reduced",
		{
			embed_name,
			method: dimred.method,
			perplexity: dimred.perplexity
		}
	);


	let embedOutput: ScatterPlotData = [];

	for (let i = 0; i < data.length; i++) {
		embedOutput.push({ x: data[i][0], y: data[i][1], token: global_state.tokens[i] });
	}

	global_state.embed_output = embedOutput;
}

export const getProbDensity = async (
	act_name: string | null,
	layer_name: string | null,
	block: number | null
) => {
	const data = await _Axios.Post('/ckpt/prob_density', { act_name, layer_name, block });
	console.log(data);

	if (act_name == 'resid_pre' || act_name === 'resid_mid' || act_name === 'resid_post') {
		global_state.ln_pre = data;
	} else if (act_name == 'normalized') {
		global_state.ln_post = data;
	}
};

export const getMLPOuts = async (
	act_name: string,
	layer_name: string | null,
	block: number | null,
	neuron: number | null
) => {
	const data = await _Axios.Post('/ckpt/mlp_outs', { act_name, layer_name, block, neuron });
	console.log(data);
	let act = [];

	for (let i = 0; i < data.length; i++) {
		act.push({
			token: global_state.tokens[i],
			score: data[i]
		});
	}

	console.log(act);

	global_state.data = act;
};

export const getDist = async () => {
	data.tokenProbMappings = await _Axios.Post('/model/dist', { temperature: params.temperature });
};

export const getNextToken = async () => {
	const res = await _Axios.Post('/model/sample', {
		temperature: params.temperature,
		p: params.top_p,
		k: params.top_k
	});
	console.log(res['next_token']);
	global_state.next_token = res['next_token'];
};

export const getTokens = async (input_text: string) => {
	global_state.tokens = await _Axios.Post('/model/tokenize', { text: input_text });
};
