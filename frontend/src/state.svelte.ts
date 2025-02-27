export const activeComponent = $state({
	name: 'Output Distribution'
});

export const data = $state({
	tokenProbMappings: []
});

export const dimred = $state({
	method: 'PCA',
	perplexity: 2
});

// All the model information name, embed_size, ...
export const active_model = $state({
	model_name: 'gpt2-small'
});

export const input = $state({
	isChanged: false,
	text: ''
});

export const params = $state<{
	temperature: number;
	top_k: number;
	top_p: number;
}>({
	temperature: 1.0,
	top_k: 1,
	top_p: 0.2
});

// All the global state here
// #note: currently this is not to be used, left to configure
export const global_state = $state<{
	isModelLoaded: boolean;
	data: any[];
	tokens: any[];
	embed_output: ScatterPlotData;
	ln_pre: [];
	ln_post: [];
	attn_patterns: HeatMapData[]; // contains attn pattern for all heads
	active_head: number;
	active_block: number;
	neuron: number;
	viewMode: boolean;
	ouputBlockState: boolean;
	next_token: string;
	info: any;
}>({
	isModelLoaded: false,
	data: [],
	tokens: [],
	embed_output: [],
	ln_pre: [],
	ln_post: [],
	attn_patterns: [],
	active_head: 0,
	active_block: 0,
	neuron: 0,
	viewMode: false,
	ouputBlockState: false, // this stores the side drawer state i.e open or closed
	next_token: '',
	info: null
});
