import { useState } from 'react';

export const UseHttpRequest = async (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    setData(responseData);
  } catch (error) {
    setError(error.message);
  }

  return { data, error };
};
