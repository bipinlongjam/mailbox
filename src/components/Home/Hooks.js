import { useState, useEffect } from 'react';

export const useFetchUserData = (token) => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/userdata", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token
          })
        });

        if (!response.ok) {
          throw new Error("Fetching user data failed");
        }

        const userData = await response.json();
        setUserData(userData);
        console.log("userdata", userData);
      } catch (error) {
        console.error('Error fetching user data', error);
        setErrorMessage('Error fetching user data. Please try again later.');
      }
    };

    fetchUserData();
  }, [token]);

  return { userData, errorMessage };
};
