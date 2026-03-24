import { useSubjects } from '../../hook/useSubjects';
import SubjectCard from './components/SubjectCard';
import { Link } from '@tanstack/react-router';

const Subjects = () => {
    const { data: subjects, isLoading, error } = useSubjects();

    if (isLoading) return <div>Chargement des subjects...</div>;
    if (error) return <div>Erreur lors du chargement des subjects.</div>;

    return (
        <div className="px-6 py-8 space-y-6">
            <h1 className="text-3xl font-semibold tracking-wide">Subjects</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {subjects?.map((subject) => (
                    <Link to="/subjects/$id" params={{ id: subject.id.toString() }} key={subject.id}>
                        <SubjectCard subject={subject} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Subjects;
