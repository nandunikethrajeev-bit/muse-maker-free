
import { Button } from "@/components/ui/button";
import { Home, Sparkles, Video, Music, Settings } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-cosmic rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">MuseMaker</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="flex items-center text-sm hover:text-primary transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Home
            </a>
            <a href="#" className="flex items-center text-sm hover:text-primary transition-colors">
              <Video className="w-4 h-4 mr-1" />
              Create
            </a>
            <a href="#" className="flex items-center text-sm hover:text-primary transition-colors">
              <Music className="w-4 h-4 mr-1" />
              Gallery
            </a>
            <a href="#" className="flex items-center text-sm hover:text-primary transition-colors">
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </a>
          </div>

          {/* CTA Button */}
          <Button className="btn-cosmic">
            Get Started Free
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
