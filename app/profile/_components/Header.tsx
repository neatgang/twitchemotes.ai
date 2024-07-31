import Link from "next/link";


export const Header = () => (
  <header className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-800">
    <Link className="flex items-center gap-2" href="#">
      {/* <SmileIcon className="w-6 h-6" /> */}
      <span className="font-semibold text-gray-900 dark:text-white">EmoteMaker.ai</span>
    </Link>
    <nav className="flex items-center gap-4">
      <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" href="#">
        Account
      </Link>
      <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" href="#">
        Notifications
      </Link>
      <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" href="#">
        Support
      </Link>
    </nav>
  </header>
);