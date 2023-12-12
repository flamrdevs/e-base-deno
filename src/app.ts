import { Hono, HTTPException } from 'hono/mod.ts';
import { compress, cors } from 'hono/middleware.ts';

import * as v from 'valibot/mod.ts';

const env = v.parse(
	v.object({
		APP_NAME: v.string(),
	}),
	Deno.env.toObject(),
);

const app = new Hono();

app.use('*', cors({ origin: '*' }), compress());

app.get('/env', (ctx) => ctx.json(env));

app
	.get('/', (ctx) => ctx.json({ name: env.APP_NAME }, 200))
	.notFound((ctx) => ctx.json({ message: 'Not found' }, 404))
	.onError((err, ctx) => {
		if (err instanceof HTTPException) return err.getResponse();
		let message = 'Internal server error';
		if (err instanceof Error) message = err.message;
		return ctx.json({ message }, 500);
	});

export default app;
