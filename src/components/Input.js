import React, { useState } from 'react';
/* 
  【inputコンポーネント】
　・新しいTodoを作成するINPUTフィールドを作成するコンポーネント
　・Enterをクリックされたら入力された文字を使って新しいTodoを作成する
*/
function Input({ onAdd }) {
  const [input, setInput] = useState('');
  
  const handleEnter = (todo) => {
    setInput('');
    onAdd(todo);
  }

  return (
    <div className="panel-block">
      <input
        className="input"
        type="text"
        placeholder="ToDoを入力してください"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleEnter(e.target.value);
          }
        }}
      />
    </div>
  );
}

export default Input;
