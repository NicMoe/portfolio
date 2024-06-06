import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
`

const NetworkGraph = () => {
    const canvasRef = useRef(null);
    const nodes = useRef([]);

    useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const numNodes = 120;
    const maxDistance = 80;

    const initializeNodes = () => {
    nodes.current = Array.from({ length: numNodes }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: (Math.random() + 1.1) * 2,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        speed: Math.random() * 0.5 + 0.5,
    }));
    };

    const resizeCanvas = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    };

    const distance = (node1, node2) =>
    Math.sqrt((node1.x - node2.x) ** 2 + (node1.y - node2.y) ** 2);

    const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    nodes.current.forEach((node, i) => {
        const nodeFadeFactor = Math.pow((node.x / canvas.width) - 0.25, 2); // Shift focus more to the right
        const nodeAlpha = Math.min(
        nodeFadeFactor,
        (canvas.width - node.x) / canvas.width,
        node.y / canvas.height,
        (canvas.height - node.y) / canvas.height
        );
        context.fillStyle = `rgba(254, 250, 231, ${nodeAlpha})`;
        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fill();

        nodes.current.slice(i + 1).forEach((otherNode) => {
        if (distance(node, otherNode) < maxDistance) {
            const edgeFadeFactor = Math.min(
            nodeFadeFactor,
            Math.pow((otherNode.x / canvas.width) - 0.25, 2), // Shift focus more to the right
            (canvas.width - node.x) / canvas.width,
            (canvas.width - otherNode.x) / canvas.width,
            node.y / canvas.height,
            otherNode.y / canvas.height,
            (canvas.height - node.y) / canvas.height,
            (canvas.height - otherNode.y) / canvas.height
            );
            const edgeAlpha = edgeFadeFactor * (4 - distance(node, otherNode) / maxDistance);
            context.strokeStyle = `rgba(230, 120, 25, ${edgeAlpha})`;
            context.lineWidth = 1.2;
            context.beginPath();
            context.moveTo(node.x, node.y);
            context.lineTo(otherNode.x, otherNode.y);
            context.stroke();
        }
        });
    });
    requestAnimationFrame(draw);
    };

    const animateNodes = () => {
    nodes.current.forEach((node) => {
        node.x += node.dx * node.speed;
        node.y += node.dy * node.speed;
        if (node.x <= 0 || node.x >= canvas.width) node.dx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.dy *= -1;
    });
    };

    const animate = () => {
    animateNodes();
    requestAnimationFrame(animate);
    };

    resizeCanvas();
    initializeNodes();
    window.addEventListener('resize', resizeCanvas);
    draw();
    animate();

    return () => window.removeEventListener('resize', resizeCanvas);
}, []);

return <Canvas ref={canvasRef} />;
};

export default NetworkGraph;