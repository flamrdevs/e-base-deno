import 'std/dotenv/load.ts';

try {
	const app = (await import('~/app.ts')).default;
	const port = 8000;
	const hostname = '0.0.0.0';
	Deno.serve({ port, hostname, onListen: () => console.log(`${hostname}:${port}`) }, app.fetch);
} catch (error) {
	console.error(error);
}
