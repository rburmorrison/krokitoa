"use client";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import DiagramTypeDropdown from "./_components/DiagramTypeDropdown";
import { useState } from "react";
import DiagramCodeEditor from "./_components/DiagramCodeEditor";
import React from "react";
import * as kroki from "./_lib/kroki";

export default function Home() {
	const [diagramType, setDiagramType] = useState("mermaid");
	const [diagramCode, setDiagramCode] = useState("flowchart TD\n    A --> B");
	const [diagramSvg, setDiagramSvg] = useState<string | null>(null);

	const onDiagramTypeChange = (value: string) => {
		setDiagramType(value);
		if (typeof window !== "undefined") {
			localStorage.setItem("diagramType", value);
		}
	};

	const onEditorChange = (value: string | undefined) => {
		setDiagramCode(value || "");
		if (typeof window !== "undefined") {
			localStorage.setItem("diagramCode", value || "");
		}
	};

	const handleCtrlEnter = async () => {
		try {
			const svg = await kroki.generateDiagram(diagramType, diagramCode);
			setDiagramSvg(svg);
			console.log("Generated SVG:", svg);
		} catch (error) {
			console.error("Failed to generate diagram:", error);
		}
	};

	React.useEffect(() => {
		if (typeof window !== "undefined") {
			const storedType = localStorage.getItem("diagramType");
			if (storedType) {
				setDiagramType(storedType);
			}

			const storedCode = localStorage.getItem("diagramCode");
			if (storedCode) {
				setDiagramCode(storedCode);
			}
		}
	}, []);

	return (
		<div className="w-screen h-screen">
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel minSize={20} defaultSize={35} maxSize={50}>
					<div className="flex gap-4 h-full p-4 flex-col">
						<DiagramTypeDropdown
							value={diagramType}
							onValueChange={onDiagramTypeChange}
						/>
						<div className="rounded flex-1 border border-slate-200">
							<DiagramCodeEditor
								value={diagramCode}
								onChange={onEditorChange}
								onCtrlEnter={handleCtrlEnter}
							/>
						</div>
					</div>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel>
					<div className="h-full flex justify-center items-center bg-neutral-50">
						{diagramSvg ? (
							<img
								src={`data:image/svg+xml;base64,${btoa(diagramSvg)}`}
								alt="Generated Diagram"
							/>
						) : (
							<p className="text-gray-500">
								Press Ctrl/Cmd+Enter to generate a diagram.
							</p>
						)}
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
