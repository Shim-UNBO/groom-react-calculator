import React,{useState} from "react";
import "./App.css";

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const[value, setValue] = useState("");
  const[price, setPrice] = useState("");

  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    cursor: "pointer",
    float:"right",
  };

  const getStyle =(completed) => {
    return {
      padding : "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    console.log("newTodoData",newTodoData);
    setTodoData(newTodoData);

  };
  const handleChange = (e) => {
    if (e.target.name === "value") {
      setValue(e.target.value);
    } else if (e.target.name === "price") {
      setPrice(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newTodo = {
      id: Date.now(),
      title: value,
      price: price,
      completed: false,
    };
    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
    setPrice("");
  };

  const handleCompleteChane =(id) =>{
    let newTodoData = todoData.map((data) => {
      if(data.id === id){
        data.completed =! data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
  };

  const calculateTotal = () => {
    return todoData.reduce((total, item) => {
      return total + parseFloat(item.price || 0);
    }, 0);
  };

  return (
    <div className="body">
      <div className="title"><h1>예산 계산기</h1></div>
      <div className="container">
          <form style={{ display: "flex" }} onSubmit={handleSubmit}>
            <div className="list">지출항목</div>
            <input
              type="text"
              name="value"
              style={{ flex: "10", padding: "5px" }}
              placeholder="예) 렌트비"
              value={value}
              onChange={handleChange}
            />
            <div className="price">비용</div>
            <input
              type="text"
              name="price"
              style={{ flex: "10", padding: "5px" }}
              placeholder="0"
              value={price}
              onChange={handleChange}
            />
            <input
              type="submit"
              value="입력"
              className="btn"
              style={{ flex: "1" }}
            />
          </form>
          <div className="todoBlock">
          {todoData.map((data) => (
            <div style={getStyle(data.completed)} key={data.id}>
              <input
                type="checkbox"
                defaultChecked={false}
                onChange={() => handleCompleteChane(data.id)}
              />
              {data.title} - {data.price}원
              <button
                style={btnStyle}
                onClick={() => handleClick(data.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className="total">
            <h3>총 지출: {calculateTotal()}원</h3>
          </div>
      </div>
    </div>
  );
}