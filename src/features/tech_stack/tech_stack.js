import { firebaseStore } from "app/firebase";
import { collection, doc, deleteDoc, getDocs, updateDoc, setDoc, getDoc } from "firebase/firestore";


const deleteTechStackFirebase = async (name) => {
    const techStackRef = doc(firebaseStore, "techStack", name);
    await deleteDoc(techStackRef);
};

// Firebase에서 TechStack 리스트를 불러온다.
// Project가 없는 TechStack은 삭제한다.
export const loadTechStackListFirebase = async () => {
    const techStackRef = collection(firebaseStore, "techStack");
    const snapshot = await getDocs(techStackRef);

    const result = [];

    snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.projects === undefined) {
            return;
        }
        if (data["projects"].length === 0) {
            deleteTechStackFirebase(doc.id);
            return;
        }
        result.push({
            name: doc.id,
            count: data["projects"].length,
            projects: data["projects"],
        });
    }
    );
    return result;
};

// Project를 로드할 때 TechStack 리스트와 해당 Project를 동기화한다.
// TechStack collection에 없는 TechStack이 있으면 TechStack doc을 추가하고,
// TechStack doc의 projectList에 해당 프로젝트가 없으면 추가한다.
// 이 함수는 features/project/project.js에서 사용되며, 다른 곳에서는 사용할 필요가 없다.
export const configureTechStackWithProjectFirebase = async (project) => {
    const techStack = project.techStack;
    for (let i = 0; i < techStack.length; i++) {
        if (techStack[i] === "") continue;
        const techStackRef = doc(firebaseStore, "techStack", techStack[i]);
        const snapshot = await getDoc(techStackRef);
        if (snapshot.exists()) {
            const data = snapshot.data();
            if (!data["projects"].includes(project.id)) {
                data["projects"].push(project.id);
                await updateDoc(techStackRef, data);
            }
        } else {
            await setDoc(techStackRef, { projects: [project.id] });
        }
    }
};

// Project를 제거할 때 TechStack 리스트와 해당 Project를 동기화한다.
// TechStack doc의 projectList에서 해당 프로젝트를 삭제하고,
// TechStack doc의 projectList가 비어있으면 TechStack doc을 삭제한다.
// 이 함수는 features/project/project.js에서 사용되며, 다른 곳에서는 사용할 필요가 없다.
export const configureTechStackWithProjectDeleteFierebase = async (project) => {
    const techStack = project.techStack;
    for (let i = 0; i < techStack.length; i++) {
        if (techStack[i] === "") continue;
        const techStackRef = doc(firebaseStore, "techStack", techStack[i]);
        const snapshot = await getDoc(techStackRef);
        if (snapshot.exists()) {
            const data = snapshot.data();
            if (data["projects"].includes(project.id)) {
                data["projects"].splice(data["projects"].indexOf(project.id), 1);
                if (data["projects"].length === 0) {
                    await deleteTechStackFirebase(techStack[i]);
                } else {
                    await updateDoc(techStackRef, data);
                }
            }
        }
    }
};
