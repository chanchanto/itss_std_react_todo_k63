import React, { useState } from 'react';

/* 
  【Todoのデータ構成】
　・key：Todoを特定するID（String）
　・text：Todoの内容（String）
　・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useStorage from '../hooks/storage';

/* ライブラリ */
import {getKey} from "../lib/util";

function Todo() {
  const [items, putItems, clearItems] = useStorage();
  const [filter, setFilter] = useState('ALL');

  const displayedItems = items.filter(item => {
    if (filter === 'ALL') {
      return true;
    } else if (filter === 'NOT_DONE') {
      return !item.done;
    } else { // DONE
      return item.done;
    }
  });

  const handleFilterChange = (value) => {
    setFilter(value);
  }
   
  const handleCheck = (checkedKey) => {
    const newItems = items.map(item => {
      if (item.key === checkedKey) {
        item.done = !item.done;
      }
      return item;
    });
    putItems(newItems);
  };

  const handleAdd = (todo) => {
    putItems([...items, { key: getKey(), text: todo, done: false }]);
  };

  return (
    <div className="panel">
      <div className="panel-heading">
        ITSS ToDoアプリ
      </div>
      <Input
        onAdd={handleAdd}
      />
      <Filter
        value={filter}
        handleFilterChange={handleFilterChange}
      />
      {displayedItems.map(item => (
        <TodoItem
          key={item.key}
          item={item}
          onCheck={() => handleCheck(item.key)}
        />
      ))}
      <div className="panel-block">
        {displayedItems.length} items
      </div>
      <button
        className="button is-white is-fullwidth"
        onClick={clearItems}
      >全てのToDoを削除</button>
    </div>
  );
}

export default Todo;