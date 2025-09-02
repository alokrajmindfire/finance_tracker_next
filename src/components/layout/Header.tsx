import NavLinks from './NavLinks';
import UserMenu from './UserMenu';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-semibold text-gray-900">
              Finance Tracker
            </h1>
            <NavLinks />
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
