
import { Button } from "@/components/ui/button";
import { PlayCircle, Sparkles, Wand2 } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Main heading */}
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-primary mr-3 animate-pulse" />
          <span className="text-sm font-medium text-primary uppercase tracking-wider">AI Video Generation</span>
          <Sparkles className="w-8 h-8 text-primary ml-3 animate-pulse" />
        </div>
        
        <h1 className="hero-title mb-6 leading-tight">
          Transform Ideas Into
          <br />
          <span className="relative">
            Stunning Videos
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-cosmic rounded-full"></div>
          </span>
        </h1>
        
        <p className="hero-subtitle mb-12 max-w-3xl mx-auto leading-relaxed">
          Create professional videos with AI-generated visuals, background music, and voiceovers. 
          Turn your imagination into reality with just a simple text prompt.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <Button className="btn-cosmic group">
            <Wand2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Start Creating Videos
          </Button>
          
          <Button variant="outline" className="btn-accent">
            <PlayCircle className="w-5 h-5 mr-2" />
            Watch Demo
          </Button>
        </div>
        
        {/* Feature badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
            AI Voiceover
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
            Background Music
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
            HD Export
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
            Free Forever
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
