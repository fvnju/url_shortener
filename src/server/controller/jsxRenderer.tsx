import { createFactory } from "hono/factory";
import { jsxRenderer } from "hono/jsx-renderer";
import { Counter } from "../../client/Counter";

const factory = createFactory();

export const renderer = factory.createMiddleware(
  jsxRenderer(
    ({ children }) => (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <title>hono-client</title>

          <script
            type="module"
            src={
              import.meta.env.PROD
                ? "/assets/index.js"
                : "/src/client/index.tsx"
            }
          />
          <link
            href={
              import.meta.env.PROD
                ? "/assets/index.css"
                : "/src/client/global.css"
            }
            rel="stylesheet"
          />
        </head>
        <div id="root">{children}</div>
      </html>
    ),
    { docType: true }
  )
);

export const jsxHydration = factory.createHandlers(async (c) => {
  return c.render(<Counter url={c.req.url} />);
});
