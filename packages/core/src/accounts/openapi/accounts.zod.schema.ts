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
const AccountId = z.string();
const AccountType = z.enum([
  'checking',
  'savings',
  'credit',
  'loan',
  'investment',
]);
const Currency = z.string();
const FinancialAccount = z
  .object({
    accountId: z.string().regex(/^acc_[0-9A-HJKMNP-TV-Z]{26}$/),
    customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
    provider: z.string(),
    accountType: z.enum([
      'checking',
      'savings',
      'credit',
      'loan',
      'investment',
    ]),
    balance: z.number(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/)
      .optional(),
    apr: z.number().optional(),
    hostInstitutionProduct: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const FinancialAccountListData = z
  .object({
    items: z.array(
      z
        .object({
          accountId: z.string().regex(/^acc_[0-9A-HJKMNP-TV-Z]{26}$/),
          customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
          provider: z.string(),
          accountType: z.enum([
            'checking',
            'savings',
            'credit',
            'loan',
            'investment',
          ]),
          balance: z.number(),
          currency: z
            .string()
            .min(3)
            .max(3)
            .regex(/^[A-Z]{3}$/)
            .optional(),
          apr: z.number().optional(),
          hostInstitutionProduct: z.boolean().optional(),
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
const FinancialAccountListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              accountId: z.string().regex(/^acc_[0-9A-HJKMNP-TV-Z]{26}$/),
              customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
              provider: z.string(),
              accountType: z.enum([
                'checking',
                'savings',
                'credit',
                'loan',
                'investment',
              ]),
              balance: z.number(),
              currency: z
                .string()
                .min(3)
                .max(3)
                .regex(/^[A-Z]{3}$/)
                .optional(),
              apr: z.number().optional(),
              hostInstitutionProduct: z.boolean().optional(),
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
const FinancialAccountResponse = z
  .object({
    data: z
      .object({
        accountId: z.string().regex(/^acc_[0-9A-HJKMNP-TV-Z]{26}$/),
        customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
        provider: z.string(),
        accountType: z.enum([
          'checking',
          'savings',
          'credit',
          'loan',
          'investment',
        ]),
        balance: z.number(),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/)
          .optional(),
        apr: z.number().optional(),
        hostInstitutionProduct: z.boolean().optional(),
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
const OfferId = z.string();
const ProductOffer = z
  .object({
    offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
    provider: z.string(),
    productType: z.string(),
    headlineRate: z.number(),
    feesAnnual: z.number().optional(),
    hostInstitutionProduct: z.boolean(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ProductOfferListData = z
  .object({
    items: z.array(
      z
        .object({
          offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
          provider: z.string(),
          productType: z.string(),
          headlineRate: z.number(),
          feesAnnual: z.number().optional(),
          hostInstitutionProduct: z.boolean(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ProductOfferListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
              provider: z.string(),
              productType: z.string(),
              headlineRate: z.number(),
              feesAnnual: z.number().optional(),
              hostInstitutionProduct: z.boolean(),
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

export const schemas: any = {
  CustomerId,
  Problem,
  AccountId,
  AccountType,
  Currency,
  FinancialAccount,
  FinancialAccountListData,
  ResponseMeta,
  FinancialAccountListResponse,
  FinancialAccountResponse,
  OfferId,
  ProductOffer,
  ProductOfferListData,
  ProductOfferListResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/customers/:customerId/accounts',
    alias: 'listFinancialAccounts',
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
                  accountId: z.string().regex(/^acc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
                  provider: z.string(),
                  accountType: z.enum([
                    'checking',
                    'savings',
                    'credit',
                    'loan',
                    'investment',
                  ]),
                  balance: z.number(),
                  currency: z
                    .string()
                    .min(3)
                    .max(3)
                    .regex(/^[A-Z]{3}$/)
                    .optional(),
                  apr: z.number().optional(),
                  hostInstitutionProduct: z.boolean().optional(),
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
    path: '/v1/customers/:customerId/accounts/:accountId',
    alias: 'getFinancialAccount',
    requestFormat: 'json',
    parameters: [
      {
        name: 'customerId',
        type: 'Path',
        schema: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'accountId',
        type: 'Path',
        schema: z.string().regex(/^acc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            accountId: z.string().regex(/^acc_[0-9A-HJKMNP-TV-Z]{26}$/),
            customerId: z.string().regex(/^cst_[0-9A-HJKMNP-TV-Z]{26}$/),
            provider: z.string(),
            accountType: z.enum([
              'checking',
              'savings',
              'credit',
              'loan',
              'investment',
            ]),
            balance: z.number(),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/)
              .optional(),
            apr: z.number().optional(),
            hostInstitutionProduct: z.boolean().optional(),
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
    path: '/v1/customers/:customerId/product-offers',
    alias: 'listProductOffers',
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
        name: 'hostInstitutionProduct',
        type: 'Query',
        schema: z.boolean().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  offerId: z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  provider: z.string(),
                  productType: z.string(),
                  headlineRate: z.number(),
                  feesAnnual: z.number().optional(),
                  hostInstitutionProduct: z.boolean(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
