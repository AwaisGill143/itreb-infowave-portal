
import { Calendar, Users, Briefcase } from "lucide-react";

interface NavigationMenuProps {
  scrollToSection: (sectionId: string) => void;
}

const NavigationMenu = ({ scrollToSection }: NavigationMenuProps) => {
  return (
    <nav className="bg-religious-600 text-white sticky top-16 z-40">
      <div className="container mx-auto px-6">
        <div className="flex justify-center space-x-8 py-4">
          <button 
            onClick={() => scrollToSection('upcoming-events')}
            className="hover:text-religious-200 transition-colors flex items-center space-x-1"
          >
            <Calendar className="w-4 h-4" />
            <span>Upcoming Events</span>
          </button>
          <button 
            onClick={() => scrollToSection('opportunities')}
            className="hover:text-religious-200 transition-colors flex items-center space-x-1"
          >
            <Briefcase className="w-4 h-4" />
            <span>Opportunities</span>
          </button>
          <button 
            onClick={() => scrollToSection('achievements')}
            className="hover:text-religious-200 transition-colors flex items-center space-x-1"
          >
            <Users className="w-4 h-4" />
            <span>Achievements</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
