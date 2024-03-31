// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		"@nuxtjs/tailwindcss",
		[
			"@pinia/nuxt",
			{
				autoImports: ["defineStore", "acceptHMRUpdate"],
			},
		],
	],
	pinia: {
		storesDirs: ["./stores/**", "./custom-folder/stores/**"],
	},
	imports: {
		dirs: ["stores"],
	},
})
