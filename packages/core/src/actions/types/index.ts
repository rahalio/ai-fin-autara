/**
 * Actions Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/actions.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ActionId = components["schemas"]["ActionId"];
export type ActionStatus = components["schemas"]["ActionStatus"];
export type AutomationCategory = components["schemas"]["AutomationCategory"];
export type AutomationProfile = components["schemas"]["AutomationProfile"];
export type AutomationStatus = components["schemas"]["AutomationStatus"];
export type ExecutedAction = components["schemas"]["ExecutedAction"];
export type ExecutedActionListData = components["schemas"]["ExecutedActionListData"];
export type PauseAutomationRequest = components["schemas"]["PauseAutomationRequest"];
export type Action = operations["listExecutedActions"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type PauseAutomationRequestInput = NonNullable<operations["pauseAutomation"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListExecutedActionsParams = NonNullable<operations["listExecutedActions"]["parameters"]["query"]>;
export type GetExecutedActionParams = operations["getExecutedAction"]["parameters"]["path"];
export type ReverseExecutedActionParams = operations["reverseExecutedAction"]["parameters"]["path"];
export type GetAutomationProfileParams = operations["getAutomationProfile"]["parameters"]["path"];
export type PauseAutomationParams = operations["pauseAutomation"]["parameters"]["path"];
export type ResumeAutomationParams = operations["resumeAutomation"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListExecutedActionsResponse = operations["listExecutedActions"]["responses"]["200"]["content"]["application/json"];
export type GetExecutedActionResponse = operations["getExecutedAction"]["responses"]["200"]["content"]["application/json"];
export type ReverseExecutedActionResponse = operations["reverseExecutedAction"]["responses"]["202"]["content"]["application/json"];
export type GetAutomationProfileResponse = operations["getAutomationProfile"]["responses"]["200"]["content"]["application/json"];
export type PauseAutomationResponse = operations["pauseAutomation"]["responses"]["200"]["content"]["application/json"];
export type ResumeAutomationResponse = operations["resumeAutomation"]["responses"]["200"]["content"]["application/json"];


