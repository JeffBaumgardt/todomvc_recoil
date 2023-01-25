import React from 'react'
import {filterState, useClearCompleted, selectCount} from './todosState'
import {useRecoilState, useRecoilValue} from 'recoil'

export function pluralize(count, word) {
    return count === 1 ? word : `${word}s`
}

const Footer = () => {
    const {activeCount, completedCount} = useRecoilValue(selectCount)
    const [filter, setFilter] = useRecoilState(filterState)
    const clearCompleted = useClearCompleted()

    const activeTodoWord = pluralize(activeCount, 'item')

    const handleChangeFilter = filterType => {
        setFilter(filterType)
    }

    return (
        <footer className="Footer">
            <span className="todos-left">
                <strong>{activeCount}</strong> {activeTodoWord} left
            </span>
            <div className="nav-buttons">
                <button className={filter === 'all' ? 'active' : ''} onClick={() => handleChangeFilter('all')}>
                    All
                </button>
                <button className={filter === 'active' ? 'active' : ''} onClick={() => handleChangeFilter('active')}>
                    Active
                </button>
                <button
                    className={filter === 'completed' ? 'active' : ''}
                    onClick={() => handleChangeFilter('completed')}
                >
                    Completed
                </button>
            </div>
            {completedCount > 0 ? (
                <button type="button" className="clear-completed" onClick={() => clearCompleted()}>
                    Clear completed
                </button>
            ) : null}
        </footer>
    )
}

export default Footer
