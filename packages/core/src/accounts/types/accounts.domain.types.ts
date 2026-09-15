/**
 * Accounts Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/accounts.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AccountId = components["schemas"]["AccountId"];
export type AccountType = components["schemas"]["AccountType"];
export type FinancialAccount = components["schemas"]["FinancialAccount"];
export type FinancialAccountListData = components["schemas"]["FinancialAccountListData"];
export type OfferId = components["schemas"]["OfferId"];
export type ProductOffer = components["schemas"]["ProductOffer"];
export type ProductOfferListData = components["schemas"]["ProductOfferListData"];
export type Account = operations["listFinancialAccounts"]["responses"]["200"]["content"]["application/json"]["data"];



// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListFinancialAccountsParams = NonNullable<operations["listFinancialAccounts"]["parameters"]["query"]>;
export type GetFinancialAccountParams = operations["getFinancialAccount"]["parameters"]["path"];
export type ListProductOffersParams = NonNullable<operations["listProductOffers"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListFinancialAccountsResponse = operations["listFinancialAccounts"]["responses"]["200"]["content"]["application/json"];
export type GetFinancialAccountResponse = operations["getFinancialAccount"]["responses"]["200"]["content"]["application/json"];
export type ListProductOffersResponse = operations["listProductOffers"]["responses"]["200"]["content"]["application/json"];


