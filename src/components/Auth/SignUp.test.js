
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
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