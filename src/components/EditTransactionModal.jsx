import React, { useState, useEffect } from 'react';
    import { getCategories } from '../utils/supabaseClient';
    import { supabase } from '../utils/supabaseClient';
    
    function EditTransactionModal({ isOpen, transaction, onUpdate, onClose }) {
      const [description, setDescription] = useState('');
      const [amount, setAmount] = useState('');
      const [type, setType] = useState('income');
      const [date, setDate] = useState('');
      const [category, setCategory] = useState('');
      const [categories, setCategories] = useState([]);
    
      useEffect(() => {
        if (transaction) {
          setDescription(transaction.description);
          setAmount(transaction.amount);
          setType(transaction.type);
          setDate(transaction.date);
          setCategory(transaction.category);
        }
    
        const fetchCategories = async () => {
          try {
            const categoriesData = await getCategories();
            setCategories(categoriesData);
          } catch (err) {
            console.error('Unexpected error:', err);
          }
        };
    
        fetchCategories();
      }, [transaction]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const updatedTransaction = {
            ...transaction,
            description,
            amount: parseFloat(amount),
            type,
            date,
            category,
          };
          await onUpdate(updatedTransaction);
        } catch (err) {
          console.error('Unexpected error:', err);
        }
      };
    
      if (!isOpen) return null;
    
      return (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Transaction</h2>
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
                  value={date ? date.split('T')[0] : ''}
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
              <button type="submit">Update</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </form>
          </div>
        </div>
      );
    }
    
    export default EditTransactionModal;
