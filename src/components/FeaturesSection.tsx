import { Zap, Eye, Shield, Brain, Layers, Clock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Detection",
    description:
      "Results in under 100ms for a seamless, real-time user experience while browsing.",
  },
  {
    icon: Eye,
    title: "Universal Support",
    description:
      "Detects content from Midjourney, DALL·E, Stable Diffusion, Runway, Sora, and more.",
  },
  {
    icon: Brain,
    title: "Neural Analysis",
    description:
      "MobileNetV3 backbone with temporal analysis for both images and video frames.",
  },
  {
    icon: Layers,
    title: "Multi-Layer Scanning",
    description:
      "Analyzes pixel noise, Fourier frequencies, compression artifacts, and temporal shifts.",
  },
  {
    icon: Shield,
    title: "Trust Verification",
    description:
      "Establishes media authenticity with confidence scores and detection reasoning.",
  },
  {
    icon: Clock,
    title: "Real-Time Overlay",
    description:
      "Non-intrusive badges appear on hover with expandable details and heatmaps.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful Detection Features
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Built with cutting-edge ML technology for accurate, fast, and
            comprehensive synthetic media detection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
