import './App.css';
import AddTask from "./components/AddTask.tsx";
import TaskList from "./components/TaskList.tsx";
import Title from './components/title/Title.tsx';
import {useContext} from 'react';
import {ProjectsTasksContext} from './store/projects-tasks-context';

/**
 * //TODO - Wenn ein Neues Projekt erstellt wird soll sofort zu dem Neuen Projekt weiter geleitet werden und Form des Projekts schöner machen z.b.: den Button
*   //TODO - Die Projektpage etwas verändern, Projekte soll man löschen können und dann auf die Allgemeine Seite zurücknavigiert werden
*  //TODO - Ein gscheites Icon erstellen
 * //TODO - Cleanen, Korrekturen wie Priorität auch auf TaskDetailpage zeigen und bearbeiten können und diesen Patch dann frei geben
 * //TODO - Redux Toolkit später eventuell einbauen
 * //TODO - Etwas mehr Animationen einbauen
 * //TODO - Multiselect aktivieren
 * //NOTE - Es wird ein Optimistic UI Ansatz verwendet, d.h. Änderungen werden sofort in der UI angezeigt, bevor sie tatsächlich in der Datenbank gespeichert sind.
 */

export default function TodoApp() {
  const data = useContext(ProjectsTasksContext);
  const activeTasks = data?.tasks?.filter(task => !task.completed) || [];

  return (
    <>
      <main className="hero w-full max-w-2xl mx-auto px-4 py-6 sm:px-6">
        <Title text="Aufgabenliste - Allgemein"></Title>
        <AddTask addTask={data.addTask} projectId={''} />
        <TaskList tasks={activeTasks.filter(task => !task.project)} projectId={''} />
      </main>
    </>
  );
}

