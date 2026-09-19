# RegSim Web

Bakalárska práca — webová rekonštrukcia register-transfer
simulátora **RegSim**, nástroja na výučbu architektúry počítačov na úrovni
mikroinštrukcií (fetch–decode–execute cyklus, registre MBR/ACC/MAR/PC/IR/SR).

## Stack

- Vue 3 + `<script setup>` (Composition API)
- TypeScript
- Pinia (stav simulátora)
- Vitest (unit testy jadra logiky)
- Vite

## Architektúra

- `src/core/` — čistá logika simulátora (typy, mikroinštrukcie, dekodér),
  bez závislosti na Vue. Testovateľná samostatne.
- `src/stores/` — Pinia store nad `core/`, zdieľaný stav naprieč appkou.
- `src/components/`, `src/views/` — UI vrstva (schéma registrov, pamäťové
  panely, editor vlastných inštrukcií).

## Vývoj

\`\`\`bash
npm install
npm run dev      # dev server
npm run test     # Vitest
\`\`\`