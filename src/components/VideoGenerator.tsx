
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Download, Mic, Music, Video, Wand2 } from "lucide-react";
import { toast } from "sonner";

const VideoGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedMusic, setSelectedMusic] = useState("");
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

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Create Your Video</h2>
        <p className="text-muted-foreground text-lg">Enter your prompt and customize the settings</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
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
                <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center">
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
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center border border-primary/20">
                  <div className="text-center">
                    <Video className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="font-medium">Video Ready!</p>
                  </div>
                </div>
                <Button className="btn-accent w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Video
                </Button>
              </div>
            ) : (
              <div className="aspect-video bg-muted/10 rounded-lg flex items-center justify-center border border-dashed border-border">
                <div className="text-center text-muted-foreground">
                  <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Your video will appear here</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoGenerator;
