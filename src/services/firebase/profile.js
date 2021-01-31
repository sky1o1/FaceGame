import { storeFire, storage } from './config';

export const createProfile = async (email, password, image, id) => {
    try {
        //1. Upload Image, return download
        const url = await uploadImage(image)
        const profileDocument = {
            email,
            password,
            createdAt: new Date(),
            imageName: image.name,
            imageUrl: url,
            isProfileCompleted: true,
            id,
        }
        //2. create profile
        const collectionRef = storeFire.collection('Profile');
        await collectionRef.doc(id).set(profileDocument)
        return profileDocument
    }
    catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}


const uploadImage = (image) => {
    return storage.ref(`profile/${image.name}`).put(image).then(
        response => response.ref.getDownloadURL()
    )
}


export const getProfile = async () => {
    try {
        const docList = await storeFire.collection('Profile').orderBy('id').get();
        console.log(docList)
        return docList.docs.map(doc => doc.data())
    }
    catch (error) {
        return Promise.reject(error);
    }

}
/**
 * return user profile by id
 * @param  {number} id
 */
// export const getUserById = async (id) => {
//     try {
//         const collectionRef = storeFire.collection('Profile');
//         const userData = await collectionRef.doc(id).get()
//         const userFormatedData = getDocData(userData);
//         return userFormatedData
//     }
//     catch (error) {
//         return Promise.reject(error);
//     }
// }

export const getUserById = (id) => {
    const collectionRef = storeFire.collection('Profile');
    return collectionRef.doc(id).get()
}
