import { TProject } from '../../types';
import classes from './ProjectInfo.module.css';

interface ProjectInfoProps {
    project: TProject;
    activeCount: number;
    completedCount: number;
}

function formatDate(date: Date): string | null {
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) {
        return null;
    }
    return parsed.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function ProjectInfo({ project, activeCount, completedCount }: ProjectInfoProps) {
    const createdAt = formatDate(project.createdat);

    return (
        <section className={classes.projectInfo}>
            <div className={classes.main}>
                <span className={classes.label}>Projekt</span>
                <h1 className={classes.title}>{project.title || 'Unbenanntes Projekt'}</h1>
                {project.description
                    ? <p className={classes.description}>{project.description}</p>
                    : <p className={`${classes.description} ${classes.empty}`}>Keine Beschreibung</p>}
            </div>

            <dl className={classes.stats}>
                <div className={classes.stat}>
                    <dt className={classes.label}>Offen</dt>
                    <dd className={classes.value}>{activeCount}</dd>
                </div>
                <div className={classes.stat}>
                    <dt className={classes.label}>Erledigt</dt>
                    <dd className={classes.value}>{completedCount}</dd>
                </div>
                {createdAt && (
                    <div className={classes.stat}>
                        <dt className={classes.label}>Erstellt</dt>
                        <dd className={classes.value}>{createdAt}</dd>
                    </div>
                )}
            </dl>
        </section>
    );
}
