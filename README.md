# Krokitoa

Krokitoa is a front-end application for [Kroki](https://kroki.io/), a powerful open-source service that generates diagrams from textual descriptions. This project provides an intuitive interface for users to create, edit, and visualize diagrams using Kroki's unified API.

## Features

- **Diagram Type Selection**: Choose from a variety of supported diagram types such as Mermaid, GraphViz, PlantUML, and more.
- **Code Editor**: A built-in editor powered by Monaco Editor for writing diagram descriptions.
- **Live Preview**: Instantly render diagrams as SVGs based on the textual input.
- **Resizable Panels**: Flexible layout with resizable panels for the editor and diagram preview.
- **Error Handling**: Displays error messages when diagram generation fails.

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

## How It Works

Krokitoa interacts with the Kroki API to generate diagrams. Users can select a diagram type, write the corresponding textual description, and view the rendered diagram in real-time. The application uses local storage to persist the selected diagram type and code between sessions.

## Technologies Used

- **Next.js**: Framework for building the front-end.
- **React**: Library for building user interfaces.
- **Monaco Editor**: Code editor for writing diagram descriptions.
- **shadcn/ui**: Accessible, Tailwind CSS-based components for modern UIs.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Acknowledgments

- [Kroki](https://kroki.io/) for providing the API and inspiration for this project.