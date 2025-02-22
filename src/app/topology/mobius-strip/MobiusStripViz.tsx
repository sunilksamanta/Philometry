import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Play, Pause, RefreshCcw, RotateCcw, RotateCw } from "lucide-react";

const teachingSteps = [
  {
    title: "One-Sided Reality",
    content: "The Möbius strip demonstrates how something can appear to have two sides but actually has only one. This challenges our perception of duality and shows how apparent opposites can be unified.",
  },
  {
    title: "Infinite Journey",
    content: "Following the surface of a Möbius strip leads to an endless journey, never crossing an edge. This represents the cyclical nature of existence and the concept of infinity in finite space.",
  },
  {
    title: "Mathematical Wonder",
    content: "By applying a simple twist before connecting the ends of a strip, we create a non-orientable surface. This shows how small changes can fundamentally alter the nature of reality.",
  },
  {
    title: "Beyond Duality",
    content: "Like many concepts in Eastern philosophy, the Möbius strip transcends simple dualism. It shows how apparent opposites (inside/outside, beginning/end) are actually unified.",
  }
];

export const MobiusStripViz = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [step, setStep] = useState(0);
  const [twists, setTwists] = useState(1);
  const [showParticle, setShowParticle] = useState(false);
  const [particlePosition, setParticlePosition] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  
  const generateMobiusPoints = (t: number, s: number) => {
    const R = 2; // Major radius
    const r = 1; // Minor radius
    const theta = t * Math.PI * 2;
    const phi = s * Math.PI * 2;
    
    // Parametric equations for Möbius strip
    return {
      x: (R + r * Math.cos(phi/2)) * Math.cos(theta),
      y: (R + r * Math.cos(phi/2)) * Math.sin(theta),
      z: r * Math.sin(phi/2)
    };
  };
  
  const project3Dto2D = (point: { x: number, y: number, z: number }, rotation: { x: number, y: number }) => {
    const cosa = Math.cos(rotation.x);
    const sina = Math.sin(rotation.x);
    const cosb = Math.cos(rotation.y);
    const sinb = Math.sin(rotation.y);
    
    const { x, y, z } = point;
    
    // Rotate around Y axis
    const y1 = y * cosa - z * sina;
    const z1 = y * sina + z * cosa;
    
    // Rotate around X axis
    const x2 = x * cosb - z1 * sinb;
    const z2 = x * sinb + z1 * cosb;
    
    // Project to 2D with perspective
    const scale = 1000 / (1000 + z2);
    return {
      x: x2 * scale * 100 + (canvasRef.current?.width || 0)/2,
      y: y1 * scale * 100 + (canvasRef.current?.height || 0)/2
    };
  };
  
  const drawStrip = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Möbius strip
    const resolution = 50;
    
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const t = i / resolution;
        const s = j / resolution;
        
        const p1 = generateMobiusPoints(t, s);
        const p2 = generateMobiusPoints((i + 1) / resolution, s);
        const p3 = generateMobiusPoints(t, (j + 1) / resolution);
        
        const projected1 = project3Dto2D(p1, rotation);
        const projected2 = project3Dto2D(p2, rotation);
        const projected3 = project3Dto2D(p3, rotation);
        
        ctx.beginPath();
        ctx.moveTo(projected1.x, projected1.y);
        ctx.lineTo(projected2.x, projected2.y);
        ctx.lineTo(projected3.x, projected3.y);
        ctx.closePath();
        
        // Color based on position to show the twist
        const hue = (t + s) * 180;
        ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.1)`;
        ctx.strokeStyle = `hsla(${hue}, 70%, 50%, 0.2)`;
        ctx.fill();
        ctx.stroke();
      }
    }
    
    // Draw tracking particle if enabled
    if (showParticle) {
      const particlePoint = generateMobiusPoints(particlePosition, 0);
      const projectedParticle = project3Dto2D(particlePoint, rotation);
      
      ctx.beginPath();
      ctx.arc(projectedParticle.x, projectedParticle.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ff0000';
      ctx.fill();
    }
  };
  
  const animate = () => {
    if (showParticle) {
      setParticlePosition(p => (p + 0.01) % 1);
    }
    setRotation(r => ({ x: r.x + 0.01, y: r.y + 0.01 }));
    animationRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    drawStrip();
  }, [rotation, particlePosition, showParticle]);
  
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
    <Card>
      <CardHeader>
        <CardTitle>Möbius Strip Explorer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col items-center gap-6">
              <canvas
                ref={canvasRef}
                width={600}
                height={600}
                className="border border-gray-200 rounded bg-white"
              />
              
              <div className="w-full max-w-xl space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <button
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                    onClick={() => setRotation(r => ({ ...r, y: r.y - 0.1 }))}
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
                    onClick={() => setRotation(r => ({ ...r, y: r.y + 0.1 }))}
                  >
                    <RotateCw className="h-6 w-6 text-blue-600" />
                  </button>
                  
                  <button
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200"
                    onClick={() => {
                      setRotation({ x: 0, y: 0 });
                      setIsAnimating(false);
                      setParticlePosition(0);
                    }}
                  >
                    <RefreshCcw className="h-6 w-6 text-red-600" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-600">
                      Show Tracking Particle
                    </label>
                    <Switch
                      checked={showParticle}
                      onCheckedChange={setShowParticle}
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Number of Twists</p>
                    <Slider
                      value={[twists]}
                      onValueChange={(value) => setTwists(value[0])}
                      min={1}
                      max={3}
                      step={1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                  <p className="font-medium mb-1">Non-orientability</p>
                  <p className="text-sm text-gray-600">
                    A surface that has only one side and one edge, challenging our normal understanding of space
                  </p>
                </div>
                <div className="p-3 rounded bg-white shadow-sm">
                  <p className="font-medium mb-1">Topology</p>
                  <p className="text-sm text-gray-600">
                    The mathematical study of properties that remain unchanged under continuous deformations
                  </p>
                </div>
                <div className="p-3 rounded bg-white shadow-sm">
                  <p className="font-medium mb-1">Infinity in Finite Space</p>
                  <p className="text-sm text-gray-600">
                    Demonstrates how a finite object can contain an infinite path, a paradox with deep philosophical implications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};