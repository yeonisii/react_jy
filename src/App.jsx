import { useState } from "react";
import "./App.css";
import { Reset } from "styled-reset";

function App() {
  const App = () => <Reset />;

  // useState를 이용해서 todo 상태를 정의
  const [todos, setTodos] = useState([]);
  const [inputTitle, setinputTitle] = useState("");
  const [inputContent, setinputContent] = useState("");

  // todo 추가
  const handleAddTodo = () => {
    if (inputTitle.trim() !== "" && inputContent.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        title: inputTitle,
        content: inputContent,
        isDone: false,
      };

      setTodos([newTodo, ...todos]);
      setinputTitle("");
      setinputContent("");
    }
  };

  // todo 삭제
  const handleRemoveTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // todo 완료
  const handleCompleteTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isDone: true } : todo))
    );
  };

  console.log(handleCompleteTodo);
  // todo 삭제 취소
  const handleUndoTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isDone: false } : todo))
    );
  };

  // 완료된 todo와 완료되지 않은 todo를 구분
  const activeTodos = todos.filter((todo) => !todo.isDone);
  const completeTodos = todos.filter((todo) => todo.isDone);

  return (
    <>
      <div className="container">
        <header>
          <h1>MY TO-DO LIST</h1>
        </header>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTodo();
          }}
        >
          <input
            className="title"
            type="text"
            placeholder="제목"
            value={inputTitle}
            onChange={(e) => setinputTitle(e.target.value)}
          />
          <input
            className="contents"
            type="text"
            placeholder="내용"
            value={inputContent}
            onChange={(e) => setinputContent(e.target.value)}
          />
          <button className="sub" type="submit">
            제출
          </button>
        </form>
        <h2>Working ✨</h2>
        <ul>
          {activeTodos.map((todo) => (
            <li key={todo.id}>
              <div>
                <h3 className="todotitle">{todo.title}</h3>
                <p className="todocont">{todo.content}</p>
                <button
                  className="del"
                  onClick={() => handleRemoveTodo(todo.id)}
                >
                  삭제
                </button>
                <button
                  className="comp"
                  onClick={() => handleCompleteTodo(todo.id)}
                >
                  완료
                </button>
              </div>
            </li>
          ))}
        </ul>
        <h2 className="done">{activeTodos.length > 0 ? "Done" : "Done"} 🎀</h2>
        <ul>
          {completeTodos.map((todo) => (
            <li key={todo.id}>
              <div>
                <h3 className="todotitle">{todo.title}</h3>
                <p className="todocont">{todo.content}</p>
                <button
                  className="del"
                  onClick={() => handleRemoveTodo(todo.id)}
                >
                  삭제
                </button>
                <button className="can" onClick={() => handleUndoTodo(todo.id)}>
                  취소
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
