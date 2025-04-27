import type React from "react";
import { useRef, useState } from "react";

type DiagramOutputProps = {
	diagramSvg: string | null;
};

const DiagramOutput: React.FC<DiagramOutputProps> = ({ diagramSvg }) => {
	const [dragging, setDragging] = useState(false);
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const lastPos = useRef<{ x: number; y: number } | null>(null);

	const handleMouseDown = (e: React.MouseEvent) => {
		setDragging(true);
		lastPos.current = { x: e.clientX, y: e.clientY };
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!dragging || !lastPos.current) return;
		const dx = e.clientX - lastPos.current.x;
		const dy = e.clientY - lastPos.current.y;
		setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
		lastPos.current = { x: e.clientX, y: e.clientY };
	};

	const handleMouseUp = () => {
		setDragging(false);
		lastPos.current = null;
	};

	if (!diagramSvg) {
		return (
			<p className="text-gray-500">
				Press Ctrl/Cmd+Enter to generate a diagram.
			</p>
		);
	}

	return (
		<div
			className="w-full h-full flex justify-center items-center"
			style={{ cursor: dragging ? "grabbing" : "grab" }}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
		>
			<img
				src={`data:image/svg+xml;base64,${btoa(diagramSvg)}`}
				alt="Generated Diagram"
				className="select-none"
				style={{
					transform: `translate(${offset.x}px, ${offset.y}px)`,
				}}
				draggable={false}
			/>
		</div>
	);
};

export default DiagramOutput;
