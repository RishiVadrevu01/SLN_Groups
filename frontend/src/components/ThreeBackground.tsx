"use client";

import React, { useEffect, useRef } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  opacity: number;
}

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.05;
      targetMouseY = (e.clientY - height / 2) * 0.05;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Create 3D nodes
    const nodeCount = Math.min(110, Math.floor((width * height) / 12000));
    const nodes: Node3D[] = [];
    const spread = 800;

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * spread * 2;
      const y = (Math.random() - 0.5) * spread * 1.5;
      const z = Math.random() * spread;
      nodes.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.3,
      });
    }

    // 3D Wireframe geometric cubes/landmarks floating in space
    interface Cube3D {
      x: number;
      y: number;
      z: number;
      size: number;
      rotX: number;
      rotY: number;
      rotZ: number;
      vRotX: number;
      vRotY: number;
      vRotZ: number;
    }

    const cubes: Cube3D[] = [
      { x: -280, y: -120, z: 250, size: 70, rotX: 0.2, rotY: 0.3, rotZ: 0, vRotX: 0.005, vRotY: 0.008, vRotZ: 0.003 },
      { x: 320, y: 140, z: 350, size: 90, rotX: 0.5, rotY: 0.1, rotZ: 0.2, vRotX: 0.004, vRotY: 0.006, vRotZ: 0.004 },
      { x: -200, y: 220, z: 450, size: 60, rotX: 0.1, rotY: 0.6, rotZ: 0.1, vRotX: 0.007, vRotY: 0.005, vRotZ: 0.002 },
      { x: 260, y: -200, z: 200, size: 55, rotX: 0.4, rotY: 0.2, rotZ: 0.5, vRotX: 0.006, vRotY: 0.009, vRotZ: 0.005 },
    ];

    const fov = 400; // Focal length

    const render = () => {
      // Smooth camera interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Subtle ambient gold radial lighting
      const grad = ctx.createRadialGradient(
        width / 2 + mouseX * 2,
        height / 2 + mouseY * 2,
        50,
        width / 2,
        height / 2,
        width * 0.7
      );
      grad.addColorStop(0, "rgba(212, 175, 55, 0.06)");
      grad.addColorStop(0.5, "rgba(180, 130, 40, 0.02)");
      grad.addColorStop(1, "rgba(3, 7, 18, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const projected: { x: number; y: number; scale: number; node: Node3D }[] = [];

      // Update and project nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;

        // Wrap around 3D boundaries
        if (n.x > spread) n.x = -spread;
        if (n.x < -spread) n.x = spread;
        if (n.y > spread * 0.8) n.y = -spread * 0.8;
        if (n.y < -spread * 0.8) n.y = spread * 0.8;
        if (n.z > spread) n.z = 50;
        if (n.z < 50) n.z = spread;

        // Apply mouse camera angle
        const camX = n.x - mouseX * 1.5;
        const camY = n.y - mouseY * 1.5;
        const camZ = n.z + fov;

        const scale = fov / camZ;
        const projX = width / 2 + camX * scale;
        const projY = height / 2 + camY * scale;

        projected.push({ x: projX, y: projY, scale, node: n });

        // Draw particle dot
        const alpha = Math.min(1, Math.max(0.1, n.opacity * scale * 1.2));
        ctx.beginPath();
        ctx.arc(projX, projY, Math.max(0.8, n.size * scale * 1.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 178, 85, ${alpha})`;
        ctx.shadowColor = "rgba(235, 195, 100, 0.5)";
        ctx.shadowBlur = scale > 0.8 ? 8 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw constellation connective lines
      const maxDist = 130;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.22 * Math.min(p1.scale, p2.scale);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(217, 178, 85, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Render 3D geometric wireframe landmarks
      for (const cube of cubes) {
        cube.rotX += cube.vRotX;
        cube.rotY += cube.vRotY;
        cube.rotZ += cube.vRotZ;

        // Cube 8 vertices in local coordinates
        const s = cube.size / 2;
        const vertices = [
          [-s, -s, -s],
          [s, -s, -s],
          [s, s, -s],
          [-s, s, -s],
          [-s, -s, s],
          [s, -s, s],
          [s, s, s],
          [-s, s, s],
        ];

        // Rotation matrix calculations
        const cosX = Math.cos(cube.rotX);
        const sinX = Math.sin(cube.rotX);
        const cosY = Math.cos(cube.rotY);
        const sinY = Math.sin(cube.rotY);
        const cosZ = Math.cos(cube.rotZ);
        const sinZ = Math.sin(cube.rotZ);

        const transformed: { x: number; y: number }[] = [];

        for (const [vx, vy, vz] of vertices) {
          // Rotate Y
          const x1 = vx * cosY + vz * sinY;
          const y1 = vy;
          const z1 = -vx * sinY + vz * cosY;

          // Rotate X
          const x2 = x1;
          const y2 = y1 * cosX - z1 * sinX;
          const z2 = y1 * sinX + z1 * cosX;

          // Rotate Z
          const x3 = x2 * cosZ - y2 * sinZ;
          const y3 = x2 * sinZ + y2 * cosZ;
          const z3 = z2;

          // Translate to world position and apply camera
          const worldX = cube.x + x3 - mouseX * 2;
          const worldY = cube.y + y3 - mouseY * 2;
          const worldZ = cube.z + z3 + fov;

          const scale = fov / worldZ;
          const px = width / 2 + worldX * scale;
          const py = height / 2 + worldY * scale;

          transformed.push({ x: px, y: py });
        }

        // Draw 12 cube edges
        const edges = [
          [0, 1], [1, 2], [2, 3], [3, 0], // back face
          [4, 5], [5, 6], [6, 7], [7, 4], // front face
          [0, 4], [1, 5], [2, 6], [3, 7], // connecting edges
        ];

        ctx.strokeStyle = "rgba(235, 195, 100, 0.28)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (const [v1, v2] of edges) {
          ctx.moveTo(transformed[v1].x, transformed[v1].y);
          ctx.lineTo(transformed[v2].x, transformed[v2].y);
        }
        ctx.stroke();

        // Inner glowing core
        const centerWorldZ = cube.z + fov;
        const centerScale = fov / centerWorldZ;
        const cx = width / 2 + (cube.x - mouseX * 2) * centerScale;
        const cy = height / 2 + (cube.y - mouseY * 2) * centerScale;

        ctx.beginPath();
        ctx.arc(cx, cy, 3 * centerScale, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245, 215, 120, 0.7)";
        ctx.shadowColor = "rgba(235, 195, 100, 0.8)";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ display: "block" }}
    />
  );
}
