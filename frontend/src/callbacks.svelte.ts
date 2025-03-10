import {
	getAct,
	getDist,
	getEmbed,
	getMLPOuts,
	getNextToken,
	getProbDensity,
	getTokens,
	runModel
} from './routes/fetch.svelte';
import { activeComponent, global_state, input, params } from './state.svelte';

const checkInputAndRunModel = async () => {
	if (input.isChanged === true) {
		await runModel(input.text);
		input.isChanged = false;
	}
};

/**
 * A callback function that is to be called each time the input is changed.
 */
export const inputCallback = async (v: string) => {
	input.text = v;
	await getTokens(input.text);
	input.isChanged = true;

	switch (activeComponent.name) {
		case 'Token Embedding':
			return await embedCallback();
		case 'Positional Embedding':
			return await posEmbedCallback();
		case 'LN1':
			return await LN1Callback();
		case 'Attention Pattern':
			return await attnHeadCallback();
		case 'LN2':
			return await LN2Callback();
		case 'MLP (in) Pre-activation':
			return await MLPPreCallback();
		default:
			return;
	}
};

/**
 * A callback function that is to be called each time the token embedding
 * is clicked.
 */
export const embedCallback = async () => {
	await checkInputAndRunModel();

	await getEmbed('embed');

	activeComponent.name = 'Token Embedding';
};

/**
 * A callback function that is to be called each time the position
 * embedding is clicked.
 */
export const posEmbedCallback = async () => {
	await checkInputAndRunModel();

	await getEmbed('pos_embed');

	activeComponent.name = 'Positional Embedding';
};

/**
 * A callback function that is to be called each time the attention heads
 * are clicked.
 */
export const attnHeadCallback = async () => {
	await checkInputAndRunModel();
	await getAct('pattern', 'attn', global_state.active_block);
	activeComponent.name = 'Attention Pattern';
};

/**
 * A callback function that is to be called each time the first layer of the
 * MLP is clicked.
 */
export const MLPPreCallback = async () => {
	await checkInputAndRunModel();
	await getMLPOuts('pre', 'mlp', global_state.active_block, global_state.neuron);
	activeComponent.name = 'MLP (in) Pre-activation';
};

/**
 * A callback function that is to be called each time the GELU activation
 * layer of the MLP is clicked.
 */
export const MLPPostCallback = async () => {
	await checkInputAndRunModel();
	await getMLPOuts('post', 'mlp', global_state.active_block, global_state.neuron);
	activeComponent.name = 'GELU Activation';
}

/**
 * A callback function that is to be called each time the LN1 is clicked.
 */
export const LN1Callback = async () => {
	await checkInputAndRunModel();

	await getProbDensity('resid_pre', null, global_state.active_block);
	await getProbDensity('normalized', 'ln1', global_state.active_block);

	activeComponent.name = 'LN1';
};

/**
 * A callback function that is to be called each time the LN2 is clicked.
 */
export const LN2Callback = async () => {
	await checkInputAndRunModel();

	await getProbDensity('resid_mid', null, global_state.active_block);
	await getProbDensity('normalized', 'ln2', global_state.active_block);

	activeComponent.name = 'LN2';
};

/**
 * A callback function that is to be called each time the final LN is
 * clicked.
 */
export const LNFinalCallback = async () => {
	await checkInputAndRunModel();

	await getProbDensity('resid_post', null, global_state.active_block);
	await getProbDensity('normalized', 'ln_final', null);

	activeComponent.name = 'LN Final';
}

/**
 * A callback function that is to be called when a block number is clicked.
 */
export const TransformerBlockCallback = async () => {
	await checkInputAndRunModel();

	if (activeComponent.name === 'LN1') {
		await LN1Callback();
	} else if (activeComponent.name === 'LN2') {
		await LN2Callback();
	} else if (activeComponent.name === 'Attention Pattern') {
		await attnHeadCallback();
	} else if (activeComponent.name === 'MLP (in) Pre-activation') {
		await MLPPreCallback();
	}
};

/**
 * A callback function that is to be called when either generate or output
 * is clicked.
 */
export const outputCallback = async () => {
	await checkInputAndRunModel();
	await getDist();
	await getNextToken();

	activeComponent.name = 'Output Distribution';
};

export const temperatureSliderCallback = async (v: number) => {
	params.temperature = +v;
	console.log(v);

	await outputCallback();
};

export const kSliderCallback = async (v: number) => {
	params.top_k = +v;

	await outputCallback();
};

export const pSliderCallback = async (v: number) => {
	params.top_p = +v;

	await outputCallback();
};
