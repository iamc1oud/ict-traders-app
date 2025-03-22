-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Auth" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT,
    "emailVerified" BOOLEAN DEFAULT false,
    "verificationToken" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetExpires" DATETIME,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Auth" ("createdAt", "email", "emailVerified", "id", "password", "passwordResetExpires", "passwordResetToken", "updatedAt", "userId", "username", "verificationToken") SELECT "createdAt", "email", "emailVerified", "id", "password", "passwordResetExpires", "passwordResetToken", "updatedAt", "userId", "username", "verificationToken" FROM "Auth";
DROP TABLE "Auth";
ALTER TABLE "new_Auth" RENAME TO "Auth";
CREATE UNIQUE INDEX "Auth_email_key" ON "Auth"("email");
CREATE UNIQUE INDEX "Auth_username_key" ON "Auth"("username");
CREATE UNIQUE INDEX "Auth_userId_key" ON "Auth"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
