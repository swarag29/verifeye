import { ArrowDown, Shield, Zap, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-slide-up">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Real-Time Detection Technology
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-tight">
          Detect AI-Generated
          <br />
          <span className="text-primary">Media Instantly</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Verifeye uses advanced neural networks to identify synthetic content
          from Midjourney, DALL·E, Stable Diffusion, and more — in under 100ms.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            size="lg"
            className="gap-2 px-8"
            onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Eye className="w-4 h-4" />
            Try the Demo
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 px-8"
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
          >
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-12">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
              &lt;100
              <span className="text-primary">ms</span>
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              Detection Speed
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
              98
              <span className="text-primary">%</span>
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              Accuracy Rate
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
              10
              <span className="text-primary">+</span>
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              AI Models
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
