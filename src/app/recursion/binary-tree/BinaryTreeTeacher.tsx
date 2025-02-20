'use client';

import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RefreshCcw, RotateCcw, RotateCw } from "lucide-react";

const teachingSteps = [
  {
    title: "Understanding Recursive Branching",
    content: "A binary tree demonstrates how simple recursive rules can create complex natural patterns. Each branch splits into two smaller branches, mimicking patterns found in trees, blood vessels, and neural networks.",
  },
  {
    title: "The Power of Self-Similarity",
    content: "Notice how each branch creates a smaller version of the whole tree. This self-similarity is a key feature of recursive patterns in nature - the same pattern repeats at different scales.",
  },
  {
    title: "Color and Depth",
    content: "The colors change with depth to highlight the recursive levels. Each level gets a different hue, making it easier to see how the pattern builds up through recursive calls.",
  },
  {
    title: "Growth and Mathematics",
    content: "With each increase in depth, the number of branches doubles. This exponential growth (2^n) shows how simple rules can quickly create complex structures - a fundamental principle in both nature and computer science.",
  },
];

export const BinaryTreeTeacher = () => {
  const [depth, setDepth] = useState(8);
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [step, setStep] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const canvasSize = { width: 800, height: 600 };

  // Drawing functions remain the same
  const drawTree = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    len: number,
    angle: number,
    depth: number,
    baseRotation: number
  ) => {
    if (depth === 0) return;

    const endX = startX + len * Math.cos(((angle + baseRotation) * Math.PI) / 180);
    const endY = startY + len * Math.sin(((angle + baseRotation) * Math.PI) / 180);

    const hue = (120 + depth * 20) % 360;
    ctx.strokeStyle = `hsl(${hue}, 70%, 50%)`;
    ctx.lineWidth = depth;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    drawTree(ctx, endX, endY, len * 0.7, angle - 45, depth - 1, baseRotation);
    drawTree(ctx, endX, endY, len * 0.7, angle + 45, depth - 1, baseRotation);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawTree(
      ctx,
      canvas.width / 2,
      canvas.height * 0.8,
      canvas.height * 0.2,
      -90,
      depth,
      rotation
    );
  };

  const animate = () => {
    setRotation((prev) => (prev + 1) % 360);
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    draw();
  }, [depth, rotation]);

  useEffect(() => {
    if (isAnimating) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating]);

  return (
    <div className="max-w-7xl mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recursive Binary Tree</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main visualization area - adjusted width */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-full aspect-[4/3]">
                  <canvas
                    ref={canvasRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                    className="absolute top-0 left-0 w-full h-full border border-gray-200 rounded bg-white"
                    style={{ maxHeight: '600px' }}
                  />
                </div>
  
                <div className="w-full max-w-xl space-y-6">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                      onClick={() => setRotation((r) => (r - 45) % 360)}
                    >
                      <RotateCcw className="h-6 w-6 text-blue-600" />
                    </button>
  
                    <button
                      className="p-4 rounded-full bg-green-100 hover:bg-green-200"
                      onClick={() => setIsAnimating(!isAnimating)}
                    >
                      {isAnimating ? (
                        <Pause className="h-8 w-8 text-green-600" />
                      ) : (
                        <Play className="h-8 w-8 text-green-600" />
                      )}
                    </button>
  
                    <button
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                      onClick={() => setRotation((r) => (r + 45) % 360)}
                    >
                      <RotateCw className="h-6 w-6 text-blue-600" />
                    </button>
  
                    <button
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200"
                      onClick={() => {
                        setRotation(0);
                        setDepth(8);
                        setIsAnimating(false);
                      }}
                    >
                      <RefreshCcw className="h-6 w-6 text-red-600" />
                    </button>
                  </div>
  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Depth (Recursion Level): {depth}
                    </p>
                    <Slider
                      value={[depth]}
                      onValueChange={(value) => setDepth(value[0])}
                      min={1}
                      max={12}
                      step={1}
                    />
                  </div>
  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Current Rotation: {rotation}°</p>
                    <p>Total Branches: {Math.pow(2, depth + 1) - 1}</p>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Information Panel - fixed width */}
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
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                  >
                    Previous
                  </button>
                  <button
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => setStep((s) => Math.min(teachingSteps.length - 1, s + 1))}
                    disabled={step === teachingSteps.length - 1}
                  >
                    Next
                  </button>
                </div>
              </div>
  
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Key Concepts</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded bg-white shadow-sm">
                    <p className="font-medium mb-1">Branching Factor</p>
                    <p className="text-sm text-gray-600">
                      Each node splits into two branches, creating exponential growth
                    </p>
                  </div>
                  <div className="p-3 rounded bg-white shadow-sm">
                    <p className="font-medium mb-1">Recursion Depth</p>
                    <p className="text-sm text-gray-600">
                      Controls the detail level of the tree and total number of branches
                    </p>
                  </div>
                  <div className="p-3 rounded bg-white shadow-sm">
                    <p className="font-medium mb-1">Branch Length</p>
                    <p className="text-sm text-gray-600">
                      Decreases by 30% at each level, creating natural-looking proportions
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