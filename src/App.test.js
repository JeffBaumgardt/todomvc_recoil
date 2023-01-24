import React from 'react'
import {render} from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
    const {getByPlaceholderText} = render(<App />)
    const linkElement = getByPlaceholderText(/What needs to be done?/i)
    expect(linkElement).toBeInTheDocument()
})
