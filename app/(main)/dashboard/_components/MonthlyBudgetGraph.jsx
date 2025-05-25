"use client";

import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getMonthlyBudgetExpenses } from "actions/dashboard-extra";

export function MonthlyBudgetGraph({ accountId }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getMonthlyBudgetExpenses(accountId);
                setData(result);
            } catch (error) {
                console.error("Failed to fetch monthly budget expenses:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [accountId]);

    if (loading) {
        return <p>Loading monthly budget graph...</p>;
    }

    if (!data || data.length === 0) {
        return <p>No data available for monthly budget graph.</p>;
    }

    return (
        <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                    <Bar dataKey="expenses" fill="#82ca9d" name="Expenses" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
