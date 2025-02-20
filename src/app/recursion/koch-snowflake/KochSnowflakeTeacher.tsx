'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ZoomIn, ZoomOut, RefreshCcw } from 'lucide-react';

const teachingSteps = [
  {
    title: "Introduction to Koch Snowflake",
    content: "The Koch Snowflake is a fractal curve that demonstrates how simple recursive rules can create infinitely complex shapes. Starting with a triangle, each line is divided into four parts using a simple pattern."
  },
  {
    title: "The Basic Pattern",
    content: "Each straight line is divided into thirds. The middle third is replaced by two lines forming an equilateral triangle with the removed segment. This process repeats for each new line segment."
  },
  {
    title: "Infinite Perimeter, Finite Area",
    content: "One of the most fascinating properties of the Koch Snowflake is that while its perimeter becomes infinite as iterations increase, its area remains finite - demonstrating a key concept in fractal mathematics."
  },
  {
    title: "Natural Connections",
    content: "Similar patterns appear in nature, from coastlines to snowflakes. The principle of creating complex shapes from simple rules is fundamental to how nature builds intricate structures."
  }
];

interface Point {
  x: number;
  y: number;
}

export const KochSnowflakeTeacher = () => {
  const [iterations, setIterations] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [step, setStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasSize = { width: 800, height: 800 };

  const drawKochLine = (
    ctx: CanvasRenderingContext2D,
    start: Point,
    end: Point,
    depth: number
  ) => {
    if (depth === 0) {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      return;
    }

    const dx = end.x - start.x;
    const dy = end.y - start.y;

    // Calculate the four points
    const p1: Point = { x: start.x, y: start.y };
    const p2: Point = {
      x: start.x + dx / 3,
      y: start.y + dy / 3
    };
    const p3: Point = {
      x: start.x + dx / 2 - (dy * Math.sqrt(3) / 6),
      y: start.y + dy / 2 + (dx * Math.sqrt(3) / 6)
    };
    const p4: Point = {
      x: start.x + 2 * dx / 3,
      y: start.y + 2 * dy / 3
    };
    const p5: Point = { x: end.x, y: end.y };

    drawKochLine(ctx, p1, p2, depth - 1);
    drawKochLine(ctx, p2, p3, depth - 1);
    drawKochLine(ctx, p3, p4, depth - 1);
    drawKochLine(ctx, p4, p5, depth - 1);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up the drawing style
    ctx.strokeStyle = '#4A90E2';
    ctx.lineWidth = 1;

    // Calculate the size and position of the equilateral triangle
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = 300 * zoom;
    const height = size * Math.sqrt(3) / 2;

    // Calculate the three points of the triangle
    const points = [
      { x: centerX - size / 2, y: centerY + height / 3 },
      { x: centerX + size / 2, y: centerY + height / 3 },
      { x: centerX, y: centerY - 2 * height / 3 }
    ];

    // Draw the three sides
    for (let i = 0; i < 3; i++) {
      const nextI = (i + 1) % 3;
      drawKochLine(ctx, points[i], points[nextI], iterations);
    }
  };

  useEffect(() => {
    draw();
  }, [iterations, zoom]);

  return (
    <div className="max-w-7xl mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Koch Snowflake</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main visualization area */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-full aspect-square">
                  <canvas
                    ref={canvasRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                    className="absolute top-0 left-0 w-full h-full border border-gray-200 rounded bg-white"
                    style={{ maxHeight: '800px' }}
                  />
                </div>

                <div className="w-full max-w-xl space-y-6">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                      onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
                    >
                      <ZoomOut className="h-6 w-6 text-blue-600" />
                    </button>
                    
                    <button
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                      onClick={() => setZoom(z => Math.min(2, z + 0.1))}
                    >
                      <ZoomIn className="h-6 w-6 text-blue-600" />
                    </button>
                    
                    <button
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200"
                      onClick={() => {
                        setIterations(0);
                        setZoom(1);
                      }}
                    >
                      <RefreshCcw className="h-6 w-6 text-red-600" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Iterations: {iterations}</p>
                    <Slider
                      value={[iterations]}
                      onValueChange={(value) => setIterations(value[0])}
                      min={0}
                      max={7}
                      step={1}
                    />
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Zoom Level: {(zoom * 100).toFixed(0)}%</p>
                    <p>Line Segments: {3 * Math.pow(4, iterations)}</p>
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
                <h3 className="text-lg font-semibold">Key Properties</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded bg-white shadow-sm">
                    <p className="font-medium mb-1">Perimeter Growth</p>
                    <p className="text-sm text-gray-600">
                      Increases by factor of 4/3 each iteration
                    </p>
                  </div>
                  <div className="p-3 rounded bg-white shadow-sm">
                    <p className="font-medium mb-1">Area Convergence</p>
                    <p className="text-sm text-gray-600">
                      Approaches 8/5 times the original triangle
                    </p>
                  </div>
                  <div className="p-3 rounded bg-white shadow-sm">
                    <p className="font-medium mb-1">Fractal Dimension</p>
                    <p className="text-sm text-gray-600">
                      Approximately 1.262
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};