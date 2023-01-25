import * as React from 'react'
import {atom, selector, useRecoilState} from 'recoil'

let id = 1

export const todoState = atom({
    key: 'todos',
    default: [],
})

export const filterState = atom({
    key: 'filter',
    default: 'all',
})

export const selectCount = selector({
    key: 'selectCount',
    get: ({get}) => {
        const todos = get(todoState)

        const activeCount = todos.reduce((acc, todo) => (todo.completed ? acc : acc + 1), 0)

        const completedCount = todos.length - activeCount

        return {activeCount, completedCount, allCount: todos.length}
    },
})

export const selectTodoList = selector({
    key: 'selectTodoList',
    get: ({get}) => {
        const todos = get(todoState)
        const filter = get(filterState)

        return todos.filter(todo => {
            switch (filter) {
                case 'active':
                    return !todo.completed
                case 'completed':
                    return todo.completed
                default:
                    return true
            }
        })
    },
})

export const useAddTodo = () => {
    const [todos, setTodos] = useRecoilState(todoState)

    const addTodo = React.useCallback(
        function addTodo(title) {
            const updatedList = [...todos, {id: id++, title, completed: false}]
            setTodos(updatedList)
        },
        [todos, setTodos],
    )

    return addTodo
}

export const useUpdateTodo = () => {
    const [todos, setTodos] = useRecoilState(todoState)

    const updateTodo = React.useCallback(
        function updateTodo(id, title) {
            const newTodos = todos.map(todo => {
                if (todo.id === id) {
                    return {...todo, title}
                }
                return todo
            })
            setTodos(newTodos)
        },
        [todos, setTodos],
    )

    return updateTodo
}

export const useToggleTodo = () => {
    const [todos, setTodos] = useRecoilState(todoState)

    const toggleTodo = React.useCallback(
        function toggleTodo(id) {
            const newTodos = todos.map(todo => {
                if (todo.id === id) {
                    return {...todo, completed: !todo.completed}
                }
                return todo
            })
            setTodos(newTodos)
        },
        [todos, setTodos],
    )

    return toggleTodo
}

export const useRemoveTodo = () => {
    const [todos, setTodos] = useRecoilState(todoState)

    const removeTodo = React.useCallback(
        function removeTodo(id) {
            const filteredList = todos.filter(todo => todo.id !== id)
            setTodos(filteredList)
        },
        [setTodos, todos],
    )

    return removeTodo
}

export const useToggleAll = () => {
    const [todos, setTodos] = useRecoilState(todoState)

    const toggleAll = React.useCallback(
        function toggleAll(completed) {
            const mappedTodos = todos.map(todo => {
                return (todo.completed = completed)
            })

            setTodos(mappedTodos)
        },
        [todos, setTodos],
    )

    return toggleAll
}

export const useClearCompleted = () => {
    const [todos, setTodos] = useRecoilState(todoState)

    const clearCompleted = React.useCallback(
        function clearCompleted() {
            const filteredList = todos.filter(todo => !todo.completed)
            setTodos(filteredList)
        },
        [todos, setTodos],
    )

    return clearCompleted
}
