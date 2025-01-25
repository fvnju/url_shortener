import prisma from "../db/client";
import { CreateShortUrlSchema, type CreateShortUrlInput } from "../db/schema";

export class ShortUrlService {
  // Create short URL with validation
  static async create(input: CreateShortUrlInput) {
    const validated = CreateShortUrlSchema.parse(input);

    return prisma.shortUrl.create({
      data: {
        originalUrl: validated.originalUrl,
        shortCode: validated.customCode || this.generateRandomCode(),
        expiresAt: validated.expiresAt,
      },
    });
  }

  // Get original URL
  static async getByCode(shortCode: string) {
    return prisma.shortUrl.findUnique({
      where: { shortCode },
    });
  }

  // Track clicks
  static async trackVisit(shortCode: string) {
    return prisma.shortUrl.update({
      where: { shortCode },
      data: {
        clicks: { increment: 1 },
        lastAccessed: new Date(),
      },
    });
  }

  // Generate random code (8 chars)
  private static generateRandomCode() {
    return crypto.randomUUID().slice(0, 8);
  }
}
