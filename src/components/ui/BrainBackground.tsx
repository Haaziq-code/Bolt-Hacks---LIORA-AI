import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

interface BrainBackgroundProps {
  isActive?: boolean;
  intensity?: number;
}

const BrainBackground: React.FC<BrainBackgroundProps> = ({ 
  isActive = false, 
  intensity = 0.5 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { currentMode } = useApp();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Brain node structure
  const brainNodes = useRef<Array<{
    x: number;
    y: number;
    z: number;
    connections: number[];
    activity: number;
    pulsePhase: number;
    size: number;
  }>>([]);

  // Neural connections
  const connections = useRef<Array<{
    from: number;
    to: number;
    strength: number;
    activity: number;
    pulseSpeed: number;
  }>>([]);

  // Particles for neural activity
  const particles = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    opacity: number;
    color: string;
  }>>([]);

  // Initialize brain structure
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create brain-like node structure
    const nodeCount = 120;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    brainNodes.current = [];
    connections.current = [];

    // Generate nodes in brain-like clusters
    for (let i = 0; i < nodeCount; i++) {
      // Create brain hemisphere structure
      const hemisphere = i < nodeCount / 2 ? -1 : 1;
      const angle = (i / nodeCount) * Math.PI * 4;
      const radius = 150 + Math.sin(angle * 3) * 50;
      
      const x = centerX + hemisphere * Math.cos(angle) * radius * 0.6;
      const y = centerY + Math.sin(angle) * radius * 0.8 + Math.sin(angle * 2) * 30;
      const z = Math.cos(angle * 1.5) * 100;

      brainNodes.current.push({
        x,
        y,
        z,
        connections: [],
        activity: Math.random(),
        pulsePhase: Math.random() * Math.PI * 2,
        size: 2 + Math.random() * 3
      });
    }

    // Create neural connections
    brainNodes.current.forEach((node, i) => {
      const connectionCount = 3 + Math.floor(Math.random() * 4);
      
      for (let j = 0; j < connectionCount; j++) {
        const targetIndex = Math.floor(Math.random() * brainNodes.current.length);
        if (targetIndex !== i) {
          const distance = Math.sqrt(
            Math.pow(node.x - brainNodes.current[targetIndex].x, 2) +
            Math.pow(node.y - brainNodes.current[targetIndex].y, 2)
          );
          
          if (distance < 200) {
            connections.current.push({
              from: i,
              to: targetIndex,
              strength: 0.3 + Math.random() * 0.7,
              activity: 0,
              pulseSpeed: 0.02 + Math.random() * 0.03
            });
          }
        }
      }
    });

  }, []);

  // Get mode-specific colors
  const getModeColors = () => {
    switch (currentMode) {
      case 'therapist':
        return {
          primary: 'rgba(34, 197, 94, 0.8)', // calm blue-green
          secondary: 'rgba(59, 130, 246, 0.6)',
          accent: 'rgba(147, 197, 253, 0.4)',
          particles: 'rgba(34, 197, 94, 0.3)'
        };
      case 'tutor':
        return {
          primary: 'rgba(251, 191, 36, 0.8)', // warm golden
          secondary: 'rgba(245, 158, 11, 0.6)',
          accent: 'rgba(252, 211, 77, 0.4)',
          particles: 'rgba(251, 191, 36, 0.3)'
        };
      case 'coach':
        return {
          primary: 'rgba(168, 85, 247, 0.8)', // vibrant purple
          secondary: 'rgba(236, 72, 153, 0.6)',
          accent: 'rgba(196, 181, 253, 0.4)',
          particles: 'rgba(168, 85, 247, 0.3)'
        };
      default:
        return {
          primary: 'rgba(14, 165, 233, 0.8)', // primary blue
          secondary: 'rgba(168, 85, 247, 0.6)',
          accent: 'rgba(147, 197, 253, 0.4)',
          particles: 'rgba(14, 165, 233, 0.3)'
        };
    }
  };

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left - canvas.width / 2) / canvas.width,
        y: (e.clientY - rect.top - canvas.height / 2) / canvas.height
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

      const colors = getModeColors();
      const activityMultiplier = isActive ? 1.5 : 0.8;
      const intensityFactor = intensity * activityMultiplier;

      // Parallax offset based on mouse position
      const parallaxX = mousePosition.x * 20;
      const parallaxY = mousePosition.y * 20;

      // Update and draw neural connections
      connections.current.forEach((connection, i) => {
        const fromNode = brainNodes.current[connection.from];
        const toNode = brainNodes.current[connection.to];

        if (!fromNode || !toNode) return;

        // Update connection activity
        connection.activity += connection.pulseSpeed * intensityFactor;
        if (connection.activity > 1) connection.activity = 0;

        // Calculate positions with parallax
        const fromX = fromNode.x + parallaxX + Math.sin(time + fromNode.pulsePhase) * 2;
        const fromY = fromNode.y + parallaxY + Math.cos(time + fromNode.pulsePhase) * 2;
        const toX = toNode.x + parallaxX + Math.sin(time + toNode.pulsePhase) * 2;
        const toY = toNode.y + parallaxY + Math.cos(time + toNode.pulsePhase) * 2;

        // Draw connection
        const opacity = connection.strength * intensityFactor * (0.3 + connection.activity * 0.7);
        
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = colors.secondary;
        ctx.lineWidth = 1 + connection.activity * 2;
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();

        // Draw neural pulse
        if (connection.activity > 0.1) {
          const pulseX = fromX + (toX - fromX) * connection.activity;
          const pulseY = fromY + (toY - fromY) * connection.activity;
          
          ctx.globalAlpha = connection.activity * intensityFactor;
          ctx.fillStyle = colors.primary;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2 + connection.activity * 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // Update and draw brain nodes
      brainNodes.current.forEach((node, i) => {
        // Update node activity
        node.activity += 0.01 * intensityFactor;
        node.pulsePhase += 0.02;

        // Calculate position with rotation and parallax
        const rotationSpeed = 0.001;
        const rotatedX = node.x * Math.cos(time * rotationSpeed) - node.z * Math.sin(time * rotationSpeed);
        const rotatedZ = node.x * Math.sin(time * rotationSpeed) + node.z * Math.cos(time * rotationSpeed);
        
        const x = rotatedX + parallaxX;
        const y = node.y + parallaxY + Math.sin(node.pulsePhase) * 3;
        const scale = 1 + rotatedZ / 500; // Depth scaling

        // Draw node
        const pulseIntensity = Math.sin(node.pulsePhase) * 0.5 + 0.5;
        const nodeSize = node.size * scale * (1 + pulseIntensity * 0.5) * intensityFactor;
        
        ctx.save();
        ctx.globalAlpha = 0.6 + pulseIntensity * 0.4;
        
        // Node glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, nodeSize * 3);
        gradient.addColorStop(0, colors.primary);
        gradient.addColorStop(0.5, colors.accent);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, nodeSize * 3, 0, Math.PI * 2);
        ctx.fill();

        // Node core
        ctx.fillStyle = colors.primary;
        ctx.beginPath();
        ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Generate particles from active nodes
        if (pulseIntensity > 0.8 && Math.random() < 0.1 * intensityFactor) {
          particles.current.push({
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 0,
            maxLife: 60 + Math.random() * 60,
            size: 1 + Math.random() * 2,
            opacity: 0.8,
            color: colors.particles
          });
        }
      });

      // Update and draw particles
      particles.current = particles.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;
        particle.opacity = Math.max(0, 1 - particle.life / particle.maxLife);

        if (particle.opacity > 0) {
          ctx.save();
          ctx.globalAlpha = particle.opacity * intensityFactor;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          return true;
        }
        return false;
      });

      // Limit particles for performance
      if (particles.current.length > 200) {
        particles.current = particles.current.slice(-200);
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

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-60"
        style={{ 
          mixBlendMode: 'screen',
          filter: 'blur(0.5px)'
        }}
      />
      
      {/* Additional atmospheric effects */}
      <div className="absolute inset-0 opacity-30">
        {/* Nebula-like gradients */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: currentMode === 'therapist' 
              ? 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)'
              : currentMode === 'tutor'
              ? 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)'
              : currentMode === 'coach'
              ? 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: currentMode === 'therapist' 
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)'
              : currentMode === 'tutor'
              ? 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)'
              : currentMode === 'coach'
              ? 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating data particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-40"
            style={{
              background: currentMode === 'therapist' 
                ? '#22c55e'
                : currentMode === 'tutor'
                ? '#fbbf24'
                : currentMode === 'coach'
                ? '#a855f7'
                : '#0ea5e9',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BrainBackground;