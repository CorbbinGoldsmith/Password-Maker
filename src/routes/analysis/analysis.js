import {writable} from "svelte/store"

export const data = writable("sprout");

export const results = writable({})

const weights = {
	"b":1,
	"bl":1,
	"br":1,
	"c":1,
	"ch":1,
	"cl":1,
	"cr":1,
	"d":1,
	"dr":1,
	"f":1,
	"fl":1,
	"fr":1,
	"g":1,
	"gh":1,
	"gl":1,
	"gr":1,
	"gw":1,
	"h":1,
	"j":1,
	"k":1,
	"kh":1,
	"kl":1,
	"kr":1,
	"l":1,
	"m":1,
	"n":1,
	"p":1,
	"ph":1,
	"pl":1,
	"pr":1,
	"qu":1,
	"r":1,
	"rh":1,
	"s":1,
	"sh":1,
	"sl":1,
	"sc":1,
	"scr":1,
	"sch":1,
	"scl":1,
	"squ":1,
	"sk":1,
	"sp":1,
	"spl":1,
	"spr":1,
	"st":1,
	"str":1,
	"t":1,
	"tr":1,
	"th":1,
	"thr":1,
	"tl":1,
	"v":1,
	"w":1,
	"wr":1,
	"wh":1,
	"y":1,
	"z":1
}

export function get__store(store) {
  let $val
  store.subscribe($ => $val = $)()
  return $val
}

function searchPattern(pattern,s) {
	s = get__store(s);
	let regex = new RegExp(pattern, "gi");
	if (typeof s === "string") {
		let matches = s.match(regex);
		return matches ? matches.length : 0;
	}
	else {
		return JSON.stringify(s)
	}
}

export function analyze(){
	for (let name in weights) {
		weights[name] += searchPattern(name,data);
	}
	results.set(weights)
}



















