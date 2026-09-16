
import {useContext, useState} from 'react';
import {ProjectsTasksContext} from "../store/projects-tasks-context.tsx";
import Task from '@/components/Task';
import {AnimatePresence, Reorder} from 'framer-motion';
import TaskList from '@/components/TaskList';
import Button from '@/components/Button.tsx';
import ConfirmModal from '@/components/ConfirmModal';

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
    <main className="hero w-full max-w-2xl mx-auto px-4 py-6 sm:px-6">
      <header>

        {completedTasks.length > 0 && (
          <Button variant='secondary' className='p-2 m-2 rounded' onClick={createConfirmModal}>Löschen</Button>
        )}
    
        {showConfirmModal && (
          <ConfirmModal onClose={destroyConfirmModal} onConfirm={async (e) => {await deleteAllCompletedTasks(); destroyConfirmModal(e)}}>
            <p className="text-sm sm:text-base">Bist du sicher, dass du alle erledigten Aufgaben löschen möchtest?</p>
          </ConfirmModal>
        )} 

      </header>
      <TaskList text="Erledigte Aufgaben">
        <Reorder.Group as="ul" axis="y" values={completedTasks} onReorder={datactx.setTasks}>
          <AnimatePresence initial={false}>
            {completedTasks.length > 0 ? (
              completedTasks.map(task => (
                <Task key={task.uuid} task={task} />
              ))
            ) : <p id="no-tasks">Keine erledigten Aufgaben</p>}  
          </AnimatePresence>
        </Reorder.Group>
      </TaskList>     
    </main>
  );
}