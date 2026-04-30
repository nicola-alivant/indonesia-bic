import data from './data/bank-codes.json';
import { BankData } from './types';

const banks = data as BankData[];

export function getAll(): BankData[] {
  return banks;
}

export function findByBankName(name: string): BankData[] {
  if (!name || typeof name !== 'string') return [];
  const query = name.trim().toLowerCase();
  return banks.filter((entry) => entry.bank_name.toLowerCase().includes(query));
}

export function findByBankCode(bankCode: string): BankData | null {
  if (!bankCode || typeof bankCode !== 'string') return null;
  const query = bankCode.trim().toLowerCase();
  return banks.find((entry) => entry.bank_code.toLowerCase() === query) ?? null;
}

export function findBySwiftCode(swiftCode: string): BankData | null {
  if (!swiftCode || typeof swiftCode !== 'string') return null;
  const query = swiftCode.trim().toLowerCase();
  return banks.find((entry) => entry.swift_code.toLowerCase() === query) ?? null;
}

export function findByLocationCode(locationCode: string): BankData[] {
  if (!locationCode || typeof locationCode !== 'string') return [];
  const query = locationCode.trim().toLowerCase();
  return banks.filter((entry) => entry.location_code.toLowerCase() === query);
}

export function findByAddress(address: string): BankData[] {
  if (!address || typeof address !== 'string') return [];
  const query = address.trim().toLowerCase();
  return banks.filter((entry) => entry.address?.toLowerCase().includes(query));
}

export function findByCity(city: string): BankData[] {
  if (!city || typeof city !== 'string') return [];
  const query = city.trim().toLowerCase();
  return banks.filter((entry) => entry.city.toLowerCase().includes(query));
}

export function findByBranchName(branchName: string): BankData[] {
  if (!branchName || typeof branchName !== 'string') return [];
  const query = branchName.trim().toLowerCase();
  return banks.filter((entry) => entry.branch?.toLowerCase().includes(query));
}

export function findByBranchCode(branchCode: string): BankData[] {
  if (!branchCode || typeof branchCode !== 'string') return [];
  const query = branchCode.trim().toLowerCase();
  return banks.filter((entry) => entry.branch_code?.toLowerCase().includes(query));
}

export function findByPostCode(postCode: number): BankData[] {
  if (!postCode || typeof postCode !== 'number') return [];
  const query = postCode;
  return banks.filter((entry) => entry.post_code === query);
}

export function getCities(): string[] {
  return [...new Set(banks.map((entry) => entry.city))].sort();
}

export function isSwiftCodeValid(swiftCode: string): boolean {
  return findBySwiftCode(swiftCode) !== null;
}

export function isSwiftCodeInactive(swiftCode: string): boolean {
  return findBySwiftCode(swiftCode)?.code_status === true;
}
