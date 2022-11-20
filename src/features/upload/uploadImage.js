import { ref, uploadBytesResumable, getDownloadURL,getStorage, uploadString } from "firebase/storage";
import { firebaseStorage } from "app/firebase";
import { v4 as uuidv4 } from 'uuid';
const handleUploadimg = async (file, attachment) => {
    const storageRef = ref(firebaseStorage, `images/${uuidv4()}`);
    const response  = await uploadString(storageRef, attachment, 'data_url');
    const url = await getDownloadURL(response.ref);
    return url;
}; // return url from attachment string
export default handleUploadimg