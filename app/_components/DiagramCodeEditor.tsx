import { Editor, useMonaco } from "@monaco-editor/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { editor } from "monaco-editor";

interface DiagramCodeEditorProps {
	value: string;
	onChange: (value: string | undefined) => void;
	onCtrlEnter: () => void;
}

const DiagramCodeEditor: React.FC<DiagramCodeEditorProps> = ({
	value,
	onChange,
	onCtrlEnter,
}) => {
	const monaco = useMonaco();
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
	const [editorMounted, setEditorMounted] = useState(false);

	const onEditorMount = (editor: editor.IStandaloneCodeEditor) => {
		editorRef.current = editor;
		setEditorMounted(true);
	};

	useEffect(() => {
		if (monaco && editorMounted) {
			editorRef.current?.addCommand(
				monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
				onCtrlEnter,
			);
		}
	}, [monaco, editorMounted, onCtrlEnter]);

	return (
		<Editor
			value={value}
			onChange={onChange}
			onMount={onEditorMount}
			options={{ fontSize: 14 }}
		/>
	);
};

export default DiagramCodeEditor;
