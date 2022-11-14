import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSeminarData, deleteSeminarDataFirebase, postSeminarDataFirebase } from "../seminar";
import { loadSeminarList, selectSeminarList } from "../seminar_reducer";

import './index.css';

const SeminarReducerTestScreen = () => {
    const dispatch = useDispatch();
    const seminarList = useSelector(selectSeminarList);

    useEffect(() => {
        dispatch(loadSeminarList);
    }, []);

    return (
        <div id="seminar-test">
            <h1>Seminar Reducer Test Screen</h1>
            <h2>Create New Seminar</h2>
            <NewSeminarForm onSubmit={
                (seminarData) => {
                    postSeminarDataFirebase(seminarData).then(() => {
                        dispatch(loadSeminarList);
                    });
                }
            } />
            <h2>Update Seminar Data</h2>
            <p><b>id</b> : 필수  ,  <b>나머지 필드</b> : 입력한 필드값만 firebase로 Update되도록 해 놓음</p>
            <UpdateSeminarForm onSubmit={
                (seminarData) => {
                    postSeminarDataFirebase(seminarData).then(() => {
                        dispatch(loadSeminarList);
                    });
                }
            } />
            <h2>Seminar List</h2>
            <SeminarList seminarList={seminarList} />
        </div>
    );
}

const NewSeminarForm = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [filename, setFilename] = useState("");
    const [fileurl, setFileurl] = useState("");
    const [date, setDate] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleFilenameChange = (event) => {
        setFilename(event.target.value);
    };

    const handleFileurlChange = (event) => {
        setFileurl(event.target.value);
    };
    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let seminarData = createSeminarData(title, description, filename, fileurl, new Date(Date.parse(date)).getTime());
        props.onSubmit(seminarData);
    };

    return (
        <div id="card">
            <form>
                <label>
                    Title:
                    <input type="text" value={title} onChange={handleTitleChange} />
                </label>
                <label>
                    Description:
                    <input type="text" value={description} onChange={handleDescriptionChange} />
                </label>
                <label>
                    Filename:
                    <input type="text" value={filename} onChange={handleFilenameChange} />
                </label>
                <label>
                    Fileurl:
                    <input type="text" value={fileurl} onChange={handleFileurlChange} />
                </label>
                <label>
                    Date:
                    <input type="date" value={date} onChange={handleDateChange} />
                </label>
                <button onClick={handleSubmit}>Create</button>
            </form>
        </div>
    );
};

const SeminarItem = (props) => {
    const dispatch = useDispatch();
    const { id, title, description, filename, fileurl, date } = props.seminar;
    return (
        <div id="small-card">
            <div id="title-bar">
                <h3>title: {title}

                </h3>
                <button onClick={
                    () => {
                        deleteSeminarDataFirebase(id).then(() => {
                            dispatch(loadSeminarList);
                        });
                    }
                }>
                    delete
                </button>
            </div>
            <p>id: {id}</p>
            <p>description: {description}</p>
            <p>filename: {filename}</p>
            <p>fileurl: {fileurl}</p>
            <p>date: {new Date(parseInt(date)).toLocaleDateString()}</p>
        </div>
    );
};

const UpdateSeminarForm = (props) => {
    const [id, setId] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newFilename, setNewFilename] = useState("");
    const [newFileurl, setNewFileurl] = useState("");
    const [newDate, setNewDate] = useState("");

    const handleIdChange = (event) => {
        setId(event.target.value);
    };
    const handleTitleChange = (event) => {
        setNewTitle(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setNewDescription(event.target.value);
    };
    const handleFilenameChange = (event) => {
        setNewFilename(event.target.value);
    };
    const handleFileurlChange = (event) => {
        setNewFileurl(event.target.value);
    };
    const handleDateChange = (event) => {
        setNewDate(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (id === "") {
            return;
        }
        let seminarData = {};
        seminarData.id = id;
        if (newTitle !== "") {
            seminarData.title = newTitle;
        }
        if (newDescription !== "") {
            seminarData.description = newDescription;
        }
        if (newFilename !== "") {
            seminarData.filename = newFilename;
        }
        if (newFileurl !== "") {
            seminarData.fileurl = newFileurl;
        }
        if (newDate !== "") {
            seminarData.date = new Date(Date.parse(newDate)).getTime();
        }
        props.onSubmit(seminarData);
    };
    return (
        <div id="card">
            <form>
                <label>
                    id:
                    <input type="text" value={id} onChange={handleIdChange} />
                </label>
                <label>
                    Title:
                    <input type="text" value={newTitle} onChange={handleTitleChange} />
                </label>
                <label>
                    Description:
                    <input type="text" value={newDescription} onChange={handleDescriptionChange} />
                </label>
                <label>
                    Filename:
                    <input type="text" value={newFilename} onChange={handleFilenameChange} />
                </label>
                <label>
                    Fileurl:
                    <input type="text" value={newFileurl} onChange={handleFileurlChange} />
                </label>
                <label>
                    Date:
                    <input type="date" value={newDate} onChange={handleDateChange} />
                </label>
                <button onClick={handleSubmit}>Update</button>
            </form>
        </div>
    );
};


const SeminarList = (props) => {
    const seminarList = props.seminarList;
    return (
        <div>
            {seminarList.map((seminar) => {
                return <SeminarItem seminar={seminar} key={seminar.id} />;
            })}
        </div>
    );
};


export default SeminarReducerTestScreen;