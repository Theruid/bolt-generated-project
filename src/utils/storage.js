import localforage from 'localforage';
    
    const TRANSACTION_KEY = 'transactions';
    const CATEGORY_KEY = 'categories';
    
    export const getTransactions = async () => {
      try {
        const transactions = await localforage.getItem(TRANSACTION_KEY);
        return transactions ? transactions : [];
      } catch (error) {
        console.error('Error getting transactions:', error);
        return [];
      }
    };
    
    export const addTransaction = async (transaction) => {
      try {
        const transactions = await getTransactions();
        transactions.push(transaction);
        await localforage.setItem(TRANSACTION_KEY, transactions);
      } catch (error) {
        console.error('Error adding transaction:', error);
      }
    };
    
    export const deleteTransaction = async (index) => {
      try {
        const transactions = await getTransactions();
        transactions.splice(index, 1);
        await localforage.setItem(TRANSACTION_KEY, transactions);
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    };
    
    export const updateTransaction = async (index, updatedTransaction) => {
      try {
        const transactions = await getTransactions();
        transactions[index] = updatedTransaction;
        await localforage.setItem(TRANSACTION_KEY, transactions);
      } catch (error) {
        console.error('Error updating transaction:', error);
      }
    };
    
    export const getCategories = async () => {
      try {
        const categories = await localforage.getItem(CATEGORY_KEY);
        return categories ? categories : [];
      } catch (error) {
        console.error('Error getting categories:', error);
        return [];
      }
    };
    
    export const addCategory = async (category) => {
      try {
        const categories = await getCategories();
        categories.push(category);
        await localforage.setItem(CATEGORY_KEY, categories);
      } catch (error) {
        console.error('Error adding category:', error);
      }
    };
    
    export const deleteCategory = async (index) => {
      try {
        const categories = await getCategories();
        categories.splice(index, 1);
        await localforage.setItem(CATEGORY_KEY, categories);
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    };
    
    export const updateCategory = async (index, updatedCategory) => {
      try {
        const categories = await getCategories();
        categories[index] = updatedCategory;
        await localforage.setItem(CATEGORY_KEY, categories);
      } catch (error) {
        console.error('Error updating category:', error);
      }
    };
