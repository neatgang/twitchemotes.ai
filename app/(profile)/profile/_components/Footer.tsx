import Link from "next/link";

export const Footer = () => (
  <footer className="flex items-center justify-between px-4 py-2 border-t dark:border-gray-800">
    <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 EmoteMaker.ai</p>
    <nav className="flex items-center gap-4">
      <Link className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" href="#">
        Terms
      </Link>
      <Link className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" href="#">
        Privacy
      </Link>
    </nav>
  </footer>
);