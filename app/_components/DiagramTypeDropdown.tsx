"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const supportedDiagramTypes = [
	{ value: "blockdiag", label: "BlockDiag" },
	{ value: "bpmn", label: "BPMN" },
	{ value: "bytefield", label: "Bytefield" },
	{ value: "seqdiag", label: "SeqDiag" },
	{ value: "actdiag", label: "ActDiag" },
	{ value: "nwdiag", label: "NwDiag" },
	{ value: "packetdiag", label: "PacketDiag" },
	{ value: "rackdiag", label: "RackDiag" },
	{ value: "c4plantuml", label: "C4 with PlantUML" },
	{ value: "d2", label: "D2" },
	{ value: "dbml", label: "DBML" },
	{ value: "ditaa", label: "Ditaa" },
	{ value: "erd", label: "Erd" },
	{ value: "excalidraw", label: "Excalidraw" },
	{ value: "graphviz", label: "GraphViz" },
	{ value: "mermaid", label: "Mermaid" },
	{ value: "nomnoml", label: "Nomnoml" },
	{ value: "pikchr", label: "Pikchr" },
	{ value: "plantuml", label: "PlantUML" },
	{ value: "structurizr", label: "Structurizr" },
	{ value: "svgbob", label: "Svgbob" },
	{ value: "symbolator", label: "Symbolator" },
	{ value: "tikz", label: "TikZ" },
	{ value: "vega", label: "Vega" },
	{ value: "vegalite", label: "Vega-Lite" },
	{ value: "wavedrom", label: "WaveDrom" },
	{ value: "wireviz", label: "WireViz" },
];

export interface DiagramTypeDropdownProps {
	value: string;
	onValueChange: (value: string) => void;
}

/**
 * A dropdown component for selecting a diagram type from a predefined list.
 *
 * This component uses a popover to display a searchable list of diagram types.
 * It allows users to select a diagram type, which triggers a callback function
 * to handle the selection change.
 *
 * @param {DiagramTypeDropdownProps} props - The props for the component.
 * @param {string} props.value - The currently selected diagram type value.
 * @param {(value: string) => void} props.onValueChange - Callback function
 * that is triggered when the selected diagram type changes. Receives the new
 * value as an argument.
 *
 * @returns {JSX.Element} The rendered dropdown component.
 *
 * @example
 * ```tsx
 * const [selectedType, setSelectedType] = React.useState("");
 *
 * return (
 *   <DiagramTypeDropdown
 *     value={selectedType}
 *     onValueChange={(newValue) => setSelectedType(newValue)}
 *   />
 * );
 * ```
 */
const DiagramTypeDropdown: React.FC<DiagramTypeDropdownProps> = ({
	value,
	onValueChange,
}) => {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					// biome-ignore lint/a11y/useSemanticElements: a select would cause a duplicate menu
					role="combobox"
					aria-expanded={open}
					className="justify-between"
				>
					{value
						? supportedDiagramTypes.find(
								(diagramType) => diagramType.value === value,
							)?.label
						: "Select diagram type..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Search types..." />
					<CommandList>
						<CommandEmpty>No framework found.</CommandEmpty>
						<CommandGroup>
							{supportedDiagramTypes.map((diagramType) => (
								<CommandItem
									key={diagramType.value}
									value={diagramType.value}
									onSelect={(currentValue) => {
										onValueChange(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									{diagramType.label}
									<Check
										className={cn(
											"ml-auto",
											value === diagramType.value ? "opacity-100" : "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default DiagramTypeDropdown;
