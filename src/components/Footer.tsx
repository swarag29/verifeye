import { Scan, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Scan className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-bold text-lg">Verifeye</span>
              <p className="text-xs text-secondary-foreground/70">
                Establishing media trust
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-secondary-foreground/10 text-center text-sm text-secondary-foreground/60">
          © 2024 Verifeye. Built for media authenticity.
        </div>
      </div>
    </footer>
  );
}
