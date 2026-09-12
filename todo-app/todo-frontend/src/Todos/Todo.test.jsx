import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import '@testing-library/jest-dom'
import Todo from './Todo'

describe('Todo', () => {
  test('renders the todo text', () => {
    const todo = { _id: '1', text: 'Write code', done: false }
    render(<Todo todo={todo} onDelete={vi.fn()} onComplete={vi.fn()} />)

    expect(screen.getByText('Write code')).toBeInTheDocument()
  })

  test('shows "not done" status and a complete button when todo is not done', () => {
    const todo = { _id: '1', text: 'Write code', done: false }
    render(<Todo todo={todo} onDelete={vi.fn()} onComplete={vi.fn()} />)

    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
    expect(screen.getByText('Set as done')).toBeInTheDocument()
  })

  test('shows "done" status and no complete button when todo is done', () => {
    const todo = { _id: '1', text: 'Write code', done: true }
    render(<Todo todo={todo} onDelete={vi.fn()} onComplete={vi.fn()} />)

    expect(screen.getByText('This todo is done')).toBeInTheDocument()
    expect(screen.queryByText('Set as done')).not.toBeInTheDocument()
  })
})
