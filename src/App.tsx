import React, { useState } from "react"


interface GithubUser {
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
}


function App() {


  const [userName, setUserName] = useState<string>("");
  const [user, setUser] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    // fetch(`https://api.github.com/users/${userName}`)
    //   .then(response => response.json())
    //   .then(data => setUser(data))


    try {
      setLoading(true);
      const response = await fetch(`https://api.github.com/users/${userName}`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }

  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username"
          value={userName}
          onChange={handleChange}
        />
        <button>Search</button>

      </form>

      {
        user && (
          <div>
            <h1>{user.name}</h1>
            <p>{user.bio}</p>
            <img src={user.avatar_url} alt="" />
          </div>
        )
      }
    </div>
  )
}

export default App
