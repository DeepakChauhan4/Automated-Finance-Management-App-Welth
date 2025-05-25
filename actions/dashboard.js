import { db } from 'lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function getUserAccounts() {
    try {
        const { userId } = await auth();
        console.log('getUserAccounts auth userId:', userId);
        if (!userId) {
            console.error('Unauthorized: Missing userId from auth');
            throw new Error('Unauthorized');
        }

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!user) {
            console.error(`User not found for clerkUserId: ${userId}`);
            throw new Error('User not found');
        }

        const accounts = await db.account.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
        });

        // Convert Decimal fields to number
        const plainAccounts = accounts.map(account => ({
            ...account,
            balance: account.balance.toNumber(),
        }));

        return plainAccounts;
    } catch (error) {
        console.error('Error fetching user accounts:', error);
        return [];
    }
}

export async function getDashboardData() {
    try {
        const { userId } = await auth();
        console.log('getDashboardData auth userId:', userId);
        if (!userId) {
            console.error('Unauthorized: Missing userId from auth');
            throw new Error('Unauthorized');
        }

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!user) {
            console.error(`User not found for clerkUserId: ${userId}`);
            throw new Error('User not found');
        }

        const transactions = await db.transaction.findMany({
            where: { userId: user.id },
            orderBy: { date: 'desc' },
            take: 10,
        });

        // Convert Decimal fields to number
        const plainTransactions = transactions.map(transaction => ({
            ...transaction,
            amount: transaction.amount.toNumber(),
        }));

        return plainTransactions;
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return [];
    }
}
