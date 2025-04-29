"use client";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import DiagramTypeDropdown from "./_components/DiagramTypeDropdown";
import { useState, useRef, useEffect } from "react";
import DiagramCodeEditor from "./_components/DiagramCodeEditor";
import * as kroki from "./_lib/kroki";
import {
	RefreshCcw,
	Crosshair,
	Maximize,
	Minimize,
	Save,
	Play,
	Settings,
} from "lucide-react";
import DiagramOutput from "./_components/DiagramOutput";
import { Button } from "@/components/ui/button";
import type { DiagramOutputHandle } from "./_components/DiagramOutput";
import IconButton from "./_components/IconButton";
import { SettingsModal } from "./_components/SettingsModal";

export default function Home() {
	const [diagramCode, setDiagramCode] = useState("flowchart TD\n    A --> B");
	const [diagramSvg, setDiagramSvg] = useState<string | null>(null);
	const [diagramType, setDiagramType] = useState("mermaid");
	const [error, setError] = useState<string | null>(null);
	const [isEditorHidden, setIsEditorHidden] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [upstreamUrl, setUpstreamUrl] = useState<string | null>(null);
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

	const generateDiagram = async () => {
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

	const toggleEditorVisibility = () => {
		setIsEditorHidden((prev) => !prev);
	};

	useEffect(() => {
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

	useEffect(() => {
		setUpstreamUrl(kroki.generateUrl(diagramType, diagramCode));
	}, [diagramType, diagramCode]);

	return (
		<div className="w-screen h-screen">
			<div className="absolute top-4 right-4 z-20 flex">
				<IconButton
					icon={isEditorHidden ? Minimize : Maximize}
					ariaLabel={isEditorHidden ? "Show editor" : "Hide editor"}
					onClick={toggleEditorVisibility}
				/>
				<IconButton
					icon={Crosshair}
					ariaLabel="Recenter diagram"
					onClick={() => diagramOutputRef.current?.recenter()}
				/>
				<IconButton
					icon={Save}
					ariaLabel="Download diagram"
					onClick={() => {
						if (diagramSvg) {
							const link = document.createElement("a");
							link.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(diagramSvg)}`;
							link.download = "diagram.svg";
							link.click();
						}
					}}
					disabled={!diagramSvg}
				/>
				<IconButton
					icon={Settings}
					ariaLabel="Open settings"
					onClick={() => setIsSettingsOpen(true)}
				/>
			</div>
			<SettingsModal open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel
					minSize={20}
					defaultSize={35}
					maxSize={50}
					hidden={isEditorHidden}
				>
					<div className="flex gap-4 h-full p-4 flex-col">
						<div className="flex items-center gap-2">
							<div className="flex-1">
								<DiagramTypeDropdown
									value={diagramType}
									onValueChange={onDiagramTypeChange}
								/>
							</div>
							<Button
								size="icon"
								variant="outline"
								aria-label="Generate diagram"
								onClick={generateDiagram}
							>
								<Play />
							</Button>
						</div>
						<div className="rounded flex-1 border border-neutral-200 dark:border-neutral-700">
							<DiagramCodeEditor
								value={diagramCode}
								onChange={onEditorChange}
								onCtrlEnter={generateDiagram}
							/>
						</div>
						<div className="overflow-hidden text-ellipsis whitespace-nowrap">
							{upstreamUrl && (
								<a
									href={upstreamUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="underline"
								>
									{upstreamUrl}
								</a>
							)}
						</div>
					</div>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel>
					<ResizablePanelGroup direction="vertical">
						<ResizablePanel>
							<div className="h-full flex justify-center items-center bg-neutral-50 dark:bg-neutral-900">
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
