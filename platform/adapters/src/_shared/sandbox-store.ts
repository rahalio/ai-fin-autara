/**
 * Process-wide in-memory store for local / sandbox identity flows.
 */

import { randomBytes } from 'node:crypto';
import { ulid } from 'ulid';

export function sandboxId(prefix: string): string {
  return `${prefix}_${ulid().toLowerCase()}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function responseMeta(correlationId?: string) {
  return {
    meta: {
      correlationId,
      generatedAt: nowIso(),
    },
  };
}

export interface SandboxApiKey {
  keyId: string;
  tenantId: string;
  name: string;
  prefix: string;
  secret: string;
  status: 'active' | 'revoked';
  scopes: string[];
  createdAt: string;
  expiresAt?: string;
  lastUsedAt?: string;
}

export type SandboxRole =
  | 'admin'
  | 'customer'
  | 'adviser'
  | 'conduct'
  | 'product_owner'
  | 'analyst'
  | 'viewer'
  | 'ops';

export interface SandboxUser {
  userId: string;
  tenantId: string;
  email: string;
  displayName: string;
  role: SandboxRole;
  status: 'active' | 'disabled';
  password: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  disabledAt?: string;
}

export const apiKeysById = new Map<string, SandboxApiKey>();
export const apiKeysByTenant = new Map<string, Set<string>>();
export const usersById = new Map<string, SandboxUser>();
export const usersByTenant = new Map<string, Set<string>>();

export function toPublicUser(user: SandboxUser) {
  return {
    userId: user.userId,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastLoginAt: user.lastLoginAt,
    disabledAt: user.disabledAt,
  };
}

function seedDemoUsers(tenantId: string) {
  if ((usersByTenant.get(tenantId)?.size ?? 0) > 0) return;
  const now = nowIso();
  const seeds: Array<Omit<SandboxUser, 'userId'>> = [
    {
      tenantId,
      email: 'admin@demo.local',
      displayName: 'Demo Admin',
      role: 'admin',
      status: 'active',
      password: 'sandbox-admin-8',
      createdAt: now,
      updatedAt: now,
    },
    {
      tenantId,
      email: 'customer@demo.local',
      displayName: 'Demo Customer',
      role: 'customer',
      status: 'active',
      password: 'sandbox-cust-8x',
      createdAt: now,
      updatedAt: now,
    },
    {
      tenantId,
      email: 'adviser@demo.local',
      displayName: 'Demo Adviser',
      role: 'adviser',
      status: 'active',
      password: 'sandbox-adv-8xx',
      createdAt: now,
      updatedAt: now,
    },
    {
      tenantId,
      email: 'conduct@demo.local',
      displayName: 'Demo Conduct Officer',
      role: 'conduct',
      status: 'active',
      password: 'sandbox-cond-8x',
      createdAt: now,
      updatedAt: now,
    },
    {
      tenantId,
      email: 'product@demo.local',
      displayName: 'Demo Product Owner',
      role: 'product_owner',
      status: 'active',
      password: 'sandbox-prod-8x',
      createdAt: now,
      updatedAt: now,
    },
  ];
  const ids = new Set<string>();
  for (const seed of seeds) {
    const userId = sandboxId('usr');
    const user: SandboxUser = { ...seed, userId };
    usersById.set(userId, user);
    ids.add(userId);
  }
  usersByTenant.set(tenantId, ids);
}

export function listUsersForTenant(tenantId: string): SandboxUser[] {
  seedDemoUsers(tenantId);
  const ids = usersByTenant.get(tenantId) ?? new Set<string>();
  return [...ids]
    .map((id) => usersById.get(id))
    .filter((u): u is SandboxUser => Boolean(u));
}

export function generateApiKeySecret(prefix = 'autara_demo'): string {
  return `${prefix}_${randomBytes(24).toString('hex')}`;
}

export function getOrCreateTenantProfile(tenantId: string) {
  return {
    tenantId,
    displayNameEn: 'Autara Demo Bank',
    displayNameAr: 'أوتارا',
  };
}
