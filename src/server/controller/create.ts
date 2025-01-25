import { validator } from "hono/validator";
import { ShortUrlService } from "../services/shortUrlService";
import { createFactory } from "hono/factory";

const factory = createFactory();

export const createShortUrlHandler = factory.createHandlers(
  validator("json", async (body, c) => {
    try {
      const result = await ShortUrlService.create(body, c.req.url);
      return c.json(result);
    } catch (error) {
      return c.json({ error: "Invalid input" }, 400);
    }
  })
);
