import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function WriteDB(documentID, data) {
    try{
        const docRef = doc(db, 'games', documentID);
        await setDoc(docRef, data);
        
    } catch (error) {
        console.log(error.message);
    }

    return null; 
}