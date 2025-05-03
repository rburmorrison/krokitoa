"use client";

import { useState, useEffect } from "react";

// Define accent color options
export type AccentColor = "neutral" | "red" | "orange" | "blue";

export default function useAccentColor() {
	const [accentColor, setAccentColor] = useState<AccentColor>("neutral");

	// Load accent color from localStorage on mount
	useEffect(() => {
		const savedAccentColor = localStorage.getItem("accentColor");
		// Handle migration from "default" to "neutral"
		if (savedAccentColor === "default") {
			setAccentColor("neutral");
			document.documentElement.setAttribute("data-accent-color", "neutral");
			localStorage.setItem("accentColor", "neutral");
		} else if (
			savedAccentColor &&
			["neutral", "red", "orange", "blue"].includes(savedAccentColor)
		) {
			setAccentColor(savedAccentColor as AccentColor);
			document.documentElement.setAttribute(
				"data-accent-color",
				savedAccentColor,
			);
		} else {
			// Set neutral as default if no valid color is found
			setAccentColor("neutral");
			document.documentElement.setAttribute("data-accent-color", "neutral");
		}
	}, []);

	// Update accent color and save to localStorage
	const updateAccentColor = (newAccentColor: AccentColor) => {
		setAccentColor(newAccentColor);
		localStorage.setItem("accentColor", newAccentColor);
		document.documentElement.setAttribute("data-accent-color", newAccentColor);
	};

	return { accentColor, updateAccentColor };
}
