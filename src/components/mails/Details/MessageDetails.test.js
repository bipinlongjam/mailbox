import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import MessageDetails from './MessageDetails';

// Mocking the useSelector hook
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('MessageDetails component', () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    useSelector.mockReset();
  });

  test('renders message details correctly', () => {
    const message = {
      _id: '123',
      to: 'example@example.com',
      subject: 'Test Subject',
      content: 'Test Content',
      sentAt: Date.now(),
    };

    // Mock the useSelector hook to return the specified message
    useSelector.mockImplementation(callback => callback({
      inbox: {
        messages: [message],
      },
    }));

    const onClose = jest.fn();

    const { getByText } = render(<MessageDetails message="123" onClose={onClose} />);

    expect(getByText(`From: ${message.to}`)).toBeInTheDocument();
    expect(getByText(`Subject: ${message.subject}`)).toBeInTheDocument();
    expect(getByText(`Content: ${message.content}`)).toBeInTheDocument();
    expect(getByText(`Received At: ${new Date(message.sentAt).toLocaleString()}`)).toBeInTheDocument();
  });

  test('handles no message found', () => {
    // Mock the useSelector hook to return undefined, indicating no message found
    useSelector.mockImplementation(callback => callback({
      inbox: {
        messages: [],
      },
    }));

    const onClose = jest.fn();

    const { getByText } = render(<MessageDetails message="123" onClose={onClose} />);

    expect(getByText('No message Found')).toBeInTheDocument();
  });

  test('toggles reply textarea', () => {
    const message = {
      _id: '123',
      to: 'example@example.com',
      subject: 'Test Subject',
      content: 'Test Content',
      sentAt: Date.now(),
    };

    // Mock the useSelector hook to return the specified message
    useSelector.mockImplementation(callback => callback({
      inbox: {
        messages: [message],
      },
    }));

    const onClose = jest.fn();

    const { getByText, getByPlaceholderText, queryByPlaceholderText } = render(<MessageDetails message="123" onClose={onClose} />);

    // Expect reply textarea to be initially hidden
    expect(queryByPlaceholderText('Write your reply here...')).toBeNull();

    fireEvent.click(getByText('Reply'));

    // Expect reply textarea to be visible after clicking on the Reply button
    expect(getByPlaceholderText('Write your reply here...')).toBeVisible();
  });
});
