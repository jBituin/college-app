import React, { useEffect, useState } from 'react';
import Routes from './Routes';
import { setAccessToken } from './accessToken';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8888/refresh-token', {
      credentials: 'include',
      method: 'POST',
    }).then(async (response) => {
      const { accessToken } = await response.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }
  return <Routes />;
};

export default App;
