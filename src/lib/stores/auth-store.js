import { writable } from "svelte/store";

export let authStore = writable({
    isLoggedIn: false,
    currentUser: null
});