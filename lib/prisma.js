import { PrismaClient } from './generated/prisma';

let db;

if (process.env.NODE_ENV === 'production') {
    db = new PrismaClient();
} else {
    // In development, use a global variable to prevent multiple instances of PrismaClient
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    db = global.prisma;
}

export { db };
