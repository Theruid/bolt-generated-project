import React, { useState, useEffect } from 'react';
    import { getCategories, addCategory, deleteCategory } from '../utils/supabaseClient';
    
    function Categories() {
      const [categories, setCategories] = useState([]);
      const [newCategory, setNewCategory] = useState('');
    
      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const categoriesData = await getCategories();
            setCategories(categoriesData);
          } catch (err) {
            console.error('Unexpected error:', err);
          }
        };
    
        fetchCategories();
      }, []);
    
      const handleAddCategory = async () => {
        if (newCategory.trim() !== '') {
          try {
            await addCategory({ name: newCategory });
            setNewCategory('');
            const updatedCategories = await getCategories();
            setCategories(updatedCategories);
          } catch (err) {
            console.error('Unexpected error:', err);
          }
        }
      };
    
      const handleDeleteCategory = async (id) => {
        try {
          await deleteCategory(id);
          const updatedCategories = await getCategories();
          setCategories(updatedCategories);
        } catch (err) {
          console.error('Unexpected error:', err);
        }
      };
    
      return (
        <div>
          <h2>Categories</h2>
          <ul className="category-list">
            {categories.map((category) => (
              <li key={category.id}>
                <span>{category.name}</span>
                <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <div className="category-input-container">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category"
            />
            <button onClick={handleAddCategory}>Add Category</button>
          </div>
        </div>
      );
    }
    
    export default Categories;
