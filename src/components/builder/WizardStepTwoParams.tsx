import React from 'react';
import { 
  SoftwareDevParams, 
  EmploymentParams, 
  EquipmentSupplyParams, 
  BuilderDocType 
} from '../../types';
import { 
  Building2, 
  User, 
  Coins, 
  Calendar, 
  ShieldAlert, 
  Scale, 
  ArrowLeft, 
  Sparkles, 
  Zap, 
  RotateCcw, 
  FileText,
  Info
} from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';

interface WizardStepTwoParamsProps {
  docType: BuilderDocType;
  softwareParams: SoftwareDevParams;
  setSoftwareParams: React.Dispatch<React.SetStateAction<SoftwareDevParams>>;
  employmentParams: EmploymentParams;
  setEmploymentParams: React.Dispatch<React.SetStateAction<EmploymentParams>>;
  equipmentParams: EquipmentSupplyParams;
  setEquipmentParams: React.Dispatch<React.SetStateAction<EquipmentSupplyParams>>;
  onBack: () => void;
  onGenerate: () => void;
  onFillDemo: () => void;
  onReset: () => void;
}

export const WizardStepTwoParams: React.FC<WizardStepTwoParamsProps> = ({
  docType,
  softwareParams,
  setSoftwareParams,
  employmentParams,
  setEmploymentParams,
  equipmentParams,
  setEquipmentParams,
  onBack,
  onGenerate,
  onFillDemo,
  onReset
}) => {
  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-black/40 border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-legal text-[#d4b06a] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STEP 2 OF 4: CONTRACT PARAMETERIZATION</span>
          </div>
          <h2 className="font-syne text-xl sm:text-2xl font-bold text-white tracking-tight">
            {docType === 'software_dev' && 'Software Development Parameters'}
            {docType === 'employment' && 'Employment & Work-for-Hire Parameters'}
            {docType === 'equipment_supply' && 'Equipment Supply & Hardware Parameters'}
          </h2>
          <p className="text-xs text-gray-400 font-sans-ui mt-1">
            Configure key commercial variables. LexGuard fills in balanced terms and leaves out one-sided clauses.
          </p>
        </div>

        {/* Quick Demo button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onFillDemo();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono-legal font-semibold text-[#f59e0b] bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20 border border-[#f59e0b]/30 transition-all"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Fill Demo Data</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onReset();
            }}
            title="Clear fields"
            className="p-2 rounded-xl text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* FORM CONTENT BASED ON DOC TYPE */}
      {docType === 'software_dev' && (
        <div className="space-y-6">
          {/* Section 1: Parties */}
          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-xs font-mono-legal font-bold text-white uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-[#d4b06a]" />
              <span>1. PARTIES & CORPORATE REQUISITES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Customer */}
              <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono-legal font-semibold text-[#d4b06a] block">
                  CLIENT (CUSTOMER)
                </span>
                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Company Legal Name:
                  </label>
                  <input
                    type="text"
                    value={softwareParams.customerName}
                    onChange={(e) => setSoftwareParams(p => ({ ...p, customerName: e.target.value }))}
                    placeholder="TechnoProm Engineering Inc."
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                      Tax ID / EIN:
                    </label>
                    <input
                      type="text"
                      value={softwareParams.customerInn}
                      onChange={(e) => setSoftwareParams(p => ({ ...p, customerInn: e.target.value }))}
                      placeholder="EIN: 12-8492014"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a] font-mono-legal"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                      Jurisdiction / City:
                    </label>
                    <input
                      type="text"
                      value={softwareParams.city}
                      onChange={(e) => setSoftwareParams(p => ({ ...p, city: e.target.value }))}
                      placeholder="New York, NY"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Authorized Representative:
                  </label>
                  <input
                    type="text"
                    value={softwareParams.customerSigner}
                    onChange={(e) => setSoftwareParams(p => ({ ...p, customerSigner: e.target.value }))}
                    placeholder="Alexander Sokolov, Chief Executive Officer"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a]"
                  />
                </div>
              </div>

              {/* Contractor */}
              <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono-legal font-semibold text-[#60a5fa] block">
                  DEVELOPER (CONTRACTOR)
                </span>
                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Company Legal Name:
                  </label>
                  <input
                    type="text"
                    value={softwareParams.contractorName}
                    onChange={(e) => setSoftwareParams(p => ({ ...p, contractorName: e.target.value }))}
                    placeholder="Digital Systems & Cloud Labs LLC"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Tax ID / EIN:
                  </label>
                  <input
                    type="text"
                    value={softwareParams.contractorInn}
                    onChange={(e) => setSoftwareParams(p => ({ ...p, contractorInn: e.target.value }))}
                    placeholder="EIN: 94-7182930"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a] font-mono-legal"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Authorized Representative:
                  </label>
                  <input
                    type="text"
                    value={softwareParams.contractorSigner}
                    onChange={(e) => setSoftwareParams(p => ({ ...p, contractorSigner: e.target.value }))}
                    placeholder="Marcus Voronov, Managing Director"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Subject & Timing */}
          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-xs font-mono-legal font-bold text-white uppercase tracking-wider">
              <FileText className="w-4 h-4 text-[#d4b06a]" />
              <span>2. STATEMENT OF WORK & TIMELINE</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Project Title & Core Deliverables:
                </label>
                <input
                  type="text"
                  value={softwareParams.projectName}
                  onChange={(e) => setSoftwareParams(p => ({ ...p, projectName: e.target.value }))}
                  placeholder="Enterprise Logistics Intelligence Platform with AI Copilot & API Gateway"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4b06a]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Estimated Duration (days):
                  </label>
                  <input
                    type="text"
                    value={softwareParams.durationDays}
                    onChange={(e) => setSoftwareParams(p => ({ ...p, durationDays: e.target.value }))}
                    placeholder="60"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a] font-mono-legal"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Acceptance Review Window (days):
                  </label>
                  <input
                    type="text"
                    value={softwareParams.acceptanceDays}
                    onChange={(e) => setSoftwareParams(p => ({ ...p, acceptanceDays: e.target.value }))}
                    placeholder="5"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a] font-mono-legal"
                  />
                  <span className="text-[10px] text-gray-500 font-sans-ui mt-0.5 block">
                    Automatic acceptance upon silence
                  </span>
                </div>

                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Warranty Period (months):
                  </label>
                  <select
                    value={softwareParams.warrantyMonths}
                    onChange={(e) => setSoftwareParams(p => ({ ...p, warrantyMonths: e.target.value }))}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a]"
                  >
                    <option value="3">3 Months</option>
                    <option value="6">6 Months (Recommended)</option>
                    <option value="12">12 Months</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Money & Intellectual Property */}
          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-xs font-mono-legal font-bold text-white uppercase tracking-wider">
              <Coins className="w-4 h-4 text-[#d4b06a]" />
              <span>3. COMPENSATION & INTELLECTUAL PROPERTY</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Contract Value ($):
                </label>
                <input
                  type="text"
                  value={softwareParams.totalAmount}
                  onChange={(e) => setSoftwareParams(p => ({ ...p, totalAmount: e.target.value }))}
                  placeholder="$145,000"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a] font-mono-legal"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Tax Treatment:
                </label>
                <select
                  value={softwareParams.taxMode}
                  onChange={(e) => setSoftwareParams(p => ({ ...p, taxMode: e.target.value as any }))}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a]"
                >
                  <option value="no_vat">Net of Taxes / Tax-Exempt</option>
                  <option value="vat20">Inclusive of Sales Tax / VAT</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Payment Schedule:
                </label>
                <select
                  value={softwareParams.paymentTerms}
                  onChange={(e) => setSoftwareParams(p => ({ ...p, paymentTerms: e.target.value as any }))}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a]"
                >
                  <option value="advance30_post70">30% Advance + 70% Upon Acceptance</option>
                  <option value="post100">100% Net Upon Delivery</option>
                  <option value="milestones">Structured Sprint Milestones</option>
                </select>
              </div>
            </div>

            {/* Intellectual Property Choice */}
            <div className="pt-2">
              <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1.5">
                Title & IP Assignment Timing:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div
                  onClick={() => setSoftwareParams(p => ({ ...p, ipTransferTiming: 'on_100_percent_payment' }))}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    softwareParams.ipTransferTiming === 'on_100_percent_payment'
                      ? 'bg-[#d4b06a]/10 border-[#d4b06a] text-white'
                      : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono-legal font-bold px-2 py-0.5 rounded bg-[#d4b06a]/20 text-[#d4b06a]">
                      AI RECOMMENDATION
                    </span>
                    <span className="text-xs font-bold font-syne">Strictly upon 100% Full Payment</span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-sans-ui">
                    Protects the developer from non-payment and unauthorized third-party commercial exploitation.
                  </p>
                </div>

                <div
                  onClick={() => setSoftwareParams(p => ({ ...p, ipTransferTiming: 'on_milestone_acts' }))}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    softwareParams.ipTransferTiming === 'on_milestone_acts'
                      ? 'bg-[#d4b06a]/10 border-[#d4b06a] text-white'
                      : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-bold font-syne block mb-1">Incremental Milestone Transfer</span>
                  <p className="text-[11px] text-gray-400 font-sans-ui">
                    IP vests incrementally for each accepted sprint module upon verified receipt of payment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Balanced Penalties */}
          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono-legal font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#d4b06a]" />
                <span>4. SYMMETRICAL SANCTIONS & LIABILITY CAP</span>
              </span>
              <span className="text-[10px] font-mono-legal text-[#d4b06a] px-2 py-0.5 rounded bg-[#d4b06a]/10 border border-[#d4b06a]/30">
                RECIPROCAL PARITY
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Delay Penalty (% per day):
                </label>
                <input
                  type="text"
                  value={softwareParams.penaltyRateDaily}
                  onChange={(e) => setSoftwareParams(p => ({ ...p, penaltyRateDaily: e.target.value }))}
                  placeholder="0.05"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a] font-mono-legal"
                />
                <span className="text-[10px] text-gray-500 font-sans-ui mt-0.5 block">
                  Applies reciprocally to both parties
                </span>
              </div>

              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Aggregate Liability Cap (%):
                </label>
                <input
                  type="text"
                  value={softwareParams.penaltyCapPercent}
                  onChange={(e) => setSoftwareParams(p => ({ ...p, penaltyCapPercent: e.target.value }))}
                  placeholder="5"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a] font-mono-legal"
                />
                <span className="text-[10px] text-gray-500 font-sans-ui mt-0.5 block">
                  Caps total potential damages exposure
                </span>
              </div>

              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Governing Court Jurisdiction:
                </label>
                <input
                  type="text"
                  value={softwareParams.jurisdiction}
                  onChange={(e) => setSoftwareParams(p => ({ ...p, jurisdiction: e.target.value }))}
                  placeholder="State of Delaware (New Castle County Courts)"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EMPLOYMENT CONTRACT FORM */}
      {docType === 'employment' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-xs font-mono-legal font-bold text-white uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-[#60a5fa]" />
              <span>1. PARTIES TO EMPLOYMENT AGREEMENT</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono-legal font-semibold text-[#60a5fa] block">
                  EMPLOYER
                </span>
                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Company Name:
                  </label>
                  <input
                    type="text"
                    value={employmentParams.employerName}
                    onChange={(e) => setEmploymentParams(p => ({ ...p, employerName: e.target.value }))}
                    placeholder="NeuroNet Technologies Inc."
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#60a5fa]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                      Tax ID / EIN:
                    </label>
                    <input
                      type="text"
                      value={employmentParams.employerInn}
                      onChange={(e) => setEmploymentParams(p => ({ ...p, employerInn: e.target.value }))}
                      placeholder="EIN: 83-2948102"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#60a5fa] font-mono-legal"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                      City / State:
                    </label>
                    <input
                      type="text"
                      value={employmentParams.city}
                      onChange={(e) => setEmploymentParams(p => ({ ...p, city: e.target.value }))}
                      placeholder="San Francisco, CA"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#60a5fa]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Authorized Signer:
                  </label>
                  <input
                    type="text"
                    value={employmentParams.employerSigner}
                    onChange={(e) => setEmploymentParams(p => ({ ...p, employerSigner: e.target.value }))}
                    placeholder="David Melnikov, Chief Executive Officer"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#60a5fa]"
                  />
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono-legal font-semibold text-[#d4b06a] block">
                  EMPLOYEE
                </span>
                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Employee Full Name:
                  </label>
                  <input
                    type="text"
                    value={employmentParams.employeeFullName}
                    onChange={(e) => setEmploymentParams(p => ({ ...p, employeeFullName: e.target.value }))}
                    placeholder="Alex K. Smith"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Social Security Number / Tax ID:
                  </label>
                  <input
                    type="text"
                    value={employmentParams.employeeInn}
                    onChange={(e) => setEmploymentParams(p => ({ ...p, employeeInn: e.target.value }))}
                    placeholder="SSN: XXX-XX-4819"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a] font-mono-legal"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Passport or ID Details:
                  </label>
                  <input
                    type="text"
                    value={employmentParams.employeePassport}
                    onChange={(e) => setEmploymentParams(p => ({ ...p, employeePassport: e.target.value }))}
                    placeholder="US Passport #Z74819201"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-xs font-mono-legal font-bold text-white uppercase tracking-wider">
              <User className="w-4 h-4 text-[#60a5fa]" />
              <span>2. ROLE, COMPENSATION & REMOTE WORK</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Job Position:
                </label>
                <input
                  type="text"
                  value={employmentParams.jobPosition}
                  onChange={(e) => setEmploymentParams(p => ({ ...p, jobPosition: e.target.value }))}
                  placeholder="Lead Systems Architect / Senior Software Engineer"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#60a5fa]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Monthly Base Salary ($):
                </label>
                <input
                  type="text"
                  value={employmentParams.monthlySalary}
                  onChange={(e) => setEmploymentParams(p => ({ ...p, monthlySalary: e.target.value }))}
                  placeholder="$14,500"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#60a5fa] font-mono-legal"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Work Arrangement:
                </label>
                <select
                  value={employmentParams.workFormat}
                  onChange={(e) => setEmploymentParams(p => ({ ...p, workFormat: e.target.value as any }))}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#60a5fa]"
                >
                  <option value="remote">Remote Telecommuting (Work-from-Home)</option>
                  <option value="hybrid">Hybrid (2 Days On-Site + 3 Days Remote)</option>
                  <option value="office">On-Site Office</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Probation Period:
                </label>
                <select
                  value={employmentParams.probationMonths}
                  onChange={(e) => setEmploymentParams(p => ({ ...p, probationMonths: e.target.value }))}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#60a5fa]"
                >
                  <option value="3">3 Months (Standard)</option>
                  <option value="1">1 Month</option>
                  <option value="0">No Probationary Period</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Home Office Allowance ($/mo):
                </label>
                <input
                  type="text"
                  value={employmentParams.equipmentCompensation}
                  onChange={(e) => setEmploymentParams(p => ({ ...p, equipmentCompensation: e.target.value }))}
                  placeholder="$250"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#60a5fa] font-mono-legal"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Incentive Bonus Structure:
                </label>
                <select
                  value={employmentParams.bonusScheme}
                  onChange={(e) => setEmploymentParams(p => ({ ...p, bonusScheme: e.target.value as any }))}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#60a5fa]"
                >
                  <option value="kpi_monthly">Quarterly Performance KPI</option>
                  <option value="none">Fixed Base Only</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EQUIPMENT SUPPLY FORM */}
      {docType === 'equipment_supply' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-xs font-mono-legal font-bold text-white uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-[#f59e0b]" />
              <span>1. PARTIES TO SUPPLY AGREEMENT</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono-legal font-semibold text-[#f59e0b] block">
                  BUYER (PURCHASER)
                </span>
                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Company Name:
                  </label>
                  <input
                    type="text"
                    value={equipmentParams.buyerName}
                    onChange={(e) => setEquipmentParams(p => ({ ...p, buyerName: e.target.value }))}
                    placeholder="DataCenter Infrastructure Holdings Inc."
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                      Tax ID / EIN:
                    </label>
                    <input
                      type="text"
                      value={equipmentParams.buyerInn}
                      onChange={(e) => setEquipmentParams(p => ({ ...p, buyerInn: e.target.value }))}
                      placeholder="EIN: 20-4918230"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f59e0b] font-mono-legal"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                      City / State:
                    </label>
                    <input
                      type="text"
                      value={equipmentParams.city}
                      onChange={(e) => setEquipmentParams(p => ({ ...p, city: e.target.value }))}
                      placeholder="New York, NY"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Authorized Signer:
                  </label>
                  <input
                    type="text"
                    value={equipmentParams.buyerSigner}
                    onChange={(e) => setEquipmentParams(p => ({ ...p, buyerSigner: e.target.value }))}
                    placeholder="Peter E. Gromov, VP of Operations"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono-legal font-semibold text-[#d4b06a] block">
                  SUPPLIER (VENDOR)
                </span>
                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Supplier Legal Name:
                  </label>
                  <input
                    type="text"
                    value={equipmentParams.supplierName}
                    onChange={(e) => setEquipmentParams(p => ({ ...p, supplierName: e.target.value }))}
                    placeholder="ServerTrade Systems Global LLC"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Tax ID / EIN:
                  </label>
                  <input
                    type="text"
                    value={equipmentParams.supplierInn}
                    onChange={(e) => setEquipmentParams(p => ({ ...p, supplierInn: e.target.value }))}
                    placeholder="EIN: 47-1928341"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a] font-mono-legal"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                    Authorized Signer:
                  </label>
                  <input
                    type="text"
                    value={equipmentParams.supplierSigner}
                    onChange={(e) => setEquipmentParams(p => ({ ...p, supplierSigner: e.target.value }))}
                    placeholder="Kevin A. White, Commercial Director"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4b06a]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-xs font-mono-legal font-bold text-white uppercase tracking-wider">
              <FileText className="w-4 h-4 text-[#f59e0b]" />
              <span>2. HARDWARE SPECIFICATIONS & DELIVERY PROTOCOL</span>
            </div>

            <div>
              <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                Equipment Description & Configuration Details:
              </label>
              <textarea
                rows={2}
                value={equipmentParams.equipmentName}
                onChange={(e) => setEquipmentParams(p => ({ ...p, equipmentName: e.target.value }))}
                placeholder="High-Density Server Compute Nodes Xeon Silver 4410Y 2U (128GB RAM, 4x3.84TB NVMe SSD, Dual 10Gbps SFP+)"
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f59e0b] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Total Contract Amount ($):
                </label>
                <input
                  type="text"
                  value={equipmentParams.totalAmount}
                  onChange={(e) => setEquipmentParams(p => ({ ...p, totalAmount: e.target.value }))}
                  placeholder="$186,000"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f59e0b] font-mono-legal"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Quantity:
                </label>
                <input
                  type="text"
                  value={equipmentParams.equipmentQuantity}
                  onChange={(e) => setEquipmentParams(p => ({ ...p, equipmentQuantity: e.target.value }))}
                  placeholder="6 Units"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Lead Time (business days):
                </label>
                <input
                  type="text"
                  value={equipmentParams.deliveryDays}
                  onChange={(e) => setEquipmentParams(p => ({ ...p, deliveryDays: e.target.value }))}
                  placeholder="14"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f59e0b] font-mono-legal"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Payment Terms:
                </label>
                <select
                  value={equipmentParams.paymentMode}
                  onChange={(e) => setEquipmentParams(p => ({ ...p, paymentMode: e.target.value as any }))}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                >
                  <option value="advance50_post50">50% Advance, 50% Post-Delivery</option>
                  <option value="advance100">100% Prepayment</option>
                  <option value="post100">100% Net 10 Days Upon Delivery</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Risk of Loss Transfer:
                </label>
                <div className="p-2 rounded-xl bg-[#d4b06a]/10 border border-[#d4b06a]/30 text-[11px] text-[#d4b06a] font-mono-legal">
                  Upon Bill of Lading Receipt (UCC § 2-509)
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono-legal text-gray-400 uppercase block mb-1">
                  Hardware Warranty:
                </label>
                <select
                  value={equipmentParams.warrantyMonths}
                  onChange={(e) => setEquipmentParams(p => ({ ...p, warrantyMonths: e.target.value }))}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                >
                  <option value="12">12 Months</option>
                  <option value="24">24 Months (Recommended)</option>
                  <option value="36">36 Months</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            onBack();
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono-legal text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Template Type</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundFx.playScanPing();
            onGenerate();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-mono-legal font-bold text-black bg-[#d4b06a] hover:bg-[#c39d55] transition-all"
        >
          <Sparkles className="w-4 h-4 text-black" />
          <span>Launch AI Document Synthesis</span>
        </button>
      </div>
    </div>
  );
};
