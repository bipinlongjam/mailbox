import React from "react";
import {render, screen, fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import SignIn from "./SignIn";


test("renders SignIn text in the component", () => {
    const screen = render(
      <MemoryRouter>
        {" "}
        {/* Wrap your component with MemoryRouter */}
        <SignIn />
      </MemoryRouter>
    );
    
    const signIpElement = screen.getByText(/SignIn/i);
    // Assert that the element is in the document
    expect(signIpElement).toBeInTheDocument();
  });
  test("allows user to input email", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
  
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  
    expect(emailInput.value).toBe('test@example.com');
  });
  test("allow user to input password",() =>{
    render(
        <MemoryRouter>
            <SignIn/>
        </MemoryRouter>
    )
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, {target:{value:'password'}});
    expect(passwordInput.value).toBe("password")
  })
  test('renders a Sign In button', () => {
    render(
        <MemoryRouter>
        <SignIn/>
    </MemoryRouter>
    ); // Render your SignIn component
  
    // Use getByRole query to find a button element with the specified role
    const signInButton = screen.getByRole('button', { name: /Sign In/i });
  
    // Assert that the button is in the document
    expect(signInButton).toBeInTheDocument();
  });

  test('handles sign in correctly', async () => {
    // Mock fetch API
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: 'ok', data: 'token' }),
    });
  
    const { getByLabelText, getByText } = render(
        <MemoryRouter>
        <SignIn/>
      </MemoryRouter>
    ); // Render your SignIn component
  
    // Simulate user input
    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
  
    // Simulate form submission
    fireEvent.click(getByText('Sign In'));
  
    // Wait for the fetch API call to resolve
    await new Promise(resolve => setTimeout(resolve, 0));
  
    // Assert that the token is stored in local storage
    expect(window.localStorage.getItem('token')).toEqual('token');
  });