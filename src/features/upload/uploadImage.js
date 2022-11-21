import { ref, uploadBytesResumable, getDownloadURL,getStorage, uploadString, uploadBytes, getBlob } from "firebase/storage";
import { firebaseStorage } from "app/firebase";
import { v4 as uuidv4 } from 'uuid';
const handleUploadimg = async (file, attachment) => {
    const storageRef = ref(firebaseStorage, `images/${uuidv4()}`);
    const response  = await uploadString(storageRef, attachment, 'data_url');
    const url = await getDownloadURL(response.ref);
    return url;
}; // return url from attachment string
const handleUploadblob = async (file, attachment) => {
    const storageRef = ref(firebaseStorage, `${uuidv4()}/${file}`);
    const response = await uploadString(storageRef, attachment, 'data_url');
    const url = await getDownloadURL(response.ref);
    return url;
    // await uploadBytes(storageRef, attachment)
    // const blob = await getBlob(storageRef);
    // const blobUrl = URL.createObjectURL(blob);
    // console.log(blobUrl);
    // return blobUrl;
    // uploadTask.on("state_changed",
    //   (snapshot) => {
    //     const progress =Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    //   },
    //   (error) => {
    //     return error;
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //         console.log(downloadURL);
    //         return (downloadURL);
    //     });
    //   }
    // );
}; // return url from attachment blob
export { handleUploadimg, handleUploadblob };

