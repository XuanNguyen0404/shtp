interface Enterprise {
  id?: string;
  name: string;
  issueDateBussinessLicenseNo: string;
  status: string;
  address?: string;
  bussinessLicenseNo?: string;
  issuingAuthority?: string;
  taxNumber?: string;
  issueDateTaxNumber: string;
  phoneNumber?: string;
  faxNumber?: string;
  email?: string;
  websiteLink?: string;
  enterpriseTypeId?: string;
  industrialAreaTypeId?: string;
  businessTypeId?: string;
  countryId?: string;
  businessType?: string;
  country?: string;
  enterpriseType?: string;
  industrialAreaType?: string;
  employeeTypeOfEnterprises?: string;
  employees?: string;
  projects?: string;
}

interface EnterpriseItem {
  id: string;
  name: string;
  issueDateBussinessLicenseNo: string;
  status: string;
}

interface EnterpriseDropdownItem {
  id: string;
  name: string;
}

export type { Enterprise, EnterpriseItem, EnterpriseDropdownItem };
