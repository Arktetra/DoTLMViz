# DoTLMViz

Decoder-only Transformer Language Model Visualization.

## Setup

Run `pip install -e .[dev]` to start with the project, and then

```bash
pre-commit install
pre-commit autoupdate
```

### Frontend

```bash
cd frontend
npm i
npm run dev
```

Open the web browser and go to `http://localhost:5173/`

**Prettier (Frontend)**
To write

```bash
npm run format
```

To check

```bash
npm run lint
```

### Backend

open a new terminal, go to the root directory and run the backend:

**For Development:**

```bash
flask --app backend run --debug
```

**For Production:**

```bash
flask --app backend run --no-reload
```

## Docs

To serve the docs, run `mkdocs serve`.
