import React from 'react'
import './App.css'
import Todos from './Todos'
import TodoAdder from './TodoAdder'
import Footer from './Footer'
import Links from './Links'

const App = () => {
    const [todos, setTodos] = React.useState([])
    const [counter, setCounter] = React.useState(1)
    const [filterBy, setFilterBy] = React.useState('All')
    const [completeAll, setCompleteAll] = React.useState(true)

    const chooseData = type => {
        setFilterBy(type)
    }

    const handleSubmit = newTodo => {
        if (newTodo.todo === '') return
        newTodo.id = counter
        let updatedTodos = [...todos, newTodo]
        setTodos(updatedTodos)
        setCounter(prev => prev + 1)
    }

    const deleteEntry = id => {
        let clone = [...todos]
        let deletedArr = clone.filter(todo => todo.id !== id)

        setTodos(deletedArr)
    }

    const completeTodo = id => {
        let newTodos = [...todos]
        let completedTodo = newTodos.find(el => {
            return el.id === id
        })
        completedTodo.completed = !completedTodo.completed
        setTodos(newTodos)
    }

    const handleEdit = (editedValue, id) => {
        let clone = [...todos]
        let editedTodo = clone.find(el => {
            return el.id === id
        })
        if (editedValue === '') {
            editedValue = editedTodo.todo
        }
        editedTodo.todo = editedValue

        setTodos(clone)
    }

    const toggleAll = () => {
        let clone = [...todos]
        let completeAllTodos = clone.map(el => {
            el.completed = completeAll
            return el
        })
        setTodos(completeAllTodos)
        setCompleteAll(!completeAll)
    }

    const clearCompleted = () => {
        let clone = [...todos]
        let incompleteTodos = clone.filter(todo => !todo.completed)

        setTodos(incompleteTodos)
    }

    return (
        <div className="App">
            <header className="App-header">todos</header>
            <TodoAdder handleSubmit={handleSubmit} toggleAll={toggleAll} todos={todos} />
            <Todos
                todos={todos}
                deleteEntry={deleteEntry}
                completeTodo={completeTodo}
                handleEdit={handleEdit}
                filter={filterBy}
                className="todos"
            />
            <Footer todos={todos} chooseData={chooseData} filter={filterBy} clearCompleted={clearCompleted} />
            <Links />
        </div>
    )
}

export default App
