import { Scan, Shield } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center animate-glow">
              <Scan className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">
              Verifeye
            </h1>
            <p className="text-xs text-muted-foreground">
              AI Media Detection
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <a
            href="#demo"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Demo
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </a>
        </nav>
      </div>
    </header>
  );
}
