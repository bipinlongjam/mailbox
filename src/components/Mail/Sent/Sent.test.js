import React from "react";
import {render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Sent from "./Sent";


test("renders Sent Messages text in the component", () => {
    const screen = render(
      <MemoryRouter>
        {" "}
        {/* Wrap your component with MemoryRouter */}
        <Sent />
      </MemoryRouter>
    );
    
    const sentElement = screen.getByText(/Sent Messages/i);
    // Assert that the element is in the document
    expect(sentElement).toBeInTheDocument();
  });

  //Delete button TDD
  describe('Sent Component', () => {
    it('renders inbox with fetched messages', async () => {
      // Mock the fetch API to return some sample data
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([
          { _id: 1, To: 'user@example.com', subject: 'Test Subject 1', content: 'Test Content 1', sentAt: new Date() },
          { _id: 2, To: 'user@example.com', subject: 'Test Subject 2', content: 'Test Content 2', sentAt: new Date() },
        ]),
      });
  
      render(
        <MemoryRouter>
       <Sent/>
      </MemoryRouter>
      );
  
      // Wait for the messages to be fetched and rendered in the table
      await waitFor(() => {
        expect(screen.getByText('Test Subject 1')).toBeInTheDocument();
        expect(screen.getByText('Test Subject 2')).toBeInTheDocument();
      });
  
      // Ensure that the delete buttons are rendered for each message
      expect(screen.getAllByTestId('delete-button')).toHaveLength(2);
    });
  });
  //Sent TDD