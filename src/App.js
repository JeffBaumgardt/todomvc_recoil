import React from 'react'
import {useRecoilValue} from 'recoil'
import { selectCount } from './todosState'
import './App.css'
import Todos from './Todos'
import TodoAdder from './TodoAdder'
import Footer from './Footer'
import Links from './Links'

const App = () => {
    const {activeCount, allCount, completedCount} = useRecoilValue(selectCount)

    const showTodoList = allCount > 0
    const showFooter = activeCount > 0 || completedCount > 0

    return (
        <div className="App">
            <header className="App-header">todos</header>
            <TodoAdder />
            {showTodoList ? <Todos /> : null}
            {showFooter ? <Footer /> : null}
            <Links />
        </div>
    )
}

export default App
