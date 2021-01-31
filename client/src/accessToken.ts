let accessToken = '';
export const setAccessToken = (token: string) => {
  console.log('token', token);
  accessToken = token;
};

export const getAccessToken = () => accessToken;
