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
	const krokiUrl = "https://kroki.io";
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

export { generateDiagram };
