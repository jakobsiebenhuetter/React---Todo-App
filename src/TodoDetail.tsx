import {useParams} from 'react-router';

export default function TodoDetail() {
    const params = useParams();

    function getTaskById(id: string = '') {
      const tasks = localStorage.getItem('tasks');
      if(tasks?.length) {
        const parsedTasks = JSON.parse(tasks);
        return parsedTasks.find((task) => task.id === id);
      }
    }

    const task = getTaskById(params.id);

  return (
    <>
      <h1>Hier sind Details über das Todo</h1>
      <p>Das ist dein Task {params.id}</p>
      <p>Das ist die Task: {task.text}</p>
    </>
  );
}
