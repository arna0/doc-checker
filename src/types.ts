export type SeverityLevel = 'CRITICAL' | 'MEDIUM' | 'ATTENTION';

export interface RiskItem {
  id: string;
  clauseNumber: string;
  clauseTitle: string;
  originalText: string;
  severity: SeverityLevel;
  category: string;
  description: string;
  consequence: string;
  humanExplanation?: string;
  recommendation: string;
  proposedClause: string;
  status: 'open' | 'accepted' | 'rejected' | 'applied';
  articleRef?: string;
  diffHighlight?: {
    removed: string[];
    added: string[];
  };
}

export interface ContractParagraph {
  id: string;
  clauseNumber?: string;
  text: string;
  isHeading?: boolean;
  riskId?: string;
}

export interface ContractAudit {
  id: string;
  title: string;
  counterparty: string;
  contractType: string;
  value: string;
  date: string;
  fileName: string;
  fileSize: string;
  score: number;
  risksCount: {
    critical: number;
    medium: number;
    attention: number;
  };
  risks: RiskItem[];
  paragraphs?: ContractParagraph[];
  summaryNote: string;
}

export interface LegalTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  clausesCount: number;
  updatedAt: string;
  recommendedFor: string;
  badge?: string;
  defaultValues: {
    type: 'services' | 'nda' | 'lease' | 'supply';
    title: string;
    clientName: string;
    contractorName: string;
    amount: string;
    termMonths: number;
    penaltyRate: number;
    jurisdiction: string;
  };
}

export interface BuilderFormData {
  type: 'services' | 'nda' | 'lease' | 'supply';
  title: string;
  clientName: string;
  contractorName: string;
  subject: string;
  amount: string;
  termMonths: number;
  prepaymentPercent: number;
  penaltyRate: number;
  jurisdiction: string;
  ipTransfer: boolean;
  confidentialityPeriodYears: number;
}

export type BuilderDocType = 'software_dev' | 'employment' | 'equipment_supply';

export interface SoftwareDevParams {
  customerName: string;
  customerInn: string;
  customerSigner: string;
  contractorName: string;
  contractorInn: string;
  contractorSigner: string;
  projectName: string;
  totalAmount: string;
  taxMode: 'vat20' | 'no_vat';
  paymentTerms: 'advance30_post70' | 'post100' | 'milestones';
  durationDays: string;
  ipTransferTiming: 'on_100_percent_payment' | 'on_milestone_acts' | 'on_creation';
  acceptanceDays: string;
  warrantyMonths: string;
  penaltyRateDaily: string;
  penaltyCapPercent: string;
  jurisdiction: string;
  city: string;
}

export interface EmploymentParams {
  employerName: string;
  employerInn: string;
  employerSigner: string;
  employeeFullName: string;
  employeeInn: string;
  employeePassport: string;
  jobPosition: string;
  monthlySalary: string;
  paymentDays: string;
  workFormat: 'remote' | 'hybrid' | 'office';
  probationMonths: string;
  equipmentCompensation: string;
  includeNda: boolean;
  bonusScheme: 'kpi_monthly' | 'none';
  city: string;
}

export interface EquipmentSupplyParams {
  buyerName: string;
  buyerInn: string;
  buyerSigner: string;
  supplierName: string;
  supplierInn: string;
  supplierSigner: string;
  equipmentName: string;
  equipmentQuantity: string;
  totalAmount: string;
  deliveryDays: string;
  paymentMode: 'advance100' | 'advance50_post50' | 'post100';
  deliveryTerms: 'supplier_delivery' | 'pickup';
  riskTransferMoment: 'on_upd_signed' | 'on_carrier_handover';
  warrantyMonths: string;
  penaltyDailyRate: string;
  penaltyCapPercent: string;
  city: string;
}

export interface DocumentSection {
  id: string;
  number: string;
  title: string;
  tag: string;
  content: string;
}

export interface GeneratedDocumentResult {
  id: string;
  title: string;
  docType: BuilderDocType;
  rawText: string;
  sections: DocumentSection[];
  complianceScore: number;
  protectiveHighlights: {
    title: string;
    description: string;
    badge: string;
  }[];
  createdAt: string;
}

export type GeneratedDocument = GeneratedDocumentResult;

