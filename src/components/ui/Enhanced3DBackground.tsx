import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

interface Enhanced3DBackgroundProps {
  isActive?: boolean;
  intensity?: number;
}

const Enhanced3DBackground: React.FC<Enhanced3DBackgroundProps> = ({ 
  isActive = false, 
  intensity = 0.5 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { currentMode } = useApp();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(true); // Always dark for black background

  // AI-themed 3D objects
  const objects = useRef<Array<{
    type: 'neural_core' | 'data_node' | 'quantum_processor' | 'memory_crystal' | 'ai_synapse';
    x: number;
    y: number;
    z: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    scale: number;
    opacity: number;
    speed: number;
    pulsePhase: number;
    color: string;
    size: number;
    connections: number[];
  }>>([]);

  // Neural pathways and data streams
  const dataStreams = useRef<Array<{
    points: Array<{ x: number; y: number; z: number; opacity: number; data: string }>;
    color: string;
    width: number;
    speed: number;
    life: number;
    maxLife: number;
    type: 'neural' | 'quantum' | 'memory' | 'processing';
  }>>([]);

  // AI particles (neural signals, quantum bits, data packets)
  const aiParticles = useRef<Array<{
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    life: number;
    maxLife: number;
    size: number;
    opacity: number;
    color: string;
    type: 'neural_pulse' | 'quantum_bit' | 'data_packet' | 'synapse_fire';
    content: string;
  }>>([]);

  // Initialize AI-themed 3D scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create AI-themed objects
    objects.current = [];
    
    // Central Neural Core
    objects.current.push({
      type: 'neural_core',
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scale: 1,
      opacity: 0.9,
      speed: 0.002,
      pulsePhase: 0,
      color: getModeColor().primary,
      size: 120,
      connections: []
    });

    // Quantum Processors
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 250 + Math.sin(i) * 60;
      objects.current.push({
        type: 'quantum_processor',
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.7,
        z: Math.sin(i * 0.7) * 120,
        rotationX: Math.random() * Math.PI,
        rotationY: Math.random() * Math.PI,
        rotationZ: Math.random() * Math.PI,
        scale: 0.7 + Math.random() * 0.3,
        opacity: 0.8,
        speed: 0.003 + Math.random() * 0.002,
        pulsePhase: Math.random() * Math.PI * 2,
        color: getModeColor().secondary,
        size: 35 + Math.random() * 20,
        connections: [0] // Connect to central core
      });
    }

    // Memory Crystals
    for (let i = 0; i < 6; i++) {
      objects.current.push({
        type: 'memory_crystal',
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() - 0.5) * 400,
        z: Math.random() * 300 - 150,
        rotationX: Math.random() * Math.PI,
        rotationY: Math.random() * Math.PI,
        rotationZ: Math.random() * Math.PI,
        scale: 0.5 + Math.random() * 0.5,
        opacity: 0.7,
        speed: 0.001 + Math.random() * 0.002,
        pulsePhase: Math.random() * Math.PI * 2,
        color: getModeColor().accent,
        size: 40 + Math.random() * 25,
        connections: []
      });
    }

    // AI Synapses
    for (let i = 0; i < 12; i++) {
      objects.current.push({
        type: 'ai_synapse',
        x: (Math.random() - 0.5) * 500,
        y: (Math.random() - 0.5) * 350,
        z: Math.random() * 200 - 100,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scale: 0.4 + Math.random() * 0.6,
        opacity: 0.6,
        speed: 0.004 + Math.random() * 0.003,
        pulsePhase: Math.random() * Math.PI * 2,
        color: getModeColor().trail,
        size: 25 + Math.random() * 15,
        connections: []
      });
    }

  }, []);

  // Enhanced AI-themed colors for dark mode
  const getModeColor = () => {
    switch (currentMode) {
      case 'therapist':
        return {
          primary: 'rgba(34, 197, 94, 1)', // emerald-500 - therapeutic
          secondary: 'rgba(16, 185, 129, 0.9)', // emerald-600
          accent: 'rgba(52, 211, 153, 0.7)', // emerald-400
          trail: 'rgba(34, 197, 94, 0.6)',
          glow: '#22c55e'
        };
      case 'tutor':
        return {
          primary: 'rgba(168, 85, 247, 1)', // violet-500 - knowledge
          secondary: 'rgba(147, 51, 234, 0.9)', // violet-600
          accent: 'rgba(196, 181, 253, 0.7)', // violet-300
          trail: 'rgba(168, 85, 247, 0.6)',
          glow: '#a855f7'
        };
      case 'friend':
        return {
          primary: 'rgba(236, 72, 153, 1)', // pink-500 - friendship
          secondary: 'rgba(219, 39, 119, 0.9)', // pink-600
          accent: 'rgba(251, 113, 133, 0.7)', // pink-400
          trail: 'rgba(236, 72, 153, 0.6)',
          glow: '#ec4899'
        };
      default:
        return {
          primary: 'rgba(93, 106, 255, 1)', // primary neural blue
          secondary: 'rgba(34, 211, 238, 0.9)', // neon cyan
          accent: 'rgba(168, 85, 247, 0.7)', // violet accent
          trail: 'rgba(93, 106, 255, 0.6)',
          glow: '#5d6aff'
        };
    }
  };

  // Mouse tracking for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      // Very subtle mouse sensitivity
      setMousePosition({
        x: (e.clientX - rect.left - canvas.width / 2) / canvas.width * 0.01,
        y: (e.clientY - rect.top - canvas.height / 2) / canvas.height * 0.01
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016; // ~60fps

      const colors = getModeColor();
      const activityMultiplier = isActive ? 2.0 : 1.0;
      const intensityFactor = intensity * activityMultiplier;

      // Subtle parallax offset
      const parallaxX = mousePosition.x * 1;
      const parallaxY = mousePosition.y * 1;

      // Update and draw AI objects
      objects.current.forEach((obj, i) => {
        // Update rotation and position
        obj.rotationY += obj.speed * intensityFactor;
        obj.rotationX += obj.speed * 0.3 * intensityFactor;
        obj.pulsePhase += 0.02;

        // Calculate 3D position with rotation
        const rotatedX = obj.x * Math.cos(time * 0.0003) - obj.z * Math.sin(time * 0.0003);
        const rotatedZ = obj.x * Math.sin(time * 0.0003) + obj.z * Math.cos(time * 0.0003);
        
        // Apply parallax and perspective
        const perspective = 1500;
        const scale = perspective / (perspective + rotatedZ);
        const screenX = canvas.width / 2 + (rotatedX + parallaxX) * scale;
        const screenY = canvas.height / 2 + (obj.y + parallaxY) * scale;

        // Enhanced pulse effect
        const pulseIntensity = Math.sin(obj.pulsePhase) * 0.4 + 0.6;
        const finalScale = obj.scale * scale * pulseIntensity * intensityFactor;
        const finalOpacity = obj.opacity * pulseIntensity * intensityFactor;

        ctx.save();
        ctx.globalAlpha = finalOpacity;
        ctx.translate(screenX, screenY);

        // Draw different AI object types
        switch (obj.type) {
          case 'neural_core':
            drawNeuralCore(ctx, obj.size * finalScale, colors.primary, colors.glow, obj.rotationY);
            break;
          case 'quantum_processor':
            drawQuantumProcessor(ctx, obj.size * finalScale, colors.secondary, colors.glow, obj.rotationX);
            break;
          case 'memory_crystal':
            drawMemoryCrystal(ctx, obj.size * finalScale, colors.accent, colors.glow, obj.rotationY);
            break;
          case 'ai_synapse':
            drawAISynapse(ctx, obj.size * finalScale, colors.trail, colors.glow);
            break;
        }

        ctx.restore();

        // Generate AI-themed particles
        if (pulseIntensity > 0.7 && Math.random() < 0.06 * intensityFactor) {
          const particleTypes = ['neural_pulse', 'quantum_bit', 'data_packet', 'synapse_fire'];
          const contents = ['◦', '◉', '▲', '■', '●', '◆', '⬢', '⬡'];
          
          aiParticles.current.push({
            x: screenX + (Math.random() - 0.5) * 60,
            y: screenY + (Math.random() - 0.5) * 60,
            z: rotatedZ,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            vz: (Math.random() - 0.5) * 2,
            life: 0,
            maxLife: 100 + Math.random() * 100,
            size: 2 + Math.random() * 4,
            opacity: 1.0,
            color: colors.primary,
            type: particleTypes[Math.floor(Math.random() * particleTypes.length)] as any,
            content: contents[Math.floor(Math.random() * contents.length)]
          });
        }
      });

      // Update and draw neural connections
      if (Math.random() < 0.12 * intensityFactor) {
        const startObj = objects.current[Math.floor(Math.random() * objects.current.length)];
        const endObj = objects.current[Math.floor(Math.random() * objects.current.length)];
        
        if (startObj !== endObj) {
          dataStreams.current.push({
            points: [
              { x: startObj.x, y: startObj.y, z: startObj.z, opacity: 1, data: '◦◉◦' },
              { x: endObj.x, y: endObj.y, z: endObj.z, opacity: 1, data: '◉◦◉' }
            ],
            color: colors.trail,
            width: 3,
            speed: 0.02,
            life: 0,
            maxLife: 120,
            type: ['neural', 'quantum', 'memory', 'processing'][Math.floor(Math.random() * 4)] as any
          });
        }
      }

      // Draw data streams
      dataStreams.current = dataStreams.current.filter(stream => {
        stream.life++;
        const lifeRatio = stream.life / stream.maxLife;
        
        if (lifeRatio < 1) {
          ctx.save();
          ctx.globalAlpha = (1 - lifeRatio) * intensityFactor * 1.2;
          ctx.strokeStyle = stream.color;
          ctx.lineWidth = stream.width;
          ctx.shadowBlur = 12;
          ctx.shadowColor = stream.color;
          ctx.beginPath();
          
          stream.points.forEach((point, i) => {
            const perspective = 1500;
            const scale = perspective / (perspective + point.z);
            const screenX = canvas.width / 2 + (point.x + parallaxX) * scale;
            const screenY = canvas.height / 2 + (point.y + parallaxY) * scale;
            
            if (i === 0) {
              ctx.moveTo(screenX, screenY);
            } else {
              ctx.lineTo(screenX, screenY);
            }
          });
          
          ctx.stroke();
          ctx.restore();
          return true;
        }
        return false;
      });

      // Update and draw AI particles
      aiParticles.current = aiParticles.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;
        particle.life++;
        particle.opacity = Math.max(0, 1 - particle.life / particle.maxLife);

        if (particle.opacity > 0) {
          ctx.save();
          ctx.globalAlpha = particle.opacity * intensityFactor;
          ctx.fillStyle = particle.color;
          ctx.font = `${particle.size}px monospace`;
          ctx.textAlign = 'center';
          
          ctx.shadowBlur = 6;
          ctx.shadowColor = particle.color;
          
          // Draw different AI particle types
          switch (particle.type) {
            case 'neural_pulse':
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
              ctx.fill();
              break;
            case 'quantum_bit':
              ctx.fillText(particle.content, particle.x, particle.y);
              break;
            case 'data_packet':
              ctx.fillRect(particle.x - particle.size/2, particle.y - particle.size/2, particle.size, particle.size);
              break;
            case 'synapse_fire':
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, particle.size * 0.8, 0, Math.PI * 2);
              ctx.fill();
              break;
          }
          
          ctx.restore();
          return true;
        }
        return false;
      });

      // Limit particles for performance
      if (aiParticles.current.length > 150) {
        aiParticles.current = aiParticles.current.slice(-150);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [currentMode, isActive, intensity, mousePosition]);

  // Enhanced AI-themed drawing functions
  const drawNeuralCore = (ctx: CanvasRenderingContext2D, size: number, color: string, glow: string, rotation: number) => {
    ctx.save();
    ctx.rotate(rotation);
    
    // Central neural core with intense glow
    ctx.shadowBlur = 25;
    ctx.shadowColor = glow;
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    
    // Hexagonal neural core
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * size;
      const y = Math.sin(angle) * size;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    
    // Inner neural patterns
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x1 = Math.cos(angle) * size * 0.3;
      const y1 = Math.sin(angle) * size * 0.3;
      const x2 = Math.cos(angle) * size * 0.8;
      const y2 = Math.sin(angle) * size * 0.8;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    
    ctx.restore();
  };

  const drawQuantumProcessor = (ctx: CanvasRenderingContext2D, size: number, color: string, glow: string, rotation: number) => {
    ctx.save();
    ctx.rotate(rotation);
    
    // Quantum processor with neural connections
    ctx.shadowBlur = 15;
    ctx.shadowColor = glow;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    // Central quantum node
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Quantum connections
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * size;
      const y = Math.sin(angle) * size;
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      // Connection nodes
      ctx.beginPath();
      ctx.arc(x, y, size * 0.08, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  };

  const drawMemoryCrystal = (ctx: CanvasRenderingContext2D, size: number, color: string, glow: string, rotation: number) => {
    ctx.save();
    ctx.rotate(rotation);
    
    // Memory crystal with data visualization
    ctx.shadowBlur = 10;
    ctx.shadowColor = glow;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    // 3D crystal effect
    const offset = size * 0.2;
    
    // Front face
    ctx.strokeRect(-size/2, -size/2, size, size);
    
    // Top face
    ctx.beginPath();
    ctx.moveTo(-size/2, -size/2);
    ctx.lineTo(-size/2 + offset, -size/2 - offset);
    ctx.lineTo(size/2 + offset, -size/2 - offset);
    ctx.lineTo(size/2, -size/2);
    ctx.stroke();
    
    // Right face
    ctx.beginPath();
    ctx.moveTo(size/2, -size/2);
    ctx.lineTo(size/2 + offset, -size/2 - offset);
    ctx.lineTo(size/2 + offset, size/2 - offset);
    ctx.lineTo(size/2, size/2);
    ctx.stroke();
    
    // Data patterns inside
    ctx.fillStyle = color;
    for (let i = 0; i < 4; i++) {
      const barHeight = Math.random() * size * 0.6;
      const x = -size/2 + 8 + i * (size - 16) / 4;
      ctx.fillRect(x, size/2 - barHeight, (size - 16) / 5, barHeight);
    }
    
    ctx.restore();
  };

  const drawAISynapse = (ctx: CanvasRenderingContext2D, size: number, color: string, glow: string) => {
    // AI synapse with neural firing
    ctx.shadowBlur = 8;
    ctx.shadowColor = glow;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    // Synapse body
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
    ctx.stroke();
    
    // Neural dendrites
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const x = Math.cos(angle) * size;
      const y = Math.sin(angle) * size;
      
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * size * 0.4, Math.sin(angle) * size * 0.4);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Pure black background */}
      <div className="absolute inset-0 bg-black" />
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-70"
        style={{ 
          mixBlendMode: 'screen',
          filter: 'blur(0.2px)'
        }}
      />
      
      {/* Enhanced AI-themed atmospheric effects */}
      <div className="absolute inset-0 opacity-50">
        {/* Floating neural signals */}
        {[...Array(8)].map((_, i) => {
          const signals = ['◦', '◉', '▲', '●', '■', '◆', '⬢', '⬡'];
          return (
            <motion.div
              key={`signal-${i}`}
              className="absolute font-mono text-sm font-bold"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color: getAIElementColor(),
                textShadow: `0 0 8px ${getAIElementColor()}`,
              }}
              animate={{
                y: [0, -80, 0],
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 4,
              }}
            >
              {signals[i % signals.length]}
            </motion.div>
          );
        })}

        {/* Neural pathway lines */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`neural-${i}`}
            className="absolute opacity-30"
            style={{
              width: '1px',
              height: '120px',
              background: `linear-gradient(to bottom, ${getAIElementColor()}, transparent)`,
              left: `${15 + i * 15}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 10px ${getAIElementColor()}`,
            }}
            animate={{
              scaleY: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* AI processing indicators */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`indicator-${i}`}
            className="absolute"
            style={{
              width: '6px',
              height: '6px',
              background: getAIElementColor(),
              left: `${25 + i * 20}%`,
              top: `${25 + (i % 2) * 50}%`,
              boxShadow: `0 0 15px currentColor`,
              borderRadius: i % 2 === 0 ? '50%' : '0%',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 1,
            }}
          />
        ))}
      </div>
    </div>
  );

  // Enhanced floating AI elements
  function getAIElementColor() {
    const colors = getModeColor();
    return colors.glow;
  }
};

export default Enhanced3DBackground;