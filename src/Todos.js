import React from 'react'
import Todo from './Todo'
import {selectTodoList, useUpdateTodo, useRemoveTodo, useToggleTodo} from './todosState'
import {useRecoilValue} from 'recoil'

const Todos = () => {
    const [editing, setEditing] = React.useState(null)
    const todos = useRecoilValue(selectTodoList)
    const updateTodo = useUpdateTodo()
    const removeTodo = useRemoveTodo()
    const toggleTodo = useToggleTodo()

    const handleEdit = todo => {
        return () => setEditing(todo.id)
    }

    const handleCancel = () => {
        setEditing(null)
    }

    const handleSave = todo => {
        return title => {
            updateTodo({id: todo.id, title})
            setEditing(null)
        }
    }

    return (
        <div className="todoDisplay">
            {todos.map(todo => (
                <Todo
                    key={todo.id}
                    editing={editing === todo.id}
                    todo={todo}
                    onCancel={handleCancel}
                    onDelete={todoId => removeTodo(todoId)}
                    onEdit={handleEdit(todo)}
                    onSave={handleSave(todo)}
                    onToggle={todoId => toggleTodo(todoId)}
                />
            ))}
        </div>
    )
}

export default Todos
