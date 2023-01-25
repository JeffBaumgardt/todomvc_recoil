import React from 'react'

const Todo = ({editing, todo, onCancel, onDelete, onEdit, onSave, onToggle}) => {
    const [editValue, setEditValue] = React.useState(todo.title)

    const handleSubmit = () => {
        const text = editValue.trim()

        if (text) {
            onSave(text)
            setEditValue(text)
        } else {
            onDelete(todo.id)
        }
    }

    const handleChange = event => {
        setEditValue(event.target.value)
    }

    const handleEdit = () => {
        onEdit()
        setEditValue(todo.title)
    }

    const handleKeyDown = event => {
        if (event.key === 'Escape') {
            setEditValue(todo.title)
            onCancel()
            return
        } else if (event.key === 'Enter') {
            handleSubmit()
        }
    }

    let strikeOffStyle = todo.completed
        ? {color: 'gray', textDecoration: 'line-through'}
        : {color: 'black', textDecoration: 'none'}

    let status = todo.completed ? <div style={{color: 'green'}}>&#10003;</div> : ''

    if (!editing) {
        return (
            <div className="todo">
                <div className="completeTodo" onClick={() => onToggle(todo.id)}>
                    {status}
                </div>

                <span style={strikeOffStyle} className="todo-text" onDoubleClick={handleEdit}>
                    {todo.title}
                </span>
                <div className="edit-button" onClick={handleEdit}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                </div>
                <div className="delete-todo" onClick={() => onDelete(todo.id)}>
                    &#10005;
                </div>
                {editing && (
                    <input
                        className="edit"
                        aria-label={`Edit ${todo.title}`}
                        value={editValue}
                        onBlur={handleSubmit}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                )}
            </div>
        )
    } else {
        return (
            <div className="todo">
                <input
                    type="text"
                    onChange={handleChange}
                    value={editValue}
                    name="edit"
                    className="edit-input"
                    onKeyDown={handleKeyDown}
                    onBlur={handleEdit}
                    autoFocus
                />
            </div>
        )
    }
}
export default Todo
