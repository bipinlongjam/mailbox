import { useRef } from 'react';
import {UseHttpRequest} from '../Httphooks' 

export const useSignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignIn = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const { data, error } = UseHttpRequest('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (error) {
      console.error('Error during sign-in', error);
    }

    return data;
  };

  return { emailRef, passwordRef, handleSignIn };
};
