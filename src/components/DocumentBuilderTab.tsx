import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BuilderDocType, 
  SoftwareDevParams, 
  EmploymentParams, 
  EquipmentSupplyParams, 
  GeneratedDocumentResult 
} from '../types';
import { 
  DEFAULT_SOFTWARE_PARAMS, 
  DEFAULT_EMPLOYMENT_PARAMS, 
  DEFAULT_EQUIPMENT_PARAMS, 
  generateSoftwareContract, 
  generateEmploymentContract, 
  generateEquipmentContract 
} from '../data/builderPresets';
import { WizardStepOneType } from './builder/WizardStepOneType';
import { WizardStepTwoParams } from './builder/WizardStepTwoParams';
import { WizardStepThreeGenerating } from './builder/WizardStepThreeGenerating';
import { WizardStepFourDocument } from './builder/WizardStepFourDocument';
import { 
  Check, 
  Sparkles, 
  Layers, 
  Sliders, 
  Cpu, 
  FileCheck2 
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface DocumentBuilderTabProps {
  onSendToScan: (contractText: string, title: string) => void;
  onExportDoc: (title: string, content: string) => void;
}

export const DocumentBuilderTab: React.FC<DocumentBuilderTabProps> = ({
  onSendToScan,
  onExportDoc,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [docType, setDocType] = useState<BuilderDocType>('software_dev');

  // Form params states
  const [softwareParams, setSoftwareParams] = useState<SoftwareDevParams>(DEFAULT_SOFTWARE_PARAMS);
  const [employmentParams, setEmploymentParams] = useState<EmploymentParams>(DEFAULT_EMPLOYMENT_PARAMS);
  const [equipmentParams, setEquipmentParams] = useState<EquipmentSupplyParams>(DEFAULT_EQUIPMENT_PARAMS);

  // Result state
  const [generatedDoc, setGeneratedDoc] = useState<GeneratedDocumentResult | null>(() => {
    return generateSoftwareContract(DEFAULT_SOFTWARE_PARAMS);
  });

  // Steps definition for visual Stepper
  const steps = [
    { num: 1, title: 'Template Type', icon: Layers },
    { num: 2, title: 'Parameters', icon: Sliders },
    { num: 3, title: 'AI Generation', icon: Cpu },
    { num: 4, title: 'Final Document', icon: FileCheck2 },
  ];

  // Quick Demo fill
  const handleQuickDemo = (type: BuilderDocType) => {
    setDocType(type);
    if (type === 'software_dev') setSoftwareParams(DEFAULT_SOFTWARE_PARAMS);
    if (type === 'employment') setEmploymentParams(DEFAULT_EMPLOYMENT_PARAMS);
    if (type === 'equipment_supply') setEquipmentParams(DEFAULT_EQUIPMENT_PARAMS);
    setCurrentStep(2);
  };

  const handleFillDemoCurrent = () => {
    if (docType === 'software_dev') setSoftwareParams(DEFAULT_SOFTWARE_PARAMS);
    if (docType === 'employment') setEmploymentParams(DEFAULT_EMPLOYMENT_PARAMS);
    if (docType === 'equipment_supply') setEquipmentParams(DEFAULT_EQUIPMENT_PARAMS);
  };

  const handleResetCurrent = () => {
    if (docType === 'software_dev') {
      setSoftwareParams({
        ...DEFAULT_SOFTWARE_PARAMS,
        customerName: '',
        contractorName: '',
        projectName: '',
        totalAmount: '0'
      });
    } else if (docType === 'employment') {
      setEmploymentParams({
        ...DEFAULT_EMPLOYMENT_PARAMS,
        employerName: '',
        employeeFullName: '',
        monthlySalary: '0'
      });
    } else {
      setEquipmentParams({
        ...DEFAULT_EQUIPMENT_PARAMS,
        buyerName: '',
        supplierName: '',
        equipmentName: '',
        totalAmount: '0'
      });
    }
  };

  // Trigger generation
  const handleStartGeneration = () => {
    let result: GeneratedDocumentResult;
    if (docType === 'software_dev') {
      result = generateSoftwareContract(softwareParams);
    } else if (docType === 'employment') {
      result = generateEmploymentContract(employmentParams);
    } else {
      result = generateEquipmentContract(equipmentParams);
    }

    setGeneratedDoc(result);
    setCurrentStep(3);
  };

  return (
    <div id="document-builder-view" className="space-y-6">
      {/* Top Stepper Navigation */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            const canJump = currentStep > s.num || (s.num === 4 && generatedDoc !== null);

            return (
              <React.Fragment key={s.num}>
                <button
                  type="button"
                  disabled={!canJump}
                  onClick={() => {
                    if (canJump) {
                      soundFx.playClick();
                      setCurrentStep(s.num as any);
                    }
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono-legal transition-all shrink-0 ${
                    isCurrent
                      ? 'bg-[#d4b06a]/15 text-[#d4b06a] border border-[#d4b06a]/40 font-bold'
                      : isDone
                        ? 'text-gray-300 hover:text-white cursor-pointer'
                        : 'text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold ${
                    isDone 
                      ? 'bg-[#d4b06a] text-black' 
                      : isCurrent 
                        ? 'bg-[#d4b06a]/20 text-[#d4b06a] border border-[#d4b06a]/40' 
                        : 'bg-white/[0.05] text-gray-500'
                  }`}>
                    {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
                  </div>
                  <span className="hidden sm:inline">{s.title}</span>
                </button>

                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-[1px] min-w-4 transition-colors ${
                    currentStep > s.num ? 'bg-[#d4b06a]/50' : 'bg-white/10'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Dynamic Container */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <WizardStepOneType
              selectedType={docType}
              onSelectType={(type) => setDocType(type)}
              onContinue={() => setCurrentStep(2)}
              onQuickDemo={handleQuickDemo}
            />
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <WizardStepTwoParams
              docType={docType}
              softwareParams={softwareParams}
              setSoftwareParams={setSoftwareParams}
              employmentParams={employmentParams}
              setEmploymentParams={setEmploymentParams}
              equipmentParams={equipmentParams}
              setEquipmentParams={setEquipmentParams}
              onBack={() => setCurrentStep(1)}
              onGenerate={handleStartGeneration}
              onFillDemo={handleFillDemoCurrent}
              onReset={handleResetCurrent}
            />
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.25 }}
          >
            <WizardStepThreeGenerating
              docType={docType}
              onComplete={() => setCurrentStep(4)}
            />
          </motion.div>
        )}

        {currentStep === 4 && generatedDoc && (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <WizardStepFourDocument
              document={generatedDoc}
              onSendToScan={onSendToScan}
              onExportDoc={onExportDoc}
              onStartNew={() => setCurrentStep(1)}
              onBackToParams={() => setCurrentStep(2)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
