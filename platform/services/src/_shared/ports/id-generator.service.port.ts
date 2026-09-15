/**
 * IdGeneratorService Port — Autara domain prefixes.
 */

import type { DomainCode } from '@autara/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  golId(): string;
  accId(): string;
  prpId(): string;
  actId(): string;
  xplId(): string;
  cmpId(): string;
  outId(): string;
  gvnId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
