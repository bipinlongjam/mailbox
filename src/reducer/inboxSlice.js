// inboxSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    fetchMessagesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMessagesSuccess(state, action) {
      state.loading = false;
      state.messages = action.payload;
    },
    fetchMessagesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteMessageRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteMessageSuccess(state, action) {
      state.loading = false;
      state.messages = state.messages.filter(message => message._id !== action.payload);
    },
    deleteMessageFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    markMessageAsRead(state, action) {
        const message = state.messages.find(message => message._id === action.payload);
        if (message) {
          message.isRead = true;
        }
    }
  },
});

export const { fetchMessagesRequest,
     fetchMessagesSuccess, 
     fetchMessagesFailure, 
     deleteMessageRequest,
     deleteMessageSuccess,
     deleteMessageFailure, 
     markMessageAsRead,} = inboxSlice.actions;

export default inboxSlice.reducer;

export const fetchMessages = () => {
  return async (dispatch) => {
    dispatch(fetchMessagesRequest());
    try {
      const response = await fetch("http://localhost:5000/sentemails", {
        method: 'POST', // Assuming you are using GET method to fetch sent emails
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Fetching sent emails failed");
      }

      const sentEmails = await response.json();
      console.log("Sent Emails:", sentEmails);
      dispatch(fetchMessagesSuccess(sentEmails));
    } catch (error) {
      dispatch(fetchMessagesFailure(error.message));
      console.error('Error fetching sent emails:', error);
    }
  };
};

export const deleteMessage = (id) => {
  return async (dispatch) => {
    dispatch(deleteMessageRequest());
    try {
      const response = await fetch(`http://localhost:5000/sentemails/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Deleting email failed");
      }
      dispatch(deleteMessageSuccess(id));
    } catch (error) {
      dispatch(deleteMessageFailure(error.message));
      console.error('Error deleting email:', error);
    }
  };
};
