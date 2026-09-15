import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const openComplaintCase_Body = z
  .object({
    customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
    actionId: z.string(),
    narrative: z.string(),
  })
  .passthrough();
const resolveComplaintCase_Body = z
  .object({
    status: z.enum(['upheld', 'rejected', 'closed']),
    reinstateAutomation: z.boolean().optional(),
  })
  .passthrough();
const ComplaintStatus = z.enum([
  'open',
  'investigating',
  'upheld',
  'rejected',
  'closed',
]);
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
const ComplaintId = z.string();
const ComplaintCase = z
  .object({
    complaintId: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
    customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
    actionId: z.string(),
    explanationId: z.string().optional(),
    status: z.enum(['open', 'investigating', 'upheld', 'rejected', 'closed']),
    freezeAutomation: z.boolean(),
    narrative: z.string().optional(),
    openedAt: z.string().datetime({ offset: true }),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ComplaintCaseListData = z
  .object({
    items: z.array(
      z
        .object({
          complaintId: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
          customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
          actionId: z.string(),
          explanationId: z.string().optional(),
          status: z.enum([
            'open',
            'investigating',
            'upheld',
            'rejected',
            'closed',
          ]),
          freezeAutomation: z.boolean(),
          narrative: z.string().optional(),
          openedAt: z.string().datetime({ offset: true }),
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
const ComplaintCaseListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              complaintId: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
              customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
              actionId: z.string(),
              explanationId: z.string().optional(),
              status: z.enum([
                'open',
                'investigating',
                'upheld',
                'rejected',
                'closed',
              ]),
              freezeAutomation: z.boolean(),
              narrative: z.string().optional(),
              openedAt: z.string().datetime({ offset: true }),
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
const ComplaintCaseCreate = z
  .object({
    customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
    actionId: z.string(),
    narrative: z.string(),
  })
  .passthrough();
const ComplaintCaseResponse = z
  .object({
    data: z
      .object({
        complaintId: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
        customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
        actionId: z.string(),
        explanationId: z.string().optional(),
        status: z.enum([
          'open',
          'investigating',
          'upheld',
          'rejected',
          'closed',
        ]),
        freezeAutomation: z.boolean(),
        narrative: z.string().optional(),
        openedAt: z.string().datetime({ offset: true }),
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
const ResolveComplaintRequest = z
  .object({
    status: z.enum(['upheld', 'rejected', 'closed']),
    reinstateAutomation: z.boolean().optional(),
  })
  .passthrough();

export const schemas: any = {
  openComplaintCase_Body,
  resolveComplaintCase_Body,
  ComplaintStatus,
  CustomerId,
  Problem,
  ComplaintId,
  ComplaintCase,
  ComplaintCaseListData,
  ResponseMeta,
  ComplaintCaseListResponse,
  ComplaintCaseCreate,
  ComplaintCaseResponse,
  ResolveComplaintRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/complaints',
    alias: 'listComplaintCases',
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
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['open', 'investigating', 'upheld', 'rejected', 'closed'])
          .optional(),
      },
      {
        name: 'customerId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  complaintId: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
                  customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
                  actionId: z.string(),
                  explanationId: z.string().optional(),
                  status: z.enum([
                    'open',
                    'investigating',
                    'upheld',
                    'rejected',
                    'closed',
                  ]),
                  freezeAutomation: z.boolean(),
                  narrative: z.string().optional(),
                  openedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/complaints',
    alias: 'openComplaintCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: openComplaintCase_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            complaintId: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
            customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
            actionId: z.string(),
            explanationId: z.string().optional(),
            status: z.enum([
              'open',
              'investigating',
              'upheld',
              'rejected',
              'closed',
            ]),
            freezeAutomation: z.boolean(),
            narrative: z.string().optional(),
            openedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/complaints/:complaintId',
    alias: 'getComplaintCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'complaintId',
        type: 'Path',
        schema: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            complaintId: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
            customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
            actionId: z.string(),
            explanationId: z.string().optional(),
            status: z.enum([
              'open',
              'investigating',
              'upheld',
              'rejected',
              'closed',
            ]),
            freezeAutomation: z.boolean(),
            narrative: z.string().optional(),
            openedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/complaints/:complaintId/resolve',
    alias: 'resolveComplaintCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: resolveComplaintCase_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'complaintId',
        type: 'Path',
        schema: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            complaintId: z.string().regex(/^cmp_[0-9A-HJKMNP-TV-Z]{26}$/),
            customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
            actionId: z.string(),
            explanationId: z.string().optional(),
            status: z.enum([
              'open',
              'investigating',
              'upheld',
              'rejected',
              'closed',
            ]),
            freezeAutomation: z.boolean(),
            narrative: z.string().optional(),
            openedAt: z.string().datetime({ offset: true }),
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
