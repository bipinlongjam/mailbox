
import React from "react";
import { render, fireEvent, screen, waitFor  } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter


import SignUp from "./SignUp";

test("renders SignUp text in the component", () => {
  const screen = render(
    <MemoryRouter>
      {" "}
      {/* Wrap your component with MemoryRouter */}
      <SignUp />
    </MemoryRouter>
  );
  // Use getByText query to find an element with the specified text
  const signUpElement = screen.getByText(/SignUp/i);
  // Assert that the element is in the document
  expect(signUpElement).toBeInTheDocument();
});
test("allows user to input email", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
  
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  
    expect(emailInput.value).toBe('test@example.com');
  });
  test("allow user to input password",() =>{
    render(
        <MemoryRouter>
            <SignUp/>
        </MemoryRouter>
    )
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, {target:{value:'password'}});
    expect(passwordInput.value).toBe("password")
  })
  test("allow user to confirm password", ()=>{
    render(
        <MemoryRouter>
            <SignUp/>
        </MemoryRouter>
    )
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    fireEvent.change(confirmPasswordInput, {target:{value:'password'}});
    expect(confirmPasswordInput.value).toBe('password');
  })

  test('renders a Sign In button', () => {
    render(
        <MemoryRouter>
        <SignUp/>
    </MemoryRouter>
    ); // Render your SignIn component
  
    // Use getByRole query to find a button element with the specified role
    const signInButton = screen.getByRole('button', { name: /Sign Up/i });
  
    // Assert that the button is in the document
    expect(signInButton).toBeInTheDocument();
  });

//   jest.mock('your-routing-library', () => ({
//     navigate: jest.fn(),
//   }));

//   test('handles sign up correctly', async () => {
//     // Mock fetch API
//     global.fetch = jest.fn().mockResolvedValueOnce({
//       ok: true,
//       json: () => Promise.resolve({ status: 'ok' }),
//     });
  
//     const { getByLabelText, getByText } = render(
//         <MemoryRouter>
//         <SignUp/>
//     </MemoryRouter>
//     ); // Render your SignUp component
  
//     // Simulate user input
//     fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
//     fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
//     fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password123' } });
  
//     // Simulate form submission
//     fireEvent.click(getByText('Sign Up'));
  
//     // Wait for the fetch API call to resolve
//     await new Promise(resolve => setTimeout(resolve, 0));
  
//     // Assert navigation to the login page
//     expect(navigate).toHaveBeenCalledWith('/login');
//   });