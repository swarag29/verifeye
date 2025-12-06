import { useState, useCallback } from "react";
import { Check, AlertTriangle, Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScanResult {
  isAuthentic: boolean;
  confidence: number;
  detectionReasons: string[];
  analysisTime: number;
}

interface ScannerCardProps {
  imageSrc: string;
  actualResult: ScanResult;
  title?: string;
}

export function ScannerCard({ imageSrc, actualResult, title }: ScannerCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (!hasScanned) {
      setIsScanning(true);
      // Simulate scanning time
      setTimeout(() => {
        setIsScanning(false);
        setHasScanned(true);
      }, 80 + Math.random() * 40); // 80-120ms to simulate real detection
    }
  }, [hasScanned]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setShowDetails(false);
  }, []);

  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={imageSrc}
          alt={title || "Media sample"}
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            isHovered && "scale-105"
          )}
        />
      </div>

      {/* Scanning overlay */}
      {isScanning && (
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center animate-fade-in">
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-scanner-glow animate-scan-pulse" />
              <Loader2 className="w-6 h-6 text-scanner-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
            </div>
            <span className="text-xs font-mono text-scanner-glow">Scanning...</span>
          </div>
        </div>
      )}

      {/* Result badge */}
      {hasScanned && !isScanning && (
        <div
          className="absolute top-3 right-3 animate-slide-up"
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
        >
          <ResultBadge
            isAuthentic={actualResult.isAuthentic}
            confidence={actualResult.confidence}
            expanded={showDetails}
            detectionReasons={actualResult.detectionReasons}
            analysisTime={actualResult.analysisTime}
          />
        </div>
      )}

      {/* Hover border effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-lg border-2 transition-all duration-300 pointer-events-none",
          isHovered && hasScanned
            ? actualResult.isAuthentic
              ? "border-success shadow-[0_0_15px_hsl(var(--success)/0.5)]"
              : "border-warning shadow-[0_0_15px_hsl(var(--warning)/0.5)]"
            : "border-transparent"
        )}
      />

      {/* Title overlay */}
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3">
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
      )}
    </div>
  );
}

interface ResultBadgeProps {
  isAuthentic: boolean;
  confidence: number;
  expanded: boolean;
  detectionReasons: string[];
  analysisTime: number;
}

function ResultBadge({
  isAuthentic,
  confidence,
  expanded,
  detectionReasons,
  analysisTime,
}: ResultBadgeProps) {
  return (
    <div
      className={cn(
        "rounded-lg shadow-xl transition-all duration-300 overflow-hidden",
        isAuthentic
          ? "bg-success text-success-foreground"
          : "bg-warning text-warning-foreground",
        expanded ? "w-64" : "w-auto"
      )}
    >
      {/* Compact badge */}
      <div className="flex items-center gap-2 px-3 py-2">
        {isAuthentic ? (
          <Check className="w-4 h-4" />
        ) : (
          <AlertTriangle className="w-4 h-4" />
        )}
        <span className="font-semibold text-sm">
          {isAuthentic ? "Human" : "AI"}
        </span>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="px-3 pb-3 space-y-2 animate-slide-up bg-card text-card-foreground">
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground">Confidence</span>
            <span className="font-mono font-bold text-sm">
              {Math.round(confidence * 100)}%
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                isAuthentic ? "bg-success" : "bg-warning"
              )}
              style={{ width: `${confidence * 100}%` }}
            />
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <Info className="w-3 h-3" />
              Detection signals
            </div>
            <ul className="text-xs space-y-1">
              {detectionReasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0",
                    isAuthentic ? "bg-success" : "bg-warning"
                  )} />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-border flex justify-between text-xs text-muted-foreground">
            <span>Analysis time</span>
            <span className="font-mono">{analysisTime}ms</span>
          </div>
        </div>
      )}
    </div>
  );
}
