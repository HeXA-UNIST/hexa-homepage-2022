import { firebaseStore } from '../../app/firebase';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

const personalStatusDomain = {
    PERSONAL_STATUS_ACTIVE: "active",
    PERSONAL_STATUS_REST: "rest",
    PERSONAL_STATUS_GLORY: "glory",
    PERSONAL_STATUS_QUIT: "quit",
    PERSONAL_STATUS_EXPEL: "expel",
};

const personalPowerDomain = {
    PERSONAL_POWER_COMMON: "common",
    PERSONAL_POWER_PRO: "pro",
    PERSONAL_POWER_MASTER: "master",
};

export { personalStatusDomain, personalPowerDomain };

export const initialPersonalData = {
    public: true,
    name: "",
    introduction: "",
    photo: null,
    techStack: [], // list of  techStack ids
    email: "",
    links: [],
    sns: [],
    power: personalPowerDomain.PERSONAL_POWER_COMMON, // common | pro | master
    studentId: "",
    status: personalStatusDomain.PERSONAL_STATUS_ACTIVE, // active(활동) | rest(휴면) | glory(명예) | quit(탈퇴) | expel(제명)
    createdAt: "",
    lastLoginAt: "",
};

// Firebase에서 uid에 해당하는 PersonalData를 가져오는 비동기 함수이다.
// personal_reducer의 loadPersonalData와 loadUserPersonalData에서 이 함수를 사용하며,
// UI단에서 직접 이 함수를 호출할 경우는 거의 없을 듯 하다.
export const loadPersonalDataFirebase = async (uid) => {
    const docRef = doc(firebaseStore, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {
            ...docSnap.data(),
            uid: uid
        };
    } else {
        return null;
    }
};

// Firebase에 uid에 해당하는 document에 PersonalData를 update하는 비동기 함수이다.
// personal_reducer의 postPersonData에서 이 함수를 사용하며,
// UI단에서 직접 이 함수를 호출할 경우는 거의 없을 듯 하다.
export const postPersonalDataFirebase = async (uid, data, existGuaranteed = false) => {
    const docRef = doc(firebaseStore, "users", uid);
    // 만약 uid에 해당하는 document가 없으면 initialPersonData에 data 덧씌운걸로 새 docoument 만들고,
    // 이미 존재하면 data에 있는 내용을 firestore의 document에 update함.
    if (data.uid) {
        delete data.uid;
    }

    if (!existGuaranteed && !(await getDoc(docRef)).exists()) {
        data = { ...initialPersonalData, ...data };
        await setDoc(docRef, data);
    } else {
        await updateDoc(docRef, data);
    }
};

// Firebase에서 name에 해당하는 PersonalData를 가져오는 비동기 함수이다.
export const searchPersonalDataByNameFirebase = async (name) => {
    const usersRef = collection(firebaseStore, "users");
    const q = query(usersRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => {
        result.push({
            ...doc.data(),
            uid: doc.id
        });
    });
    return result;
}