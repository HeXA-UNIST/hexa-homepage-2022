import { firebaseStore } from '../../app/firebase';
import { query, orderBy, limit, collection, getDocs, doc, addDoc, deleteDoc } from 'firebase/firestore';

// text: string
// url: string - 뉴스를 클릭했을 때 이동할 주소(nullable)
// bold: boolean - 굵게 표시할건지
// color: int - 표시할 색깔
export const createNews = (text, url = null, bold = true, color = 0) => {
    return {
        text: text,
        url: url,
        bold: bold,
        color: color,
    };
}

// Firestore에서 최근에 게시한 순서로 number개의 news들을 받아온다.
export const loadNewsFirebase = async (number) => {
    const newsRef = collection(firebaseStore, "news");
    const q = query(newsRef, orderBy("date", "desc"), limit(number));
    const querySnapshot = await getDocs(q);

    let result = [];
    querySnapshot.forEach((docSnapshot) => {
        result.push(
            {
                ...docSnapshot.data(),
                id: docSnapshot.id,
            }
        );
    });
    return result;
}

// Firestore에 새 news를 게시한다.
// 피라미터에 들어가는 news는 createNews함수로 만든 object를 전달해 주면 된다. 
export const postNewNewsFirebase = async (news) => {
    const newsData = {
        text: news.text,
        url: news.url,
        bold: news.bold,
        color: news.color,
        date: (new Date()).getTime()
    };

    await addDoc(collection(firebaseStore, "news"), newsData);
}

// Firestore에서 id에 해당하는 news를 삭제한다.
// id에 대한 정보는 loadNewsFirebase에서 받아온 리스트의 News 원소에 key로 들어 있다.
export const deleteNewsFirebase = async (id) => {
    await deleteDoc(doc(firebaseStore, "news", id));
}