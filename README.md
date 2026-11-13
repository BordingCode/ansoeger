# Ansøgeren

Mobil-app (PWA) til at skrive jobansøgninger og CV, med Claude som hjælper.

* Live: https://bordingcode.github.io/ansoeger/
* Importér .docx → redigér → eksportér PDF (via udskriv) eller .docx.
* AI: appen lægger forespørgsler i en Cloudflare Worker (`~/cc/ansoeger-api`); Raspberry Pi'en
  (`~/cc/ansoeger-bro`) henter dem, kører `claude -p` uden værktøjer og lægger svaret tilbage.
* Data: localStorage på telefonen + automatisk sikkerhedskopi i Workerens D1. Intet personligt i dette repo.
* Deploy: bump `?v=` i index.html + `CACHE` og SHELL i sw.js, commit, push.
