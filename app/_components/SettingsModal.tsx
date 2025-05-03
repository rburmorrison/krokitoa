"use client";

import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import useAccentColor, { type AccentColor } from "@/app/_hooks/useAccentColor";

const DEFAULT_KROKI_URL = "https://kroki.io";

interface SettingsModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function SettingsModal({
	open,
	onOpenChange,
}: SettingsModalProps) {
	const [krokiUrl, setKrokiUrl] = useState(DEFAULT_KROKI_URL);
	const { theme, setTheme } = useTheme();
	const [themeValue, setThemeValue] = useState(theme ?? "system");
	const { accentColor, updateAccentColor } = useAccentColor();
	const [accentColorValue, setAccentColorValue] =
		useState<AccentColor>(accentColor);

	// Map accent colors to their CSS variables
	const accentColorMap: Record<AccentColor, string> = {
		neutral: "var(--accent-neutral)",
		red: "var(--accent-red)",
		orange: "var(--accent-orange)",
		blue: "var(--accent-blue)",
	};

	useEffect(() => {
		const savedUrl = localStorage.getItem("krokiUrl");
		if (savedUrl) {
			setKrokiUrl(savedUrl);
		}

		// Update the accent color value when the component mounts and whenever
		// the accentColor from the hook changes
		setAccentColorValue(accentColor);
	}, [accentColor]);

	const handleSave = () => {
		localStorage.setItem("krokiUrl", krokiUrl);
		setTheme(themeValue);
		updateAccentColor(accentColorValue);
		onOpenChange(false);
	};

	const themeDisplayName =
		themeValue.charAt(0).toUpperCase() + themeValue.slice(1);

	const accentColorDisplayName =
		accentColorValue.charAt(0).toUpperCase() + accentColorValue.slice(1);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<label htmlFor="krokiUrl" className="text-right text-sm">
							Kroki URL
						</label>
						<Input
							id="krokiUrl"
							value={krokiUrl}
							onChange={(e) => setKrokiUrl(e.target.value)}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<label htmlFor="theme" className="text-right text-sm">
							Theme
						</label>
						<DropdownMenu>
							<DropdownMenuTrigger className="col-span-3" asChild>
								<Button variant="outline" className="justify-start">
									{themeDisplayName}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Theme</DropdownMenuLabel>
								<DropdownMenuRadioGroup
									value={theme}
									onValueChange={(value) => {
										setThemeValue(value);
									}}
								>
									<DropdownMenuRadioItem value="system">
										System
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="light">
										Light
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="dark">
										Dark
									</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<label htmlFor="accentColor" className="text-right text-sm">
							Accent Color
						</label>
						<DropdownMenu>
							<DropdownMenuTrigger className="col-span-3" asChild>
								<Button variant="outline" className="justify-start">
									<div className="flex items-center gap-2">
										<div
											className="w-4 h-4 rounded-full"
											style={{
												background: accentColorMap[accentColorValue],
											}}
										/>
										{accentColorDisplayName}
									</div>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Accent Color</DropdownMenuLabel>
								<DropdownMenuRadioGroup
									value={accentColorValue}
									onValueChange={(value) => {
										setAccentColorValue(value as AccentColor);
									}}
								>
									<DropdownMenuRadioItem value="neutral">
										<div className="flex items-center gap-2">
											<div
												className="w-4 h-4 rounded-full"
												style={{
													background: accentColorMap.neutral,
												}}
											/>
											Neutral
										</div>
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="red">
										<div className="flex items-center gap-2">
											<div
												className="w-4 h-4 rounded-full"
												style={{ background: accentColorMap.red }}
											/>
											Red
										</div>
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="orange">
										<div className="flex items-center gap-2">
											<div
												className="w-4 h-4 rounded-full"
												style={{ background: accentColorMap.orange }}
											/>
											Orange
										</div>
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="blue">
										<div className="flex items-center gap-2">
											<div
												className="w-4 h-4 rounded-full"
												style={{ background: accentColorMap.blue }}
											/>
											Blue
										</div>
									</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={handleSave}>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
