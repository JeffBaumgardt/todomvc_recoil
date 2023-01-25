import React from 'react'
import { useAddTodo } from './todosState'
import './App.css'

const TodoAdder = () => {
    const [todo, setTodo] = React.useState('')
    const addTodo = useAddTodo()

    const handleChange = e => {
        setTodo(e.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key !== 'Enter') return

        const title = todo.trim()

        if (title) {
            addTodo(title)
            setTodo('')
        }

        event.preventDefault()
    }

    return (
        <form className="input">
            <input
                type="text"
                className="new-todo"
                autoComplete="off"
                name="todo"
                onChange={handleChange}
                value={todo}
                onKeyDown={handleKeyDown}
                style={{background: 'white'}}
                placeholder="What needs to be done?"
            />
        </form>
    )
}
export default TodoAdder
