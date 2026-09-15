import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createGoal_Body = z
  .object({
    type: z.enum([
      'emergencyBuffer',
      'debtPaydown',
      'savingsRate',
      'feeMinimisation',
    ]),
    targetAmount: z.number(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/)
      .optional(),
  })
  .passthrough();
const createConstraint_Body = z
  .object({
    type: z.enum(['maxRisk', 'minBuffer', 'excludedProvider', 'maxAutoAmount']),
    value: z.string(),
  })
  .passthrough();
const CustomerId = z.string();
const GoalStatus = z.enum(['active', 'achieved', 'cancelled']);
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const GoalId = z.string();
const GoalType = z.enum([
  'emergencyBuffer',
  'debtPaydown',
  'savingsRate',
  'feeMinimisation',
]);
const Currency = z.string();
const Goal = z
  .object({
    goalId: z.string().regex(/^gol_[0-9A-HJKMNP-TV-Z]{26}$/),
    customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
    type: z.enum([
      'emergencyBuffer',
      'debtPaydown',
      'savingsRate',
      'feeMinimisation',
    ]),
    targetAmount: z.number(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/)
      .optional(),
    status: z.enum(['active', 'achieved', 'cancelled']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const GoalListData = z
  .object({
    items: z.array(
      z
        .object({
          goalId: z.string().regex(/^gol_[0-9A-HJKMNP-TV-Z]{26}$/),
          customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
          type: z.enum([
            'emergencyBuffer',
            'debtPaydown',
            'savingsRate',
            'feeMinimisation',
          ]),
          targetAmount: z.number(),
          currency: z
            .string()
            .min(3)
            .max(3)
            .regex(/^[A-Z]{3}$/)
            .optional(),
          status: z.enum(['active', 'achieved', 'cancelled']),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const GoalListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              goalId: z.string().regex(/^gol_[0-9A-HJKMNP-TV-Z]{26}$/),
              customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
              type: z.enum([
                'emergencyBuffer',
                'debtPaydown',
                'savingsRate',
                'feeMinimisation',
              ]),
              targetAmount: z.number(),
              currency: z
                .string()
                .min(3)
                .max(3)
                .regex(/^[A-Z]{3}$/)
                .optional(),
              status: z.enum(['active', 'achieved', 'cancelled']),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const GoalCreate = z
  .object({
    type: z.enum([
      'emergencyBuffer',
      'debtPaydown',
      'savingsRate',
      'feeMinimisation',
    ]),
    targetAmount: z.number(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/)
      .optional(),
  })
  .passthrough();
const GoalResponse = z
  .object({
    data: z
      .object({
        goalId: z.string().regex(/^gol_[0-9A-HJKMNP-TV-Z]{26}$/),
        customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
        type: z.enum([
          'emergencyBuffer',
          'debtPaydown',
          'savingsRate',
          'feeMinimisation',
        ]),
        targetAmount: z.number(),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/)
          .optional(),
        status: z.enum(['active', 'achieved', 'cancelled']),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const ConstraintId = z.string();
const ConstraintType = z.enum([
  'maxRisk',
  'minBuffer',
  'excludedProvider',
  'maxAutoAmount',
]);
const HardConstraint = z
  .object({
    constraintId: z.string().regex(/^con_[0-9A-HJKMNP-TV-Z]{26}$/),
    customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
    type: z.enum(['maxRisk', 'minBuffer', 'excludedProvider', 'maxAutoAmount']),
    value: z.string(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const HardConstraintListData = z
  .object({
    items: z.array(
      z
        .object({
          constraintId: z.string().regex(/^con_[0-9A-HJKMNP-TV-Z]{26}$/),
          customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
          type: z.enum([
            'maxRisk',
            'minBuffer',
            'excludedProvider',
            'maxAutoAmount',
          ]),
          value: z.string(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const HardConstraintListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              constraintId: z.string().regex(/^con_[0-9A-HJKMNP-TV-Z]{26}$/),
              customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
              type: z.enum([
                'maxRisk',
                'minBuffer',
                'excludedProvider',
                'maxAutoAmount',
              ]),
              value: z.string(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const HardConstraintCreate = z
  .object({
    type: z.enum(['maxRisk', 'minBuffer', 'excludedProvider', 'maxAutoAmount']),
    value: z.string(),
  })
  .passthrough();
const HardConstraintResponse = z
  .object({
    data: z
      .object({
        constraintId: z.string().regex(/^con_[0-9A-HJKMNP-TV-Z]{26}$/),
        customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
        type: z.enum([
          'maxRisk',
          'minBuffer',
          'excludedProvider',
          'maxAutoAmount',
        ]),
        value: z.string(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  createGoal_Body,
  createConstraint_Body,
  CustomerId,
  GoalStatus,
  Problem,
  GoalId,
  GoalType,
  Currency,
  Goal,
  GoalListData,
  ResponseMeta,
  GoalListResponse,
  GoalCreate,
  GoalResponse,
  ConstraintId,
  ConstraintType,
  HardConstraint,
  HardConstraintListData,
  HardConstraintListResponse,
  HardConstraintCreate,
  HardConstraintResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/customers/:customerId/constraints',
    alias: 'listConstraints',
    requestFormat: 'json',
    parameters: [
      {
        name: 'customerId',
        type: 'Path',
        schema: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  constraintId: z
                    .string()
                    .regex(/^con_[0-9A-HJKMNP-TV-Z]{26}$/),
                  customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
                  type: z.enum([
                    'maxRisk',
                    'minBuffer',
                    'excludedProvider',
                    'maxAutoAmount',
                  ]),
                  value: z.string(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/customers/:customerId/constraints',
    alias: 'createConstraint',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createConstraint_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'customerId',
        type: 'Path',
        schema: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            constraintId: z.string().regex(/^con_[0-9A-HJKMNP-TV-Z]{26}$/),
            customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
            type: z.enum([
              'maxRisk',
              'minBuffer',
              'excludedProvider',
              'maxAutoAmount',
            ]),
            value: z.string(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/customers/:customerId/goals',
    alias: 'listGoals',
    requestFormat: 'json',
    parameters: [
      {
        name: 'customerId',
        type: 'Path',
        schema: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['active', 'achieved', 'cancelled']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  goalId: z.string().regex(/^gol_[0-9A-HJKMNP-TV-Z]{26}$/),
                  customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
                  type: z.enum([
                    'emergencyBuffer',
                    'debtPaydown',
                    'savingsRate',
                    'feeMinimisation',
                  ]),
                  targetAmount: z.number(),
                  currency: z
                    .string()
                    .min(3)
                    .max(3)
                    .regex(/^[A-Z]{3}$/)
                    .optional(),
                  status: z.enum(['active', 'achieved', 'cancelled']),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/customers/:customerId/goals',
    alias: 'createGoal',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createGoal_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'customerId',
        type: 'Path',
        schema: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            goalId: z.string().regex(/^gol_[0-9A-HJKMNP-TV-Z]{26}$/),
            customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
            type: z.enum([
              'emergencyBuffer',
              'debtPaydown',
              'savingsRate',
              'feeMinimisation',
            ]),
            targetAmount: z.number(),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/)
              .optional(),
            status: z.enum(['active', 'achieved', 'cancelled']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/customers/:customerId/goals/:goalId',
    alias: 'getGoal',
    requestFormat: 'json',
    parameters: [
      {
        name: 'customerId',
        type: 'Path',
        schema: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'goalId',
        type: 'Path',
        schema: z.string().regex(/^gol_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            goalId: z.string().regex(/^gol_[0-9A-HJKMNP-TV-Z]{26}$/),
            customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
            type: z.enum([
              'emergencyBuffer',
              'debtPaydown',
              'savingsRate',
              'feeMinimisation',
            ]),
            targetAmount: z.number(),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/)
              .optional(),
            status: z.enum(['active', 'achieved', 'cancelled']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
