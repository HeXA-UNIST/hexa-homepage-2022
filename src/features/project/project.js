import { firebaseStore } from '../../app/firebase';
import { doc, updateDoc, getDoc, deleteDoc, collection, query, orderBy, getDocs, where, addDoc } from "firebase/firestore";

export const initialProjectData = {
    name: "",
    id: "",
    startDate: 0,
    endDate: null,
    techStack: [],
    members: [{
        uid: "",
        pro: false,
    }],
    content: "",
    links: [],
    thumbnailUrl: "",
};

const _processRawProjectData = (doc) => {
    return {
        ...doc.data(),
        id: doc.id,
        members: [
            ...doc.data().members.map((member, index) => {
                return {
                    uid: member,
                    pro: index < doc.data().proCount,
                }
            })
        ]
    };
};


// Firebase에 ProjectData를 게시하는 비동기 함수이다.
// data에 id가 없으면 새 document를 생성하고, id가 있으면 document를 update한다.
export const postProjectDataFirebase = async (data) => {
    if (data.id === null || data.id === undefined) {
        const colRef = collection(firebaseStore, "projects");
        const projectData = {
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            techStack: data.techStack,
            members: [
                ...data.members.filter((member) => member.pro).map((member) => member.uid),
                ...data.members.filter((member) => !member.pro).map((member) => member.uid),
            ],
            proCount: data.members.filter((member) => member.pro).length,
            content: data.content,
            links: data.links,
            thumbnailUrl: data.thumbnailUrl,
        };
        await addDoc(colRef, projectData);
    } else {
        const docRef = doc(firebaseStore, "projects", data.id);
        if (!data.id) {
            delete data.id;
        }
        if (!(data.members === undefined || data.members === null)) {
            data.proCount = data.members.filter((member) => member.pro).length;
            data.members = [
                ...data.members.filter((member) => member.pro).map((member) => member.uid),
                ...data.members.filter((member) => !member.pro).map((member) => member.uid),
            ];
        }
        await updateDoc(docRef, data);
    }
};

// Firebase에서 id에 해당하는 ProjectData를 가져오는 비동기 함수이다.
export const loadProjectDataFirebase = async (id) => {
    const docRef = doc(firebaseStore, "projects", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return _processRawProjectData(docSnap);
    } else {
        return null;
    }
};

// Firebase에서 id에 해당하는 ProjectData를 삭제하는 비동기 함수이다.
export const deleteProjectDataFirebase = async (id) => {
    const docRef = doc(firebaseStore, "projects", id);
    await deleteDoc(docRef);
};

// Firebase에서 page의 limit개의 projectData들을 가져오는 비동기 함수이다.
export const loadProjectListFirebase = async () => {
    const projectsRef = collection(firebaseStore, "projects");
    const q = query(projectsRef, orderBy("startDate", "desc"));
    const querySnapshot = await getDocs(q);
    const projectList = [];
    querySnapshot.forEach((doc) => {
        console.log(doc);
        projectList.push(_processRawProjectData(doc));
    });
    return projectList;
}

// Todo: Query를 이렇게 쓰는게 맞는지 확인해야 한다.
// Firebase에서 제목과 teckStackList로 검색한 projectData들을 가져오는 비동기 함수이다.
// page는 0부터 시작한다.
export const searchProjectListFirebase = async (searchText = null, techStackList = null) => {
    if(!(searchText === null || searchText === undefined)) {
        searchText = searchText.trim();
        if(searchText === "") {
            searchText = null;
        }
    }
    if (!(techStackList === null || techStackList === undefined)) {
        techStackList = techStackList.map((techStack) => techStack.trim())
            .filter((techStack) => techStack != "");
        if (techStackList.length === 0) {
            techStackList = null;
        }
    }

    const newsRef = collection(firebaseStore, "projects");

    const deleteNull = (list) => {
        return list.filter((item) => item !== null);
    };

    // Todo : Firebase에서 텍스트 검색을 위한 인덱싱을 지원하지 않는다 함.
    // Todo : Aloglia를 사용해서 검색을 구현해야 한다.
    // 지금은 겨우 string의 startwith정도의 기능밖에 못함.
    const q = query(
        newsRef,
        ...deleteNull([
            searchText && orderBy("name"),
            searchText && where("name", ">=", searchText),
            searchText && where("name", "<=", searchText + "\uf8ff"),
            techStackList && where("techStack", "array-contains-any", techStackList)]),
        orderBy("startDate", "desc"));
    const querySnapshot = await getDocs(q);

    const projectList = [];
    querySnapshot.forEach((doc) => {
        projectList.push(_processRawProjectData(doc));
    }
    );
    return projectList;
}

// Firebase에서 uid에 해당하는 user를 id에 해당하는 프로젝트에 추가하는 비동기 함수이다.
export const addMemberToProjectFirebase = async (uid, pro, id) => {
    const docRef = doc(firebaseStore, "projects", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const projectData = _processRawProjectData(docSnap);
        if (projectData.members.filter((member) => member.uid === uid).length > 0) {
            return "err : already exist member";
        }
        projectData.members = [...projectData.members, { uid: uid, pro: pro }];
        await postProjectDataFirebase({ members: projectData.members, id: projectData.id });
    } else {
        return "err: Project not found";
    }
};

// Firebase에서 uid에 해당하는 user를 id에 해당하는 프로젝트에서 제거하는 비동기 함수이다.
export const removeMemberFromProjectFirebase = async (uid, id) => {
    const docRef = doc(firebaseStore, "projects", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const projectData = _processRawProjectData(docSnap);
        if (projectData.members.filter((member) => member.uid === uid).length === 0) {
            return "err : not exist member";
        }
        projectData.members = projectData.members.filter((member) => member.uid !== uid);
        await postProjectDataFirebase({ members: projectData.members, id: projectData.id });
    } else {
        return "err: Project not found";
    }
}

// Firebase에서 id에 해당하는 프로젝트에서 user의 pro를 변경하는 비동기 함수이다.
export const changeMemberProToProjectFirebase = async (uid, pro, id) => {
    const docRef = doc(firebaseStore, "projects", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const projectData = _processRawProjectData(docSnap);
        if (projectData.members.filter((member) => member.uid === uid).length === 0) {
            return "err : not exist member";
        }
        projectData.members = projectData.members.map((member) => {
            if (member.uid === uid) {
                member.pro = pro;
            }
            return member;
        });
        await postProjectDataFirebase({ members: projectData.members, id: projectData.id });
    } else {
        return "err: Project not found";
    }
}

