import { MousePointer2, Cpu, CheckCircle, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: MousePointer2,
    step: "01",
    title: "Hover Detection",
    description:
      "Mouse over any image or video element in your browser to trigger the analysis.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Neural Processing",
    description:
      "Our optimized CNN analyzes pixel patterns, frequency domains, and temporal consistency.",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Confidence Scoring",
    description:
      "The model calculates a probability score based on multiple detection signals.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Visual Feedback",
    description:
      "A color-coded badge appears instantly showing the classification and confidence level.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            SynthoScan seamlessly integrates real-time machine learning into your
            browsing experience.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}

                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
                  <step.icon className="w-7 h-7 text-primary" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
