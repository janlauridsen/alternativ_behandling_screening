📄 docs/ATONM/atonm-addendum-v1.2.md
# ATONM – Addendum v1.2  
**Title:** Hypotetisk Brugerprofil som Sprogligt Mellemtrin  
**Status:** Normativ udvidelse (non-breaking)  
**Gælder for:** Output-formulering, handoff, systemprompt  
**Berører ikke:** Spørgsmål, svarmuligheder, beslutningsrum, mapping-logik  
**Version:** 1.2  
**Dato:** 2025-XX-XX

---

## 1. Formål

Dette addendum introducerer et internt, sprogligt mellemtrin i ATONM,
kaldet **hypotetisk brugerprofil**.

Formålet er at:
- forbedre oplevet relevans og genkendelighed i output
- reducere oplevelsen af maskinel eller generisk formulering
- bevare fuld overensstemmelse med ATONM’s etiske og logiske rammer

Addendum ændrer **ikke**:
- indsnævring
- valg
- prioritering
- udfald
- etik

---

## 2. Grundprincip (bindende)

ATONM må danne en **hypotetisk brugerprofil**, som udelukkende:
- er afledt direkte af brugerens egne svar
- anvendes sprogligt
- ikke har beslutningskraft

Profilen er en **arbejdshypotese**, ikke en sandhed.

---

## 3. Definition: Hypotetisk brugerprofil

Den hypotetiske brugerprofil er:

- midlertidig
- sessionsbaseret
- ikke-diagnostisk
- ikke-vurderende
- ikke-handlingsanvisende

Profilen besvarer kun spørgsmålet:

> “Hvis vi tager brugerens svar på ordet, hvordan forstår brugeren selv sin situation og sine forventninger?”

---

## 4. Tilladt indhold i profilen

Profilen må udelukkende bestå af **afledte beskrivelser** af brugerens svar,
fx:

- **oplevelsesdomæne**  
  (kropsligt / mentalt / blandet / uklart)

- **situationskarakter**  
  (afgrænset / generel / tilbagevendende / langvarig)

- **foretrukken arbejdsform**  
  (primært guidet / primært selvaktiv / kombineret)

- **forventning til struktur**  
  (konkret / åben / uklar)

- **tolerance for abstraktion**  
  (lav / middel / høj)

---

## 5. Ikke-tilladt indhold (absolut)

Profilen må **aldrig** indeholde:

- diagnoser eller navngivne tilstande  
  (medmindre brugeren selv bruger ordet)

- årsagsforklaringer

- vurdering af sværhedsgrad

- forslag, råd eller anbefalinger

- implicit rangordning af metoder

- korrektion eller “forbedring” af brugerens svar

---

## 6. Anvendelse af profilen (meget vigtigt)

Profilen må **kun** bruges til:

- sproglig spejling
- formulering af begrundelser
- valg af abstraktionsniveau i forklaringer
- rækkefølge og framing i output

Eksempel (tilladt):

> “Ud fra den måde, du beskriver din situation på, og det du lægger vægt på i processen…”

Eksempel (ikke tilladt):

> “Fordi du har X, er Y særligt egnet.”

---

## 7. Arkitektonisk placering

Den bindende rækkefølge er:



Brugerens svar på ATONM-spørgsmål
↓
Indsnævring / mapping (uændret)
↓
Hypotetisk brugerprofil (afledt)
↓
Formuleret output (sproglig spejling)


Profilen må **aldrig** placeres før indsnævring.

---

## 8. Forhold til ATONM’s kerneprincipper

Denne udvidelse:

- ændrer ikke beslutningsrum (4⁶)
- ændrer ikke mapping-funktionen
- introducerer ingen ny vægtning
- overholder ikke-diagnostisk og ikke-rådgivende ramme
- understøtter brugerens autonomi

Profilen fungerer som **præsentationsadapter**, ikke beslutningslag.

---

## 9. Systemprompt-krav (bindende)

Systemprompten skal instruere modellen i:

- at danne en hypotetisk brugerprofil baseret udelukkende på svar
- at anvende profilen kun sprogligt
- aldrig at lade profilen påvirke valg, indsnævring eller udfald
- aldrig at formulere profilen som vurdering eller sandhed

---

## 10. Dokumentationsformulering (anbefalet)

Følgende formulering kan anvendes i offentlig dokumentation:

> ATONM anvender en intern, midlertidig brugerprofil, som udelukkende afspejler brugerens egne svar. Profilen bruges ikke til at træffe valg, men til at formulere resultaterne på en måde, der matcher brugerens oplevelse og forventninger.

---

## 11. Samlet konklusion

ATONM Addendum v1.2:

- introducerer et sprogligt mellemtrin
- ændrer ikke modellen
- forbedrer oplevet relevans
- reducerer maskinelt præg
- bevarer fuld etisk og logisk kontrol

**Status:** Gældende fra version 2.x

END OF DOCUMENT
