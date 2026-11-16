# Moonlight Events

Run on Windows (VS Code):

1. Install Node.js LTS from https://nodejs.org (restart VS Code afterwards)
2. File > Open Folder... > select this `moonlight-events` folder
3. Terminal > New Terminal, then:

       npm install
       npm run dev

4. Open http://localhost:5173

Build for production: `npm run build` (output in `dist/`), preview with `npm run preview`.

Structure:
  index.html, package.json, vite.config.js
  src/main.jsx, index.css, App.jsx, ChatWidget.jsx, content.js, images.js
