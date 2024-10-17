import {useState, useEffect} from 'react';
import {db} from '../utils/firebase';

const useFirestoreCollection = collectionName => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection(collectionName).onSnapshot(snapshot => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(items);
    });

    return () => unsubscribe();
  }, [collectionName]);

  return data;
};

export default useFirestoreCollection;
