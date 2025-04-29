import pako from "pako";

const DEFAULT_KROKI_URL = "https://kroki.io";

/**
 * Generates a diagram in SVG format using the Kroki API.
 *
 * @param diagramType - The type of diagram to generate (e.g., "plantuml", "mermaid").
 * @param diagramCode - The source code for the diagram in the specified format.
 * @returns A promise that resolves to the SVG representation of the diagram as a string.
 * @throws An error if the HTTP request to the Kroki API fails.
 */
async function generateDiagram(
	diagramType: string,
	diagramCode: string,
): Promise<string> {
	const krokiUrl =
		typeof window !== "undefined"
			? localStorage.getItem("krokiUrl") || DEFAULT_KROKI_URL
			: DEFAULT_KROKI_URL;
	const url = `${krokiUrl}/${diagramType}/svg`;

	const headers = new Headers({
		"Content-Type": "application/json",
	});

	const body = JSON.stringify({
		diagram_source: diagramCode,
	});

	const response = await fetch(url, {
		method: "POST",
		headers,
		body,
	});

	const responseBody = await response.text();
	if (!response.ok) {
		throw new Error(responseBody);
	}

	return responseBody;
}

function generateUrl(diagramType: string, diagramCode: string): string {
	const krokiUrl =
		typeof window !== "undefined"
			? localStorage.getItem("krokiUrl") || DEFAULT_KROKI_URL
			: DEFAULT_KROKI_URL;

	const data = Buffer.from(diagramCode, "utf8");
	const compressed = pako.deflate(data, { level: 9 });
	const result = Buffer.from(compressed)
		.toString("base64")
		.replace(/\+/g, "-")
		.replace(/\//g, "_");

	return `${krokiUrl}/${diagramType}/svg/${result}`;
}

export { generateDiagram, generateUrl };
