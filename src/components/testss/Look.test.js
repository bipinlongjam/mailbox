import {render, screen} from '@testing-library/react'
import {Look} from './Look'

test('Look render properly', () =>{
    render(<Look/>)
    const textElement = screen.getByText(/Looking/)
    expect(textElement).toBeInTheDocument()
})