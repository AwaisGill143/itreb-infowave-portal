
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-religious-600 to-religious-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <span className="text-2xl font-bold text-religious-800">ITREB</span>
        </div>
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            className="border-religious-600 text-religious-700 hover:bg-religious-50"
            onClick={() => window.location.href = '/join'}
          >
            Join ITREB
          </Button>
          <Button 
            className="bg-religious-600 hover:bg-religious-700"
            onClick={() => window.location.href = '/login'}
          >
            Log In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
