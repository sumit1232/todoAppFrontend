import { useEffect, useState } from "react";
import axios from "axios";
import Todo from "./components/Todo";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://todoappbackend-x01h.onrender.com/api/todos")
      .then((response) => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <div className="center">
        <Todo />
    </div>
    </>
  );
};

export default App;
