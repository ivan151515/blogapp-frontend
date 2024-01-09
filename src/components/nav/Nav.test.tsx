import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import Nav from "./Nav"
import userEvent from '@testing-library/user-event'

import { UserContextProvider } from '../../context/UserContext'
import { BrowserRouter } from 'react-router-dom'
test('nav renders content', () => {
  

  render(
  <UserContextProvider><BrowserRouter><Nav /></BrowserRouter></UserContextProvider>)

  const element = screen.getByText('HOME')
  expect(element).toBeDefined()
})

test("clicking button opens menu", async() =>{
  render(
    <UserContextProvider><BrowserRouter><Nav /></BrowserRouter></UserContextProvider>)

    const user = userEvent.setup()


    const [button] = screen.getAllByTestId("nav-menu")
    const beforeClick = screen.getByText("Log In")
    expect(beforeClick).toHaveStyle({visibility: "hidden"})

    await user.click(button)
    const element = screen.getByText("Log In")
    expect(element).not.toHaveStyle({visibility: "hidden"})
})