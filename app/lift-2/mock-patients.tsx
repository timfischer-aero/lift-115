export type Patient = {
  id: string;
  payer: string;
  patientNumber: string;
  hcpc: string;
  dateOfService: string;
  endServiceDate: string;
  sentDate: string | null;
  xmit: number | null;
  denialDate: string | null;
  denialCode: string | null;
  denialCode2: string | null;
  denialCode3: string | null;
  rm1: string | null;
  cmn: string | null;
  remit: string | null;
  serviceStatus: string | null;
};

export const patients: Patient[] = [
  {
    id: "sample-row-1",
    payer: "MOLINA SC MEDICAID",
    patientNumber: "1851449",
    hcpc: "A4927",
    dateOfService: "3/13/2026",
    endServiceDate: "3/13/2026",
    sentDate: "5/1/2026",
    xmit: 2,
    denialDate: "5/12/2026",
    denialCode: "CO22",
    denialCode2: null,
    denialCode3: null,
    rm1: "N479",
    cmn: null,
    remit: null,
    serviceStatus: "S",
  },
  {
    id: "sample-row-2",
    payer: "TEST PAYER A",
    patientNumber: "TEST-002",
    hcpc: "A4351",
    dateOfService: "3/16/2026",
    endServiceDate: "3/16/2026",
    sentDate: "5/2/2026",
    xmit: 1,
    denialDate: null,
    denialCode: null,
    denialCode2: null,
    denialCode3: null,
    rm1: null,
    cmn: null,
    remit: null,
    serviceStatus: "S",
  },
  {
    id: "sample-row-3",
    payer: "TEST PAYER B",
    patientNumber: "TEST-003",
    hcpc: "A4554",
    dateOfService: "3/18/2026",
    endServiceDate: "3/20/2026",
    sentDate: "5/4/2026",
    xmit: 2,
    denialDate: "5/14/2026",
    denialCode: "CO22",
    denialCode2: null,
    denialCode3: null,
    rm1: "N479",
    cmn: null,
    remit: null,
    serviceStatus: "U",
  },
  {
    id: "sample-row-4",
    payer: "TEST PAYER A",
    patientNumber: "TEST-004",
    hcpc: "E0601",
    dateOfService: "3/23/2026",
    endServiceDate: "3/23/2026",
    sentDate: null,
    xmit: null,
    denialDate: null,
    denialCode: null,
    denialCode2: null,
    denialCode3: null,
    rm1: null,
    cmn: null,
    remit: null,
    serviceStatus: "U",
  },
  {
    id: "sample-row-5",
    payer: "TEST PAYER C",
    patientNumber: "TEST-005",
    hcpc: "E0603",
    dateOfService: "3/25/2026",
    endServiceDate: "3/27/2026",
    sentDate: "5/6/2026",
    xmit: 3,
    denialDate: "5/18/2026",
    denialCode: "CO22",
    denialCode2: null,
    denialCode3: null,
    rm1: "N479",
    cmn: null,
    remit: null,
    serviceStatus: "S",
  },
  {
    id: "sample-row-6",
    payer: "TEST PAYER B",
    patientNumber: "TEST-006",
    hcpc: "A7030",
    dateOfService: "3/30/2026",
    endServiceDate: "3/30/2026",
    sentDate: "5/8/2026",
    xmit: 1,
    denialDate: null,
    denialCode: null,
    denialCode2: null,
    denialCode3: null,
    rm1: null,
    cmn: null,
    remit: null,
    serviceStatus: "S",
  },
];