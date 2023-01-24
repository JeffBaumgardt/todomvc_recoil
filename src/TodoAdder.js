import React from 'react'
import './App.css'

const TodoAdder = ({handleSubmit, toggleAll, todos}) => {
    const [todo, setTodo] = React.useState('')

    const handleChange = e => {
        setTodo(e.target.value)
    }

    const handleSubmitAndClear = () => {
        handleSubmit({todo})

        setTodo('')
    }

    const enteredEnter = event => {
        if (event.keyCode === 13) {
            event.preventDefault()
            handleSubmitAndClear()
        }
    }

    const toggleAllClass = todos.length > 0 ? 'toggle-all-button' : 'toggle-all-hide'

    return (
        <form className="input">
            <label className={toggleAllClass} onClick={toggleAll} style={{background: 'white'}}>
                &#10003;
            </label>

            <input
                type="text"
                className="new-todo"
                autoComplete="off"
                name="todo"
                onChange={handleChange}
                value={todo}
                onKeyDown={enteredEnter}
                style={{background: 'white'}}
                placeholder="What needs to be done?"
            />
        </form>
    )
}
export default TodoAdder
