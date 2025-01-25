import db from "../db/client";
import {
  CreateShortUrlSchema,
  type CreateShortUrlInput,
} from "../controller/schema";
import { shortUrl } from "../db/schema";
import { eq } from "drizzle-orm";

export class ShortUrlService {
  static async create(input: CreateShortUrlInput, baseUri: string) {
    const validated = CreateShortUrlSchema.parse(input);
    const code = this.generateRandomCode();

    try {
      await db.insert(shortUrl).values({
        originalUrl: validated.originalUrl,
        shortCode: validated.customCode || code,
        expiresAt: validated.expiresAt,
      });
    } catch (error) {
      return {
        error: error,
        data: {},
      };
    }

    return {
      error: null,
      data: {
        shortUrl: `${baseUri}${validated.customCode || code}`,
        expiresAt: validated.expiresAt,
        orginalUrl: validated.originalUrl,
      },
    };
  }

  // Get original URL
  static async getByCode(shortCode: string) {
    const result = await db
      .select()
      .from(shortUrl)
      .where(eq(shortUrl.shortCode, shortCode))
      .execute()
      .then((res) => res[0]); // Get first result

    return result || null;
  }

  // Track clicks
  // static async trackVisit(shortCode: string) {
  //   return db.shortUrl.update({
  //     where: { shortCode },
  //     data: {
  //       clicks: { increment: 1 },
  //       lastAccessed: new Date(),
  //     },
  //   });
  // }

  // Generate random code (8 chars)
  private static generateRandomCode() {
    return crypto.randomUUID().slice(0, 8);
  }
}
