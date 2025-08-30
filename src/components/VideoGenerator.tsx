
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Download, Mic, Music, Video, Wand2, RectangleHorizontal } from "lucide-react";
import { toast } from "sonner";
import AIAssistant from "./AIAssistant";

interface VideoSettings {
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  music?: string;
  voice?: string;
  duration?: number;
}

const VideoGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedMusic, setSelectedMusic] = useState("");
  const [aspectRatio, setAspectRatio] = useState<'landscape' | 'portrait' | 'square'>('landscape');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a video prompt");
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    // Simulate video generation progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          toast.success("Video generated successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 800);
  };

  const voices = [
    { id: "aria", name: "Aria - Professional Female" },
    { id: "roger", name: "Roger - Confident Male" },
    { id: "sarah", name: "Sarah - Warm Female" },
    { id: "charlie", name: "Charlie - Energetic Male" },
  ];

  const musicOptions = [
    { id: "cinematic", name: "Cinematic Epic" },
    { id: "upbeat", name: "Upbeat Pop" },
    { id: "ambient", name: "Ambient Chill" },
    { id: "corporate", name: "Corporate Inspiring" },
  ];

  const aspectRatioOptions = [
    { id: "landscape", name: "Landscape (16:9)", icon: "📱" },
    { id: "portrait", name: "Portrait (9:16)", icon: "📱" },
    { id: "square", name: "Square (1:1)", icon: "⬜" },
  ];

  const handleAISettingsUpdate = (settings: VideoSettings) => {
    if (settings.aspectRatio) setAspectRatio(settings.aspectRatio);
    if (settings.music) setSelectedMusic(settings.music);
    if (settings.voice) setSelectedVoice(settings.voice);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Create Your Video</h2>
        <p className="text-muted-foreground text-lg">Enter your prompt and customize the settings</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <Card className="card-cosmic">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="w-5 h-5 mr-2 text-primary" />
              Video Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Prompt Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Video Prompt</label>
              <Textarea
                placeholder="Describe your video... e.g., 'A serene mountain landscape at sunset with flying birds'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="input-cosmic min-h-[120px] resize-none"
              />
            </div>

            {/* Voice Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <Mic className="w-4 h-4 mr-1 text-primary" />
                AI Voice
              </label>
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger className="input-cosmic">
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Music Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <Music className="w-4 h-4 mr-1 text-accent" />
                Background Music
              </label>
              <Select value={selectedMusic} onValueChange={setSelectedMusic}>
                <SelectTrigger className="input-cosmic">
                  <SelectValue placeholder="Select music style" />
                </SelectTrigger>
                <SelectContent>
                  {musicOptions.map((music) => (
                    <SelectItem key={music.id} value={music.id}>
                      {music.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Aspect Ratio Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <RectangleHorizontal className="w-4 h-4 mr-1 text-primary" />
                Video Format
              </label>
              <Select value={aspectRatio} onValueChange={(value: 'landscape' | 'portrait' | 'square') => setAspectRatio(value)}>
                <SelectTrigger className="input-cosmic">
                  <SelectValue placeholder="Select aspect ratio" />
                </SelectTrigger>
                <SelectContent>
                  {aspectRatioOptions.map((ratio) => (
                    <SelectItem key={ratio.id} value={ratio.id}>
                      <span className="flex items-center">
                        <span className="mr-2">{ratio.icon}</span>
                        {ratio.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="btn-cosmic w-full"
            >
              <Wand2 className="w-5 h-5 mr-2" />
              {isGenerating ? "Generating..." : "Generate Video"}
            </Button>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card className="card-cosmic">
          <CardHeader>
            <CardTitle>Preview & Export</CardTitle>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="space-y-4">
                <div className={`bg-muted/20 rounded-lg flex items-center justify-center ${
                  aspectRatio === 'portrait' ? 'aspect-[9/16]' : 
                  aspectRatio === 'square' ? 'aspect-square' : 'aspect-video'
                }`}>
                  <div className="text-center">
                    <div className="animate-pulse-glow w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Generating your video...</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
            ) : progress === 100 ? (
              <div className="space-y-4">
                <div className={`bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center border border-primary/20 ${
                  aspectRatio === 'portrait' ? 'aspect-[9/16]' : 
                  aspectRatio === 'square' ? 'aspect-square' : 'aspect-video'
                }`}>
                  <div className="text-center">
                    <Video className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="font-medium">Video Ready!</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {aspectRatio} format
                    </p>
                  </div>
                </div>
                <Button className="btn-accent w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Video
                </Button>
              </div>
            ) : (
              <div className={`bg-muted/10 rounded-lg flex items-center justify-center border border-dashed border-border ${
                aspectRatio === 'portrait' ? 'aspect-[9/16]' : 
                aspectRatio === 'square' ? 'aspect-square' : 'aspect-video'
              }`}>
                <div className="text-center text-muted-foreground">
                  <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Your video will appear here</p>
                  <p className="text-sm mt-1">{aspectRatio} format</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Assistant */}
        <AIAssistant onVideoSettingsUpdate={handleAISettingsUpdate} />
      </div>
    </div>
  );
};

export default VideoGenerator;
