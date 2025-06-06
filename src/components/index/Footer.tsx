
import { ArrowUp } from "lucide-react";

interface FooterProps {
  scrollToTop: () => void;
}

const Footer = ({ scrollToTop }: FooterProps) => {
  return (
    <footer className="bg-religious-800 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center space-x-6">
          <button className="inline-flex items-center space-x-2 bg-religious-600 hover:bg-religious-700 px-6 py-3 rounded-lg transition-colors">
            <span>Contact Us</span>
          </button>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center space-x-2 bg-religious-600 hover:bg-religious-700 px-4 py-2 rounded-lg transition-colors ml-4"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-8 pt-8 border-t border-religious-700">
          <p className="text-religious-200">&copy; 2025 ITREB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
