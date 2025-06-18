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
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  // AI-themed 3D objects
  const objects = useRef<Array<{
    type: 'brain' | 'neural_network' | 'data_node' | 'ai_core' | 'memory_bank' | 'processing_unit';
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
    type: 'neural' | 'data' | 'memory' | 'processing';
  }>>([]);

  // AI particles (code fragments, binary, neural signals)
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
    type: 'binary' | 'code' | 'neural_pulse' | 'data_packet';
    content: string;
  }>>([]);

  // Initialize AI-themed 3D scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create AI-themed objects
    objects.current = [];
    
    // Central AI brain/core
    objects.current.push({
      type: 'ai_core',
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scale: 1,
      opacity: isDarkMode ? 0.9 : 0.8, // Increased for light mode
      speed: 0.003,
      pulsePhase: 0,
      color: getModeColor().primary,
      size: 100,
      connections: []
    });

    // Neural network nodes
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 200 + Math.sin(i) * 50;
      objects.current.push({
        type: 'neural_network',
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.6,
        z: Math.sin(i * 0.5) * 100,
        rotationX: Math.random() * Math.PI,
        rotationY: Math.random() * Math.PI,
        rotationZ: Math.random() * Math.PI,
        scale: 0.6 + Math.random() * 0.4,
        opacity: isDarkMode ? 0.8 : 0.7, // Increased for light mode
        speed: 0.002 + Math.random() * 0.003,
        pulsePhase: Math.random() * Math.PI * 2,
        color: getModeColor().secondary,
        size: 25 + Math.random() * 15,
        connections: [0] // Connect to central core
      });
    }

    // Data processing units
    for (let i = 0; i < 8; i++) {
      objects.current.push({
        type: 'processing_unit',
        x: (Math.random() - 0.5) * 500,
        y: (Math.random() - 0.5) * 300,
        z: Math.random() * 200 - 100,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scale: 0.4 + Math.random() * 0.6,
        opacity: isDarkMode ? 0.7 : 0.6, // Increased for light mode
        speed: 0.001 + Math.random() * 0.002,
        pulsePhase: Math.random() * Math.PI * 2,
        color: getModeColor().accent,
        size: 30 + Math.random() * 20,
        connections: []
      });
    }

    // Memory banks (floating data cubes)
    for (let i = 0; i < 6; i++) {
      objects.current.push({
        type: 'memory_bank',
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() - 0.5) * 400,
        z: Math.random() * 300 - 150,
        rotationX: Math.random() * Math.PI,
        rotationY: Math.random() * Math.PI,
        rotationZ: Math.random() * Math.PI,
        scale: 0.5 + Math.random() * 0.5,
        opacity: isDarkMode ? 0.6 : 0.5, // Increased for light mode
        speed: 0.004 + Math.random() * 0.003,
        pulsePhase: Math.random() * Math.PI * 2,
        color: getModeColor().trail,
        size: 35 + Math.random() * 25,
        connections: []
      });
    }

  }, [isDarkMode]);

  // Enhanced AI-themed colors - keep dark mode colors, adjust light mode for better visibility
  const getModeColor = () => {
    if (isDarkMode) {
      // Keep the existing dark mode colors (they look good)
      switch (currentMode) {
        case 'therapist':
          return {
            primary: 'rgba(16, 185, 129, 1)', // emerald-600 - therapeutic green
            secondary: 'rgba(6, 182, 212, 0.9)', // cyan-500 - calming blue
            accent: 'rgba(52, 211, 153, 0.7)', // emerald-400
            trail: 'rgba(16, 185, 129, 0.6)',
            glow: '#10b981'
          };
        case 'tutor':
          return {
            primary: 'rgba(245, 158, 11, 1)', // amber-500 - knowledge gold
            secondary: 'rgba(251, 191, 36, 0.9)', // amber-400
            accent: 'rgba(252, 211, 77, 0.7)', // amber-300
            trail: 'rgba(245, 158, 11, 0.6)',
            glow: '#f59e0b'
          };
        case 'coach':
          return {
            primary: 'rgba(147, 51, 234, 1)', // purple-600 - motivational purple
            secondary: 'rgba(236, 72, 153, 0.9)', // pink-500
            accent: 'rgba(168, 85, 247, 0.7)', // purple-500
            trail: 'rgba(147, 51, 234, 0.6)',
            glow: '#9333ea'
          };
        default:
          return {
            primary: 'rgba(14, 165, 233, 1)', // sky-500 - AI blue
            secondary: 'rgba(59, 130, 246, 0.9)', // blue-500
            accent: 'rgba(96, 165, 250, 0.7)', // blue-400
            trail: 'rgba(14, 165, 233, 0.6)',
            glow: '#0ea5e9'
          };
      }
    } else {
      // Enhanced light mode colors for better visibility while keeping the theme
      switch (currentMode) {
        case 'therapist':
          return {
            primary: 'rgba(16, 185, 129, 0.9)', // More visible green
            secondary: 'rgba(6, 182, 212, 0.8)', // More visible cyan
            accent: 'rgba(52, 211, 153, 0.6)', // More visible emerald
            trail: 'rgba(16, 185, 129, 0.5)',
            glow: '#10b981'
          };
        case 'tutor':
          return {
            primary: 'rgba(245, 158, 11, 0.9)', // More visible amber
            secondary: 'rgba(251, 191, 36, 0.8)', // More visible gold
            accent: 'rgba(252, 211, 77, 0.6)', // More visible yellow
            trail: 'rgba(245, 158, 11, 0.5)',
            glow: '#f59e0b'
          };
        case 'coach':
          return {
            primary: 'rgba(147, 51, 234, 0.9)', // More visible purple
            secondary: 'rgba(236, 72, 153, 0.8)', // More visible pink
            accent: 'rgba(168, 85, 247, 0.6)', // More visible purple
            trail: 'rgba(147, 51, 234, 0.5)',
            glow: '#9333ea'
          };
        default:
          return {
            primary: 'rgba(14, 165, 233, 0.9)', // More visible blue
            secondary: 'rgba(59, 130, 246, 0.8)', // More visible blue
            accent: 'rgba(96, 165, 250, 0.6)', // More visible blue
            trail: 'rgba(14, 165, 233, 0.5)',
            glow: '#0ea5e9'
          };
      }
    }
  };

  // Mouse tracking for parallax - MUCH MORE REDUCED sensitivity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      // DRASTICALLY REDUCED mouse sensitivity - from 10% to 2% of previous
      setMousePosition({
        x: (e.clientX - rect.left - canvas.width / 2) / canvas.width * 0.02,
        y: (e.clientY - rect.top - canvas.height / 2) / canvas.height * 0.02
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

      // DRASTICALLY REDUCED parallax offset based on mouse position
      const parallaxX = mousePosition.x * 2; // Reduced from 10
      const parallaxY = mousePosition.y * 2; // Reduced from 10

      // Update and draw AI objects
      objects.current.forEach((obj, i) => {
        // Update rotation and position
        obj.rotationY += obj.speed * intensityFactor;
        obj.rotationX += obj.speed * 0.3 * intensityFactor;
        obj.pulsePhase += 0.03;

        // Calculate 3D position with rotation
        const rotatedX = obj.x * Math.cos(time * 0.0005) - obj.z * Math.sin(time * 0.0005);
        const rotatedZ = obj.x * Math.sin(time * 0.0005) + obj.z * Math.cos(time * 0.0005);
        
        // Apply parallax and perspective
        const perspective = 1200;
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
          case 'ai_core':
            drawAICore(ctx, obj.size * finalScale, colors.primary, colors.glow, obj.rotationY);
            break;
          case 'neural_network':
            drawNeuralNetwork(ctx, obj.size * finalScale, colors.secondary, colors.glow, obj.rotationX);
            break;
          case 'processing_unit':
            drawProcessingUnit(ctx, obj.size * finalScale, colors.accent, colors.glow);
            break;
          case 'memory_bank':
            drawMemoryBank(ctx, obj.size * finalScale, colors.trail, colors.glow, obj.rotationY);
            break;
        }

        ctx.restore();

        // Generate AI-themed particles
        if (pulseIntensity > 0.7 && Math.random() < 0.08 * intensityFactor) {
          const particleTypes = ['binary', 'code', 'neural_pulse', 'data_packet'];
          const contents = ['01', '{}', '▲', '■', '●', 'AI', 'λ', '∞'];
          
          aiParticles.current.push({
            x: screenX + (Math.random() - 0.5) * 60,
            y: screenY + (Math.random() - 0.5) * 60,
            z: rotatedZ,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            vz: (Math.random() - 0.5) * 3,
            life: 0,
            maxLife: 80 + Math.random() * 80,
            size: 3 + Math.random() * 6,
            opacity: isDarkMode ? 1.0 : 0.9, // Increased for light mode
            color: colors.primary,
            type: particleTypes[Math.floor(Math.random() * particleTypes.length)] as any,
            content: contents[Math.floor(Math.random() * contents.length)]
          });
        }
      });

      // Update and draw neural connections
      if (Math.random() < 0.15 * intensityFactor) {
        const startObj = objects.current[Math.floor(Math.random() * objects.current.length)];
        const endObj = objects.current[Math.floor(Math.random() * objects.current.length)];
        
        if (startObj !== endObj) {
          dataStreams.current.push({
            points: [
              { x: startObj.x, y: startObj.y, z: startObj.z, opacity: 1, data: '01010' },
              { x: endObj.x, y: endObj.y, z: endObj.z, opacity: 1, data: '11001' }
            ],
            color: colors.trail,
            width: isDarkMode ? 4 : 3, // Slightly thicker for light mode
            speed: 0.03,
            life: 0,
            maxLife: 100,
            type: ['neural', 'data', 'memory', 'processing'][Math.floor(Math.random() * 4)] as any
          });
        }
      }

      // Draw data streams
      dataStreams.current = dataStreams.current.filter(stream => {
        stream.life++;
        const lifeRatio = stream.life / stream.maxLife;
        
        if (lifeRatio < 1) {
          ctx.save();
          ctx.globalAlpha = (1 - lifeRatio) * intensityFactor * (isDarkMode ? 1.5 : 1.2); // Increased for light mode
          ctx.strokeStyle = stream.color;
          ctx.lineWidth = stream.width;
          ctx.shadowBlur = isDarkMode ? 15 : 10; // Reduced shadow for light mode
          ctx.shadowColor = stream.color;
          ctx.beginPath();
          
          stream.points.forEach((point, i) => {
            const perspective = 1200;
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
          
          if (isDarkMode) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = particle.color;
          } else {
            // Light shadow for light mode
            ctx.shadowBlur = 4;
            ctx.shadowColor = particle.color;
          }
          
          // Draw different AI particle types
          switch (particle.type) {
            case 'binary':
              ctx.fillText(particle.content, particle.x, particle.y);
              break;
            case 'code':
              ctx.fillText(particle.content, particle.x, particle.y);
              break;
            case 'neural_pulse':
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
              ctx.fill();
              break;
            case 'data_packet':
              ctx.fillRect(particle.x - particle.size/2, particle.y - particle.size/2, particle.size, particle.size);
              break;
          }
          
          ctx.restore();
          return true;
        }
        return false;
      });

      // Limit particles for performance
      if (aiParticles.current.length > 200) {
        aiParticles.current = aiParticles.current.slice(-200);
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
  }, [currentMode, isActive, intensity, mousePosition, isDarkMode]);

  // Enhanced AI-themed drawing functions
  const drawAICore = (ctx: CanvasRenderingContext2D, size: number, color: string, glow: string, rotation: number) => {
    ctx.save();
    ctx.rotate(rotation);
    
    // Central AI core with intense glow
    ctx.shadowBlur = isDarkMode ? 30 : 20; // Reduced for light mode
    ctx.shadowColor = glow;
    ctx.strokeStyle = color;
    ctx.lineWidth = isDarkMode ? 6 : 5; // Slightly thicker for light mode
    
    // Hexagonal AI core
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
    ctx.lineWidth = isDarkMode ? 3 : 3;
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

  const drawNeuralNetwork = (ctx: CanvasRenderingContext2D, size: number, color: string, glow: string, rotation: number) => {
    ctx.save();
    ctx.rotate(rotation);
    
    // Neural network node with connections
    ctx.shadowBlur = isDarkMode ? 20 : 15; // Reduced for light mode
    ctx.shadowColor = glow;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = isDarkMode ? 3 : 3;
    
    // Central node
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Neural connections
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const x = Math.cos(angle) * size;
      const y = Math.sin(angle) * size;
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      // Connection nodes
      ctx.beginPath();
      ctx.arc(x, y, size * 0.1, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  };

  const drawProcessingUnit = (ctx: CanvasRenderingContext2D, size: number, color: string, glow: string) => {
    // CPU/GPU-like processing unit
    ctx.shadowBlur = isDarkMode ? 15 : 12; // Reduced for light mode
    ctx.shadowColor = glow;
    ctx.strokeStyle = color;
    ctx.lineWidth = isDarkMode ? 4 : 4;
    
    // Main processor square
    ctx.strokeRect(-size/2, -size/2, size, size);
    
    // Processing grid
    const gridSize = size / 4;
    for (let i = 1; i < 4; i++) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(-size/2 + i * gridSize, -size/2);
      ctx.lineTo(-size/2 + i * gridSize, size/2);
      ctx.stroke();
      
      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(-size/2, -size/2 + i * gridSize);
      ctx.lineTo(size/2, -size/2 + i * gridSize);
      ctx.stroke();
    }
    
    // Processing indicators
    ctx.fillStyle = color;
    for (let i = 0; i < 9; i++) {
      const x = -size/3 + (i % 3) * size/3;
      const y = -size/3 + Math.floor(i / 3) * size/3;
      if (Math.random() > 0.5) {
        ctx.fillRect(x - 2, y - 2, 4, 4);
      }
    }
  };

  const drawMemoryBank = (ctx: CanvasRenderingContext2D, size: number, color: string, glow: string, rotation: number) => {
    ctx.save();
    ctx.rotate(rotation);
    
    // Memory storage cube with data visualization
    ctx.shadowBlur = isDarkMode ? 12 : 10; // Reduced for light mode
    ctx.shadowColor = glow;
    ctx.strokeStyle = color;
    ctx.lineWidth = isDarkMode ? 3 : 3;
    
    // 3D cube effect
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
    
    // Data bars inside
    ctx.fillStyle = color;
    for (let i = 0; i < 5; i++) {
      const barHeight = Math.random() * size * 0.6;
      const x = -size/2 + 10 + i * (size - 20) / 5;
      ctx.fillRect(x, size/2 - barHeight, (size - 20) / 6, barHeight);
    }
    
    ctx.restore();
  };

  // Enhanced floating AI elements
  const getAIElementColor = () => {
    const colors = getModeColor();
    return colors.glow;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Much darker background for dark mode, lighter for light mode visibility */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'} transition-colors duration-500`} />
      
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 ${isDarkMode ? 'opacity-80' : 'opacity-60'}`} // Increased opacity for light mode
        style={{ 
          mixBlendMode: isDarkMode ? 'screen' : 'multiply',
          filter: 'blur(0.3px)'
        }}
      />
      
      {/* Enhanced AI-themed atmospheric effects */}
      <div className={`absolute inset-0 ${isDarkMode ? 'opacity-60' : 'opacity-40'}`}> {/* Increased for light mode */}
        {/* Floating code fragments */}
        {[...Array(12)].map((_, i) => {
          const codeFragments = ['{ }', '< />', '01', 'AI', 'λ', '∞', '▲', '●', '■', '◆'];
          return (
            <motion.div
              key={`code-${i}`}
              className="absolute font-mono text-sm font-bold"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color: getAIElementColor(),
                textShadow: isDarkMode ? `0 0 10px ${getAIElementColor()}` : `0 0 5px ${getAIElementColor()}`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: isDarkMode ? [0.3, 1, 0.3] : [0.4, 0.8, 0.4], // Increased for light mode
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            >
              {codeFragments[i % codeFragments.length]}
            </motion.div>
          );
        })}

        {/* Neural pathway lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`neural-${i}`}
            className={`absolute ${isDarkMode ? 'opacity-40' : 'opacity-30'}`} // Increased for light mode
            style={{
              width: '2px',
              height: '150px',
              background: `linear-gradient(to bottom, ${getAIElementColor()}, transparent)`,
              left: `${10 + i * 12}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: isDarkMode ? `0 0 15px ${getAIElementColor()}` : `0 0 8px ${getAIElementColor()}`,
            }}
            animate={{
              scaleY: [0, 1, 0],
              opacity: isDarkMode ? [0, 0.8, 0] : [0, 0.6, 0], // Increased for light mode
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* AI processing indicators */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`indicator-${i}`}
            className="absolute"
            style={{
              width: '8px',
              height: '8px',
              background: getAIElementColor(),
              left: `${20 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              boxShadow: `0 0 ${isDarkMode ? '20px' : '12px'} currentColor`,
              borderRadius: i % 2 === 0 ? '50%' : '0%',
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: isDarkMode ? [0.5, 1, 0.5] : [0.4, 0.8, 0.4], // Increased for light mode
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Data stream visualization */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute flex space-x-1"
            style={{
              left: `${25 + i * 20}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [-200, window.innerWidth + 200],
              opacity: isDarkMode ? [0, 1, 0] : [0, 0.7, 0], // Increased for light mode
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 4,
            }}
          >
            {['●', '●', '●'].map((dot, j) => (
              <motion.span
                key={j}
                className="text-xs"
                style={{
                  color: getAIElementColor(),
                  textShadow: isDarkMode ? `0 0 8px ${getAIElementColor()}` : `0 0 4px ${getAIElementColor()}`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: j * 0.2,
                }}
              >
                {dot}
              </motion.span>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Enhanced3DBackground;