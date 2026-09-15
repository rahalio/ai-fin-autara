import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const pauseAutomation_Body = z
  .object({
    categories: z.array(z.enum(['bills', 'savings', 'switches', 'all'])),
  })
  .passthrough();
const CustomerId = z.string();
const ActionStatus = z.enum(['executed', 'failed', 'reversed']);
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
const ActionId = z.string();
const ExecutedAction = z
  .object({
    actionId: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
    proposalId: z.string(),
    customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['executed', 'failed', 'reversed']),
    executedAt: z.string().datetime({ offset: true }),
    reversedAt: z.string().datetime({ offset: true }).optional(),
    coolingWindowEndsAt: z.string().datetime({ offset: true }).optional(),
    policyVersion: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ExecutedActionListData = z
  .object({
    items: z.array(
      z
        .object({
          actionId: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
          proposalId: z.string(),
          customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
          status: z.enum(['executed', 'failed', 'reversed']),
          executedAt: z.string().datetime({ offset: true }),
          reversedAt: z.string().datetime({ offset: true }).optional(),
          coolingWindowEndsAt: z.string().datetime({ offset: true }).optional(),
          policyVersion: z.string().optional(),
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
const ExecutedActionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              actionId: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
              proposalId: z.string(),
              customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
              status: z.enum(['executed', 'failed', 'reversed']),
              executedAt: z.string().datetime({ offset: true }),
              reversedAt: z.string().datetime({ offset: true }).optional(),
              coolingWindowEndsAt: z
                .string()
                .datetime({ offset: true })
                .optional(),
              policyVersion: z.string().optional(),
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
const ExecutedActionResponse = z
  .object({
    data: z
      .object({
        actionId: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
        proposalId: z.string(),
        customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['executed', 'failed', 'reversed']),
        executedAt: z.string().datetime({ offset: true }),
        reversedAt: z.string().datetime({ offset: true }).optional(),
        coolingWindowEndsAt: z.string().datetime({ offset: true }).optional(),
        policyVersion: z.string().optional(),
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
const AutomationStatus = z.enum(['active', 'paused', 'disabled']);
const AutomationCategory = z.enum(['bills', 'savings', 'switches', 'all']);
const AutomationProfile = z
  .object({
    customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
    automationStatus: z.enum(['active', 'paused', 'disabled']),
    pausedCategories: z
      .array(z.enum(['bills', 'savings', 'switches', 'all']))
      .optional(),
    freezeReason: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const AutomationProfileResponse = z
  .object({
    data: z
      .object({
        customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
        automationStatus: z.enum(['active', 'paused', 'disabled']),
        pausedCategories: z
          .array(z.enum(['bills', 'savings', 'switches', 'all']))
          .optional(),
        freezeReason: z.string().optional(),
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
const PauseAutomationRequest = z
  .object({
    categories: z.array(z.enum(['bills', 'savings', 'switches', 'all'])),
  })
  .passthrough();

export const schemas: any = {
  pauseAutomation_Body,
  CustomerId,
  ActionStatus,
  Problem,
  ActionId,
  ExecutedAction,
  ExecutedActionListData,
  ResponseMeta,
  ExecutedActionListResponse,
  ExecutedActionResponse,
  AutomationStatus,
  AutomationCategory,
  AutomationProfile,
  AutomationProfileResponse,
  PauseAutomationRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/actions',
    alias: 'listExecutedActions',
    requestFormat: 'json',
    parameters: [
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
        name: 'customerId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['executed', 'failed', 'reversed']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  actionId: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
                  proposalId: z.string(),
                  customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
                  status: z.enum(['executed', 'failed', 'reversed']),
                  executedAt: z.string().datetime({ offset: true }),
                  reversedAt: z.string().datetime({ offset: true }).optional(),
                  coolingWindowEndsAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  policyVersion: z.string().optional(),
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
    method: 'get',
    path: '/v1/actions/:actionId',
    alias: 'getExecutedAction',
    requestFormat: 'json',
    parameters: [
      {
        name: 'actionId',
        type: 'Path',
        schema: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            actionId: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
            proposalId: z.string(),
            customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['executed', 'failed', 'reversed']),
            executedAt: z.string().datetime({ offset: true }),
            reversedAt: z.string().datetime({ offset: true }).optional(),
            coolingWindowEndsAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            policyVersion: z.string().optional(),
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
  {
    method: 'post',
    path: '/v1/actions/:actionId/reverse',
    alias: 'reverseExecutedAction',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'actionId',
        type: 'Path',
        schema: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            actionId: z.string().regex(/^act_[0-9A-HJKMNP-TV-Z]{26}$/),
            proposalId: z.string(),
            customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['executed', 'failed', 'reversed']),
            executedAt: z.string().datetime({ offset: true }),
            reversedAt: z.string().datetime({ offset: true }).optional(),
            coolingWindowEndsAt: z
              .string()
              .datetime({ offset: true })
              .optional(),
            policyVersion: z.string().optional(),
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
  {
    method: 'get',
    path: '/v1/customers/:customerId/automation',
    alias: 'getAutomationProfile',
    requestFormat: 'json',
    parameters: [
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
            customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
            automationStatus: z.enum(['active', 'paused', 'disabled']),
            pausedCategories: z
              .array(z.enum(['bills', 'savings', 'switches', 'all']))
              .optional(),
            freezeReason: z.string().optional(),
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
    method: 'post',
    path: '/v1/customers/:customerId/automation/pause',
    alias: 'pauseAutomation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: pauseAutomation_Body,
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
            customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
            automationStatus: z.enum(['active', 'paused', 'disabled']),
            pausedCategories: z
              .array(z.enum(['bills', 'savings', 'switches', 'all']))
              .optional(),
            freezeReason: z.string().optional(),
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
    method: 'post',
    path: '/v1/customers/:customerId/automation/resume',
    alias: 'resumeAutomation',
    requestFormat: 'json',
    parameters: [
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
            customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
            automationStatus: z.enum(['active', 'paused', 'disabled']),
            pausedCategories: z
              .array(z.enum(['bills', 'savings', 'switches', 'all']))
              .optional(),
            freezeReason: z.string().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
