# @autara/openapi-core

OpenAPI contracts for Autara: shared `common/` fragments plus one YAML per domain.

**Rule:** After routine YAML edits, regenerate **core only** and handwrite lower layers (see `ddd-codegen` skill).

## Domains

| API | Entry | Role |
| ----- | ----- | ----- |
| `identity` | `src/identity.yaml` | Tenant API keys + operator auth (shared blueprint) |
| `goals` | `src/goals.yaml` | Goals and hard constraints (BR-1) |
| `accounts` | `src/accounts.yaml` | Multi-provider accounts and offers (BR-4) |
| `proposals` | `src/proposals.yaml` | Confirm queue and adviser exceptions (BR-2, BR-5, BR-12) |
| `actions` | `src/actions.yaml` | Execute, reverse, pause automation (BR-6) |
| `explanations` | `src/explanations.yaml` | Explainability ledger (BR-3) |
| `complaints` | `src/complaints.yaml` | Complaints and freezes (BR-9) |
| `outcomes` | `src/outcomes.yaml` | Outcomes vs baseline (BR-7) |
| `governance` | `src/governance.yaml` | Models, fairness, vendors (BR-8, BR-10, BR-11) |

Shared fragments live under `src/common/` (envelopes, Problem, security, parameters, primitives).

## Commands

```bash
pnpm install
pnpm lint:domains
pnpm bundle:domains
```

Bundles land in `src/.bundled/` (YAML + JSON for codegen).
