import { 
  BuilderDocType, 
  SoftwareDevParams, 
  EmploymentParams, 
  EquipmentSupplyParams, 
  GeneratedDocumentResult,
  DocumentSection 
} from '../types';

export interface DocTypeOption {
  id: BuilderDocType;
  title: string;
  subtitle: string;
  codeRef: string;
  tag: string;
  description: string;
  bullets: string[];
  recommendedBadge: string;
}

export const DOC_TYPES_CATALOG: DocTypeOption[] = [
  {
    id: 'software_dev',
    title: 'Software Development Agreement',
    subtitle: 'Custom software engineering, SaaS platforms, API gateways, and mobile apps',
    codeRef: 'UCC Article 2 & Copyright Act (17 U.S. Code § 201)',
    tag: 'IT & Intellectual Property',
    description: 'Comprehensive B2B software agreement with IP title transfer contingent on 100% full payment, objective milestone acceptance, and mutual liability caps.',
    bullets: [
      'Intellectual Property secured until 100% cleared milestone funds',
      'Mutual 5% penalty cap protecting baseline commercial margins',
      '10-day review window with deemed acceptance upon silence'
    ],
    recommendedBadge: 'Tech Industry Standard'
  },
  {
    id: 'employment',
    title: 'Employment Agreement',
    subtitle: 'For remote, hybrid, and on-site engineering and product specialists',
    codeRef: 'Fair Labor Standards Act (FLSA) & Restatement of Employment Law',
    tag: 'Employment & Remote Work',
    description: 'Contemporary employment agreement featuring structured telecommuting terms, work-for-hire IP assignments, home office stipends, and trade secret protections.',
    bullets: [
      'Compliant remote telecommuting and flexible working terms',
      'Irrevocable work-for-hire assignment of proprietary code & inventions',
      'Monthly home office equipment and broadband allowance'
    ],
    recommendedBadge: 'HR & Corporate Standard'
  },
  {
    id: 'equipment_supply',
    title: 'Equipment Supply & Purchase Agreement',
    subtitle: 'Procurement of enterprise server racks, workstations, and electronics',
    codeRef: 'Uniform Commercial Code (UCC Art. 2) & Incoterms 2020',
    tag: 'Supply & Hardware',
    description: 'Commercial hardware purchase agreement with clear bill-of-lading risk transfer, warranty remedies, and symmetrical delay terms.',
    bullets: [
      'Risk of loss passes strictly upon verified delivery receipt',
      'Symmetric remedies for shipment delays and payment schedules',
      '24-month hardware warranty and expedited RMA repair protocol'
    ],
    recommendedBadge: 'Enterprise Procurement'
  }
];

export const DEFAULT_SOFTWARE_PARAMS: SoftwareDevParams = {
  customerName: 'TechnoProm Engineering Inc.',
  customerInn: 'EIN: 12-8492014',
  customerSigner: 'Alexander Sokolov, Chief Executive Officer',
  contractorName: 'Digital Systems & Cloud Labs LLC',
  contractorInn: 'EIN: 94-7182930',
  contractorSigner: 'Marcus Voronov, Managing Director',
  projectName: 'Enterprise Logistics Intelligence Platform with AI Copilot & API Gateway',
  totalAmount: '$145,000',
  taxMode: 'no_vat',
  paymentTerms: 'advance30_post70',
  durationDays: '60',
  ipTransferTiming: 'on_100_percent_payment',
  acceptanceDays: '5',
  warrantyMonths: '6',
  penaltyRateDaily: '0.05',
  penaltyCapPercent: '5',
  jurisdiction: 'State of Delaware (New Castle County Courts)',
  city: 'Wilmington, DE'
};

export const DEFAULT_EMPLOYMENT_PARAMS: EmploymentParams = {
  employerName: 'NeuroNet Technologies Inc.',
  employerInn: 'EIN: 83-2948102',
  employerSigner: 'David Melnikov, Chief Executive Officer',
  employeeFullName: 'Alex K. Smith',
  employeeInn: 'SSN: XXX-XX-4819',
  employeePassport: 'US Passport #Z74819201',
  jobPosition: 'Lead Systems Architect / Senior Software Engineer',
  monthlySalary: '$14,500',
  paymentDays: '15th and last business day of each month',
  workFormat: 'remote',
  probationMonths: '3',
  equipmentCompensation: '$250',
  includeNda: true,
  bonusScheme: 'kpi_monthly',
  city: 'San Francisco, CA'
};

export const DEFAULT_EQUIPMENT_PARAMS: EquipmentSupplyParams = {
  buyerName: 'DataCenter Infrastructure Holdings Inc.',
  buyerInn: 'EIN: 20-4918230',
  buyerSigner: 'Peter E. Gromov, VP of Operations',
  supplierName: 'ServerTrade Systems Global LLC',
  supplierInn: 'EIN: 47-1928341',
  supplierSigner: 'Kevin A. White, Commercial Director',
  equipmentName: 'High-Density Server Compute Nodes Xeon Silver 4410Y 2U (128GB RAM, 4x3.84TB NVMe SSD, Dual 10Gbps SFP+)',
  equipmentQuantity: '6 Units',
  totalAmount: '$186,000',
  deliveryDays: '14',
  paymentMode: 'advance50_post50',
  deliveryTerms: 'supplier_delivery',
  riskTransferMoment: 'on_upd_signed',
  warrantyMonths: '24',
  penaltyDailyRate: '0.05',
  penaltyCapPercent: '5',
  city: 'New York, NY'
};

// Generates Software Development Contract in English
export function generateSoftwareContract(params: SoftwareDevParams): GeneratedDocumentResult {
  const taxClause = params.taxMode === 'vat20' 
    ? 'inclusive of applicable state sales taxes' 
    : 'exclusive of local sales or withholding taxes pursuant to tax-exempt statutory regulations';

  const paymentDesc = params.paymentTerms === 'advance30_post70'
    ? `An initial advance deposit of 30% shall be remitted by Client within five (5) business days following mutual execution of this Agreement; the remaining 70% shall be paid within five (5) business days following mutual execution of the final Milestone Acceptance Certificate.`
    : params.paymentTerms === 'post100'
      ? `100% of the contract sum shall be paid within ten (10) business days following bilateral execution of the final Milestone Acceptance Certificate.`
      : `Compensation shall be remitted in sprint increments pursuant to the Milestone Financing Schedule set forth in Exhibit B within five (5) business days following sign-off of each sprint.`;

  const ipClause = params.ipTransferTiming === 'on_100_percent_payment'
    ? `All right, title, and intellectual property interest in and to the custom work product (source code, schemas, architecture, documentation) created under this Agreement shall transfer and vest in Client exclusively and strictly upon Developer's receipt of 100% (one hundred percent) of the total contract consideration in cleared funds. Prior to full settlement, Client holds a non-exclusive license strictly for evaluation and testing purposes.`
    : `Intellectual property rights in completed deliverables shall transfer to Client incrementally upon bilateral execution of each milestone acceptance certificate.`;

  const sections: DocumentSection[] = [
    {
      id: 'sec-1',
      number: '1',
      title: 'SCOPE OF SERVICES & STATEMENT OF WORK',
      tag: 'Scope of Work',
      content: `1.1. Developer shall perform custom software development, architecture engineering, and deployment services for: "${params.projectName}", and Client shall receive and pay for such services pursuant to the terms of this Agreement.
1.2. The detailed specifications, user stories, acceptance criteria, and deliverable schedule are set forth in Exhibit A (Statement of Work), which is incorporated herein by reference.
1.3. The estimated duration for performance is ${params.durationDays} calendar days commencing upon Developer's receipt of the initial deposit.`
    },
    {
      id: 'sec-2',
      number: '2',
      title: 'COMPENSATION AND PAYMENT SCHEDULE',
      tag: 'Compensation',
      content: `2.1. The total contract value for services rendered under this Agreement is ${params.totalAmount} USD (${taxClause}).
2.2. ${paymentDesc}
2.3. All payments shall be made by wire transfer or electronic funds transfer to Developer's designated account. Client's payment obligation is deemed fulfilled upon receipt of cleared funds into Developer's account.`
    },
    {
      id: 'sec-3',
      number: '3',
      title: 'TESTING, REVIEW, AND ACCEPTANCE PROCEDURE',
      tag: 'Acceptance',
      content: `3.1. Upon completion of each milestone deliverable, Developer shall deploy the release candidate to the staging environment and deliver a formal Milestone Acceptance Notice.
3.2. Client shall have ${params.acceptanceDays} business days to evaluate deliverables and either return a countersigned Acceptance Certificate or deliver an itemized notice of material non-conformities with Exhibit A.
3.3. In the event Client fails to deliver a written notice of non-conformity within ${params.acceptanceDays} business days, the milestone deliverables shall be conclusively deemed accepted and the corresponding invoice payable.`
    },
    {
      id: 'sec-4',
      number: '4',
      title: 'INTELLECTUAL PROPERTY & TITLE RETENTION',
      tag: 'IP Rights',
      content: `4.1. ${ipClause}
4.2. Developer warrants that the custom code created hereunder does not infringe any third-party patent, copyright, or trade secret. Open-source components are incorporated in strict compliance with their respective permissive licenses (e.g., MIT, Apache 2.0).`
    },
    {
      id: 'sec-5',
      number: '5',
      title: 'MUTUAL LIQUIDATED DAMAGES & LIABILITY LIMITS',
      tag: 'Parity & Remedies',
      content: `5.1. For each calendar day of unexcused milestone delay, Developer shall pay liquidated damages equal to ${params.penaltyRateDaily}% of the value of the delayed milestone, capped at an aggregate maximum of ${params.penaltyCapPercent}% of the contract price.
5.2. For overdue payments, Client shall pay interest equal to ${params.penaltyRateDaily}% per day on the overdue amount, capped at an aggregate maximum of ${params.penaltyCapPercent}% of the overdue sum.
5.3. Neither Party shall be liable for indirect, consequential, or lost-profit damages. Aggregate liability under this Agreement shall be limited to direct damages up to ${params.penaltyCapPercent}% of the total contract price.`
    },
    {
      id: 'sec-6',
      number: '6',
      title: 'WARRANTY AND DEFECT REMEDIATION',
      tag: 'Warranty',
      content: `6.1. Developer provides a limited warranty of ${params.warrantyMonths} months commencing upon final project acceptance.
6.2. During the warranty period, Developer shall remediate verifiable software defects that deviate from Exhibit A specifications within five (5) business days at Developer's sole expense.`
    },
    {
      id: 'sec-7',
      number: '7',
      title: 'GOVERNING LAW & DISPUTE RESOLUTION',
      tag: 'Jurisdiction',
      content: `7.1. The Parties shall endeavor in good faith to resolve any dispute arising hereunder through executive negotiation with a ten (10) business day pre-litigation notice period.
7.2. Any unresolved dispute shall be submitted to the exclusive jurisdiction of the competent courts of ${params.jurisdiction}.`
    },
    {
      id: 'sec-8',
      number: '8',
      title: 'SIGNATURES & CORPORATE REQUISITES',
      tag: 'Signatures',
      content: `CLIENT:
${params.customerName}
${params.customerInn}
Representative: ${params.customerSigner}
Signature: ______________________ / By Authorized Signatory /

DEVELOPER:
${params.contractorName}
${params.contractorInn}
Representative: ${params.contractorSigner}
Signature: ______________________ / By Authorized Signatory /`
    }
  ];

  const rawText = `MASTER SOFTWARE DEVELOPMENT SERVICES AGREEMENT NO. DEV-2026/01

Effective Date: April 12, 2026                                            Location: ${params.city}

This Master Software Development Agreement ("Agreement") is made by and between:
${params.customerName} ("Client"), represented by ${params.customerSigner}, and
${params.contractorName} ("Developer"), represented by ${params.contractorSigner}.

NOW, THEREFORE, the Parties agree as follows:

${sections.map(s => `${s.number}. ${s.title}\n${s.content}`).join('\n\n')}`;

  return {
    id: `doc-dev-${Date.now()}`,
    title: `Software Dev Agreement (${params.projectName.slice(0, 32)}...)`,
    docType: 'software_dev',
    rawText,
    sections,
    complianceScore: 98,
    protectiveHighlights: [
      {
        title: 'IP Retention Safeguard',
        description: 'Ownership of custom source code transfers strictly upon receipt of 100% full payment (safeguards developer against non-payment).',
        badge: '17 U.S. Code § 201'
      },
      {
        title: 'Reciprocal Remedy Cap',
        description: `Balanced interest rate of ${params.penaltyRateDaily}% per day with mutual liability cap of ${params.penaltyCapPercent}%.`,
        badge: 'Commercial Parity'
      },
      {
        title: 'Deemed Acceptance Window',
        description: `Objective ${params.acceptanceDays}-day review window with deemed acceptance upon silence, preventing sprint stalling.`,
        badge: 'Industry Standard'
      },
      {
        title: 'Defect Remediation Protocol',
        description: `Clear ${params.warrantyMonths}-month warranty with structured bug fix timeframes and exclusion of consequential damages.`,
        badge: 'UCC § 2-719'
      }
    ],
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
}

// Generates Employment Contract in English
export function generateEmploymentContract(params: EmploymentParams): GeneratedDocumentResult {
  const formatText = params.workFormat === 'remote'
    ? 'remotely from the Employee\'s residence via secure encrypted telecommuting channels'
    : params.workFormat === 'hybrid'
      ? 'in a hybrid format (2 days on-site at Employer\'s facility and 3 days remote)'
      : 'on-site at Employer\'s primary corporate headquarters';

  const sections: DocumentSection[] = [
    {
      id: 'emp-1',
      number: '1',
      title: 'POSITION AND DUTIES',
      tag: 'Job Function',
      content: `1.1. Employer employs Employee in the position of: ${params.jobPosition}.
1.2. Services under this Agreement shall be performed ${formatText}.
1.3. This Agreement commences on the Effective Date and continues on an at-will basis unless terminated pursuant to applicable law.
1.4. Employee shall serve an introductory evaluation period of ${params.probationMonths} months from the commencement date.`
    },
    {
      id: 'emp-2',
      number: '2',
      title: 'COMPENSATION AND BENEFITS',
      tag: 'Compensation',
      content: `2.1. In consideration for services, Employer shall pay Employee a gross base salary of ${params.monthlySalary} USD per month.
2.2. Salary shall be remitted bi-monthly on ${params.paymentDays} via direct electronic bank deposit.
2.3. Employer shall provide a monthly non-taxable remote work and equipment allowance of ${params.equipmentCompensation} USD for telecommunications and hardware maintenance.
2.4. Employee shall be eligible to participate in Employer's discretionary quarterly KPI bonus program.`
    },
    {
      id: 'emp-3',
      number: '3',
      title: 'HOURS OF WORK AND TIME OFF',
      tag: 'Working Hours',
      content: `3.1. Employee is expected to work a standard professional work week of approximately 40 hours with customary weekend rest.
3.2. Collaboration and operational syncs shall occur via corporate email, team collaboration platforms, and code repositories.
3.3. Employee shall accrue 20 business days of paid personal time off (PTO) per calendar year, plus observed corporate holidays.`
    },
    {
      id: 'emp-4',
      number: '4',
      title: 'PROPRIETARY INVENTIONS & WORK PRODUCT',
      tag: 'Work-for-Hire',
      content: `4.1. All inventions, source code, designs, algorithms, and documentation conceived or reduced to practice by Employee in connection with employment shall be deemed "works made for hire."
4.2. To the extent any work product is not deemed a work made for hire, Employee hereby irrevocably assigns all right, title, and copyright interest therein to Employer. Consideration for such assignment is included in Employee's regular compensation.`
    },
    {
      id: 'emp-5',
      number: '5',
      title: 'CONFIDENTIALITY & TRADE SECRETS',
      tag: 'Confidentiality',
      content: `5.1. Employee agrees not to disclose or misappropriate any proprietary trade secrets, customer records, technical roadmaps, or financial data of Employer.
5.2. Confidentiality obligations shall endure throughout employment and for a period of three (3) years following separation of employment.`
    },
    {
      id: 'emp-6',
      number: '6',
      title: 'SIGNATURES & ACKNOWLEDGEMENT',
      tag: 'Signatures',
      content: `EMPLOYER:
${params.employerName}
${params.employerInn}
By: ${params.employerSigner}
Signature: ______________________

EMPLOYEE:
${params.employeeFullName}
${params.employeeInn}
ID: ${params.employeePassport}
Signature: ______________________`
    }
  ];

  const rawText = `EMPLOYMENT AND INVENTIONS AGREEMENT NO. EMP-2026/14
(REMOTE / TELECOMMUTING POSITION)

Effective Date: April 12, 2026                                            Location: ${params.city}

This Employment Agreement is entered into by and between:
${params.employerName} ("Employer"), represented by ${params.employerSigner}, and
${params.employeeFullName} ("Employee").

NOW, THEREFORE, the Parties agree as follows:

${sections.map(s => `${s.number}. ${s.title}\n${s.content}`).join('\n\n')}`;

  return {
    id: `doc-emp-${Date.now()}`,
    title: `Employment Agreement (${params.employeeFullName} - ${params.jobPosition.slice(0, 24)}...)`,
    docType: 'employment',
    rawText,
    sections,
    complianceScore: 99,
    protectiveHighlights: [
      {
        title: 'Compliant Remote Framework',
        description: 'Clear remote telecommuting guidelines with defined communication protocols and data safety standards.',
        badge: 'FLSA Compliance'
      },
      {
        title: 'Irrevocable Work-for-Hire',
        description: 'Employer retains undisputed title to software, patents, and designs created during employment.',
        badge: '17 U.S. Code § 101'
      },
      {
        title: 'Home Office Allowance',
        description: `Stipulates monthly hardware and broadband reimbursement of ${params.equipmentCompensation}/month.`,
        badge: 'Stipend Provision'
      },
      {
        title: 'Trade Secret Safeguard',
        description: 'Protects proprietary codebase and customer data with 3-year post-termination confidentiality.',
        badge: 'DTSA 18 U.S.C. § 1836'
      }
    ],
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
}

// Generates Equipment Supply Contract in English
export function generateEquipmentContract(params: EquipmentSupplyParams): GeneratedDocumentResult {
  const paymentClause = params.paymentMode === 'advance50_post50'
    ? '50% of the total price shall be remitted as an upfront deposit within three (3) business days of execution; the remaining 50% shall be paid within five (5) business days following delivery and bilateral signing of the delivery receipt.'
    : params.paymentMode === 'advance100'
      ? '100% prepayment remitted within three (3) business days following pro-forma invoice issuance.'
      : '100% net payment remitted within ten (10) business days following physical receipt of Equipment and delivery receipt.';

  const deliveryClause = params.deliveryTerms === 'supplier_delivery'
    ? `Equipment shall be delivered by Supplier at Supplier's expense directly to Buyer's facility specified in Schedule 1.`
    : `Buyer shall take delivery directly from Supplier's warehouse facility (FOB Origin / Ex Works).`;

  const sections: DocumentSection[] = [
    {
      id: 'sup-1',
      number: '1',
      title: 'SUBJECT MATTER & SCHEDULE 1 SPECIFICATIONS',
      tag: 'Subject Matter',
      content: `1.1. Supplier shall sell, deliver, and transfer title to Buyer for the following enterprise equipment: ${params.equipmentName}, in the total quantity of ${params.equipmentQuantity} (the "Equipment"), and Buyer shall accept and pay for same.
1.2. Detailed serial specifications, firmware revisions, and accessories are detailed in Schedule 1 attached hereto.
1.3. Supplier warrants that the Equipment is factory new, unencumbered by liens, and certified for commercial data center operation.`
    },
    {
      id: 'sup-2',
      number: '2',
      title: 'PURCHASE PRICE & PAYMENT TERMS',
      tag: 'Pricing & Terms',
      content: `2.1. The total contract purchase price for the Equipment is ${params.totalAmount} USD, inclusive of freight packaging and transit insurance.
2.2. ${paymentClause}
2.3. Payments shall be remitted by wire transfer to Supplier's designated bank.`
    },
    {
      id: 'sup-3',
      number: '3',
      title: 'DELIVERY TIMELINE & PASSING OF RISK',
      tag: 'Delivery & Title',
      content: `3.1. Delivery shall occur within ${params.deliveryDays} business days following receipt of cleared deposit funds.
3.2. ${deliveryClause}
3.3. Risk of loss or damage to Equipment passes from Supplier to Buyer strictly upon physical delivery and signing of the delivery waybill (Bill of Lading).`
    },
    {
      id: 'sup-4',
      number: '4',
      title: 'INSPECTION AND DEFECT REMEDIES',
      tag: 'Inspection',
      content: `4.1. Buyer shall inspect package integrity upon delivery.
4.2. Functional diagnostic testing shall be completed within five (5) business days. In the event of latent manufacturer defects, Buyer shall issue an RMA notice.`
    },
    {
      id: 'sup-5',
      number: '5',
      title: 'WARRANTY AND RMA SERVICE',
      tag: 'Warranty',
      content: `5.1. Supplier warrants the Equipment against component failure for a period of ${params.warrantyMonths} months from delivery.
5.2. During warranty, Supplier shall repair or replace defective modules within ten (10) business days under standard advance replacement terms.`
    },
    {
      id: 'sup-6',
      number: '6',
      title: 'DELAYS AND MUTUAL REMEDIES',
      tag: 'Remedies',
      content: `6.1. For late shipment, Buyer may assess liquidated damages of ${params.penaltyDailyRate}% per business day of delay, capped at ${params.penaltyCapPercent}% of the shipment value.
6.2. For late payment, Supplier may charge interest of ${params.penaltyDailyRate}% per day on overdue sums, capped at ${params.penaltyCapPercent}% of the invoice value.`
    },
    {
      id: 'sup-7',
      number: '7',
      title: 'SIGNATURES & CORPORATE REQUISITES',
      tag: 'Signatures',
      content: `BUYER:
${params.buyerName}
${params.buyerInn}
By: ${params.buyerSigner}
Signature: ______________________

SUPPLIER:
${params.supplierName}
${params.supplierInn}
By: ${params.supplierSigner}
Signature: ______________________`
    }
  ];

  const rawText = `COMMERCIAL EQUIPMENT PURCHASE AND SUPPLY AGREEMENT NO. SUP-2026/88

Effective Date: April 12, 2026                                            Location: ${params.city}

This Equipment Supply Agreement is made by and between:
${params.buyerName} ("Buyer"), represented by ${params.buyerSigner}, and
${params.supplierName} ("Supplier"), represented by ${params.supplierSigner}.

NOW, THEREFORE, the Parties agree as follows:

${sections.map(s => `${s.number}. ${s.title}\n${s.content}`).join('\n\n')}`;

  return {
    id: `doc-sup-${Date.now()}`,
    title: `Equipment Supply Agreement (${params.equipmentName.slice(0, 30)}...)`,
    docType: 'equipment_supply',
    rawText,
    sections,
    complianceScore: 97,
    protectiveHighlights: [
      {
        title: 'Title & Risk Transfer',
        description: 'Risk passes strictly upon physical delivery and bill of lading signature (protects Buyer from transit casualty).',
        badge: 'UCC § 2-509'
      },
      {
        title: 'Symmetrical Delay Terms',
        description: `Parity penalty of ${params.penaltyDailyRate}% per business day with a mutual cap of ${params.penaltyCapPercent}%.`,
        badge: 'UCC § 2-718'
      },
      {
        title: 'Comprehensive Warranty',
        description: `Full ${params.warrantyMonths}-month hardware warranty with expedited module replacement.`,
        badge: 'Hardware SLA'
      },
      {
        title: 'Precise Model Specifications',
        description: 'Detailed component serials and specifications prevent compatibility and logistics disputes.',
        badge: 'Audit Compliant'
      }
    ],
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
}
