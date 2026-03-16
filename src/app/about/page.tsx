import Link from 'next/link';
import { Cpu, ArrowLeft, Terminal, Search, Layers, ShieldCheck, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-background">
              <Cpu size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-headline font-bold leading-none">Architect GPT</h1>
              <p className="text-[10px] uppercase tracking-tighter text-muted-foreground font-code">Codebase Anthropologist v1.0</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft size={16} />
                Back to Analyzer
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-16 max-w-4xl">
        <section className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h2 className="text-4xl font-headline font-bold text-primary">The Codebase Anthropologist</h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-body">
              Architect GPT isn't a documentation generator. It is a deep-tissue diagnostic tool designed to uncover the 
              <span className="italic text-foreground px-1">Semantic Intent</span> hidden within your software architecture.
            </p>
          </div>

          <div className="h-px bg-border/50 w-full my-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-secondary">
                <Terminal size={24} />
                <h3 className="text-xl font-headline font-semibold">Zero Redundancy</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Standard AI tools summarize what a class "is." We assume you can read the code. 
                Instead, we analyze the philosophy—explaining why a specific design pattern was chosen 
                and how it decouples your core engine from its peripheral tools.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Layers size={24} />
                <h3 className="text-xl font-headline font-semibold">Systems Thinking</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We map data flows across module boundaries. By identifying the "Contractual Responsibilities" 
                of each module, we provide a blueprint that helps developers understand the system's 
                entire skeletal structure, not just its individual bones.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-accent">
                <ShieldCheck size={24} />
                <h3 className="text-xl font-headline font-semibold">Health Audits</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Our analysis acts as a "Risk Mitigation" tool. We actively look for technical debt, 
                broken modularity, and areas where logic could be more automated or robust.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-foreground">
                <Search size={24} />
                <h3 className="text-xl font-headline font-semibold">Semantic Inference</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Powered by Genkit and Google Gemini 2.5 Flash, our agent performs three internal 
                reasoning steps: Structural Inference, Logic Decomposition, and Documentation Synthesis.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border p-8 rounded-2xl mt-16 space-y-6">
            <h3 className="text-2xl font-headline font-bold flex items-center gap-2">
              <Heart className="text-destructive fill-destructive" size={24} />
              Our Manifesto
            </h3>
            <p className="text-muted-foreground font-body italic leading-relaxed">
              "We believe that every codebase has a spirit—a fundamental intent that its original 
              architects poured into it. Over time, that intent becomes obscured by the friction of 
              feature requests and tight deadlines. Architect GPT is here to strip back those layers 
              and reveal the pure architectural philosophy underneath."
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 py-12 bg-card/10">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 opacity-50">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center text-background">
              <Cpu size={18} />
            </div>
            <span className="font-headline font-bold">Architect GPT</span>
          </div>
          <div className="text-xs font-code text-muted-foreground">
            Principia Architecture &copy; {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
}
