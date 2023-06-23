import { useEffect, useState } from 'react';
import { ReadDB } from '../utilities/ReadDB';

const PlayerData = ({ roomID }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await ReadDB(roomID.toString()); // Pass the document ID to the function
      if (fetchedData) {
        setData(fetchedData);
      }
    };

    fetchData();
  }, [roomID]);

  return (
    <>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  );
};

export default PlayerData;
