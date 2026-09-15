/**
 * Governance Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/governance.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type FairnessCohort = components["schemas"]["FairnessCohort"];
export type FairnessSnapshot = components["schemas"]["FairnessSnapshot"];
export type ModelStatus = components["schemas"]["ModelStatus"];
export type ModelVersion = components["schemas"]["ModelVersion"];
export type ModelVersionCreate = components["schemas"]["ModelVersionCreate"];
export type ModelVersionId = components["schemas"]["ModelVersionId"];
export type ModelVersionListData = components["schemas"]["ModelVersionListData"];
export type VendorDependency = components["schemas"]["VendorDependency"];
export type VendorDependencyListData = components["schemas"]["VendorDependencyListData"];
export type VendorId = components["schemas"]["VendorId"];
export type Vendor = operations["listVendorDependencies"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterModelVersionRequestInput = NonNullable<operations["registerModelVersion"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListModelVersionsParams = NonNullable<operations["listModelVersions"]["parameters"]["query"]>;
export type ApproveModelVersionParams = operations["approveModelVersion"]["parameters"]["path"];
export type RollbackModelVersionParams = operations["rollbackModelVersion"]["parameters"]["path"];
export type ListVendorDependenciesParams = NonNullable<operations["listVendorDependencies"]["parameters"]["query"]>;
export type TriggerVendorKillSwitchParams = operations["triggerVendorKillSwitch"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListModelVersionsResponse = operations["listModelVersions"]["responses"]["200"]["content"]["application/json"];
export type RegisterModelVersionResponse = operations["registerModelVersion"]["responses"]["201"]["content"]["application/json"];
export type ApproveModelVersionResponse = operations["approveModelVersion"]["responses"]["200"]["content"]["application/json"];
export type RollbackModelVersionResponse = operations["rollbackModelVersion"]["responses"]["200"]["content"]["application/json"];
export type ListVendorDependenciesResponse = operations["listVendorDependencies"]["responses"]["200"]["content"]["application/json"];
export type TriggerVendorKillSwitchResponse = operations["triggerVendorKillSwitch"]["responses"]["200"]["content"]["application/json"];
export type GetFairnessMonitoringResponse = operations["getFairnessMonitoring"]["responses"]["200"]["content"]["application/json"];


