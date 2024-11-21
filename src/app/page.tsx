import AddProjectForm from '@/components/project/AddProjectForm';
import { ProjectFormProvider } from '@/context/ProjectFormContext';

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl font-bold m-6 text-center">Apple Project Form</h1>
      <ProjectFormProvider>
        <AddProjectForm />
      </ProjectFormProvider>
    </main>
  );
}
