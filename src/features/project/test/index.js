import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loadProjectList, loadProjectListByMember } from "../project_reducer";
import { addMemberToProjectFirebase, changeMemberProToProjectFirebase, deleteProjectDataFirebase, postProjectDataFirebase, removeMemberFromProjectFirebase } from "../project";
import { selectProjectList } from "../project_reducer";

import './index.css';

const ProjectReducerTestScreen = (props) => {
    const dispatch = useDispatch();
    const projectList = useSelector(selectProjectList);

    useEffect(() => {
        dispatch(loadProjectList());
    }, [dispatch]);

    return (
        <div id="project-test">
            <h1>Project Reducer Test Screen</h1>
            <h2>Create New Project</h2>
            <NewProjectForm onSubmit={(projectData) => {
                postProjectDataFirebase(projectData).then(() => {
                    dispatch(loadProjectList());
                });
            }} />
            <h2>Search Project</h2>
            <SearchProjectForm onSearch={(searchText, searchTechStackList) => {
                dispatch(loadProjectList(searchText, searchTechStackList));
            }} />
            <h2>Search Project By User</h2>
            <SearchProjectByMemberForm onSearch={(uid) => {
                dispatch(loadProjectListByMember(uid));
            }} />
            <h2>Project List</h2>
            <ProjectList projectList={projectList} />
        </div>
    );
}

const SearchProjectForm = (props) => {
    const [searchText, setSearchText] = useState("");
    const [searchTechStackList, setSearchTechStackList] = useState("");
    const handleSearchTextChange = (text) => {
        setSearchText(text);
    }

    const handleSearchTechStackListChange = (text) => {
        let techStackList = searchTechStackList.trim() === "" ? null : searchTechStackList.split(",").map((tech) => tech.trim());
        props.onSearch(searchText.trim() !== "" ? searchText.trim() : null,
            techStackList);
    }

    return (
        <div id="card">
            <label>
                Search Text:
                <input type="text" value={searchText} onChange={(e) => handleSearchTextChange(e.target.value)} />
            </label>
            <label>
                Search Tech Stack List:
                <input type="text" value={searchTechStackList} onChange={(e) => setSearchTechStackList(e.target.value)} />
            </label>
            <button onClick={handleSearchTechStackListChange}>Search</button>
        </div>
    );
}

const SearchProjectByMemberForm = (props) => {
    const [memberUid, setMemberUid] = useState("");
    const handleUidChange = (e) => {
        setMemberUid(e.target.value);
    }
    const handleSearch = () => {
        props.onSearch(memberUid);
    }
    return (
        <div id="card">
            <label>
                User Uid:
                <input type="text" value={memberUid} onChange={handleUidChange} />
            </label>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

const NewProjectForm = (props) => {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [techStack, setTechStack] = useState("");
    const [content, setContent] = useState("");
    const [links, setLinks] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");

    const handleNameChange = (text) => {
        setName(text.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date.target.value);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date.target.value);
    };

    const handleTechStackChange = (text) => {
        setTechStack(text.target.value);
    };

    const handleContentChange = (text) => {
        setContent(text.target.value);
    };

    const handleLinksChange = (text) => {
        setLinks(text.target.value);
    };

    const handleThumbnailUrlChange = (text) => {
        setThumbnailUrl(text.target.value);
    };

    const handleSubmit = function (e) {
        e.preventDefault();

        const projectData = {
            name: name,
            startDate: new Date(Date.parse(startDate)).getTime(),
            endDate: endDate === null || endDate === "" ? null : new Date(Date.parse(endDate)).getTime(),
            techStack: techStack.split(",").map((tech) => tech.trim()),
            members: [],
            content: content,
            links: links.split(",").map((link) => link.trim()),
            thumbnailUrl: thumbnailUrl,
        };
        props.onSubmit(projectData);
    };

    return (
        <div id="card">
            <form>
                <label>
                    Name:
                    <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <label>
                    Start Date:
                    <input type="date" value={startDate} onChange={handleStartDateChange} />
                </label>
                <label>
                    End Date:
                    <input type="date" value={endDate} onChange={handleEndDateChange} />
                </label>
                <label>
                    Tech Stack:
                    <input type="text" value={techStack} onChange={handleTechStackChange} />
                </label>
                <label>
                    Content:
                    <input type="text" value={content} onChange={handleContentChange} />
                </label>
                <label>
                    Links:
                    <input type="text" value={links} onChange={handleLinksChange} />
                </label>
                <label>
                    Thumbnail Url:
                    <input type="text" value={thumbnailUrl} onChange={handleThumbnailUrlChange} />
                </label>
                <button onClick={handleSubmit}>Create</button>
            </form>
        </div>
    );
};

const ProjectItem = (props) => {
    const project = props.project;
    const dispatch = useDispatch();
    
    // List of string to string
    const listToString = (li) => {
        let result = "[ ";
        li.forEach((ss) => {
            result += ss + ", ";
        });
        return result.substring(0, result.length - 2) + " ]";
    }
    
    // member list to string
    const memberListToString = (li) => {
        let result = "[ ";
        li.forEach((member) => {
            result += "( " + member.uid + ", " + (member.pro ? "pro" : "not pro") + " )\n";
        });
        return result.substring(0, result.length - 1) + " ]";
    }

    return (
        <div id="small-card">
            <div id="title-bar">
                <h3>name : {project.name}

                </h3>
                <button onClick={
                    (e) => {
                        deleteProjectDataFirebase(project.id).then(() => {
                            dispatch(loadProjectList());
                        });
                    }
                }>Delete</button>
                <button onClick={
                    (e) => {
                        addMemberToProjectFirebase("아무uid", true, project.id).then((result) => {
                            dispatch(loadProjectList());
                            if (result) {
                                console.log(result);
                            }
                        });
                    }
                }>Add Member</button>
                <button onClick={
                    (e) => {
                        removeMemberFromProjectFirebase("아무uid", project.id).then((result) => {
                            dispatch(loadProjectList());
                            if (result) {
                                console.log(result);
                            }
                        });
                    }
                }>Delete Member</button>
                <button onClick={
                    (e) => {
                        changeMemberProToProjectFirebase("아무uid", false, project.id).then((result) => {
                            dispatch(loadProjectList());
                            if (result) {
                                console.log(result);
                            }
                        });
                    }
                }>Change to not pro Member</button>
                <button onClick={
                    (e) => {
                        console.log(project);
                    }
                }>print console log</button>
            </div>
            <p>id : {project.id}</p>
            <p>startDate: {new Date(parseInt(project.startDate)).toLocaleDateString()}</p>
            <p>endDate: {project.endDate ? new Date(parseInt(project.endDate)).toLocaleDateString() : "null"}</p>
            <p>techStack: {listToString(project.techStack)}</p>
            <p>content: {project.content}</p>
            <p>links: {listToString(project.links)}</p>
            <p>thumbnailUrl: {project.thumbnailUrl}</p>
            <p>members: {memberListToString(project.members)}</p>
        </div>
    );
};

const ProjectList = (props) => {
    const projectList = props.projectList;
    return (
        <div>
            {projectList.map((project) => {
                return <ProjectItem project={project} key={project.id} />
            })}
        </div>
    );
}


export default ProjectReducerTestScreen;