import { ScannerCard } from "./ScannerCard";
import authentic1 from "@/assets/samples/authentic-1.jpg";
import authentic2 from "@/assets/samples/authentic-2.jpg";
import synthetic1 from "@/assets/samples/synthetic-1.jpg";
import synthetic2 from "@/assets/samples/synthetic-2.jpg";

const sampleImages = [
  {
    src: authentic1,
    title: "Portrait Photo",
    result: {
      isAuthentic: true,
      confidence: 0.94,
      detectionReasons: [
        "Natural skin texture patterns",
        "Realistic lighting gradients",
        "Authentic noise distribution",
      ],
      analysisTime: 87,
    },
  },
  {
    src: synthetic1,
    title: "AI Portrait",
    result: {
      isAuthentic: false,
      confidence: 0.97,
      detectionReasons: [
        "Symmetry anomalies detected",
        "Unnatural skin smoothness",
        "Frequency domain artifacts",
      ],
      analysisTime: 92,
    },
  },
  {
    src: authentic2,
    title: "Landscape Photo",
    result: {
      isAuthentic: true,
      confidence: 0.91,
      detectionReasons: [
        "Natural compression artifacts",
        "Authentic lens characteristics",
        "Realistic noise patterns",
      ],
      analysisTime: 78,
    },
  },
  {
    src: synthetic2,
    title: "AI Landscape",
    result: {
      isAuthentic: false,
      confidence: 0.99,
      detectionReasons: [
        "Impossible geometry detected",
        "Unnatural color gradients",
        "GAN fingerprint patterns",
      ],
      analysisTime: 84,
    },
  },
];

export function DemoSection() {
  return (
    <section id="demo" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Interactive Demo
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Hover over any image below to see Verifeye in action. The scanner
            analyzes pixel patterns, frequency domains, and compression artifacts
            in real-time.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {sampleImages.map((image, index) => (
            <ScannerCard
              key={index}
              imageSrc={image.src}
              title={image.title}
              actualResult={image.result}
            />
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          💡 Hover over the result badge for detailed analysis
        </p>
      </div>
    </section>
  );
}
