CREATE TABLE "ShortUrl" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"originalUrl" varchar(2048) NOT NULL,
	"shortCode" varchar(16) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"expiresAt" timestamp,
	"clicks" integer DEFAULT 0 NOT NULL,
	"lastAccessed" timestamp,
	CONSTRAINT "ShortUrl_shortCode_unique" UNIQUE("shortCode")
);
