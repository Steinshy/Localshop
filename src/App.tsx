import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const URL = "https://dummyjson.com/products";

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      setData(response.data.products);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  
  return (
    <div>
      <h1>Display API data from Dummy API</h1>
      <tbody>
        {data.map((item, i) => (
          <tr key={i}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.price}</td>
            <td>{item.category}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

export default App;
