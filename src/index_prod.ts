import { Hono } from "hono";
import { createShortUrlHandler } from "./server/controller/create";
import redirectHandler from "./server/controller/redirect";
import { jsxHydration, renderer } from "./server/controller/jsxRenderer";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use("/*", serveStatic({ root: "./public/" }));

const route = app.get("/mk", (c) => {
  console.log("used");
  return c.json({ a: 1 });
});

app
  .use(renderer)
  .get("/", ...jsxHydration)
  .get("/:code", ...redirectHandler)
  .post("/", ...createShortUrlHandler)
  .onError((err, c) =>
    c.json(
      {
        name: err.name,
        message: err.message,
      },
      500
    )
  );

export type AppType = typeof route;

export default app;
