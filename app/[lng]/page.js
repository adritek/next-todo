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

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((ignored, todoIndex) => todoIndex !== index);
    setTodos(updatedTodos);
  };

  // form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputValue === '' || inputValue === null) return;

    const updatedTodos = [...todos, { title: inputValue, checked: false }];
    setTodos(updatedTodos);
    setInputValue('');
  };

  const handleCheckboxChange = (index) => {
    const updated = todos.map((todo, todoIndex) => {
      if (index === todoIndex) {
        return {
          ...todo,
          checked: !todo.checked,
        };
      }
      return todo;
    });
    setTodos(updated);
  };

  return (
    <div>
      <h1>{t('title')}</h1>

      <form onSubmit={handleFormSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} placeholder={t('Add new todo')} />
        <button type="submit">+</button>
      </form>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input type="checkbox" checked={todo.checked} onChange={() => handleCheckboxChange(index)} />
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
