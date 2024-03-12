import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Inbox from "./Inbox";
import configureStore from "redux-mock-store";



const mockStore = configureStore([]);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => jest.fn()),
  useSelector: jest.fn(),
}));

test("renders Inbox Messages text in the component", () => {
    const screen = render(
      <MemoryRouter>
        <Inbox />
      </MemoryRouter>
    );
    const inboxElement = screen.getByText(/Inbox Messages/i);
    // Assert that the element is in the document
    expect(inboxElement).toBeInTheDocument();
  });
  

  // describe('Inbox Component', () => {
  //   let store;

  //   beforeEach(()=>{
  //     store = mockStore({
  //       messages: [],
  //       loading: false,
  //       error: null,
  //     })
  //   })
  //   it('renders inbox with fetched messages', async () => {
  //     // Mock the fetch API to return some sample data
  //     //jest.spyOn(global, 'fetch').mockResolvedValueOnce({
  //       global.fetch = jest.fn().mockResolvedValueOnce({
  //       ok: true,
  //       json: () => Promise.resolve([
  //         { _id: 1, From: 'user@example.com', subject: 'Test Subject 1', content: 'Test Content 1', sentAt: new Date() },
  //         { _id: 2, From: 'user@example.com', subject: 'Test Subject 2', content: 'Test Content 2', sentAt: new Date() },
  //       ]),
  //     });

  //     useSelector.mockReturnValue({
  //       messages: [
  //         { _id: 1, From: 'user@example.com', subject: 'Test Subject 1', content: 'Test Content 1', sentAt: new Date() },
  //         { _id: 2, From: 'user@example.com', subject: 'Test Subject 2', content: 'Test Content 2', sentAt: new Date() },
  //       ],
  //       loading: false,
  //       error: null,
  //     });
  //     render(
  //       <Provider store={store}>
  //       <MemoryRouter>
  //       {" "}
  //       {/* Wrap your component with MemoryRouter */}
  //       <Inbox />
  //     </MemoryRouter>
  //     </Provider>
  //     );
  
  //     // Wait for the messages to be fetched and rendered in the table
  //     await waitFor(() => {
  //       expect(screen.getByText('Test Subject 1')).toBeInTheDocument();
  //       expect(screen.getByText('Test Subject 2')).toBeInTheDocument();
  //     });
  
  //     // Ensure that the delete buttons are rendered for each message
  //     expect(screen.getAllByTestId('delete-button')).toHaveLength(2);
  //   });
  // });