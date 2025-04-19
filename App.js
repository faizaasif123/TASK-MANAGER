import React, { useState, useEffect } from 'react';

const quotes = [
  "Great job! Keep pushing!",
  "One step closer to your goals!",
  "You're unstoppable!",
  "Every task done is a win!",
  "You're on fire today! 🔥"
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [quote, setQuote] = useState("");
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("streak");
    return saved ? JSON.parse(saved) : { count: 0, lastCompleted: null };
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("streak", JSON.stringify(streak));
  }, [tasks, streak]);

  const addTask = () => {
    if (input.trim() === "") return;
    const newTask = { id: Date.now(), text: input, completed: false };
    setTasks([newTask, ...tasks]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    const completedTask = updatedTasks.find(t => t.id === id);
    if (!completedTask.completed) return; // Only trigger streak/quote when marking complete

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    const newCount = (streak.lastCompleted === yesterday)
      ? streak.count + 1
      : (streak.lastCompleted === today ? streak.count : 1);

    const newStreak = { count: newCount, lastCompleted: today };
    setStreak(newStreak);

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  };

  return (
    <div className="container">
      <h1>📝 Task Manager</h1>

      <div className="input-row">
        <input
          type="text"
          placeholder="Add a task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="streak">🔥 {streak.count}-day streak</div>

      {quote && <div className="quote">{quote}</div>}

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            {task.text}
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

/*
import React, { useState } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), ...task, completed: false }]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app">
      <h1><center>TASK MANAGER</center></h1>
      <TaskInput addTask={addTask} />
      <TaskList 
        tasks={tasks} 
        toggleTaskCompletion={toggleTaskCompletion} 
        deleteTask={deleteTask} 
      />
    </div>
  );
};

export default App;


import React, { useState } from 'react';
import ShoppingInput from './ShoppingInput';
import ShoppingItem from './ShoppingItem'; 
import ShoppingList from './ShoppingList'; // ✅ Case-sensitive

import './App.css';

const App = () => {
  const [items, setItems] = useState([]);

  const addItem = (name, category) => {
    const newItem = {
      id: Date.now(),
      name,
      category,
      purchased: false,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const markAsPurchased = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <h1>Shopping List</h1>
      <ShoppingInput addItem={addItem} />
      <ShoppingList
        items={items}
        markAsPurchased={markAsPurchased}
        removeItem={removeItem}
      />
    </div>
  );
};

export default App;
*/