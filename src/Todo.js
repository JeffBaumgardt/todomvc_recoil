import React from 'react'

const Todo = ({value, deleteEntry, completeTodo, id, handleEdit}) => {
    const [isEditing, setIsEditing] = React.useState(false)
    const [editValue, setEditValue] = React.useState(value.todo)

    const handleChange = event => {
        setEditValue(event.target.value)
    }

    const handleEditInternal = () => {
        handleEdit(editValue, id)
        setIsEditing(false)
    }

    const enterEntered = event => {
        if (event.key === 'Enter') {
            handleEditInternal()
        }
    }

    const handleDoubleClick = () => {
        setIsEditing(true)
    }

    let strikeOffStyle = value.completed
        ? {color: 'gray', textDecoration: 'line-through'}
        : {color: 'black', textDecoration: 'none'}

    let status = value.completed ? <div style={{color: 'green'}}>&#10003;</div> : ''

    if (!isEditing) {
        return (
            <div className="todo">
                <div className="completeTodo" onClick={() => completeTodo(id)}>
                    {status}
                </div>

                <span style={strikeOffStyle} className="todo-text" onDoubleClick={handleDoubleClick}>
                    {value.todo}
                </span>
                <div className="edit-button" onClick={handleDoubleClick}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                </div>
                <div className="delete-todo" onClick={() => deleteEntry(id)}>
                    &#10005;
                </div>
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
                    onKeyDown={enterEntered}
                    onBlur={handleEditInternal}
                    autoFocus
                />
            </div>
        )
    }
}
export default Todo
