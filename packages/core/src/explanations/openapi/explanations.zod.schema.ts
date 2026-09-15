import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const CustomerId = z.string();
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
const ExplanationId = z.string();
const DecisionFactor = z
  .object({ name: z.string(), contribution: z.number() })
  .passthrough();
const ExplanationRecord = z
  .object({
    explanationId: z.string().regex(/^xpl_[0-9A-HJKMNP-TV-Z]{26}$/),
    proposalId: z.string(),
    customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
    plainLanguage: z.string(),
    factors: z.array(
      z.object({ name: z.string(), contribution: z.number() }).passthrough()
    ),
    policyVersion: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ExplanationRecordListData = z
  .object({
    items: z.array(
      z
        .object({
          explanationId: z.string().regex(/^xpl_[0-9A-HJKMNP-TV-Z]{26}$/),
          proposalId: z.string(),
          customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
          plainLanguage: z.string(),
          factors: z.array(
            z
              .object({ name: z.string(), contribution: z.number() })
              .passthrough()
          ),
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
const ExplanationRecordListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              explanationId: z.string().regex(/^xpl_[0-9A-HJKMNP-TV-Z]{26}$/),
              proposalId: z.string(),
              customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
              plainLanguage: z.string(),
              factors: z.array(
                z
                  .object({ name: z.string(), contribution: z.number() })
                  .passthrough()
              ),
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
const ExplanationRecordResponse = z
  .object({
    data: z
      .object({
        explanationId: z.string().regex(/^xpl_[0-9A-HJKMNP-TV-Z]{26}$/),
        proposalId: z.string(),
        customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
        plainLanguage: z.string(),
        factors: z.array(
          z.object({ name: z.string(), contribution: z.number() }).passthrough()
        ),
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

export const schemas: any = {
  CustomerId,
  Problem,
  ExplanationId,
  DecisionFactor,
  ExplanationRecord,
  ExplanationRecordListData,
  ResponseMeta,
  ExplanationRecordListResponse,
  ExplanationRecordResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/explanations',
    alias: 'listExplanationRecords',
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
        name: 'proposalId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  explanationId: z
                    .string()
                    .regex(/^xpl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  proposalId: z.string(),
                  customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
                  plainLanguage: z.string(),
                  factors: z.array(
                    z
                      .object({ name: z.string(), contribution: z.number() })
                      .passthrough()
                  ),
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
    path: '/v1/explanations/:explanationId',
    alias: 'getExplanationRecord',
    requestFormat: 'json',
    parameters: [
      {
        name: 'explanationId',
        type: 'Path',
        schema: z.string().regex(/^xpl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            explanationId: z.string().regex(/^xpl_[0-9A-HJKMNP-TV-Z]{26}$/),
            proposalId: z.string(),
            customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
            plainLanguage: z.string(),
            factors: z.array(
              z
                .object({ name: z.string(), contribution: z.number() })
                .passthrough()
            ),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
