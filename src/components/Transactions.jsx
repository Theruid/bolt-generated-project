import React, { useState, useEffect } from 'react';
    import { format } from 'date-fns';
    import { supabase } from '../utils/supabaseClient';
    
    function Transactions() {
      const [transactions, setTransactions] = useState([]);
      const [editTransaction, setEditTransaction] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
    
      useEffect(() => {
        const fetchTransactions = async () => {
          try {
            const { data, error } = await supabase
              .from('transactions')
              .select('*');
    
            if (error) {
              console.error('Error fetching transactions:', error);
              return;
            }
            setTransactions(data);
          } catch (err) {
            console.error('Unexpected error:', err);
          }
        };
    
        fetchTransactions();
      }, []);
    
      const handleDelete = async (id) => {
        try {
          const { error } = await supabase
            .from('transactions')
            .delete()
            .eq('id', id);
    
          if (error) {
            console.error('Error deleting transaction:', error);
            return;
          }
          const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
          setTransactions(updatedTransactions);
        } catch (err) {
          console.error('Unexpected error:', err);
        }
      };
    
      const handleEdit = (transaction) => {
        setEditTransaction(transaction);
        setIsModalOpen(true);
      };
    
      const handleUpdateTransaction = async (updatedTransaction) => {
        try {
          const { error } = await supabase
            .from('transactions')
            .update(updatedTransaction)
            .eq('id', updatedTransaction.id);
    
          if (error) {
            console.error('Error updating transaction:', error);
            return;
          }
          const updatedTransactions = transactions.map(transaction =>
            transaction.id === updatedTransaction.id ? updatedTransaction : transaction
          );
          setTransactions(updatedTransactions);
          setIsModalOpen(false);
        } catch (err) {
          console.error('Unexpected error:', err);
        }
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    
      return (
        <div>
          <h2>Transactions</h2>
          <ul className="transaction-list">
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <span>{transaction.description}</span>
                <span>${transaction.amount}</span>
                <span>{transaction.type}</span>
                <span>{format(new Date(transaction.date), 'yyyy-MM-dd')}</span>
                <span>{transaction.category}</span>
                <div>
                  <button onClick={() => handleEdit(transaction)}>Edit</button>
                  <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
          {isModalOpen && (
            <EditTransactionModal
              isOpen={isModalOpen}
              transaction={editTransaction}
              onUpdate={handleUpdateTransaction}
              onClose={closeModal}
            />
          )}
        </div>
      );
    }
    
    export default Transactions;
