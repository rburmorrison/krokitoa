import type React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<html lang="en" suppressHydrationWarning>
				<head>
					<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				</head>
				<body className="overscroll-none">
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</>
	);
}
