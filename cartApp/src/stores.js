import { writable } from "svelte/store";

export const cart=writable(0);

export const cart_items=writable([]);