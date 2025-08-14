import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="flex justify-center min-w-screen border-t border-green-400">
      <a
        href="https://github.com/caduvt"
        target="_blank"
        className="flex gap-1 m-4 hover:scale-105 duration-200"
      >
        <Github />
        <span>made by caduvt</span>
      </a>
    </footer>
  );
}
