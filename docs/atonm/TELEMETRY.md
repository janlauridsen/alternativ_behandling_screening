# ATONM – Telemetry (v1)

## Formål
Telemetry anvendes udelukkende til:
- at validere korrekt brug af flow og guards
- at opdage uhensigtsmæssig eller misbrugende interaktion
- at understøtte fremtidig kvalitetsforbedring

Telemetry anvendes **ikke** til:
- tracking af personer
- profilering
- analyse af indhold eller fri tekst

## Grundprincipper
- Anonym
- Opt-in via feature-flag
- Default: OFF
- No-op implementation i v3.4
- Ingen persistence
- Ingen netværkskald

## Datatyper
Telemetry består udelukkende af:
- hændelsestyper (events)
- timestamps
- teknisk kontekst (version, entry-point)

Ingen:
- IP-adresser
- cookies
- headers
- bruger-input
- fritekst

## Events (v1)
- flow_started
- atonm_completed
- validation_adjusted
- handoff_started
- guard_triggered

I v3.4 er **kun `flow_started` aktiv**, og kun i debug.

## GDPR & etik
Telemetry er:
- anonym
- aggregerbar
- ikke personhenførbar

Dermed falder den uden for egentlig persondatabehandling.
Hvis telemetry senere udvides, revurderes dette eksplicit.

## Status
- Version: v1
- Implementering: stub / no-op
- Aktiv: kun ved NEXT_PUBLIC_TELEMETRY_ENABLED=true
