import { defineStore } from "pinia"

export const useBoardStore = defineStore("board", {
	state: () => ({
		items: [],
	}),
	actions: {},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useBoardStore, import.meta.hot))
}
