'use client';

import React, { useState } from 'react';
import { analyzeCodebase } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { FileCode, Search, Cpu, Download, Layers, ShieldCheck, Terminal, Braces, AlignLeft } from 'lucide-react';
import { ArchitectureDocument } from './ArchitectureDocument';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function CodebaseAnalyzer() {
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState<'json' | 'text'>('text');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const parseRawText = (text: string) => {
    const files: { filePath: string; content: string }[] = [];
    const sections = text.split(/^--- (.*?) ---$/m);
    
    // The first element might be empty if it starts with a separator
    for (let i = 1; i < sections.length; i += 2) {
      const filePath = sections[i].trim();
      const content = sections[i + 1]?.trim();
      if (filePath && content) {
        files.push({ filePath, content });
      }
    }
    return files;
  };

  const handleAnalyze = async () => {
    if (!input.trim()) {
      toast({
        title: "Empty Input",
        description: `Please provide your codebase ${inputType === 'json' ? 'JSON' : 'text'}.`,
        variant: "destructive"
      });
      return;
    }

    try {
      let codebase: any[];
      
      if (inputType === 'json') {
        codebase = JSON.parse(input);
        if (!Array.isArray(codebase)) {
          throw new Error("Input must be an array of {filePath, content}");
        }
      } else {
        codebase = parseRawText(input);
        if (codebase.length === 0) {
          throw new Error("No files found. Ensure you use the '--- path/to/file ---' separator format.");
        }
      }
      
      setIsAnalyzing(true);
      setResult(null);
      setProgress(10);
      
      // Artificial progress for better UX
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 500);

      const response = await analyzeCodebase(codebase);
      
      clearInterval(interval);
      setProgress(100);

      if (response.success) {
        setResult(response.markdown || '');
        toast({
          title: "Analysis Complete",
          description: "SYSTEM_ARCHITECTURE.md has been generated.",
        });
      } else {
        toast({
          title: "Analysis Failed",
          description: response.error,
          variant: "destructive"
        });
      }
    } catch (e: any) {
      toast({
        title: "Invalid Format",
        description: e.message || "Parsing failed. Please check your input format.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadDocument = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SYSTEM_ARCHITECTURE.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadExample = () => {
    if (inputType === 'json') {
      const example = [
        {
          filePath: "main.py",
          content: "def main():\n    print('Hello World')\n    runner = TaskRunner()\n    runner.run()"
        },
        {
          filePath: "runner.py",
          content: "class TaskRunner:\n    def run(self):\n        pass"
        }
      ];
      setInput(JSON.stringify(example, null, 2));
    } else {
      const example = `--- main.py ---
def main():
    print('Hello World')
    runner = TaskRunner()
    runner.run()

--- runner.py ---
class TaskRunner:
    def run(self):
        pass`;
      setInput(example);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-5 space-y-6 animate-slide-up">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <Terminal size={20} />
                <span className="text-xs font-code uppercase tracking-widest">Input Module</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-headline mt-2">Codebase Analysis</CardTitle>
            <CardDescription className="text-muted-foreground">
              Paste your codebase below to begin the architectural decomposition.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={inputType} onValueChange={(v) => { setInputType(v as any); setInput(''); }} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-background/30">
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <AlignLeft size={14} />
                  Raw Text
                </TabsTrigger>
                <TabsTrigger value="json" className="flex items-center gap-2">
                  <Braces size={14} />
                  JSON Payload
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="text" className="mt-0">
                <div className="relative group">
                  <Textarea
                    placeholder={"--- src/app.py ---\ncode here...\n\n--- src/utils.py ---\nmore code..."}
                    className="min-h-[400px] font-code text-sm bg-background/50 border-border group-focus-within:border-primary/50 transition-colors"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  {!input && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                      <FileCode size={48} />
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="json" className="mt-0">
                <div className="relative group">
                  <Textarea
                    placeholder='[{"filePath": "src/app.py", "content": "..."}]'
                    className="min-h-[400px] font-code text-sm bg-background/50 border-border group-focus-within:border-primary/50 transition-colors"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  {!input && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                      <Braces size={48} />
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3">
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing}
                className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold h-12"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <Cpu className="animate-spin" size={18} />
                    Synthesizing Architecture...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Search size={18} />
                    Begin Analysis
                  </span>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={loadExample}
                disabled={isAnalyzing}
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                Example
              </Button>
            </div>
            {isAnalyzing && (
              <div className="space-y-2 animate-pulse">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Semantic Inference in progress...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-1 bg-muted" />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-card/30 border border-border/50 space-y-2">
            <div className="text-secondary"><Layers size={20} /></div>
            <h4 className="text-sm font-semibold">Modular Blueprint</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">Mapping contractual responsibilities across module boundaries.</p>
          </div>
          <div className="p-4 rounded-lg bg-card/30 border border-border/50 space-y-2">
            <div className="text-primary"><ShieldCheck size={20} /></div>
            <h4 className="text-sm font-semibold">Health Audit</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">Identifying architectural risks and technical debt.</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        {result ? (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden min-h-[600px]">
            <CardHeader className="border-b border-border/50 bg-background/30 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-headline">SYSTEM_ARCHITECTURE.md</CardTitle>
                <CardDescription>Synthesized Architectural Document</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={downloadDocument}
                className="flex items-center gap-2 border-secondary/50 text-secondary hover:bg-secondary/10"
              >
                <Download size={16} />
                Export MD
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-8 document-view">
                <ArchitectureDocument markdown={result} />
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="h-[600px] flex flex-col items-center justify-center border-2 border-dashed border-border/50 rounded-xl bg-card/10 text-muted-foreground text-center p-12">
            <div className="mb-6 p-4 rounded-full bg-muted/20">
              <FileCode size={64} className="opacity-40" />
            </div>
            <h3 className="text-xl font-headline mb-2">Awaiting Codebase Input</h3>
            <p className="max-w-md mx-auto text-sm">
              The Principal Architect is ready to uncover the semantic intent of your system. 
              Provide your code context on the left using the raw text or JSON format.
            </p>
            <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest text-primary/60">
              <Search size={14} />
              <span>Deep-Tissue Analysis Pending</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
