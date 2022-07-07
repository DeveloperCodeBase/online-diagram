const c = [
	() => import("..\\..\\..\\src\\routes\\__layout.svelte"),
	() => import("..\\components\\error.svelte"),
	() => import("..\\..\\..\\src\\routes\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\edit.svelte"),
	() => import("..\\..\\..\\src\\routes\\view.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/manifest.json.ts
	[/^\/manifest\.json$/],

	// src/routes/edit.svelte
	[/^\/edit\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/view.svelte
	[/^\/view\/?$/, [c[0], c[4]], [c[1]]]
];

export const fallback = [c[0](), c[1]()];