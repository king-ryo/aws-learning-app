import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Spring BootのAPIエンドポイントを呼び出す
    fetch('http://localhost:8080/api/messages')
      .then((res) => {
        if (!res.ok) throw new Error('ネットワークエラーが発生しました');
        return res.json();
      })
      .then((data) => setMessages(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="App">
      <h1>React + Spring Boot + MySQL</h1>
      <h2>メッセージリスト</h2>
      {error && <p style={{ color: 'red' }}>エラー: {error}</p>}
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>{msg.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default App