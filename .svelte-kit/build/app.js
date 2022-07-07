import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t<title>Online FlowChart &amp; Diagrams Editor - DeveloperCodeBase Live Editor</title>\n\t\t<meta\n\t\t\tname=\"og:image\"\n\t\t\tcontent=\"\"\n\t\t/>\n\t\t<link rel=\"canonical\" href=\"\" />\n\t\t<meta\n\t\t\tname=\"description\"\n\t\t\tcontent=\"DeveloperCodeBase.\"\n\t\t/>\n\t\t<link rel=\"icon\" type=\"image/png\" href=\"favicon.png\" />\n\t\t<link rel=\"manifest\" href=\"manifest.json\" />\n\t\t<link\n\t\t\trel=\"stylesheet\"\n\t\t\thref=\"all.min.css\"\n\t\t/>\n\t\t<script\n\t\t\tsrc=\"mermaid.min.js\"\n\t\t\tintegrity=\"sha256-sVAx+v/Q7v0Q2xm5vN7h5ccSna6gaLREhG9sF8pKT6I=\"\n\t\t\tcrossorigin=\"anonymous\"\n\t\t></script>\n\t\t<link\n\t\t\trel=\"stylesheet\"\n\t\t\thref=\"editor.main.min.css\"\n\t\t\tcrossorigin=\"anonymous\"\n\t\t\treferrerpolicy=\"no-referrer\"\n\t\t/>\n\t\t<script>\n\t\t\tvar require = {\n\t\t\t\tpaths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.25.2/min/vs' }\n\t\t\t};\n\t\t</script>\n\t\t<script\n\t\t\tsrc=\"loader.min.js\"\n\t\t\tcrossorigin=\"anonymous\"\n\t\t\treferrerpolicy=\"no-referrer\"\n\t\t></script>\n\t\t<script\n\t\t\tsrc=\"editor.main.nls.min.js\"\n\t\t\tcrossorigin=\"anonymous\"\n\t\t\treferrerpolicy=\"no-referrer\"\n\t\t></script>\n\t\t<script\n\t\t\tsrc=\"editor.main.js\"\n\t\t\tcrossorigin=\"anonymous\"\n\t\t\treferrerpolicy=\"no-referrer\"\n\t\t></script>\n\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t<div id=\"svelte\">" + body + "</div>\n\t</body>\n</html>\n";

let options = null;

const default_settings = { paths: {"base":"","assets":"/."} };

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings = default_settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: "/./_app/start-3e272963.js",
			css: ["/./_app/assets/start-0826e215.css"],
			js: ["/./_app/start-3e272963.js","/./_app/chunks/vendor-5c691847.js","/./_app/chunks/preload-helper-13c00eaa.js","/./_app/chunks/singletons-bb9012b7.js","/./_app/chunks/paths-45dac81d.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => "/./_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: /** @param {Error & {frame?: string}} error */ (error) => {
			if (error.frame) {
				console.error(error.frame);
			}
			console.error(error.stack);
			error.stack = options.get_stack(error);
		},
		hooks: get_hooks(user_hooks),
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		read: settings.read,
		root,
		service_worker: null,
		router: true,
		ssr: false,
		target: "#svelte",
		template,
		trailing_slash: "ignore"
	};
}

const d = decodeURIComponent;
const empty = () => ({});

const manifest = {
	assets: [{"file":".nojekyll","size":0,"type":null},{"file":"all.min.css","size":59344,"type":"text/css"},{"file":"analytics.js","size":49351,"type":"application/javascript"},{"file":"collect","size":2,"type":null},{"file":"devlogo.ico","size":107142,"type":"image/vnd.microsoft.icon"},{"file":"devlogo2.ico","size":111378,"type":"image/vnd.microsoft.icon"},{"file":"editor.main.js","size":2608835,"type":"application/javascript"},{"file":"editor.main.min.css","size":71541,"type":"text/css"},{"file":"editor.main.nls.min.js","size":63501,"type":"application/javascript"},{"file":"favicon.png","size":5406,"type":"image/png"},{"file":"icon-192.png","size":5057,"type":"image/png"},{"file":"icon-512.png","size":8619,"type":"image/png"},{"file":"loader.min.js","size":30691,"type":"application/javascript"},{"file":"mermaid.min.js","size":894947,"type":"application/javascript"},{"file":"robots.txt","size":67,"type":"text/plain"},{"file":"service-worker.js","size":107,"type":"application/javascript"},{"file":"workerMain.js","size":180116,"type":"application/javascript"}],
	layout: "src/routes/__layout.svelte",
	error: ".svelte-kit/build/components/error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'endpoint',
						pattern: /^\/manifest\.json$/,
						params: empty,
						load: () => import("..\\..\\src\\routes\\manifest.json.ts")
					},
		{
						type: 'page',
						pattern: /^\/edit\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/edit.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/view\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/view.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, resolve }) => resolve(request)),
	serverFetch: hooks.serverFetch || fetch
});

const module_lookup = {
	"src/routes/__layout.svelte": () => import("..\\..\\src\\routes\\__layout.svelte"),".svelte-kit/build/components/error.svelte": () => import("./components\\error.svelte"),"src/routes/index.svelte": () => import("..\\..\\src\\routes\\index.svelte"),"src/routes/edit.svelte": () => import("..\\..\\src\\routes\\edit.svelte"),"src/routes/view.svelte": () => import("..\\..\\src\\routes\\view.svelte")
};

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"/./_app/pages/__layout.svelte-a339e463.js","css":["/./_app/assets/pages/__layout.svelte-8953f3bd.css"],"js":["/./_app/pages/__layout.svelte-a339e463.js","/./_app/chunks/vendor-5c691847.js","/./_app/chunks/paths-45dac81d.js"],"styles":null},".svelte-kit/build/components/error.svelte":{"entry":"/./_app/error.svelte-f1502c0c.js","css":[],"js":["/./_app/error.svelte-f1502c0c.js","/./_app/chunks/vendor-5c691847.js"],"styles":null},"src/routes/index.svelte":{"entry":"/./_app/pages/index.svelte-90fcca56.js","css":[],"js":["/./_app/pages/index.svelte-90fcca56.js","/./_app/chunks/vendor-5c691847.js","/./_app/chunks/singletons-bb9012b7.js","/./_app/chunks/paths-45dac81d.js"],"styles":null},"src/routes/edit.svelte":{"entry":"/./_app/pages/edit.svelte-31ac97be.js","css":["/./_app/assets/pages/edit.svelte-67b531cb.css","/./_app/assets/util-2375eead.css"],"js":["/./_app/pages/edit.svelte-31ac97be.js","/./_app/chunks/vendor-5c691847.js","/./_app/chunks/util-c7198978.js","/./_app/chunks/preload-helper-13c00eaa.js","/./_app/chunks/paths-45dac81d.js"],"styles":null},"src/routes/view.svelte":{"entry":"/./_app/pages/view.svelte-3ade14a8.js","css":["/./_app/assets/util-2375eead.css"],"js":["/./_app/pages/view.svelte-3ade14a8.js","/./_app/chunks/vendor-5c691847.js","/./_app/chunks/util-c7198978.js","/./_app/chunks/preload-helper-13c00eaa.js"],"styles":null}};

async function load_component(file) {
	return {
		module: await module_lookup[file](),
		...metadata_lookup[file]
	};
}

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}