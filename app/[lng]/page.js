'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '../i18n/client';
import { Footer } from './components/Footer/client';

export default function Home({ params: { lng } }) {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('TASKS');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      const initialTodos = [
        { title: 'foo', checked: false },
        { title: 'bar', checked: false },
        { title: 'buzz', checked: true },
      ];
      setTodos(initialTodos);
      localStorage.setItem('TASKS', JSON.stringify(initialTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('TASKS', JSON.stringify(todos));
  }, [todos]);

  const { t } = useTranslation(lng, 'app');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue == '' || inputValue == null) return;
    setTodos([...todos, inputValue]);
    localStorage.setItem('TASKS', JSON.stringify(todos));
    setInputValue('');
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((ignored, todoIndex) => todoIndex !== index);
    setTodos(updatedTodos);
  };
  const handleCheckChange = () => {
    console.log('click');
  };
  return (
    <div>
      <h1>{t('title')}</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>+</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input type="checkbox" checked={todo.checked} onChange={handleCheckChange} />
            <span>{todo.title}</span>
            <button onClick={() => handleDeleteTodo(index)}>X</button>
          </li>
        ))}
      </ul>
      <br />
      <Link href={`/${lng}/client-page`}>{t('to-client-page')}</Link>
      <Footer lng={lng} />
    </div>
  );
}
