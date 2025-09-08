import NavLinks from './NavLinks';
import { ModeToggle } from './Theme';
import UserMenu from './UserMenu';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 shadow-sm border-b bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              Finance Tracker
            </h1>
            <nav className="hidden md:flex">
              <NavLinks />
            </nav>
          </div>

          <div className="flex gap-2">
            <UserMenu />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
