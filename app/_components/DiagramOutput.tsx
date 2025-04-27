import type React from "react";

type DiagramOutputProps = {
	diagramSvg: string | null;
};

const DiagramOutput: React.FC<DiagramOutputProps> = ({ diagramSvg }) => {
	if (!diagramSvg) {
		return (
			<p className="text-gray-500">
				Press Ctrl/Cmd+Enter to generate a diagram.
			</p>
		);
	}

	return (
		<div className="h-full flex justify-center items-center">
			<img
				src={`data:image/svg+xml;base64,${btoa(diagramSvg)}`}
				alt="Generated Diagram"
				className="select-none"
			/>
		</div>
	);
};

export default DiagramOutput;
