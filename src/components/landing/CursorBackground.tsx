'use client';

import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
    opacity: number;
}

export const CursorBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animationRef = useRef<number>();

    const initParticles = useCallback((width: number, height: number) => {
        const particles: Particle[] = [];
        const spacing = 50;
        const cols = Math.ceil(width / spacing);
        const rows = Math.ceil(height / spacing);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                particles.push({
                    x: i * spacing + spacing / 2,
                    y: j * spacing + spacing / 2,
                    baseX: i * spacing + spacing / 2,
                    baseY: j * spacing + spacing / 2,
                    size: 1.5,
                    opacity: 0.15,
                });
            }
        }
        particlesRef.current = particles;
    }, []);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const mouse = mouseRef.current;
        const maxDistance = 150;

        particlesRef.current.forEach((particle) => {
            // Calculate distance from mouse
            const dx = mouse.x - particle.baseX;
            const dy = mouse.y - particle.baseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                // Push particles away from cursor
                const force = (maxDistance - distance) / maxDistance;
                const angle = Math.atan2(dy, dx);
                const pushX = Math.cos(angle) * force * 30;
                const pushY = Math.sin(angle) * force * 30;

                particle.x = particle.baseX - pushX;
                particle.y = particle.baseY - pushY;
                particle.opacity = 0.15 + force * 0.5;
                particle.size = 1.5 + force * 2;
            } else {
                // Return to base position with easing
                particle.x += (particle.baseX - particle.x) * 0.1;
                particle.y += (particle.baseY - particle.y) * 0.1;
                particle.opacity += (0.15 - particle.opacity) * 0.1;
                particle.size += (1.5 - particle.size) * 0.1;
            }

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });

        // Draw connections between nearby particles
        particlesRef.current.forEach((p1, i) => {
            particlesRef.current.slice(i + 1).forEach((p2) => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 80) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - distance / 80)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        animationRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles(canvas.width, canvas.height);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [initParticles, animate]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: 'transparent' }}
        />
    );
};

export default CursorBackground;
