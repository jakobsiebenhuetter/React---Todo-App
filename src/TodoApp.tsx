import './App.css';


import AddTask from "./components/AddTask.tsx";
import TaskList from "./components/TaskList.tsx";

import {useContext} from 'react';
import {ProjectsTasksContext} from './store/projects-tasks-context';

/**
 * <TaskList text="Aufgabenliste - Allgemein" /> props mit items erweitern und projectid
 * //TODO - DropDown Componente modularer gestalten, nur die Items übergeben vom parent und eine feste json Struktur verwenden
 * //TODO - Jetzt Aufgaben mit den Projekten verknüpfen und die Projektpage etwas verändern, Projekte soll man löschen können
 * //TODO - Cleanen, Korrekturen wie Priorität auch auf TaskDetailpage zeigen und bearbeiten können und diesen Patch dann frei geben
 * //TODO - Und Langsam loading Spinner und ein gscheites Icon erstellen
 * //TODO - Redux Toolkit später eventuell einbauen
 * //TODO - Etwas mehr Animationen einbauen
 * //TODO - Multiselect aktivieren
 * //NOTE - Es wird ein Optimistic UI Ansatz verwendet, d.h. Änderungen werden sofort in der UI angezeigt, bevor sie tatsächlich in der Datenbank gespeichert sind.
 */

export default function TodoApp() {
  const data = useContext(ProjectsTasksContext);
  const activeTasks = data?.tasks?.filter(task => !task.completed) || [];
  console.log(data)
  return (
    <>
      <main className="hero w-full max-w-2xl mx-auto px-4 py-6 sm:px-6">
        <AddTask addTask={data.addTask} projectId={''} />
        <TaskList tasks={activeTasks.filter(task => !task.project)} projectId={''} text="Aufgabenliste - Allgemein" />
      </main>
    </>
  );
}

