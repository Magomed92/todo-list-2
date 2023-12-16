import "./App.css";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { randomColor } from "randomcolor";
import Draggable from "react-draggable";

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")) || []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const newItem = () => {
    if (item.trim() !== "") {
      const newItem = {
        id: uuidv4(),
        item,
        color: randomColor({
          luminosity: "light",
        }),
        defaultPos: {
          x: -400,
          y: -80,
        },
      };
      setItems((items) => [...items, newItem]);
      setItem("");
    } else {
      // alert("Ведите задачу!!");
      setItem("");
    }
  };

  const deleteNode = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updatePos = (data, index) => {
    let newArray = [...items];
    newArray[index].defaultPos = { x: data.x, y: data.y };
    setItems(newArray);
  };
  return (
    <div className="App">
      <div className="wrapper">
        <input
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              newItem();
            }
          }}
          value={item}
          className="input"
          type="text"
          placeholder="Введите задачу..."
          onChange={(e) => setItem(e.target.value)}
        />
        <button className="enter" onClick={newItem}>
          ENTER
        </button>
        <div>
          {items.map((item, index) => {
            return (
              <Draggable
                onStop={(data) => {
                  updatePos(data, index);
                }}
                key={index}
                defaultPosition={item.defaultPos}
              >
                <div className="todo__item" style={{ backgroundColor: item.color }}>
                  {`${item.item}`}
                  <button onClick={() => deleteNode(item.id)} className="delete">
                    x
                  </button>
                </div>
              </Draggable>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
