# Indonesia-BIC

> Complete database of BIC / SWIFT codes for banks in Indonesia.

> _Version 1.0.0 - Last data source updated: 2026-04-29._

[![npm version](https://img.shields.io/npm/v/indonesia-bic.svg)](https://www.npmjs.com/package/indonesia-bic)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [Example Response](#example-response)
* [API](#api)
* [Data Structure](#data-structure)
* [Data Source](#data-source)
* [License](#license)

## Features

- 618 Indonesian bank SWIFT/BIC codes
- Multiple search methods (bank, city, branch, etc.)
- Case-insensitive search
- TypeScript support

## Installation

```bash
npm install indonesia-bic
```

## Usage

```ts
const bankCodes = require('indonesia-bic');
// or
import * as bankCodes from 'indonesia-bic';

bankCodes.getAll();
// => [{ ... }, ...]

bankCodes.globalSearch('AMID')
// => [{ ... }, ...]

bankCodes.findBySwiftCode('SCBLIDJXSBY');
// => { ... }

bankCodes.findByBankCode('SCBL');
// => { ... }

bankCodes.findByBankName('mandiri');
// => [{ ... }, ...]

bankCodes.findByCity('surabaya');
// => [{ ... }, ...]

bankCodes.findByLocationCode('J1');
// => [{ ... }, ...]

bankCodes.findByAddress('sudirman');
// => [{ ... }, ...]

bankCodes.findByBranchName('surabaya branch');
// => [{ ... }, ...]

bankCodes.findByBranchCode('SBY');
// => [{ ... }, ...]

bankCodes.findByPostcode('12190');
// => [{ ... }, ...]

bankCodes.search('sudirman');
// => [{ ... }, ...]

bankCodes.getCities();
// => ['AMBON', 'BALIKPAPAN', 'BANDUNG', 'JAKARTA', ...]

bankCodes.isSwiftCodeValid('SCBLIDJXSBY'); // true
bankCodes.isSwiftCodeValid('XXXXXXXX');    // false

bankCodes.isSwiftCodeInactive('SCBLIDJXSBY'); // true  → inactive
bankCodes.isSwiftCodeInactive('AMIDIDJ1');    // false → active
```

## Example Response

```json
{
  "id": 3,
  "bank_name": "ALLO BANK",
  "bank_code": "ALOB",
  "swift_code": "ALOBIDJA",
  "location_code": "JA",
  "address": "MENARA BANK MEGA, FLOOR 5-6 JL KAPTEN PIERRE TENDEAN 12-14A",
  "city": "JAKARTA",
  "branch": null,
  "branch_code": null,
  "post_code": 12790,
  "code_status": true
}
```

## API

All search functions follow these rules:

- **`BankData | null`** — unique field, only one possible result (exact match)
- **`BankData[]`** — non-unique field or partial match, can have multiple results
### `getAll()` → `BankData[]`
Returns all 618 bank data.

### `globalSearch(keyword)` → `BankData[]`
Returns all bank data that matches the keyword. ***Partial match***, case-insensitive.

### `findByBankCode(bankCode)` → `BankData | null`
Find bank by bank code. ***Exact match***, case-insensitive. Returns `null` if not found.

### `findBySwiftCode(swiftCode)` → `BankData | null`
Find bank by BIC / SWIFT code. ***Exact match***, case-insensitive. Returns `null` if not found.

### `findByBankName(name)` → `BankData[]`
Find bank by name. ***Partial match***, case-insensitive.

### `findByLocationCode(locationCode)` → `BankData[]`
Find bank by location code. ***Partial match***, case-insensitive.

### `findByAddress(address)` → `BankData[]`
Find bank by address. ***Partial match***, case-insensitive.

### `findByCity(city)` → `BankData[]`
Find bank by city. ***Partial match***, case-insensitive.

### `findByBranchName(branchName)` → `BankData[]`
Find bank by branch name. ***Partial match***, case-insensitive.

### `findByBranchCode(branchCode)` → `BankData[]`
Find bank by branch code. ***Partial match***, case-insensitive.

### `findByPostcode(postcode)` → `BankData[]`
Find bank by postcode. Exact match.

### `search(keyword)` → `BankData[]`
Search keyword in all columns. ***Partial match***, case-insensitive. Useful for search box in UI.

### `getCities()` → `string[]`
Get all unique cities, sorted A-Z.

### `isSwiftCodeValid(swiftCode)` → `boolean`
Check if SWIFT code is valid (exists in database).

### `isSwiftCodeInactive(swiftCode)` → `boolean`
Check if SWIFT code is inactive (`code_status: true`).

## Data Structure

```ts
export interface BankData {
  id: number;
  bank_name: string;
  bank_code: string; // bank code (4 characters)
  swift_code: string; // SWIFT/BIC code (8-11 characters)
  location_code: string; // location code (2 characters)
  address: string | null; // full address (certain data is null)
  city: string;
  branch: string | null; // branch name (optional)
  branch_code: string | null; // branch code (optional, 3 characters)
  post_code: number | null; // postal code (optional, 5 characters)
  code_status: boolean; // true = inactive, false = active
}
```

## Data Source

Data sourced from [bank.codes/swift-code/indonesia](https://bank.codes/swift-code/indonesia/).

## License

MIT
