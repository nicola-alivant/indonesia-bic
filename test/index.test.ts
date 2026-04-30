import assert from 'assert';
import * as swift from '../src/index';
import { BankData } from '../src/types';

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void): void {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${(err as Error).message}`);
    failed++;
  }
}

console.log('\nRunning tests...\n');

test('getAll() returns array', () => {
  const all: BankData[] = swift.getAll();
  assert(Array.isArray(all), 'should be array');
  assert(all.length > 0, 'should not be empty');
});

test('getAll() entries have required fields', () => {
  const entry: BankData = swift.getAll()[0];
  assert(entry.id, 'missing id');
  assert(entry.bank_name, 'missing bank_name');
  assert(entry.bank_code, 'missing bank_code');
  assert(entry.swift_code, 'missing swift_code');
  assert(entry.location_code, 'missing location_code');
  assert(entry.address !== null, 'missing address');
  assert(entry.city, 'missing city');
  assert(entry.branch === null, 'missing branch');
  assert(entry.branch_code === null, 'missing branch_code');
  assert(entry.post_code !== null, 'missing post_code');
  assert(typeof entry.code_status === 'boolean', 'missing code_status');
});

test('findByBankName() returns partial matches', () => {
  const results: BankData[] = swift.findByBankName('BANK');
  assert(results.length > 0, 'should find results');
  results.forEach((r) =>
    assert(r.bank_name.toUpperCase().includes('BANK'), 'bank_name mismatch')
  );
});

test('findByBankName() returns empty array for no match', () => {
  const results: BankData[] = swift.findByBankName('ZZZNOTABANK');
  assert.deepStrictEqual(results, [], 'should return empty array');
});

test('findByBankCode() finds existing code', () => {
  const result: BankData | null = swift.findByBankCode('AMID');
  assert(result !== null, 'should find entry');
  assert(result!.bank_name === 'YUANTA SECURITIES INDONESIA, PT', 'bank_name mismatch');
});

test('findByBankCode() returns null for unknown code', () => {
  assert(swift.findByBankCode('ZZZZ') === null, 'should return null');
});

test('findBySwiftCode() finds existing code', () => {
  const result: BankData | null = swift.findBySwiftCode('AMIDIDJ1');
  assert(result !== null, 'should find entry');
  assert(result!.bank_code === 'AMID', 'bank_code mismatch');
});

test('findBySwiftCode() is case-insensitive', () => {
  const upper = swift.findBySwiftCode('AMIDIDJ1');
  const lower = swift.findBySwiftCode('amididj1');
  assert.deepStrictEqual(upper, lower, 'should match regardless of case');
});

test('findBySwiftCode() returns null for unknown code', () => {
  assert(swift.findBySwiftCode('XXXXXXXX') === null, 'should return null');
});

test('findByLocationCode() returns multiple results', () => {
  const results: BankData[] = swift.findByLocationCode('J1');
  assert(results.length > 0, 'should find results');
  results.forEach((r) =>
    assert(r.location_code.toUpperCase() === 'J1', 'location_code mismatch')
  );
});

test('findByAddress() returns partial matches', () => {
  const results: BankData[] = swift.findByAddress('SUDIRMAN');
  assert(results.length > 0, 'should find results');
});

test('findByCity() finds banks in Jakarta', () => {
  const results: BankData[] = swift.findByCity('JAKARTA');
  assert(results.length > 0, 'should find results');
});

test('findByBranchName() returns empty array when no branches match', () => {
  const results: BankData[] = swift.findByBranchName('ZZZNOTABRANCH');
  assert.deepStrictEqual(results, [], 'should return empty array');
});

test('findByBranchCode() returns empty array when no branche codes match', () => {
  const results: BankData[] = swift.findByBranchCode('000333');
  assert.deepStrictEqual(results, [], 'should return empty array');
});

test('findByPostcode() finds banks by postcode', () => {
  const results: BankData[] = swift.findByPostCode(12190);
  assert(results.length > 0, 'should find results');
  results.forEach((r) => assert(r.post_code === 12190, 'postcode mismatch'));
});

test('getCities() returns unique sorted cities', () => {
  const cities: string[] = swift.getCities();
  assert(Array.isArray(cities), 'should be array');
  const unique = new Set(cities);
  assert(unique.size === cities.length, 'cities should be unique');
});

test('isSwiftCodeValid() returns true for valid code', () => {
  assert(swift.isSwiftCodeValid('AMIDIDJ1') === true, 'should be valid');
});

test('isSwiftCodeValid() returns false for invalid code', () => {
  assert(swift.isSwiftCodeValid('XXXXXXXX') === false, 'should be invalid');
});

test('isSwiftCodeInactive() returns false for active code', () => {
  assert(swift.isSwiftCodeInactive('AMIDIDJ1') === false, 'should be active');
});

test('isSwiftCodeInactive() returns true for inactive code', () => {
  assert(swift.isSwiftCodeInactive('SCBLIDJXSBY') === true, 'should be inactive');
});

console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);