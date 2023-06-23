import { getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export async function ReadDB(documentID) {
  try {
    const docRef = doc(db, 'games', documentID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.log(error.message);
  }

  return null;
}
