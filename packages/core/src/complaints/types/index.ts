/**
 * Complaints Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/complaints.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ComplaintCase = components["schemas"]["ComplaintCase"];
export type ComplaintCaseCreate = components["schemas"]["ComplaintCaseCreate"];
export type ComplaintCaseListData = components["schemas"]["ComplaintCaseListData"];
export type ComplaintId = components["schemas"]["ComplaintId"];
export type ComplaintStatus = components["schemas"]["ComplaintStatus"];
export type ResolveComplaintRequest = components["schemas"]["ResolveComplaintRequest"];
export type Complaint = operations["listComplaintCases"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type OpenComplaintCaseRequestInput = NonNullable<operations["openComplaintCase"]["requestBody"]>["content"]["application/json"];
export type ResolveComplaintCaseRequestInput = NonNullable<operations["resolveComplaintCase"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListComplaintCasesParams = NonNullable<operations["listComplaintCases"]["parameters"]["query"]>;
export type GetComplaintCaseParams = operations["getComplaintCase"]["parameters"]["path"];
export type ResolveComplaintCaseParams = operations["resolveComplaintCase"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListComplaintCasesResponse = operations["listComplaintCases"]["responses"]["200"]["content"]["application/json"];
export type OpenComplaintCaseResponse = operations["openComplaintCase"]["responses"]["201"]["content"]["application/json"];
export type GetComplaintCaseResponse = operations["getComplaintCase"]["responses"]["200"]["content"]["application/json"];
export type ResolveComplaintCaseResponse = operations["resolveComplaintCase"]["responses"]["200"]["content"]["application/json"];


