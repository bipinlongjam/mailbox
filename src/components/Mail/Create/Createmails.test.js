import React from "react";
import {render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Createmail from "./Createmail";



test("renders SignIn text in the component", () => {
    const screen = render(
      <MemoryRouter>
        {" "}
        {/* Wrap your component with MemoryRouter */}
        <Createmail />
      </MemoryRouter>
    );
    
    const createMailElement = screen.getByText(/Compose Email/i);
    // Assert that the element is in the document
    expect(createMailElement).toBeInTheDocument();
  });
  test("allows user to input email", () => {
    render(
      <MemoryRouter>
        <Createmail />
      </MemoryRouter>
    );
  
    const emailInput = screen.getByLabelText('To');
    fireEvent.change(emailInput, { target: { value: 'to' } });
  
    expect(emailInput.value).toBe('to');
  });
  test("allows user to write subject", ()=>{
    render(
        <MemoryRouter>
            <Createmail/>
        </MemoryRouter>
    );
    const subjectInput = screen.getByLabelText('Subject');
    fireEvent.change(subjectInput, {target:{value:'subject'}});
    expect(subjectInput.value).toBe('subject');
  })

  jest.mock('react-draft-wysiwyg', () => ({
    Editor: ({ editorState, onEditorStateChange }) => (
      <textarea
        data-testid="email-editor" // Adding a data-testid for easier access in tests
        value={editorState}
        onChange={(event) => onEditorStateChange(event.target.value)}
      />
    ),
  }));
  test("allow user to write email contents", ()=>{
    render(
        <MemoryRouter>
            <Createmail/>
        </MemoryRouter>
    );
    const editor = screen.getByTestId("email-editor");

    // Simulate a change in the editor state
    fireEvent.change(editor, { target: { value: 'newEditorState' } });
  
    // Assert the expected behavior after the change
    expect(editor.value).toBe('newEditorState');
  })

  test('renders a Sent mail button', () => {
    render(
        <MemoryRouter>
            <Createmail/>
        </MemoryRouter>
    ); // Render your SignIn component
  
    // Use getByRole query to find a button element with the specified role
    const sendButton = screen.getByRole('button', { name: /Send Email/i });
    // Assert that the button is in the document
    expect(sendButton).toBeInTheDocument();
  });

//   global.fetch = jest.fn();

//   test('sends email successfully', async () => {
//     const { getByLabelText, getByText, getByTestId } = render(
//         <MemoryRouter>
//         <Createmail/>
//     </MemoryRouter>
//     );
  
//     // Simulate user input
//     fireEvent.change(getByLabelText('To'), { target: { value: 'test@example.com' } });
//     fireEvent.change(getByLabelText('Subject'), { target: { value: 'Test Subject' } });
//     fireEvent.change(getByTestId('email-editor'), { target: { value: 'Test Email Content' } });
  
//     // Simulate sending email
//     fireEvent.click(getByText('Send Email'));
  
//     // Wait for fetch API call to resolve
//     await waitFor(() => {
//         expect(fetch).toHaveBeenCalled();
//         expect(fetch.mock.calls[0][0]).toEqual('http://localhost:5000/sendmail');
//         expect(fetch.mock.calls[0][1]).toEqual(expect.objectContaining({
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }));
//       });
  
//     // Optionally, you can test other assertions after sending the email
//   });