import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./Analytics.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6666"];

function Analytics() {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5000/api/analytics")
            .then(response => response.json())
            .then(data => {
                const totalExpenses = data.reduce((sum, item) => sum + item.value, 0);
                setData(data);
                setTotal(totalExpenses);
            })
            .catch(error => console.error("Error fetching analytics:", error));
    }, []);

    return (
        <div className="analytics-container">
            <h2>Expense Analytics</h2>
            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="category-info">
                {data.map((item, index) => {
                    const percentage = total > 0 ? ((item.value / total) * 100).toFixed(2) : 0;
                    return (
                        <div key={index} className="category-item">
                            <span
                                className="category-color"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></span>
                            <span>
                                {item.name}: ${item.value.toFixed(2)} ({percentage}%)
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Analytics;
