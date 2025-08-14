import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TaskList from '@/components/TaskList';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-between items-center">
      <Header />
      <TaskList title="what do you want to do?" />
      <Footer />
    </div>
  );
}
