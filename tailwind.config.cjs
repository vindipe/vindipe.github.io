/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontSize: {
				"3xl": ["1.875rem", { lineHeight: "1.2" }],
				"4xl": ["2.125rem", { lineHeight: "1.15" }],
				"5xl": ["2.5rem", { lineHeight: "1.1" }],
			},
		},
	},
	plugins: [require("@tailwindcss/typography"),require("daisyui")],
	daisyui: {
		themes: ["bumblebee"],
		darkTheme: "bumblebee",
		logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
	  }
}
