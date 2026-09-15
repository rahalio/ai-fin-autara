/**
 * ID Generator Service Implementation — Autara prefixes.
 */

import type { DomainCode } from '@autara/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@autara/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@autara/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  golId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.goals);
  }
  accId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.accounts);
  }
  prpId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.proposals);
  }
  actId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.actions);
  }
  xplId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.explanations);
  }
  cmpId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.complaints);
  }
  outId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.outcomes);
  }
  gvnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.governance);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
