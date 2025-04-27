"use client";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import DiagramTypeDropdown from "./_components/DiagramTypeDropdown";
import { useState, useRef } from "react";
import DiagramCodeEditor from "./_components/DiagramCodeEditor";
import React from "react";
import * as kroki from "./_lib/kroki";
import { RefreshCcw, Crosshair } from "lucide-react";
import DiagramOutput from "./_components/DiagramOutput";
import { Button } from "@/components/ui/button";
import type { DiagramOutputHandle } from "./_components/DiagramOutput";

export default function Home() {
	const [diagramType, setDiagramType] = useState("mermaid");
	const [diagramCode, setDiagramCode] = useState("flowchart TD\n    A --> B");
	const [diagramSvg, setDiagramSvg] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const diagramOutputRef = useRef<DiagramOutputHandle>(null);

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
		setError(null);
		setIsLoading(true);
		try {
			const svg = await kroki.generateDiagram(diagramType, diagramCode);
			setDiagramSvg(svg);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("An unknown error occurred.");
			}
		} finally {
			setIsLoading(false);
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
			<div
				style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 20 }}
			>
				<Button
					size="icon"
					variant="ghost"
					aria-label="Recenter diagram"
					onClick={() => diagramOutputRef.current?.recenter()}
				>
					<Crosshair />
				</Button>
			</div>
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
					<ResizablePanelGroup direction="vertical">
						<ResizablePanel>
							<div className="h-full flex justify-center items-center bg-neutral-50">
								{isLoading ? (
									<RefreshCcw
										className="animate-spin text-gray-500"
										size={48}
									/>
								) : (
									<DiagramOutput
										ref={diagramOutputRef}
										diagramSvg={diagramSvg}
									/>
								)}
							</div>
						</ResizablePanel>
						<ResizableHandle />
						<ResizablePanel
							hidden={error === null}
							minSize={20}
							defaultSize={20}
							maxSize={50}
						>
							<div className="h-full font-mono flex p-4 overflow-auto">
								<p>{error}</p>
								<div className="mt-4" />
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
