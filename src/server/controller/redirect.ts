import { ShortUrlService } from "../services/shortUrlService";
import { createFactory } from "hono/factory";

const factory = createFactory();

const redirectHandler = factory.createHandlers(async (c) => {
  const shortCode = c.req.param("code");
  const result = await ShortUrlService.getByCode(shortCode!);

  if (!result) {
    return c.json({ error: "Invalid short code" }, 400);
  }

  return c.redirect(result.originalUrl, 302);
});

export default redirectHandler;
