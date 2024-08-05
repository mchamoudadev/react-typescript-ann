### Day 3: Advanced TypeScript with React - Comprehensive Guide for Beginners

This step-by-step guide will help you understand how to use TypeScript with React by building a GitHub user search application. Each concept is introduced with a clear explanation and complete example, ensuring a thorough understanding of React with TypeScript basics, hooks, event handling, and working with an API.

### 1. Setting Up the Environment

**Objective:** Ensure everyone has a working environment with React and TypeScript using Vite.

1. **Install Node.js and npm:**
   - Download and install Node.js from [nodejs.org](https://nodejs.org/).

2. **Create a New React Project with TypeScript using Vite:**
   - Open terminal or command prompt.
   - Run:
     ```bash
     npm create vite@latest github-user-search -- --template react-ts
     cd github-user-search
     npm install
     npm run dev
     ```
   - Verify the app is running by opening the provided local server URL in a browser.

### 2. Understanding React with TypeScript

**Objective:** Learn the basics of integrating TypeScript with React and understand the benefits.

1. **React Component with TypeScript:**
   - Create a simple component to display user information.
   - **Example:**
     ```tsx
     interface UserProps {
       name: string;
       age: number;
     }

     function User({ name, age }: UserProps) {
       return <div>{name} is {age} years old.</div>;
     }

     export default User;
     ```

   - **Explanation:**
     - `interface UserProps`: Defines the shape of props the `User` component expects.
     - `function User({ name, age }: UserProps)`: Uses destructuring to extract `name` and `age` from props, ensuring they match the defined types.

### 3. Using Hooks with TypeScript

**Objective:** Learn how to use React hooks with TypeScript through practical examples.

1. **useState Hook:**
   - **Example:**
     ```tsx
     import React, { useState } from 'react';

     function Counter() {
       const [count, setCount] = useState<number>(0);

       function increment() {
         setCount(count + 1);
       }

       return (
         <div>
           <p>Count: {count}</p>
           <button onClick={increment}>Increment</button>
         </div>
       );
     }

     export default Counter;
     ```

   - **Explanation:**
     - `const [count, setCount] = useState<number>(0);`: Declares a state variable `count` with an initial value of `0` and its setter `setCount`. The type `<number>` ensures `count` will always be a number.
     - `function increment() { setCount(count + 1); }`: Increments the count value.

2. **useEffect Hook:**
   - **Example:**
     ```tsx
     import React, { useState, useEffect } from 'react';

     function Timer() {
       const [seconds, setSeconds] = useState<number>(0);

       useEffect(() => {
         const interval = setInterval(() => {
           setSeconds(prevSeconds => prevSeconds + 1);
         }, 1000);

         return () => clearInterval(interval);
       }, []);

       return <div>Seconds: {seconds}</div>;
     }

     export default Timer;
     ```

   - **Explanation:**
     - `useEffect(() => { ... }, []);`: Runs the effect once after the initial render. The effect sets up an interval that increments the `seconds` state every second and cleans up the interval on component unmount.

### 4. Handling Events in React with TypeScript

**Objective:** Learn how to handle different events in React with TypeScript.

1. **Handling Click Events:**
   - **Example:**
     ```tsx
     import React from 'react';

     function ClickHandler() {
       function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
         console.log('Button clicked', event.currentTarget);
       }

       return <button onClick={handleClick}>Click Me</button>;
     }

     export default ClickHandler;
     ```

   - **Explanation:**
     - `function handleClick(event: React.MouseEvent<HTMLButtonElement>)`: Ensures the event is correctly typed as a mouse event for a button element.

2. **Handling Input Events:**
   - **Example:**
     ```tsx
     import React, { useState } from 'react';

     function InputHandler() {
       const [text, setText] = useState<string>('');

       function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
         setText(event.target.value);
       }

       return <input type="text" value={text} onChange={handleChange} />;
     }

     export default InputHandler;
     ```

   - **Explanation:**
     - `function handleChange(event: React.ChangeEvent<HTMLInputElement>)`: Ensures the event is correctly typed as a change event for an input element.

### 5. Working with APIs using TypeScript

**Objective:** Learn how to fetch and display data from an API using TypeScript, using a search form to trigger the API call.

1. **Fetching Data from GitHub API:**
   - **Example:**
     ```tsx
     import React, { useState } from 'react';

     interface GitHubUser {
       login: string;
       avatar_url: string;
       html_url: string;
     }

     function GitHubUserSearch() {
       const [username, setUsername] = useState<string>('');
       const [user, setUser] = useState<GitHubUser | null>(null);

       function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
         setUsername(event.target.value);
       }

       function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
         event.preventDefault();
         fetch(`https://api.github.com/users/${username}`)
           .then(response => response.json())
           .then(data => setUser(data));
       }

       return (
         <div>
           <form onSubmit={handleSubmit}>
             <input type="text" value={username} onChange={handleChange} placeholder="Enter GitHub username" />
             <button type="submit">Search</button>
           </form>
           {user && (
             <div>
               <img src={user.avatar_url} alt={user.login} width={50} />
               <p>{user.login}</p>
               <a href={user.html_url} target="_blank" rel="noopener noreferrer">Profile</a>
             </div>
           )}
         </div>
       );
     }

     export default GitHubUserSearch;
     ```

   - **Explanation:**
     - `interface GitHubUser`: Defines the structure of the GitHub user data we expect.
     - `function GitHubUserSearch()`: Manages the state for the username and the fetched user data. Uses `handleSubmit` to fetch user data when the form is submitted.

### Complete GitHub User Search Application

**Final Code Example:**

```tsx
// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```tsx
// App.tsx
import React from 'react';
import './App.css';
import GitHubUserSearch from './GitHubUserSearch';

function App() {
  return (
    <div className="App">
      <h1>GitHub User Search</h1>
      <GitHubUserSearch />
    </div>
  );
}

export default App;
```

```tsx
// GitHubUserSearch.tsx
import React, { useState } from 'react';

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

function GitHubUserSearch() {
  const [username, setUsername] = useState<string>('');
  const [user, setUser] = useState<GitHubUser | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(data => setUser(data));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={handleChange} placeholder="Enter GitHub username" />
        <button type="submit">Search</button>
      </form>
      {user && (
        <div>
          <img src={user.avatar_url} alt={user.login} width={50} />
          <p>{user.login}</p>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">Profile</a>
        </div>
      )}
    </div>
  );
}

export default GitHubUserSearch;
```

