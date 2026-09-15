/**
 * Goals Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/goals.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ConstraintId = components["schemas"]["ConstraintId"];
export type ConstraintType = components["schemas"]["ConstraintType"];
export type Goal = components["schemas"]["Goal"];
export type GoalCreate = components["schemas"]["GoalCreate"];
export type GoalId = components["schemas"]["GoalId"];
export type GoalListData = components["schemas"]["GoalListData"];
export type GoalStatus = components["schemas"]["GoalStatus"];
export type GoalType = components["schemas"]["GoalType"];
export type HardConstraint = components["schemas"]["HardConstraint"];
export type HardConstraintCreate = components["schemas"]["HardConstraintCreate"];
export type HardConstraintListData = components["schemas"]["HardConstraintListData"];
export type Constraint = operations["listConstraints"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateGoalRequestInput = NonNullable<operations["createGoal"]["requestBody"]>["content"]["application/json"];
export type CreateConstraintRequestInput = NonNullable<operations["createConstraint"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListGoalsParams = NonNullable<operations["listGoals"]["parameters"]["query"]>;
export type CreateGoalParams = operations["createGoal"]["parameters"]["path"];
export type GetGoalParams = operations["getGoal"]["parameters"]["path"];
export type ListConstraintsParams = NonNullable<operations["listConstraints"]["parameters"]["query"]>;
export type CreateConstraintParams = operations["createConstraint"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListGoalsResponse = operations["listGoals"]["responses"]["200"]["content"]["application/json"];
export type CreateGoalResponse = operations["createGoal"]["responses"]["201"]["content"]["application/json"];
export type GetGoalResponse = operations["getGoal"]["responses"]["200"]["content"]["application/json"];
export type ListConstraintsResponse = operations["listConstraints"]["responses"]["200"]["content"]["application/json"];
export type CreateConstraintResponse = operations["createConstraint"]["responses"]["201"]["content"]["application/json"];


