import { CodebaseAnalyzer } from '@/components/CodebaseAnalyzer';
import { Toaster } from '@/components/ui/toaster';
import { Cpu, Github, Terminal, Info, Layout } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-background">
              <Cpu size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-headline font-bold leading-none">Architect GPT</h1>
              <p className="text-[10px] uppercase tracking-tighter text-muted-foreground font-code">Codebase Anthropologist v1.0</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Framework</a>
            <a href="#" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Manifesto</a>
            <a href="#" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Documentation</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-muted rounded-full transition-colors text-foreground/70">
              <Github size={20} />
            </a>
            <div className="h-6 w-px bg-border hidden sm:block"></div>
            <span className="hidden sm:block text-xs font-code text-primary">principal_architect@gpt</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 lg:py-20">
        {/* Hero Section */}
        <section className="mb-20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
            <Terminal size={14} />
            <span className="text-[10px] font-code uppercase tracking-wider font-bold">Principal Architect Role Assigned</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-headline font-bold max-w-4xl mx-auto leading-tight">
            Uncover the <span className="text-primary italic">Semantic Intent</span> of Your Software.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Deep-tissue codebase analysis to reveal architectural philosophy, state management, and modular boundaries beyond simple summaries.
          </p>
        </section>

        {/* Core Tool */}
        <section className="relative">
          {/* Decorative background elements */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
          
          <CodebaseAnalyzer />
        </section>

        {/* Features / Persona Details */}
        <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-border/30 pt-20">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center text-primary">
              <Info size={24} />
            </div>
            <h3 className="text-xl font-headline">Zero Redundancy</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We assume the reader can read code. Our analysis focuses on high-level patterns and the "why" behind design choices, not just documenting functions.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center text-secondary">
              <Layout size={24} />
            </div>
            <h3 className="text-xl font-headline">Systems Thinking</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Mapping out data flow across module boundaries and identifying how components talk to each other to form a cohesive "Core Engine."
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center text-accent">
              <Github size={24} />
            </div>
            <h3 className="text-xl font-headline">Anti-Slop Audit</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Identifying technical debt, broken modularity, and areas where automation could improve the system's overall architectural integrity.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-card/10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-50">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center text-background">
              <Cpu size={18} />
            </div>
            <span className="font-headline font-bold">Architect GPT</span>
          </div>
          
          <div className="text-xs font-code text-muted-foreground">
            &copy; {new Date().getFullYear()} Principia Architecture. Distributed Ledger of Semantic Intent.
          </div>

          <div className="flex gap-6 text-xs font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Terms of Inference</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy Schema</a>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
}
