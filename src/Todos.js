import React from 'react'
import Todo from './Todo'

const Todos = ({todos, deleteEntry, completeTodo, handleEdit, filter}) => {
    const filterData = type => {
        let chosenData
        switch (type) {
            case 'Active':
                chosenData = todos.filter(todo => !todo.completed)
                break
            case 'Completed':
                chosenData = todos.filter(todo => todo.completed)
                break
            case 'All':
            default:
                chosenData = todos
                break
        }
        return chosenData
    }

    return (
        <div className="todoDisplay">
            {filterData(filter).map(todo => (
                <Todo
                    key={todo.id}
                    value={todo}
                    deleteEntry={deleteEntry}
                    completeTodo={completeTodo}
                    id={todo.id}
                    handleEdit={handleEdit}
                />
            ))}
        </div>
    )
}

export default Todos
