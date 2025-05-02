import { Editor, useMonaco, loader } from "@monaco-editor/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { editor } from "monaco-editor";
import { useTheme } from "next-themes";

loader.config({ paths: { vs: "/static/vs" } });

interface DiagramCodeEditorProps {
	value: string;
	onChange: (value: string | undefined) => void;
	onCtrlEnter: () => void;
}

/**
 * A React functional component that wraps a Monaco Editor instance and provides
 * additional functionality such as handling `Ctrl+Enter` key commands.
 *
 * @component
 * @param {DiagramCodeEditorProps} props - The props for the DiagramCodeEditor component.
 * @param {string} props.value - The current value of the editor.
 * @param {(value: string | undefined) => void} props.onChange - Callback function triggered when the editor's value changes.
 * @param {() => void} props.onCtrlEnter - Callback function triggered when the `Ctrl+Enter` key combination is pressed.
 *
 * @returns {JSX.Element} The rendered DiagramCodeEditor component.
 *
 * @remarks
 * - This component uses the `useMonaco` hook to access the Monaco Editor instance.
 * - The `onCtrlEnter` callback is registered as a command in the editor when both
 *   the Monaco instance and the editor are mounted.
 * - The editor's font size is set to 14 by default via the `options` prop.
 *
 * @example
 * ```tsx
 * <DiagramCodeEditor
 *   value={code}
 *   onChange={(newValue) => setCode(newValue)}
 *   onCtrlEnter={() => console.log('Ctrl+Enter pressed')}
 * />
 * ```
 */
const DiagramCodeEditor: React.FC<DiagramCodeEditorProps> = ({
	value,
	onChange,
	onCtrlEnter,
}) => {
	const monaco = useMonaco();
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const { resolvedTheme } = useTheme();
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
		<div ref={containerRef} className="h-full w-full min-h-0 flex flex-col">
			<Editor
				value={value}
				onChange={onChange}
				onMount={onEditorMount}
				theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
				options={{
					fontSize: 14,
					automaticLayout: true,
				}}
				className="h-full w-full min-h-0 flex-1"
			/>
		</div>
	);
};

export default DiagramCodeEditor;
