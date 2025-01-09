import React, { useState, useEffect } from 'react';
    import {  getCategories } from '../utils/supabaseClient';
    import { supabase } from '../utils/supabaseClient';
    
    function AddTransaction() {
      const [description, setDescription] = useState('');
      const [amount, setAmount] = useState('');
      const [type, setType] = useState('income');
      const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
      const [category, setCategory] = useState('');
      const [categories, setCategories] = useState([]);
    
      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const categoriesData = await getCategories();
            setCategories(categoriesData);
            if (categoriesData && categoriesData.length > 0) {
              setCategory(categoriesData[0].name);
            }
          } catch (err) {
            console.error('Unexpected error:', err);
          }
        };
    
        fetchCategories();
      }, []);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { error } = await supabase
            .from('transactions')
            .insert([
              {
                description,
                amount: parseFloat(amount),
                type,
                date: date,
                category: category,
              },
            ]);
    
          if (error) {
            console.error('Error adding transaction:', error);
            return;
          }
          setDescription('');
          setAmount('');
          setDate(new Date().toISOString().split('T')[0]);
          alert('Transaction added successfully!');
        } catch (err) {
          console.error('Unexpected error:', err);
        }
      };
    
      return (
        <div>
          <h2>Add Transaction</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Add Transaction</button>
          </form>
        </div>
      );
    }
    
    export default AddTransaction;
