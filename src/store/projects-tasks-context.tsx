import { TTask, TPriority, TSortBy } from "@/types";
import {createContext} from "react";
import {useLoaderData} from "react-router";
import {useState} from "react";
import {saveTask, sortByDate, deleteTaskinSupabase, update, savePositions} from '@/util/utils';

interface IProjectsTasksContext {
  tasks: TTask[];
  toggleNewProject: () => void;
  setTasks: (tasks: TTask[]) => void;
  addTask: (task: TTask) => void;
  updateTaskDetails: (task: TTask) => void;
  updateTask: (uuid: string) => void;
  handleReorder: () => void;
  deleteTask: (uuid: string) => void;
  updateTaskText: (uuid: string, text: string) => void;
  completeTask: (uuid: string) => void;
  cancel: (uuid: string) => void;
  addPriority: (e: React.MouseEvent, uuid: string, priority: TPriority) => void;
  sortTasks: (sortBy: TSortBy) => void;
  haveTasks: () => boolean;
}

const ProjectsTasksContext = createContext<IProjectsTasksContext>({
    tasks: [] as TTask[],
    toggleNewProject: () => {},
    setTasks: (tasks: TTask[]) => {},
    addTask: (task: TTask) => {},
    updateTaskDetails: (task: TTask) => {},
    updateTask: (uuid: string) => {},
    handleReorder: () => {},
    deleteTask: (uuid: string) => {},
    updateTaskText: (uuid: string, text: string) => {},
    completeTask: (uuid: string) => {},
    cancel: (uuid: string) => {},
    addPriority: (e: React.MouseEvent, uuid: string, priority: TPriority) => {},
    sortTasks: (sortBy: TSortBy) => {},
    haveTasks: () => false,
});

export function ProjectsTasksProvider({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<TTask[]>();
console.log(data);
const [tasks, setTasks] = useState<TTask[]>(data);

  function handleReorder() {
    setTasks((prevTasks) => {
      const newTasks =  prevTasks.map((task, index) => {
        return {...task, posindex: index};
      })
      savePositions(newTasks);
      return newTasks;
    })
  }


  function addTask(newTask: TTask) {
    setTasks((prevTaskItems) => {
      const allTasks = [newTask, ...prevTaskItems];
      saveTask(newTask);
      return [...allTasks];
    });
  }
  
  async function deleteTask(taskId: string) {
    await deleteTaskinSupabase(taskId);
    setTasks((prevTaskItems) => {
      const allTasks = prevTaskItems.filter((task) => task.uuid !== taskId);
      return allTasks;
    });
  }
  
  function updateTask(taskId: string) {
    let allTasks: TTask[] = [];
      setTasks((prevTaskItems) => {
        allTasks = prevTaskItems.map((task) => {
          return task.uuid === taskId ? {...task, updating: true} : task;
        });

        const updatedTask = allTasks.find((task) => task.uuid === taskId);
        if(updatedTask) {
           update(updatedTask);
        }
        return allTasks;
      });
  }
  
   async function updateTaskDetails(updatedTask: TTask) {  
     await update(updatedTask);
     setTasks((prevTaskItems) => {
       const allTasks = prevTaskItems.map((task) => {
         return task.uuid === updatedTask.uuid ? updatedTask : task;
       });
       
       return allTasks;
     });
   }

  function updateTaskText(taskId: string, newText: string) {
    setTimeout(() => {
      setTasks((prevTaskItems) => {
        const allTasks = prevTaskItems.map((item) => {
          return item.uuid === taskId ? {...item, description: newText, updating: false} : item;
        });
        update(allTasks.find((task) => task.uuid === taskId)!);
        return allTasks;
      });
    }, 250);
  }
  
  function completeTask(taskId: string) {
      setTasks((prevTaskItems) => {
        const allTasks =  prevTaskItems.map((task) => {
          return task.uuid === taskId ? {...task, completed: !task.completed} : task;
        });
        update(allTasks.find((task) => task.uuid === taskId)!);
        return allTasks;
      });
  }

  function cancel(id: string) {
    setTimeout(() => {

      setTasks((prevTasks) => {
        const allTasks =  prevTasks.map((task) => {
          return task.uuid === id ? {...task, updating: false} : task;
        });
        return allTasks;
      })
    }, 250);
  }

  // Sortiert bewusst NICHT um: die Reihenfolge gehoert dem Nutzer, seit die
  // Liste per Drag&Drop geordnet werden kann. Sonst wuerde jeder Prioritaets-
  // Klick die manuelle Ordnung wieder verwerfen.
  function addPriority(e: React.MouseEvent, taskId: string, priority: TPriority) {
    e.stopPropagation();
    setTasks((prevTasks) => {
      const uTasks = prevTasks.map((task) => {
        return task.uuid === taskId ? {...task, priority: priority} : task;
      });
      update(uTasks.find((task) => { return taskId === task.uuid})!)
      return uTasks;
    });
  }

  function sortTasks(criteria: TSortBy) {
    if(criteria === "date") {
      setTasks((prevTasks) => {
        const sortedTasks = sortByDate(prevTasks);
        return sortedTasks;
      })
    }
  }

  function haveTasks(): boolean {
    return tasks.length > 0;
  }

  function toggleNewProject() {
    setTasks((prevTasks) => {
      const allTasks = prevTasks.map((task, index) => {
        if(index === 0) {
          return {...task, newproject: !task.newproject};
        }
        return task;
      });
      return allTasks;
    });
  }
  

  return (
    <ProjectsTasksContext.Provider value={{
      tasks: tasks,
      toggleNewProject: toggleNewProject,
      setTasks: setTasks,
      addTask: addTask,
      updateTaskDetails: updateTaskDetails,
      updateTask: updateTask,
      handleReorder: handleReorder,
      deleteTask: deleteTask,
      updateTaskText: updateTaskText,
      completeTask: completeTask,
      cancel: cancel,
      addPriority: addPriority,
      sortTasks: sortTasks,
      haveTasks: haveTasks,
    }}>
      {children}
    </ProjectsTasksContext.Provider>
  );
};

export default ProjectsTasksProvider;