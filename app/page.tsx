"use client";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import DiagramTypeDropdown from "./_components/DiagramTypeDropdown";
import { useState } from "react";
import { Editor, useMonaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import React from "react";

export default function Home() {
	const monaco = useMonaco();
	const editorRef = React.useRef<editor.IStandaloneCodeEditor | null>(null);
	const [diagramType, setDiagramType] = useState("mermaid");
	const [diagramCode, setDiagramCode] = useState("flowchart TD\n    A --> B");
	const [editorMounted, setEditorMounted] = useState(false);

	const onEditorMount = (editor: editor.IStandaloneCodeEditor) => {
		editorRef.current = editor;
		setEditorMounted(true);
	};

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

	React.useEffect(() => {
		if (monaco && editorMounted) {
			editorRef.current?.addCommand(
				monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
				() => {
					console.log(diagramType, diagramCode);
				},
			);
		}
	}, [monaco, diagramType, diagramCode, editorMounted]);

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
							<Editor
								value={diagramCode}
								onChange={onEditorChange}
								onMount={onEditorMount}
								options={{ fontSize: 14 }}
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
