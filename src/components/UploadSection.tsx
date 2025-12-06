import { useState, useCallback } from "react";
import { Upload, Link, Check, AlertTriangle, Loader2, X, Image, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ScanResult {
  isAuthentic: boolean;
  confidence: number;
  detectionReasons: string[];
  analysisTime: number;
}

export function UploadSection() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<"image" | "video">("image");

  const simulateScan = useCallback(() => {
    setIsScanning(true);
    setScanResult(null);
    
    setTimeout(() => {
      const isAuthentic = Math.random() > 0.5;
      setScanResult({
        isAuthentic,
        confidence: 0.85 + Math.random() * 0.14,
        detectionReasons: isAuthentic
          ? [
              "Natural noise patterns detected",
              "Authentic compression artifacts",
              "Realistic texture gradients",
            ]
          : [
              "GAN fingerprint patterns found",
              "Unnatural smoothness detected",
              "Frequency anomalies present",
            ],
        analysisTime: Math.floor(70 + Math.random() * 50),
      });
      setIsScanning(false);
    }, 800 + Math.random() * 400);
  }, []);

  const handleFileUpload = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setScanResult(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleVideoSubmit = useCallback(() => {
    if (videoUrl.trim()) {
      simulateScan();
    }
  }, [videoUrl, simulateScan]);

  const clearUpload = useCallback(() => {
    setUploadedImage(null);
    setScanResult(null);
    setVideoUrl("");
  }, []);

  return (
    <section id="upload" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Test Your Media
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Upload an image or paste a video link to analyze it with Verifeye's
            detection technology.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <Button
            variant={activeTab === "image" ? "default" : "outline"}
            onClick={() => { setActiveTab("image"); clearUpload(); }}
            className="gap-2"
          >
            <Image className="w-4 h-4" />
            Image Upload
          </Button>
          <Button
            variant={activeTab === "video" ? "default" : "outline"}
            onClick={() => { setActiveTab("video"); clearUpload(); }}
            className="gap-2"
          >
            <Video className="w-4 h-4" />
            Video Link
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          {activeTab === "image" ? (
            /* Image Upload */
            <div className="space-y-6">
              {!uploadedImage ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={cn(
                    "border-2 border-dashed rounded-xl p-12 text-center transition-all",
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    Drop your image here
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse files
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" asChild>
                      <span>Choose File</span>
                    </Button>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden bg-muted">
                    <img
                      src={uploadedImage}
                      alt="Uploaded media"
                      className="w-full max-h-96 object-contain"
                    />
                    <button
                      onClick={clearUpload}
                      className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    {/* Result overlay */}
                    {scanResult && (
                      <div className="absolute top-3 left-3">
                        <ResultBadge result={scanResult} />
                      </div>
                    )}
                  </div>
                  
                  <Button
                    onClick={simulateScan}
                    disabled={isScanning}
                    className="w-full gap-2"
                    size="lg"
                  >
                    {isScanning ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Analyze Image
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            /* Video Link */
            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="url"
                    placeholder="Paste video URL (YouTube, Vimeo, etc.)"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  onClick={handleVideoSubmit}
                  disabled={!videoUrl.trim() || isScanning}
                  className="gap-2"
                >
                  {isScanning ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Analyze"
                  )}
                </Button>
              </div>

              {scanResult && (
                <div className="p-6 rounded-xl bg-card border border-border">
                  <ResultBadge result={scanResult} expanded />
                </div>
              )}

              <p className="text-xs text-muted-foreground text-center">
                Supports YouTube, Vimeo, and direct video URLs
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface ResultBadgeProps {
  result: ScanResult;
  expanded?: boolean;
}

function ResultBadge({ result, expanded = false }: ResultBadgeProps) {
  return (
    <div
      className={cn(
        "rounded-lg shadow-xl overflow-hidden",
        result.isAuthentic
          ? "bg-success text-success-foreground"
          : "bg-warning text-warning-foreground"
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3">
        {result.isAuthentic ? (
          <Check className="w-5 h-5" />
        ) : (
          <AlertTriangle className="w-5 h-5" />
        )}
        <span className="font-bold">
          {result.isAuthentic ? "Human" : "AI"}
        </span>
        <span className="ml-auto font-mono text-sm">
          {Math.round(result.confidence * 100)}%
        </span>
      </div>

      {expanded && (
        <div className="px-4 pb-4 bg-card text-card-foreground space-y-3">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full",
                result.isAuthentic ? "bg-success" : "bg-warning"
              )}
              style={{ width: `${result.confidence * 100}%` }}
            />
          </div>
          
          <ul className="text-sm space-y-1">
            {result.detectionReasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0",
                  result.isAuthentic ? "bg-success" : "bg-warning"
                )} />
                {reason}
              </li>
            ))}
          </ul>
          
          <div className="text-xs text-muted-foreground pt-2 border-t border-border">
            Analysis time: <span className="font-mono">{result.analysisTime}ms</span>
          </div>
        </div>
      )}
    </div>
  );
}
