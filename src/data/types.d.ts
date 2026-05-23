/**
 * Type definitions for mapping data
 * Maps data is loaded from JSON5 files at runtime
 */

export const finalMap: {
  readonly a: "aa";
  readonly ai: "a";
  readonly ao: "ao";
  readonly o: "ee";
  readonly e: "ee";
  readonly ei: "e";
  readonly er: "er";
  readonly i: "i";
  readonly ou: "o";
  readonly u: "u";
  readonly ü: "v";
  readonly an: "an";
  readonly ang: "ag";
  readonly en: "en";
  readonly eng: "eg";
  readonly ia: "iaa";
  readonly iao: "iao";
  readonly ie: "ia";
  readonly in: "in";
  readonly ing: "ig";
  readonly iu: "io";
  readonly ong: "ug";
  readonly ua: "uaa";
  readonly uai: "ua";
  readonly ui: "ue";
  readonly un: "un";
  readonly uo: "uee";
  readonly üe: "va";
  readonly ün: "vn";
  readonly ian: "ian";
  readonly iang: "iag";
  readonly iong: "iug";
  readonly uan: "uan";
  readonly uang: "uag";
  readonly üan: "van";
};

export const initialMap: {
  readonly b: "b";
  readonly p: "p";
  readonly m: "m";
  readonly f: "f";
  readonly d: "d";
  readonly t: "t";
  readonly n: "n";
  readonly l: "l";
  readonly g: "g";
  readonly k: "k";
  readonly h: "h";
  readonly j: "j";
  readonly q: "q";
  readonly x: "x";
  readonly zh: "zh";
  readonly ch: "ch";
  readonly sh: "sh";
  readonly r: "r";
  readonly z: "z";
  readonly c: "c";
  readonly s: "s";
};

export const Pinin2Hanz: {
  readonly initial: {
    readonly b: string;
    readonly p: string;
    readonly m: string;
    readonly f: string;
    readonly d: string;
    readonly t: string;
    readonly n: string;
    readonly l: string;
    readonly g: string;
    readonly k: string;
    readonly h: string;
    readonly j: string;
    readonly q: string;
    readonly x: string;
    readonly zh: string;
    readonly ch: string;
    readonly sh: string;
    readonly r: string;
    readonly z: string;
    readonly c: string;
    readonly s: string;
  };
  readonly vowel: {
    readonly i: string;
    readonly u: string;
    readonly v: string;
    readonly a: string;
    readonly aa: string;
    readonly o: string;
    readonly ao: string;
    readonly e: string;
    readonly ee: string;
    readonly er: string;
  };
  readonly final: {
    readonly n: string;
    readonly g: string;
  };
};

export const voidInitialMap: {
  readonly weng: "ong";
  readonly wen: "un";
  readonly wei: "ui";
  readonly wu: "u";
  readonly yi: "i";
  readonly yu: "ü";
  readonly y: "i";
  readonly w: "u";
};
