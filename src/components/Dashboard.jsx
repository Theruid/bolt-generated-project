import React, { useState, useEffect } from 'react';
    import {  startOfMonth, endOfMonth } from 'date-fns';
    import { Bar } from 'react-chartjs-2';
    import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
    import { supabase } from '../utils/supabaseClient';
    
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    
    function Dashboard() {
      const [monthlyIncome, setMonthlyIncome] = useState(0);
      const [monthlyExpenses, setMonthlyExpenses] = useState(0);
      const [monthlyNetBalance, setMonthlyNetBalance] = useState(0);
      const [categoryData, setCategoryData] = useState({ labels: [], datasets: [] });
    
      useEffect(() => {
        const fetchTransactions = async () => {
          const now = new Date();
          const firstDayOfMonth = startOfMonth(now);
          const lastDayOfMonth = endOfMonth(now);
    
          try {
            const { data, error } = await supabase
              .from('transactions')
              .select('*')
              .gte('date', firstDayOfMonth.toISOString())
              .lte('date', lastDayOfMonth.toISOString());
    
            if (error) {
              console.error('Error fetching transactions:', error);
              return;
            }
    
            let totalIncome = 0;
            let totalExpenses = 0;
            const categoryTotals = {};
    
            data.forEach(transaction => {
              if (transaction.type === 'income') {
                totalIncome += parseFloat(transaction.amount);
              } else {
                totalExpenses += parseFloat(transaction.amount);
              }
    
              if (categoryTotals[transaction.category]) {
                categoryTotals[transaction.category] += parseFloat(transaction.amount);
              } else {
                categoryTotals[transaction.category] = parseFloat(transaction.amount);
              }
            });
    
            setMonthlyIncome(totalIncome);
            setMonthlyExpenses(totalExpenses);
            setMonthlyNetBalance(totalIncome - totalExpenses);
    
            const labels = Object.keys(categoryTotals);
            const values = Object.values(categoryTotals);
            const backgroundColor = labels.map(() => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`);
    
            setCategoryData({
              labels: labels,
              datasets: [
                {
                  label: 'Category Spending',
                  data: values,
                  backgroundColor: backgroundColor,
                },
              ],
            });
          } catch (err) {
            console.error('Unexpected error:', err);
          }
        };
    
        fetchTransactions();
      }, []);
    
      const chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Spending by Category',
          },
        },
      };
    
      return (
        <div className="dashboard">
          <div className="dashboard-item">
            <h3>Monthly Income</h3>
            <p>${monthlyIncome.toFixed(2)}</p>
          </div>
          <div className="dashboard-item expense">
            <h3>Monthly Expenses</h3>
            <p>${monthlyExpenses.toFixed(2)}</p>
          </div>
          <div className="dashboard-item">
            <h3>Monthly Net Balance</h3>
            <p>${monthlyNetBalance.toFixed(2)}</p>
          </div>
          <div className="chart-container">
            <Bar data={categoryData} options={chartOptions} />
          </div>
        </div>
      );
    }
    
    export default Dashboard;
