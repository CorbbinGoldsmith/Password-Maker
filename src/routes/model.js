import {weights} from "./weights.js"

export function always(s){
	return () => s;
}

export function getRandom(s) {
	if ( s ) {
		return s[(Math.random() * s.length) >> 0]
	}
	else {
		console.log("Error: S is not loopable");
		return null;
	}
}

function makeGetRandom(s) {
	return function () {
		return getRandom(s)
	}
}

export function getPattern(a) {
	return a.reduce((a,c) => {return a+""+c()}, "");
}

export function makeGetPattern(pattern) {
	return () => {
		return getPattern(pattern);
	}
}

export function getRandomPattern(pattern){
	return makeGetPattern(patterns[pattern])();
}

export function generateIdentifier(pattern){
	let identifier = getPattern(pattern);
	return identifier;
}

export const generators = {
	"Secure Passwords" : {},
	"Memorable Passwords" : {},
	"Word Generator" : {},
	"Tokens" : {},
}

export function createGenerator(grp,name,arr) {
	if (!generators[grp]) {
		generators[grp] = {};
	}
	generators[grp][name] = true;
	patterns[name] = arr;
}



export function getWeightedRandom(s, weights) {
	if ( s ) {
		let weightedRandom = Math.random() * (Object.keys(weights).filter(e => s.includes(e)).reduce((a,c)=>a+weights[c], 0) + s.length - Object.keys(weights).length);
		let sum = 0;
		for (let i=0; i<s.length; i++) {
			let currentWeight = weights[s[i]] ? weights[s[i]] : 1;
			sum += currentWeight;
			if (weightedRandom < sum) {
				return s[i];
			}
		}
	}
	else {
		console.log("Error: S is not loopable");
		return null;
	}
}


export function makeGetWeightedRandom(s,weights) {
	return function () {
		return getWeightedRandom(s, weights)
	}
}

export function getWeightedPattern(a, weights) {
	return a.reduce((a,c) => {return a+""+c(weights)}, "");
}

export function makeGetWeightedPattern(pattern,weights) {
	return () => {
		return getWeightedPattern(pattern, weights);
	}
}

export function getWeightedRandomPattern(pattern,weights){
	return makeGetWeightedPattern(patterns[pattern](weights));
}

export function generateWeightedIdentifier(pattern,weights){
	let identifier = getWeightedPattern(pattern, weights);
	return identifier;
}

export const letters = {
	alphaNumeric : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
	alphabet : "abcdefghijklmnopqrstuvwxyz",
	alphabet_uplo : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
	alphabet_up : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	alphaNumeric : "abcdefghijklmnopqrstuvwxyz1234567890",
	alphaNumeric_up : "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
	numeric: "1234567890",
	vowels : "aeiouy",
	vowels_up : "AEIOUY",
	consonants: "bcdfghjklmnpqrstvwxz",
	consonants_up: "BCDFGHJKLMNPQRSTVWXZ",
	symbols: "_-!@#$%^&*/",
	word_beginnings_eng: [
		"b","bl","br",
		"c","ch","cl","cr",
		"d","dr","f","fl","fr",
		"g","gh","gl","gr","gw",
		"h","j",
		"k","kh","kl","kr",
		"l","m","n",
		"p","ph","pl","pr",
		"qu",
		"r","rh",
		"s",
		"sh","sl",
		"sc","scr","sch","scl",
		"squ","sk","sp","spl","spr",
		"st","str",
		"t","tr","th","tl","thr",
		"v","w","wr","wh",
		"y","z"
	],
	word_endings_eng: [
		"b","ble","bl","bs",
		"ck","cks","tch","tches",
		"d","ds","ddle","dge","dges",
		"f","fe","fs",
		"g","gh","gs",
		"k","ks",
		"l","ls","le","ls",
		"m","ms",
		"n","ns","ng","ngs","nge","nges",
		"p","ps","pe","ph",
		"r","rs","re","res",
		"s","ss","se","sh","ss","sle","sles","ssle","ssles",
		"t","ts","te",
		"th","ths",
		"ttle",
		"v","ve",
		"w","ws",
		"x",
		"y","ys"
	],
	word_middle_eng: [
		"b","bl","br",
		"c","ch","cl","cr",
		"d","dr","dd",
		"f",
		"g","gh","gl","gr",
		"k","kl","kr",
		"l","m","n",
		"p","ph","pl","pr",
		"r","s","sh","ss",
		"t","tr","tt",
		"v","w","wr"
	],
	word_vowels_eng: [
		"a","au","ao","ae","ai",
		"e","eu","ei","ea","ee","eo","eau",
		"i","io","ie",
		"o","oo","oi","ou",
		"u","uo","ua","ui",
		"y","igh","eigh","aigh"
	],
	word_vowels_ending_eng: [
		"a","aw","ao","ay",
		"e","ew","ey","ea","ee","eo","eau",
		"i","io","ie",
		"o","oo","oy","ow","ou",
		"u","uo","ua","ui",
		"y"
	],
	word_beginnings_swedish: [
		"b","bl","br",
		"c","ch","cl","cr",
		"d","dr","f","fl","fr","fn",
		"g","gl","gr","gh",
		"h","j",
		"k","kl","kr","kv",
		"l","m","n",
		"p","pl","pr","ph",
		"r","s",
		"sk","sl","sn","sp","st","sv",
		"t","tr","tv",
		"v","w","x","y","z"
	],
	word_endings_swedish: [
		"b","bb","bl","bs",
		"ck","cks","ckt",
		"d","dd","ds",
		"f","ff","ft","fs",
		"g","gg","gl","gs","gt",
		"k","ks","kt",
		"l","ll","ls","lt",
		"m","mm","ms","mt",
		"n","nd","ns","nt",
		"p","pp","ps","pt",
		"r","rs","rt",
		"s","ss","st","t",
		"v","vs",
		"w","ws"
	],
	word_middle_swedish: [
		"b","bl","br",
		"c","ch","cl","cr",
		"d","dr",
		"f",
		"g","gl","gr",
		"h","j","k","kl","kr",
		"l","m","n",
		"p","ph","pl","pr",
		"r","s",
		"t","tr",
		"v","w"
	],
	two_vowels : [
		"a","ee"
	]
}

export const patterns = {
	_threeletter : [
		makeGetRandom(letters.consonants_up),
		makeGetRandom(letters.vowels),
		makeGetRandom(letters.vowels)
	],
	_threeletter : [
		makeGetRandom(letters.consonants_up),
		makeGetRandom(letters.vowels),
		makeGetRandom(letters.vowels)
	],
	_threenumber : [
		makeGetRandom(letters.numeric),
		makeGetRandom(letters.numeric),
		makeGetRandom(letters.numeric)
	],
	_fourletter : [
		makeGetRandom(letters.consonants_up),
		makeGetRandom(letters.vowels),
		makeGetRandom(letters.consonants),
		makeGetRandom(letters.vowels)
	],
	_fournumber : [
		makeGetRandom(letters.numeric),
		makeGetRandom(letters.numeric),
		makeGetRandom(letters.numeric),
		makeGetRandom(letters.numeric)
	],
	_word : [
		makeGetRandom(letters.word_beginnings_eng),
		makeGetRandom(letters.vowels),
		makeGetRandom(letters.consonants),
		makeGetRandom(letters.vowels),
		makeGetRandom(letters.consonants)
	],
	_alphanumeric : [
		makeGetRandom(letters.alphaNumeric_up),
		makeGetRandom(letters.alphaNumeric)
	],
	_alphanumeric_loud : [
		makeGetRandom(letters.alphaNumeric_up),
		makeGetRandom(letters.alphaNumeric_up),
		makeGetRandom(letters.alphaNumeric_up),
		makeGetRandom(letters.alphaNumeric_up),
		makeGetRandom(letters.alphaNumeric_up)
	],
	_mock_name : [
		makeGetRandom(letters.word_beginnings_eng),
		makeGetRandom(letters.vowels),
		makeGetRandom(letters.word_middle_eng),
		makeGetRandom(letters.vowels),
		makeGetRandom(letters.word_endings_eng)
	],
	_mock_name_swedish : [
		makeGetRandom(letters.word_beginnings_swedish),
		makeGetRandom(letters.vowels),
		makeGetRandom(letters.word_middle_swedish),
		makeGetRandom(letters.vowels),
		makeGetRandom(letters.word_endings_swedish)
	],
}


patterns._two_syllables = [
	makeGetPattern(patterns._threeletter), 
	makeGetPattern(patterns._threeletter)
]

patterns._three_syllables = [
	makeGetPattern(patterns._fourletter), 
	makeGetPattern(patterns._threeletter)
]

patterns._three_syllables_1 = [
	makeGetPattern(patterns._threeletter),
	makeGetPattern(patterns._fourletter)
]

createGenerator("Secure Passwords","Severe Security", [
	makeGetPattern(patterns._three_syllables),
	makeGetRandom(letters.symbols),
	makeGetPattern(patterns._threenumber),
	makeGetPattern(patterns._three_syllables_1),
	makeGetRandom(letters.symbols),
])


createGenerator("Secure Passwords","Severe Security", [
	makeGetPattern(patterns._three_syllables),
	makeGetRandom(letters.symbols),
	makeGetPattern(patterns._threenumber),
	makeGetPattern(patterns._three_syllables_1),
	makeGetRandom(letters.symbols),
]);

createGenerator("Secure Passwords","Short Alphanumeric with Symbols", [
	makeGetPattern(patterns._three_syllables),
	makeGetRandom(letters.symbols),
	makeGetPattern(patterns._threenumber),
]);

createGenerator("Secure Passwords","Secure Scanner", [
	makeGetPattern(patterns._fourletter),
	makeGetRandom(letters.symbols),
	makeGetPattern(patterns._threenumber),
	makeGetRandom(letters.alphaNumeric_up),
	makeGetRandom(letters.symbols),
]);

createGenerator("Secure Passwords","Secure Combination", [
	makeGetPattern(patterns._fourletter),
	always("-"),
	makeGetPattern(patterns._three_syllables),
	always("-"),
	makeGetRandom(letters.alphaNumeric_up),
	always("-"),
	makeGetRandom(letters.symbols),
]);

createGenerator("Tokens","Maximum Security", [
	makeGetPattern(patterns._threeletter),
	makeGetRandom(letters.symbols),
	makeGetPattern(patterns._threenumber),
	makeGetRandom(letters.alphaNumeric_up),
	makeGetRandom(letters.symbols),
	makeGetPattern(patterns._fourletter),
	makeGetRandom(letters.symbols),
	makeGetPattern(patterns._three_syllables_1),
	makeGetRandom(letters.alphaNumeric_up),
	makeGetRandom(letters.symbols),
	makeGetPattern(patterns._three_syllables),
	makeGetRandom(letters.symbols),
	makeGetPattern(patterns._threenumber),
	makeGetRandom(letters.alphaNumeric_up),
	makeGetRandom(letters.vowels_up),
	makeGetRandom(letters.symbols)
]);

createGenerator("Memorable Passwords","Secure Memory", [
	makeGetPattern(patterns._three_syllables),
	makeGetRandom(letters.symbols),
	makeGetPattern(patterns._fourletter),
	makeGetRandom(letters.symbols),
]);

createGenerator("Memorable Passwords","Secure Recall", [
	makeGetPattern(patterns._fourletter),
	makeGetRandom(letters.symbols),
	makeGetPattern(patterns._threeletter),
]);

createGenerator("Memorable Passwords","Secure Notation", [
	makeGetPattern(patterns._threeletter),
	makeGetRandom(letters.symbols),
	makeGetPattern(patterns._threenumber),
	makeGetRandom(letters.alphaNumeric_up),
]);

createGenerator("Memorable Passwords","Secure Remembrance", [
	makeGetPattern(patterns._three_syllables),
	makeGetRandom(letters.symbols),
	makeGetPattern(patterns._threenumber),
	makeGetRandom(letters.alphaNumeric_up),
]);

createGenerator("Secure Passwords","Secure Password", [
	makeGetRandom(letters.symbols),
	makeGetRandom(letters.alphaNumeric_up),
	makeGetRandom(letters.alphaNumeric),
	makeGetRandom(letters.alphaNumeric),
	makeGetRandom(letters.alphaNumeric),
	makeGetRandom(letters.alphaNumeric),
	makeGetRandom(letters.alphaNumeric),
	makeGetRandom(letters.alphaNumeric_up),
	makeGetRandom(letters.symbols),
]);

createGenerator("Memorable Passwords","Memorable Password",  [
	makeGetRandom(letters.word_beginnings_eng),
	makeGetRandom(letters.vowels),
	makeGetRandom(letters.consonants),
	makeGetRandom(letters.vowels),
	makeGetRandom(letters.consonants),
	makeGetRandom(letters.word_beginnings_eng),
	makeGetRandom(letters.consonants),
	makeGetRandom(letters.vowels),
	makeGetRandom(letters.word_beginnings_eng),
	makeGetRandom(letters.vowels),
	makeGetRandom(letters.consonants),
	makeGetRandom(letters.word_beginnings_eng),
]);

createGenerator("Secure Passwords","Super Secure Password", [
	makeGetPattern(patterns._three_syllables),
	makeGetRandom(letters.symbols),
	makeGetPattern(patterns._threenumber),
	makeGetPattern(patterns._three_syllables_1),
	makeGetRandom(letters.symbols),
	makeGetPattern(patterns._three_syllables),
	makeGetRandom(letters.symbols),
	makeGetPattern(patterns._threenumber)
]);

createGenerator("Word Generator","Realistic Word", [
	makeGetRandom(letters.word_beginnings_eng),
	makeGetRandom(letters.vowels),
	makeGetRandom(letters.word_middle_eng),
	makeGetRandom(letters.word_vowels_eng),
	makeGetRandom(letters.word_endings_eng),
]);

createGenerator("Word Generator","Dash-separated Word", [
	makeGetRandom(letters.word_beginnings_eng),
	makeGetRandom(letters.vowels),
	makeGetRandom(letters.word_endings_eng),
	always("-"),
	makeGetRandom(letters.word_beginnings_eng),
	makeGetRandom(letters.vowels),
	makeGetRandom(letters.word_endings_eng),
]);

createGenerator("Word Generator","Realistic Word 2", [
	makeGetRandom(letters.vowels),
	makeGetRandom(letters.word_beginnings_eng),
	makeGetRandom(letters.word_vowels_ending_eng),
]);

createGenerator("Word Generator","Realistic Word - 2 syllables", [
	makeGetRandom(letters.word_beginnings_eng),
	makeGetRandom(letters.word_vowels_eng),
	makeGetRandom(letters.word_middle_eng),
	makeGetRandom(letters.word_vowels_ending_eng),

]);

createGenerator("Word Generator", "Long word", [
	makeGetRandom(letters.word_beginnings_eng),
	makeGetRandom(letters.word_vowels_eng),
	makeGetRandom(letters.word_middle_eng),
	makeGetRandom(letters.word_vowels_ending_eng),
	makeGetRandom(letters.word_endings_eng)
]);

createGenerator("Word Generator", "randomWord", [
	makeGetRandom(letters.word_beginnings_eng),
	makeGetRandom(letters.word_vowels_eng),
	makeGetRandom(letters.word_middle_eng),
	makeGetRandom(letters.word_vowels_ending_eng),
	makeGetRandom(letters.word_endings_eng)
]);


createGenerator("Word Generator", "Weighted Test", [
	makeGetWeightedRandom(letters.word_beginnings_eng, weights.word_beginnings_eng),
	makeGetWeightedRandom(letters.word_vowels_eng, weights.word_vowels_eng),
	makeGetWeightedRandom(letters.word_middle_eng, weights.word_middle_eng),
	makeGetWeightedRandom(letters.word_vowels_eng, weights.word_vowels_eng),
	makeGetWeightedRandom(letters.word_middle_eng, weights.word_middle_eng),
	makeGetWeightedRandom(letters.word_vowels_ending_eng, weights.word_vowels_ending_eng),

]);

createGenerator("Word Generator", "Weighted Test 2", [
	makeGetWeightedRandom(letters.word_vowels_eng, weights.word_vowels_eng),
	makeGetWeightedRandom(letters.word_middle_eng, weights.word_middle_eng),
	makeGetWeightedRandom(letters.word_vowels_eng, weights.word_vowels_eng),
	makeGetWeightedRandom(letters.word_middle_eng, weights.word_middle_eng),
	makeGetWeightedRandom(letters.word_vowels_ending_eng, weights.word_vowels_ending_eng),
]);

// TEST a test to make sure that the generator responds to weights.

// createGenerator("Word Generator", "Weights - Unit Test", [
// 	makeGetWeightedRandom(letters.two_vowels, weights.two_vowels),

// ]);

export const patterns_AI = {
	constant : [always("A")],
	email : [always("@"), getRandom.bind(null,letters.alphabet_uplo), makeGetRandom.bind(null,letters.alphaNumeric), makeGetRandom.bind(null,letters.alphaNumeric)],
	word : [getRandom.bind(null,letters.word_beginnings_eng), makeGetRandom.bind(null,letters.alphaNumeric), makeGetRandom.bind(null,letters.word_endings_eng)],
	sentence : [makeGetRandom.bind(null,letters.word_beginnings_eng), makeGetRandom.bind(null,letters.alphaNumeric), makeGetRandom.bind(null,letters.word_endings_eng), always(" "), makeGetRandom.bind(null,letters.word_beginnings_eng), makeGetRandom.bind(null,letters.alphaNumeric), makeGetRandom.bind(null,letters.word_endings_eng), always(" "), makeGetRandom.bind(null,letters.word_beginnings_eng), makeGetRandom.bind(null,letters.alphaNumeric), makeGetRandom.bind(null,letters.word_endings_eng), always(" "), makeGetRandom.bind(null,letters.word_beginnings_eng), makeGetRandom.bind(null,letters.alphaNumeric), makeGetRandom.bind(null,letters.word_endings_eng)],
	numeric : [makeGetRandom.bind(null,letters.numeric), makeGetRandom.bind(null,letters.numeric), makeGetRandom.bind(null,letters.numeric), makeGetRandom.bind(null,letters.numeric), makeGetRandom.bind(null,letters.numeric), makeGetRandom.bind(null,letters.numeric)],
	password : [makeGetRandom.bind(null,letters.alphaNumeric_up), makeGetRandom.bind(null,letters.symbols), makeGetRandom.bind(null,letters.vowels_up), makeGetRandom.bind(null,letters.alphaNumeric), makeGetRandom.bind(null,letters.consonants_up), makeGetRandom.bind(null,letters.vowels)]
}



