import React from 'react';
import { useMyInfoQuery } from '../generated/graphql';

const MyInfo: React.FC = () => {
  const { data, loading, error } = useMyInfoQuery();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log('error :>> ', error);
    return <div>Error</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }
  return <div>{data.myInfo}</div>;
};

export default MyInfo;
