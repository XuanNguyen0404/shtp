interface Project {
  id?: string;
  name: string;
  address: string;
  enterpriseId: string;
  enterpriseName?: string;
  busRegCerNo: string;
  registrationCertificateDate: string;
  businessRegistrationAuthority?: string;
  investmentRegistrationCertificateAuthority?: string;
  status: string;
}

interface ProjectItem {
  id: string;
  name: string;
  enterpriseName: string;
  status: string;
}

interface ProjectReportItem {
  id: string;
  name: string;
  enterpriseName: string;
  status: string;
  statusReport: string;
}

export type { Project, ProjectItem,ProjectReportItem };
