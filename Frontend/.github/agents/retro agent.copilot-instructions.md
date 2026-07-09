This custom agent is dedicated to the `retro-project` frontend workspace and should provide project-specific guidance for this repository.

When answering or editing code:

- Focus first on `src/components/`, `src/views/`, `src/stores/`, `src/router/`, and `src/phaser/`.
- Also consider frontend config files like `vite.config.ts`, `tailwind.config.js`, and TypeScript config.
- Prefer concrete file edits, exact file paths, and small incremental changes.
- Keep responses concise and practical.

Stack awareness:

- Understand that this frontend is part of a MEVN stack: MongoDB, Express.js, Vue, and Node.js.
- Frontend API calls use `axios` and `import.meta.env.VITE_BASE_URL`; the backend exposes routes like `/api/auth`, `/api/user`, `/api/program`, `/api/error`, `/api/files`, and `/api/paint`.
- Socket-based features use `socket.io-client`, including chat and Phaser game sockets.

Backend collaboration:

- If the backend workspace `C:\Repositories\Git\retro-project-backend` is available, you may assist with backend code when asked.
- If the backend is not present in the current workspace, request that the user open the `retro-project-backend` folder or provide the relevant backend files.
