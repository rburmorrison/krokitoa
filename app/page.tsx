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

export default function Home() {
	const [diagramType, setDiagramType] = useState("mermaid");
	const [diagramCode, setDiagramCode] = useState("flowchart TD\n    A --> B");

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

	const handleCtrlEnter = () => {
		console.log(diagramType, diagramCode);
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
					<div className="flex gap-4 h-full p-4 flex-col bg-neutral-50">
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
					<div className="h-full flex justify-center items-center">Hello!</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
