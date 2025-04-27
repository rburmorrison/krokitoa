"use client";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import DiagramTypeDropdown from "./_components/DiagramTypeDropdown";
import { useState } from "react";

export default function Home() {
	const [diagramType, setDiagramType] = useState("mermaid");

	return (
		<div className="w-screen h-screen">
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel minSize={20} defaultSize={35} maxSize={50}>
					<div className="flex h-full p-4 flex-col">
						<DiagramTypeDropdown
							value={diagramType}
							onValueChange={setDiagramType}
						/>
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel>
					<div className="h-full flex justify-center items-center bg-orange-50">
						Hello!
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
