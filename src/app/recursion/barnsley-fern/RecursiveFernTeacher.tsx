'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ZoomIn, ZoomOut, Play, Pause, RefreshCcw } from 'lucide-react';

// Define types for our data structures
interface Transform {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  p: number;
  color: string;
  name: string;
  description: string;
}

interface Point {
  x: number;
  y: number;
  color: string;
  transformType: string;
  iteration: number;
}

interface TeachingStep {
  title: string;
  content: string;
}

interface ViewOffset {
  x: number;
  y: number;
}

interface CanvasSize {
  width: number;
  height: number;
}

export const RecursiveFernTeacher: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [zoom, setZoom] = useState<number>(50);
  const [iterations, setIterations] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(50);
  const [selectedTransform, setSelectedTransform] = useState<Transform | null>(null);
  const [step, setStep] = useState<number>(0);
  const [viewOffset, setViewOffset] = useState<ViewOffset>({ x: 0, y: 0 });
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const canvasSize: CanvasSize = { width: 600, height: 600 };

  const teachingSteps: TeachingStep[] = [
    {
      title: "Understanding Recursion in Nature",
      content: "The Barnsley Fern demonstrates how complex natural patterns emerge from simple recursive rules. Each part of the fern is a smaller copy of the whole fern.",
    },
    {
      title: "Four Basic Transformations",
      content: "The fern is created using four simple transformations: Main stem (red), Smaller copies (green), Left leaflet (blue), and Right leaflet (purple). Each transformation creates a smaller copy of the entire pattern.",
    },
    {
      title: "Self-Similarity",
      content: "Notice how each colored section contains a complete miniature version of the fern. This is a key feature of recursive patterns in nature - the whole is made up of smaller copies of itself.",
    },
    {
      title: "Growth Pattern",
      content: "Watch how the pattern builds up over time. Each new point follows one of the four transformations, gradually revealing the complete structure. This mirrors how plants grow in nature.",
    }
  ];

  const transforms: Transform[] = [
    { 
      a: 0, b: 0, c: 0, d: 0.16, e: 0, f: 0, p: 0.01, 
      color: '#FF6B6B', 
      name: 'Main Stem',
      description: 'Creates the central stem of the fern'
    },
    { 
      a: 0.85, b: 0.04, c: -0.04, d: 0.85, e: 0, f: 1.6, p: 0.85, 
      color: '#4ECB71', 
      name: 'Successive Copies',
      description: 'Generates smaller copies of the entire fern pattern'
    },
    { 
      a: 0.2, b: -0.26, c: 0.23, d: 0.22, e: 0, f: 1.6, p: 0.07, 
      color: '#4A90E2', 
      name: 'Left Leaflet',
      description: 'Creates the left-side branching pattern'
    },
    { 
      a: -0.15, b: 0.28, c: 0.26, d: 0.24, e: 0, f: 0.44, p: 0.07, 
      color: '#9B59B6', 
      name: 'Right Leaflet',
      description: 'Creates the right-side branching pattern'
    }
  ];

  const generateNextPoints = (currentPoints: Point[], numNewPoints: number = 100): Point[] => {
    const newPoints = [...currentPoints];
    let x = currentPoints.length > 0 ? currentPoints[currentPoints.length - 1].x : 0;
    let y = currentPoints.length > 0 ? currentPoints[currentPoints.length - 1].y : 0;

    for (let i = 0; i < numNewPoints; i++) {
      const r = Math.random();
      let prob = 0;
      let transform: Transform | undefined;

      for (const t of transforms) {
        prob += t.p;
        if (r <= prob) {
          transform = t;
          break;
        }
      }

      if (!transform) continue;

      const newX = transform.a * x + transform.b * y + transform.e;
      const newY = transform.c * x + transform.d * y + transform.f;
      
      newPoints.push({ 
        x: newX, 
        y: newY, 
        color: transform.color,
        transformType: transform.name,
        iteration: iterations + i
      });

      x = newX;
      y = newY;
    }

    return newPoints;
  };

  const drawPoints = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    points.forEach(point => {
      const screenX = (point.x * zoom) + canvas.width/2 + viewOffset.x;
      const screenY = canvas.height - (point.y * zoom) + viewOffset.y;

      ctx.fillStyle = selectedTransform ? 
        (point.transformType === selectedTransform.name ? point.color : '#333333') : 
        point.color;
      
      ctx.globalAlpha = selectedTransform ? 
        (point.transformType === selectedTransform.name ? 0.8 : 0.2) : 
        0.6;
      
      ctx.fillRect(screenX, screenY, 2, 2);
    });
  };

  const animate = (): void => {
    if (isPlaying) {
      setPoints(prevPoints => generateNextPoints(prevPoints, speed));
      setIterations(prev => prev + speed);
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, speed]);

  useEffect(() => {
    drawPoints();
  }, [points, zoom, selectedTransform, viewOffset]);

  const handleReset = (): void => {
    setPoints([]);
    setIterations(0);
    setIsPlaying(false);
    setSelectedTransform(null);
    setStep(0);
    setViewOffset({ x: 0, y: 0 });
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };


  return (
    <div className="max-w-7xl mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recursive Barnsley Fern</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main visualization area */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-full aspect-[4/3]">
                  <canvas
                    ref={canvasRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                    className="absolute top-0 left-0 w-full h-full border border-gray-200 rounded bg-black"
                    style={{ maxHeight: '600px' }}
                  />
                </div>
  
                <div className="w-full max-w-xl space-y-6">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                      onClick={() => setZoom(z => Math.max(10, z - 10))}
                    >
                      <ZoomOut className="h-6 w-6 text-blue-600" />
                    </button>
                    
                    <button
                      className="p-4 rounded-full bg-green-100 hover:bg-green-200"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? 
                        <Pause className="h-8 w-8 text-green-600" /> : 
                        <Play className="h-8 w-8 text-green-600" />
                      }
                    </button>
                    
                    <button
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                      onClick={() => setZoom(z => Math.min(200, z + 10))}
                    >
                      <ZoomIn className="h-6 w-6 text-blue-600" />
                    </button>
                    
                    <button
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200"
                      onClick={handleReset}
                    >
                      <RefreshCcw className="h-6 w-6 text-red-600" />
                    </button>
                  </div>
  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Growth Speed</p>
                    <Slider
                      value={[speed]}
                      onValueChange={(value) => setSpeed(value[0])}
                      min={10}
                      max={200}
                      step={10}
                    />
                  </div>
  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Total Points: {points.length.toLocaleString()}</p>
                    <p>Iterations: {iterations.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Information Panel */}
            <div className="lg:w-80 flex-shrink-0 bg-gray-50 p-6 rounded-lg">
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">
                  {teachingSteps[step].title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {teachingSteps[step].content}
                </p>
                <div className="flex justify-between">
                  <button
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => setStep(s => Math.max(0, s - 1))}
                    disabled={step === 0}
                  >
                    Previous
                  </button>
                  <button
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => setStep(s => Math.min(teachingSteps.length - 1, s + 1))}
                    disabled={step === teachingSteps.length - 1}
                  >
                    Next
                  </button>
                </div>
              </div>
  
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Transformation Types</h3>
                <div className="space-y-3">
                  {transforms.map((t, i) => (
                    <div
                      key={i}
                      className="p-3 rounded bg-white shadow-sm cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedTransform(selectedTransform?.name === t.name ? null : t)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: t.color }}
                        />
                        <p className="font-medium">{t.name}</p>
                      </div>
                      <p className="text-sm text-gray-600">{t.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};