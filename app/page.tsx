import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import DiagramTypeDropdown from "./_components/DiagramTypeDropdown";

export default function Home() {
	return (
		<div className="w-screen h-screen">
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel minSize={20} defaultSize={35} maxSize={50}>
					<div className="flex h-full p-4 flex-col">
						<DiagramTypeDropdown />
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel>Two</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
