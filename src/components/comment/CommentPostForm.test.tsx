import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { UserContextProvider } from '../../context/UserContext'
import CommentPostForm from './CommentPostForm'
import { QueryClient, QueryClientProvider } from 'react-query'
import userEvent from '@testing-library/user-event'
 
const queryClient = new QueryClient()
test('<CommentPostForm renders the button and form input works correctly', async() => {
  const handleClose = jest.fn()

  render(
    <QueryClientProvider client={queryClient}>
        <UserContextProvider><CommentPostForm handleClose={handleClose}/></UserContextProvider>
    </QueryClientProvider>
  )
  const user = userEvent.setup()
  const inputField = screen.getByLabelText("What do you think?")
  await user.type(inputField,"MY OPINION")
  const element = screen.getByText('Comment')
  expect(element).toBeDefined()
  expect((inputField as HTMLInputElement).value).toBe("MY OPINION")
})
test('<CommentPostForm calls the handleClose on button press', async() => {
  const handleClose = jest.fn()

  render(
    <QueryClientProvider client={queryClient}>
        <UserContextProvider><CommentPostForm handleClose={handleClose}/></UserContextProvider>
    </QueryClientProvider>
  )
  const user = userEvent.setup()
  const inputField = screen.getByLabelText("What do you think?")
  await user.type(inputField,"MY OPINION")
  const element = screen.getByText('Comment')

  await user.click(element)
  expect(handleClose).toHaveBeenCalled()
})

