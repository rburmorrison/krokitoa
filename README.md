# Krokitoa

<p align="center">
   <img src="doc/Krokitoa GitHub Banner.png" alt="Krokitoa GitHub Banner">
</p>

Krokitoa is a front-end application for [Kroki](https://kroki.io/), a powerful open-source service that generates diagrams from textual descriptions. This project provides an intuitive interface for users to create, edit, and visualize diagrams using Kroki's unified API.

## Features

<p align="center">
   <img src="doc/demo.gif" alt="Krokitoa Demo">
</p>

- **Diagram Type Selection**: Choose from a variety of supported diagram types such as Mermaid, GraphViz, PlantUML, and more.
- **Code Editor**: A built-in editor powered by Monaco Editor for writing diagram descriptions.
- **Live Preview**: Instantly render diagrams as SVGs based on the textual input. Includes drag-and-zoom functionality.
- **Resizable Panels**: Flexible layout with resizable panels for the editor and diagram preview.
- **Error Handling**: Displays error messages when diagram generation fails.
- **Settings**: Configure the application's appearance and behavior, including private Kroki instances.
- **Shareable URLs**: Diagram type and code are encoded in the URL, allowing users to share diagrams easily.

## Getting Started

### Prerequisites

- Node.js (v19 or higher)
- pnpm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd krokitoa
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Build

To create a production build:
```bash
pnpm build
```

### Linting and Formatting

- Lint the code:
  ```bash
  pnpm lint
  ```
- Format the code:
  ```bash
  pnpm format
  ```

## Running with Docker

> **Note**: The `docker-compose.yml` file provided in this repository is an extension of the one from the [Kroki documentation](https://docs.kroki.io/kroki/setup/use-docker-or-podman/). Credit goes to the Kroki project and its contributors for their work on the original configuration.

You can run the Krokitoa application using Docker. This setup includes both the front-end application and the Kroki service for diagram generation.

### Prerequisites

- Docker
- Docker Compose

### Steps

1. Build and start the Docker containers:
   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - The front-end will be available at `http://localhost:3000`.
   - The Kroki service will be available at `http://localhost:8000`.

### Services

- **frontend**: The Krokitoa front-end application.
- **kroki**: The Kroki API service for diagram generation.
- **mermaid**, **bpmn**, **excalidraw**: Sub-services used by Kroki for specific diagram types.

### Notes

- The `docker-compose.yml` file defines the services and their dependencies.
- The `Dockerfile` is used to build the front-end application image.

### Running the Front-End as a Standalone Container

If you only want to run the front-end application as a standalone container, you can use the `Dockerfile` directly without the other services. This setup will connect the front-end to the public Kroki instance.

1. Build the Docker image:
   ```bash
   docker build -t krokitoa-frontend .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 krokitoa-frontend
   ```

3. Access the front-end application at `http://localhost:3000`.

## How It Works

Krokitoa interacts with the Kroki API to generate diagrams. Users can select a diagram type, write the corresponding textual description, and view the rendered diagram in real-time. The application uses local storage to persist the selected diagram type and code between sessions.

When you create or edit a diagram, the diagram type and code are automatically encoded in the URL using base64 encoding. This allows you to bookmark or share the link to restore the exact diagram state, enabling easy collaboration and reproducibility. Anyone with the link can view and edit the same diagram.

## Technologies Used

- **Next.js**: Framework for building the front-end.
- **React**: Library for building user interfaces.
- **Monaco Editor**: Code editor for writing diagram descriptions.
- **shadcn/ui**: Accessible, Tailwind CSS-based components for modern UIs.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Keyboard Shortcuts

When using the code editor, you can press **CTRL+Enter** (on Windows/Linux) or **CMD+Enter** (on macOS) to generate the diagram. This serves as a shortcut for pressing the play button.

## Third-Party Licenses

This project uses several third-party libraries and tools. For details about their licenses and attributions, please refer to the [Third-Party Notices](./THIRD_PARTY_NOTICES.md) file.

## Acknowledgments

- [Kroki](https://kroki.io/) for providing the API and inspiration for this project.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](./LICENSE) file for details.