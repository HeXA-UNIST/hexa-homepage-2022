import { firebaseStore } from "../../app/firebase";
import { doc, updateDoc, collection, orderBy, getDocs, addDoc, deleteDoc, query } from "firebase/firestore";

export const initialSeminarData = {
    id: "",
    title: "",
    description: "", // Nullable
    fileName: "", // Nullable
    fileUrl: "", // Nullable only if filename is null
    date: 0, // new Date(date) 으로 Date 객체로 변환 가능, new Date().getTime() 으로 date로 변환 가능
}

export const createSeminarData = (title, description, fileName, fileUrl, date) => {
    return {
        title: title,
        description: description,
        fileName: fileName,
        fileUrl: fileUrl,
        date: date,
    }
}


const _processRawSeminarData = (doc) => {
    return {
        ...doc.data(),
        id: doc.id,
    };
};

// Firebase에서 SeminarData들을 불러오는 비동기 함수이다.
export const loadSeminarListFirebase = async () => {
    const colRef = collection(firebaseStore, "seminars");
    const q = query(colRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const seminarList = [];
    querySnapshot.forEach((doc) => {
        seminarList.push(_processRawSeminarData(doc));
    });
    return seminarList;
}

// Firebase에 SeminarData를 게시하는 비동기 함수이다.
// data.id가 null이면 새로운 SeminarData를 생성하고, null이 아니면 해당 id의 SeminarData를 수정한다.
export const postSeminarDataFirebase = async (data) => {
    if (data.id === undefined || data.id === null || data.id == "") {
        const colRef = collection(firebaseStore, "seminars");
        const seminarData = {
            ...data,
        };
        await addDoc(colRef, seminarData);
    } else {
        const docRef = doc(firebaseStore, "seminars", data.id);
        delete data.id;
        await updateDoc(docRef, data);
    }
}

// Firebase에서 SeminarData를 삭제하는 비동기 함수이다.
export const deleteSeminarDataFirebase = async (id) => {
    const docRef = doc(firebaseStore, "seminars", id);
    await deleteDoc(docRef);
}