export interface BankData {
  id: number;
  bank_name: string;
  bank_code: string;
  swift_code: string;
  location_code: string;
  address: string | null;
  city: string;
  branch: string | null;
  branch_code: string | null;
  post_code: number | null;
  code_status: boolean;
}
