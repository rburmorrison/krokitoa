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

const DEFAULT_KROKI_URL = "https://kroki.io";

interface SettingsModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
	const [krokiUrl, setKrokiUrl] = useState(DEFAULT_KROKI_URL);

	useEffect(() => {
		const savedUrl = localStorage.getItem("krokiUrl");
		if (savedUrl) {
			setKrokiUrl(savedUrl);
		}
	}, []);

	const handleSave = () => {
		localStorage.setItem("krokiUrl", krokiUrl);
		onOpenChange(false);
	};

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
				</div>
				<DialogFooter>
					<Button onClick={handleSave}>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
