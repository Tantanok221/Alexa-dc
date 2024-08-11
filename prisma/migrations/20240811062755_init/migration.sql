-- CreateTable
CREATE TABLE "spotifyUser" (
    "name" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "discordId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spotifyUser_pkey" PRIMARY KEY ("discordId")
);
