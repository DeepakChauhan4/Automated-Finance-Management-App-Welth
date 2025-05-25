import { db } from 'lib/prisma';
import { auth } from '@clerk/nextjs/server';

// New function to get monthly aggregated budget and expenses for last 12 months
export async function getMonthlyBudgetExpenses(accountId) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error('Unauthorized');
        }

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!user) {
            throw new Error('User not found');
        }

        // Get budgets - assuming budget is monthly and fixed, so fetch latest budget amount
        const budget = await db.budget.findFirst({
            where: { userId: user.id },
            orderBy: { updatedAt: 'desc' },
        });

        const budgetAmount = budget ? budget.amount.toNumber() : 0;

        // Get monthly expenses for last 12 months
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);

        // Aggregate expenses grouped by year and month
        const expenses = await db.$queryRaw`
            SELECT 
                EXTRACT(YEAR FROM date) AS year,
                EXTRACT(MONTH FROM date) AS month,
                SUM(amount) AS total
            FROM transaction
            WHERE userId = ${user.id}
                AND type = 'EXPENSE'
                AND date >= ${startDate}
                AND accountId = ${accountId}
            GROUP BY year, month
            ORDER BY year, month
        `;

        // Format data for chart
        const data = [];
        for (let i = 0; i < 12; i++) {
            const date = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // 1-based month
            const monthLabel = date.toLocaleString('default', { month: 'short' });

            const expenseRecord = expenses.find(
                (e) => e.year === year && e.month === month
            );

            data.push({
                month: monthLabel,
                year,
                expenses: expenseRecord ? Number(expenseRecord.total) : 0,
                budget: Number(budgetAmount),
            });
        }

        return data;
    } catch (error) {
        console.error('Error fetching monthly budget expenses:', error);
        return [];
    }
}
