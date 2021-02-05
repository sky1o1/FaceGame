import { storeFire } from './config';

export const createEmotion = async (emotion) => {
    try {
        const profileDocument = {
            emotion,
        }
        const collectionRef = storeFire.collection('Emotion');
        await collectionRef.doc(id).set(emotionDocument)
        return profileDocument
    }
    catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}


export const getEmotion = async () => {
    try {
        const docList = await storeFire.collection('Emotion').orderBy('id').get();
        console.log(docList)
        return docList.docs.map(doc => doc.data())
    }
    catch (error) {
        return Promise.reject(error);
    }

}
