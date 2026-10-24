
import {useContext, useState} from 'react';
import {ProjectsTasksContext} from "../store/projects-tasks-context.tsx";
import TaskList from '@/components/TaskList';
import Button from '@/components/Button.tsx';
import ConfirmModal from '@/components/ConfirmModal';
import Title from '@/components/title/Title.tsx';

export default function CompletedPage() {
  const datactx = useContext(ProjectsTasksContext);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const completedTasks = datactx.tasks.filter(task => task.completed);

  async function deleteAllCompletedTasks() {
    for(const task of completedTasks) {
      await datactx.deleteTask(task.uuid);
    }
  }

  function createConfirmModal() {
    setShowConfirmModal(true);
  }

  function destroyConfirmModal(e: React.MouseEvent) {
    e.stopPropagation();
    setShowConfirmModal(false);
  }

  return (

    <div className='hero w-full max-w-2xl mx-auto px-4 py-6 sm:px-6'>

    <Title text="Erledigte Aufgaben"/>
    <main className="hero w-full max-w-2xl mx-auto px-4 py-6 sm:px-6">
      <section>

        {completedTasks.length > 0 && (
          <Button variant='secondary' className='p-2 m-2 rounded' onClick={createConfirmModal}>Löschen</Button>
        )}
    
        {showConfirmModal && (
          <ConfirmModal onClose={destroyConfirmModal} onConfirm={async (e) => {await deleteAllCompletedTasks(); destroyConfirmModal(e)}}>
            <p className="text-sm sm:text-base">Bist du sicher, dass du alle erledigten Aufgaben löschen möchtest?</p>
          </ConfirmModal>
        )} 

      </section>
      <TaskList  tasks={completedTasks} projectId={''}>
      </TaskList>
    </main>
    </div>
  );
}