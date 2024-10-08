// import { useState } from "react";
import ProjectSidebar from "./components/ProjectSidebar";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectDisplay from "./components/ProjectDisplay";

function App() {
  const [getProjectsState, setProjectsState] = useState({
    selectedProject: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: null,
      };
    });
  }

  function handleAddNewProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: uuidv4(),
      };
      return {
        ...prevState,
        selectedProject: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
      };
    });
  }

  function handleProjectSelected(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: id,
      };
    });
  }

  function handleRemoveProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
        projects: prevState.projects.filter(
          // drop item if return is false
          (item) => item.id !== prevState.selectedProject
        ),
      };
    });
  }

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const newTask = {
        id: uuidv4(),
        text: text,
        projectId: prevState.selectedProject,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          // drop item if return is false
          (item) => item.id !== id
        ),
      };
    });
  }

  // console.log("project state? " + JSON.stringify(getProjectsState));

  const projectToDisplay = getProjectsState.projects.find(
    (project) => project.id === getProjectsState.selectedProject
  );

  let content = (
    <ProjectDisplay
      project={projectToDisplay}
      onRemove={handleRemoveProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={getProjectsState.tasks}
    />
  );

  if (getProjectsState.selectedProject === null) {
    content = (
      <NewProject
        onAdd={handleAddNewProject}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (getProjectsState.selectedProject === undefined) {
    content = <NoProjectSelected onAddProject={handleAddProject} />;
  }

  return (
    <main className='h-screen my-8 flex gap-8'>
      <ProjectSidebar
        onAddProject={handleAddProject}
        projects={getProjectsState.projects}
        projectSelected={handleProjectSelected}
        projectSelectedId={getProjectsState.selectedProject}
      />
      {content}
    </main>
  );
}

export default App;
