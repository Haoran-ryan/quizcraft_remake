import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export async function createRoom(roomID, hostName) {
    try{
        const docRef = doc(db, 'games', roomID);
        const data = {
            host: hostName,
            currentQuestionIndex: 0,
            isGameOver: false,
        }
        await setDoc(docRef, data);
    } catch (error) {
        console.log(`Error creating room ${roomID}: ${error.message}`);
    }
}; 

export async function addQuizToRoom(roomID, quizObject){
    try{
        // Retrieve existing data 
        const docRef = doc(db, 'games', roomID);
        const docSnap = await getDoc(docRef);
        const existingData = docSnap.data();

        // Add quiz to existing data
        const updatedData = {
            ...existingData,
            questions: quizObject,
        }

        // Overwrite existing data with updated data
        await setDoc(docRef, updatedData);

    }
    catch(error){
        console.log(`Error adding quiz to room ${roomID}: ${error.message}`)
    }
}; 

export async function addPlayerToRoom(roomID, playerName){
    try{
        // Retrieve existing data 
        const docRef = doc(db, 'games', roomID);
        const docSnap = await getDoc(docRef);
        const existingData = docSnap.data();

       // If players array exists, add new player to it; otherwise, create a new players array
       const updatedPlayer = {[playerName]:0}
        
       const updatedData = {
            ...existingData,
            players: existingData.players ? {...existingData.players, ...updatedPlayer} : updatedPlayer,
       }
        // Overwrite existing data with updated data
        await setDoc(docRef, updatedData);
    }
    catch(error){
        console.log(`Error adding player ${playerName} to room ${roomID}: ${error.message}`)
    }
};

export async function retrieveQuiz(roomID){
    try{
        const docRef = doc(db, 'games', roomID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log('Quiz document found:', docSnap.data());
            return docSnap.data();
        } else {
            console.log('No such document!');
        }
    }
    catch(error){
        console.log(`Error retrieving quiz from room ${roomID}: ${error.message}`)
    }
};

export function listenToCurrentQuestionIndex(roomID, callback) {
    const docRef = doc(db, 'games', roomID);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const currentQuestionIndex = data.currentQuestionIndex;
        callback(currentQuestionIndex);
      } else {
        console.log('No such document!');
      }
    });
  
    return unsubscribe;
  }