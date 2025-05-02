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

	useEffect(() => {
		const savedUrl = localStorage.getItem("krokiUrl");
		if (savedUrl) {
			setKrokiUrl(savedUrl);
		}
	}, []);

	const handleSave = () => {
		localStorage.setItem("krokiUrl", krokiUrl);
		setTheme(themeValue);
		onOpenChange(false);
	};

	const themeDisplayName =
		themeValue.charAt(0).toUpperCase() + themeValue.slice(1);

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
				</div>
				<DialogFooter>
					<Button onClick={handleSave}>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
