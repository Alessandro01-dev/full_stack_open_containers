import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos
        .map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            onDelete={() => deleteTodo(todo)}
            onComplete={() => completeTodo(todo)}
          />
        ))
        .reduce((acc, cur) => [...acc, <hr key={`hr-${cur.key}`} />, cur], [])}
    </>
  )
}

export default TodoList
