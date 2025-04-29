import type React from "react";
import { useRef, useState, useImperativeHandle, forwardRef } from "react";

export type DiagramOutputHandle = {
	recenter: () => void;
};

type DiagramOutputProps = {
	diagramSvg: string | null;
};

/**
 * A React component that displays a draggable and pannable diagram output.
 * The diagram is rendered as an SVG image, and users can drag it to adjust its position.
 *
 * @component
 * @param {DiagramOutputProps} props - The props for the DiagramOutput component.
 * @param {string} props.diagramSvg - The SVG content of the diagram to be displayed.
 * @param {React.Ref<DiagramOutputHandle>} ref - A ref object to expose imperative methods.
 *
 * @returns {JSX.Element} The rendered DiagramOutput component.
 *
 * @example
 * ```tsx
 * const diagramRef = useRef<DiagramOutputHandle>(null);
 *
 * const handleRecenter = () => {
 *   diagramRef.current?.recenter();
 * };
 *
 * return (
 *   <DiagramOutput
 *     ref={diagramRef}
 *     diagramSvg="<svg>...</svg>"
 *   />
 * );
 * ```
 *
 * @remarks
 * - If no `diagramSvg` is provided, a placeholder message is displayed.
 * - The component supports dragging to pan the diagram using mouse events.
 * - The `recenter` method can be called via the ref to reset the diagram's position.
 *
 * @typedef {Object} DiagramOutputHandle
 * @property {() => void} recenter - Resets the diagram's position to the center.
 */
const DiagramOutput = forwardRef<DiagramOutputHandle, DiagramOutputProps>(
	function DiagramOutput({ diagramSvg }, ref) {
		const [dragging, setDragging] = useState(false);
		const [offset, setOffset] = useState({ x: 0, y: 0 });
		const [zoom, setZoom] = useState(1);
		const lastPos = useRef<{ x: number; y: number } | null>(null);

		useImperativeHandle(
			ref,
			() => ({
				recenter: () => {
					setOffset({ x: 0, y: 0 });
					setZoom(1);
				},
			}),
			[],
		);

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

		const handleWheel = (e: React.WheelEvent) => {
			setZoom((prevZoom) => {
				const newZoom = prevZoom - e.deltaY * 0.001;
				return Math.min(Math.max(newZoom, 0.25), 3); // Clamp zoom between 0.25 and 3
			});
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
				className="w-full h-full flex justify-center items-center overflow-hidden"
				style={{ cursor: dragging ? "grabbing" : "grab" }}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
				onWheel={handleWheel}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={`data:image/svg+xml;base64,${btoa(diagramSvg)}`}
					alt="Generated Diagram"
					className="select-none max-w-none"
					style={{
						transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
					}}
					draggable={false}
				/>
			</div>
		);
	},
);

export default DiagramOutput;
