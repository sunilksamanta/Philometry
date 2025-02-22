import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Play, Pause, RefreshCcw, RotateCcw, RotateCw } from "lucide-react";

const teachingSteps = [
  {
    title: "Beyond 3D Space",
    content: "The Klein bottle is a four-dimensional object that can only exist without self-intersection in 4D space. Our 3D visualization shows a shadow of its true form.",
  },
  {
    title: "No Inside or Outside",
    content: "Like the Möbius strip, but more complex, the Klein bottle has no boundary between inside and outside. This challenges our fundamental concepts of separation and duality.",
  },
  {
    title: "Mathematical Paradox",
    content: "The bottle appears to pass through itself in our 3D view, but in 4D it doesn't intersect. This illustrates how higher dimensions can resolve apparent contradictions.",
  },
  {
    title: "Consciousness and Reality",
    content: "The Klein bottle's properties mirror concepts in Eastern philosophy about the illusion of separation and the interconnected nature of consciousness.",
  }
];

export const KleinBottleViz = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [step, setStep] = useState(0);
  const [showCrossSection, setShowCrossSection] = useState(false);
  const [showParticle, setShowParticle] = useState(false);
  const [particlePosition, setParticlePosition] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  
  const generateKleinPoints = (u: number, v: number) => {
    // Parametric equations for Klein bottle
    const a = 3; // Bottle radius
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const n = 4; // Number of lobes
    
    // Map parameters to full range
    const theta = u * 2 * Math.PI;
    const phi = v * 2 * Math.PI;
    
    // Klein bottle parametric equations
    let x, y, z;
    
    if (phi < Math.PI) {
      // First half
      x = (a + Math.cos(theta/2) * Math.sin(phi) - Math.sin(theta/2) * Math.sin(2*phi)) * Math.cos(theta);
      y = (a + Math.cos(theta/2) * Math.sin(phi) - Math.sin(theta/2) * Math.sin(2*phi)) * Math.sin(theta);
      z = Math.sin(theta/2) * Math.sin(phi) + Math.cos(theta/2) * Math.sin(2*phi);
    } else {
      // Second half
      x = (a + Math.cos(theta/2) * Math.sin(phi)) * Math.cos(theta);
      y = (a + Math.cos(theta/2) * Math.sin(phi)) * Math.sin(theta);
      z = Math.sin(theta/2) * Math.sin(phi);
    }
    
    return { x, y, z };
  };
  
  const project3Dto2D = (point: { x: number, y: number, z: number }, rotation: { x: number, y: number, z: number }) => {
    const { x, y, z } = point;
    
    // Apply 3D rotations
    // Rotate around X
    const cosX = Math.cos(rotation.x);
    const sinX = Math.sin(rotation.x);
    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;
    
    // Rotate around Y
    const cosY = Math.cos(rotation.y);
    const sinY = Math.sin(rotation.y);
    const x2 = x * cosY + z1 * sinY;
    const z2 = -x * sinY + z1 * cosY;
    
    // Rotate around Z
    const cosZ = Math.cos(rotation.z);
    const sinZ = Math.sin(rotation.z);
    const x3 = x2 * cosZ - y1 * sinZ;
    const y3 = x2 * sinZ + y1 * cosZ;
    
    // Project to 2D with perspective
    const scale = 1000 / (1000 + z2);
    const projectedX = x3 * scale * 50 + (canvasRef.current?.width || 0)/2;
    const projectedY = y3 * scale * 50 + (canvasRef.current?.height || 0)/2;
    
    return { x: projectedX, y: projectedY, z: z2 };
  };
  
  const drawKleinBottle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Klein bottle
    const resolution = 40;
    const points: Array<Array<{ x: number, y: number, z: number }>> = [];
    
    // Generate and project all points first
    for (let i = 0; i <= resolution; i++) {
      points[i] = [];
      for (let j = 0; j <= resolution; j++) {
        const u = i / resolution;
        const v = j / resolution;
        const point = generateKleinPoints(u, v);
        points[i][j] = project3Dto2D(point, rotation);
      }
    }
    
    // Draw surface
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const p1 = points[i][j];
        const p2 = points[i+1][j];
        const p3 = points[i][j+1];
        const p4 = points[i+1][j+1];
        
        // Calculate color based on position and depth
        const depth = (p1.z + p2.z + p3.z + p4.z) / 4;
        const hue = ((i + j) / (resolution * 2) * 360 + depth * 20) % 360;
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();
        
        ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.1)`;
        ctx.strokeStyle = `hsla(${hue}, 70%, 50%, 0.2)`;
        ctx.fill();
        ctx.stroke();
      }
    }
    
    // Draw tracking particle if enabled
    if (showParticle) {
      const particlePoint = generateKleinPoints(particlePosition, 0);
      const projectedParticle = project3Dto2D(particlePoint, rotation);
      
      ctx.beginPath();
      ctx.arc(projectedParticle.x, projectedParticle.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ff0000';
      ctx.fill();
    }
    
    // Draw cross section if enabled
    if (showCrossSection) {
      const crossSection: Array<{ x: number, y: number }> = [];
      const v = 0.5; // Fixed v for cross section
      
      for (let i = 0; i <= resolution; i++) {
        const u = i / resolution;
        const point = generateKleinPoints(u, v);
        const projected = project3Dto2D(point, rotation);
        crossSection.push({ x: projected.x, y: projected.y });
      }
      
      ctx.beginPath();
      ctx.moveTo(crossSection[0].x, crossSection[0].y);
      for (let i = 1; i < crossSection.length; i++) {
        ctx.lineTo(crossSection[i].x, crossSection[i].y);
      }
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };
  
  const animate = () => {
    if (showParticle) {
      setParticlePosition(p => (p + 0.01) % 1);
    }
    setRotation(r => ({
      x: r.x + 0.01,
      y: r.y + 0.01,
      z: r.z + 0.005
    }));
    animationRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    drawKleinBottle();
  }, [rotation, particlePosition, showParticle, showCrossSection]);
  
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
  }, [isAnimating, showParticle]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Klein Bottle Explorer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Visualization */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col items-center gap-6">
              {/* Canvas */}
              <canvas
                ref={canvasRef}
                width={600}
                height={600}
                className="border border-gray-200 rounded bg-white"
              />
              
              {/* Controls */}
              <div className="w-full max-w-xl space-y-6">
                {/* Animation Controls */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                    onClick={() => setRotation(r => ({ ...r, y: r.y - 0.2 }))}
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
                    onClick={() => setRotation(r => ({ ...r, y: r.y + 0.2 }))}
                  >
                    <RotateCw className="h-6 w-6 text-blue-600" />
                  </button>
                  
                  <button
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200"
                    onClick={() => {
                      setRotation({ x: 0, y: 0, z: 0 });
                      setIsAnimating(false);
                      setParticlePosition(0);
                    }}
                  >
                    <RefreshCcw className="h-6 w-6 text-red-600" />
                  </button>
                </div>
  
                {/* Visualization Options */}
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
  
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-600">
                      Show Cross Section
                    </label>
                    <Switch
                      checked={showCrossSection}
                      onCheckedChange={setShowCrossSection}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Right Column - Information */}
          <div className="lg:w-80 flex-shrink-0 bg-gray-50 p-6 rounded-lg">
            {/* Teaching Steps */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">
                {teachingSteps[step].title}
              </h3>
              <p className="text-gray-600 mb-4">
                {teachingSteps[step].content}
              </p>
              <div className="flex justify-between">
                <button
                  className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                >
                  Previous
                </button>
                <button
                  className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                  onClick={() => setStep((s) => Math.min(teachingSteps.length - 1, s + 1))}
                  disabled={step === teachingSteps.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
  
            {/* Key Concepts */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Key Concepts</h3>
              <div className="space-y-3">
                <div className="p-3 rounded bg-white shadow-sm">
                  <p className="font-medium mb-1">Four-Dimensional Space</p>
                  <p className="text-sm text-gray-600">
                    A Klein bottle can only exist without self-intersection in 4D space, showing how higher dimensions can resolve apparent paradoxes
                  </p>
                </div>
                <div className="p-3 rounded bg-white shadow-sm">
                  <p className="font-medium mb-1">Non-orientability</p>
                  <p className="text-sm text-gray-600">
                    Like the Möbius strip, the Klein bottle has no distinct inside or outside, challenging our concept of boundaries
                  </p>
                </div>
                <div className="p-3 rounded bg-white shadow-sm">
                  <p className="font-medium mb-1">Self-Intersection</p>
                  <p className="text-sm text-gray-600">
                    The apparent self-intersection in our 3D visualization is an artifact of projecting a 4D object into 3D space
                  </p>
                </div>
                <div className="p-3 rounded bg-white shadow-sm">
                  <p className="font-medium mb-1">Closed Surface</p>
                  <p className="text-sm text-gray-600">
                    Despite having no boundary, the Klein bottle is a closed surface, demonstrating how topology can create counterintuitive properties
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
