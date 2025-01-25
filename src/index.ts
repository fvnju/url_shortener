import { Hono } from "hono";
import { createShortUrlHandler } from "./server/controller/create";
import redirectHandler from "./server/controller/redirect";
import { jsxHydration, renderer } from "./server/controller/jsxRenderer";
import { serveStatic } from "hono/serve-static";

const app = new Hono();

if (import.meta.env.PROD) {
  app.use(
    "/assets/index.js",
    serveStatic({
      path: "./public/assets/index.js",
      getContent: async (path) => {
        const response = await fetch(path);
        if (response.ok) {
          console.log("worked");
          return response;
        }
        console.log("not worked");
        return null;
      },
    })
  );

  app.use(
    "/assets/index.css",
    serveStatic({
      path: "./public/assets/index.css",
      getContent: async (path) => {
        const response = await fetch(path);
        if (response.ok) {
          console.log("worked");
          return response;
        }
        console.log("not worked");
        return null;
      },
    })
  );
}

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
