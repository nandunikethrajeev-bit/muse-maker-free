import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, User, Video, Music, Mic, RectangleHorizontal, Settings } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  videoSettings?: VideoSettings;
}

interface VideoSettings {
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  music?: string;
  voice?: string;
  duration?: number;
}

interface AIAssistantProps {
  onVideoSettingsUpdate?: (settings: VideoSettings) => void;
}

const AIAssistant = ({ onVideoSettingsUpdate }: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI video assistant. I can help you customize your videos, answer questions, and suggest creative ideas. Try asking me to change video settings or get creative suggestions!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const parseVideoCommand = (message: string): VideoSettings | null => {
    const settings: VideoSettings = {};
    const lowerMessage = message.toLowerCase();

    // Aspect ratio detection
    if (lowerMessage.includes('landscape') || lowerMessage.includes('horizontal') || lowerMessage.includes('16:9')) {
      settings.aspectRatio = 'landscape';
    } else if (lowerMessage.includes('portrait') || lowerMessage.includes('vertical') || lowerMessage.includes('9:16')) {
      settings.aspectRatio = 'portrait';
    } else if (lowerMessage.includes('square') || lowerMessage.includes('1:1')) {
      settings.aspectRatio = 'square';
    }

    // Music detection
    if (lowerMessage.includes('cinematic')) settings.music = 'cinematic';
    if (lowerMessage.includes('upbeat') || lowerMessage.includes('pop')) settings.music = 'upbeat';
    if (lowerMessage.includes('ambient') || lowerMessage.includes('chill')) settings.music = 'ambient';
    if (lowerMessage.includes('corporate')) settings.music = 'corporate';

    // Voice detection
    if (lowerMessage.includes('aria') || lowerMessage.includes('female professional')) settings.voice = 'aria';
    if (lowerMessage.includes('roger') || lowerMessage.includes('male confident')) settings.voice = 'roger';
    if (lowerMessage.includes('sarah') || lowerMessage.includes('warm female')) settings.voice = 'sarah';
    if (lowerMessage.includes('charlie') || lowerMessage.includes('energetic male')) settings.voice = 'charlie';

    return Object.keys(settings).length > 0 ? settings : null;
  };

  const generateResponse = (userMessage: string, videoSettings?: VideoSettings): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Video customization responses
    if (videoSettings) {
      let response = "Great! I've updated your video settings:\n\n";
      
      if (videoSettings.aspectRatio) {
        response += `📱 Aspect Ratio: ${videoSettings.aspectRatio}\n`;
      }
      if (videoSettings.music) {
        response += `🎵 Background Music: ${videoSettings.music}\n`;
      }
      if (videoSettings.voice) {
        response += `🎤 AI Voice: ${videoSettings.voice}\n`;
      }
      
      response += "\nYour video will be generated with these new settings!";
      return response;
    }

    // Help and guidance
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return `I can help you with:

🎬 **Video Customization:**
- Change aspect ratio (landscape, portrait, square)
- Select background music styles
- Choose AI voice options
- Adjust video duration

💡 **Creative Assistance:**
- Generate video prompts
- Suggest visual themes
- Recommend music styles
- Provide storytelling tips

Just tell me what you'd like to change or ask any question!`;
    }

    // Creative prompts
    if (lowerMessage.includes('prompt') || lowerMessage.includes('idea') || lowerMessage.includes('creative')) {
      const prompts = [
        "A serene mountain landscape at golden hour with gentle clouds drifting by",
        "Abstract liquid art with flowing colors and smooth transitions",
        "A cozy coffee shop scene with steam rising from a warm cup",
        "Futuristic cityscape with neon lights and flying vehicles",
        "Peaceful ocean waves washing onto a pristine beach"
      ];
      return `Here's a creative video prompt for you:\n\n"${prompts[Math.floor(Math.random() * prompts.length)]}"\n\nWould you like me to suggest music and voice settings to match this theme?`;
    }

    // General responses
    if (lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
      return "You're welcome! Feel free to ask me anything about video creation or customization.";
    }

    return `I understand you're asking about "${userMessage}". While I'm focused on helping with video creation and customization, I can also provide general assistance. Would you like me to help you customize your video settings or do you have questions about video creation?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Parse for video settings
    const videoSettings = parseVideoCommand(input);
    
    // Simulate AI thinking delay
    setTimeout(() => {
      const response = generateResponse(input, videoSettings || undefined);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        videoSettings: videoSettings || undefined
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);

      // Update video settings if any were parsed
      if (videoSettings && onVideoSettingsUpdate) {
        onVideoSettingsUpdate(videoSettings);
        toast.success("Video settings updated!");
      }
    }, 1000);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getSettingIcon = (setting: string) => {
    switch (setting) {
      case 'aspectRatio': return <RectangleHorizontal className="w-3 h-3" />;
      case 'music': return <Music className="w-3 h-3" />;
      case 'voice': return <Mic className="w-3 h-3" />;
      default: return <Settings className="w-3 h-3" />;
    }
  };

  return (
    <Card className="card-cosmic h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="w-5 h-5 mr-2 text-primary" />
          AI Video Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
          <div className="space-y-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] p-3 rounded-xl whitespace-pre-wrap ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {message.content}
                  
                  {message.videoSettings && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {Object.entries(message.videoSettings).map(([key, value]) => (
                        <Badge key={key} variant="secondary" className="text-xs">
                          {getSettingIcon(key)}
                          <span className="ml-1">{value}</span>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-accent" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-muted p-3 rounded-xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-6 border-t border-border">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything or say 'make it portrait mode'..."
              className="input-cosmic flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="btn-cosmic px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;