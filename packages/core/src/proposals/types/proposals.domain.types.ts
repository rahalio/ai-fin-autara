/**
 * Proposals Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/proposals.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ActionProposal = components["schemas"]["ActionProposal"];
export type ActionProposalCreate = components["schemas"]["ActionProposalCreate"];
export type ActionProposalListData = components["schemas"]["ActionProposalListData"];
export type ActionType = components["schemas"]["ActionType"];
export type ProposalId = components["schemas"]["ProposalId"];
export type ProposalStatus = components["schemas"]["ProposalStatus"];
export type SuitabilityCheck = components["schemas"]["SuitabilityCheck"];
export type SuitabilityCheckId = components["schemas"]["SuitabilityCheckId"];
export type SuitabilityResult = components["schemas"]["SuitabilityResult"];
export type Proposal = operations["listActionProposals"]["responses"]["200"]["content"]["application/json"]["data"];
export type ExceptionQueue = operations["listAdviserExceptions"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateActionProposalRequestInput = NonNullable<operations["createActionProposal"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListActionProposalsParams = NonNullable<operations["listActionProposals"]["parameters"]["query"]>;
export type GetActionProposalParams = operations["getActionProposal"]["parameters"]["path"];
export type ConfirmActionProposalParams = operations["confirmActionProposal"]["parameters"]["path"];
export type DeclineActionProposalParams = operations["declineActionProposal"]["parameters"]["path"];
export type ListAdviserExceptionsParams = NonNullable<operations["listAdviserExceptions"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListActionProposalsResponse = operations["listActionProposals"]["responses"]["200"]["content"]["application/json"];
export type CreateActionProposalResponse = operations["createActionProposal"]["responses"]["201"]["content"]["application/json"];
export type GetActionProposalResponse = operations["getActionProposal"]["responses"]["200"]["content"]["application/json"];
export type ConfirmActionProposalResponse = operations["confirmActionProposal"]["responses"]["202"]["content"]["application/json"];
export type DeclineActionProposalResponse = operations["declineActionProposal"]["responses"]["200"]["content"]["application/json"];
export type ListAdviserExceptionsResponse = operations["listAdviserExceptions"]["responses"]["200"]["content"]["application/json"];


