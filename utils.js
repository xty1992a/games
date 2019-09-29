export const sleep = time => new Promise(r => setTimeout(r, time));
export const limit = (min, max) => val => Math.min(Math.max(val, min), max);
export const ranger = (min, max) => () => Math.floor(Math.random() * (max - min + 1) + min);
