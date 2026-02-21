export type SensorCategory = 'CONVENCIONAL' | 'INVERTER' | 'GENERAL';

export interface SensorValue {
  label: string;
  resistance: string;
  category: SensorCategory;
  notes?: string;
}

export interface SensorData {
  brand: string;
  type: 'AC' | 'REF' | 'BOTH';
  values: SensorValue[];
}

export const SENSOR_DATABASE: SensorData[] = [
  {
    brand: "Samsung",
    type: "BOTH",
    values: [
      { label: "Ar Condicionado (Ambiente/Evap)", resistance: "10k", category: "CONVENCIONAL" },
      { label: "Evaporadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Descarga)", resistance: "50k", category: "INVERTER" },
      { label: "Geladeira (Degelo/Ambiente)", resistance: "5k", category: "GENERAL" }
    ]
  },
  {
    brand: "LG",
    type: "BOTH",
    values: [
      { label: "Ar Condicionado (Ambiente/Evap)", resistance: "10k", category: "CONVENCIONAL" },
      { label: "Evaporadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Descarga)", resistance: "200k", category: "INVERTER" },
      { label: "Geladeira", resistance: "10k", category: "GENERAL" }
    ]
  },
  {
    brand: "Carrier / Midea / Springer",
    type: "AC",
    values: [
      { label: "Ambiente/Evap", resistance: "10k", category: "CONVENCIONAL" },
      { label: "Evaporadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Descarga)", resistance: "50k", category: "INVERTER" }
    ]
  },
  {
    brand: "Agratto",
    type: "AC",
    values: [
      { label: "Ambiente/Evap", resistance: "5k", category: "CONVENCIONAL" },
      { label: "Evaporadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Descarga)", resistance: "50k", category: "INVERTER" }
    ]
  },
  {
    brand: "TCL",
    type: "AC",
    values: [
      { label: "Ambiente/Evap", resistance: "5k", category: "CONVENCIONAL" },
      { label: "Evaporadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Descarga)", resistance: "50k", category: "INVERTER" }
    ]
  },
  {
    brand: "Philco / Britânia",
    type: "AC",
    values: [
      { label: "Ambiente/Evap", resistance: "5k", category: "CONVENCIONAL" },
      { label: "Evaporadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Descarga)", resistance: "50k", category: "INVERTER" }
    ]
  },
  {
    brand: "Consul / Brastemp",
    type: "BOTH",
    values: [
      { label: "Ar Condicionado", resistance: "10k", category: "CONVENCIONAL" },
      { label: "Evaporadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Descarga)", resistance: "50k", category: "INVERTER" },
      { label: "Geladeira (Ambiente/Degelo)", resistance: "2.7k", category: "GENERAL", notes: "Modelos Antigos" },
      { label: "Geladeira (Ambiente/Degelo)", resistance: "5k", category: "GENERAL", notes: "Modelos Novos" }
    ]
  },
  {
    brand: "Gree",
    type: "AC",
    values: [
      { label: "Ambiente", resistance: "15k", category: "CONVENCIONAL" },
      { label: "Tubo", resistance: "20k", category: "CONVENCIONAL" },
      { label: "Evaporadora (Ambiente)", resistance: "15k", category: "INVERTER" },
      { label: "Evaporadora (Tubo)", resistance: "20k", category: "INVERTER" },
      { label: "Condensadora (Ambiente/Tubo)", resistance: "15k", category: "INVERTER" },
      { label: "Condensadora (Descarga)", resistance: "50k", category: "INVERTER" }
    ]
  },
  {
    brand: "Fujitsu",
    type: "AC",
    values: [
      { label: "Evaporadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Descarga)", resistance: "50k", category: "INVERTER" }
    ]
  },
  {
    brand: "Electrolux",
    type: "BOTH",
    values: [
      { label: "Ar Condicionado", resistance: "10k", category: "CONVENCIONAL" },
      { label: "Evaporadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Descarga)", resistance: "50k", category: "INVERTER" },
      { label: "Geladeira (Ambiente/Degelo)", resistance: "5k", category: "GENERAL" },
      { label: "Geladeira (DF42/DF51 etc)", resistance: "10k", category: "GENERAL" }
    ]
  },
  {
    brand: "Daikin",
    type: "AC",
    values: [
      { label: "Evaporadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Descarga)", resistance: "20k", category: "INVERTER" }
    ]
  },
  {
    brand: "York",
    type: "AC",
    values: [
      { label: "Ambiente/Tubo", resistance: "15k", category: "CONVENCIONAL" },
      { label: "Evaporadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Descarga)", resistance: "50k", category: "INVERTER" }
    ]
  },
  {
    brand: "Panasonic",
    type: "BOTH",
    values: [
      { label: "Ar Condicionado (Ambiente/Tubo)", resistance: "15k", category: "INVERTER" },
      { label: "Condensadora (Descarga)", resistance: "50k", category: "INVERTER" },
      { label: "Geladeira", resistance: "2k", category: "GENERAL" }
    ]
  },
  {
    brand: "Hitachi",
    type: "AC",
    values: [
      { label: "Ambiente/Tubo", resistance: "10k", category: "CONVENCIONAL" },
      { label: "Evaporadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Descarga)", resistance: "50k", category: "INVERTER" }
    ]
  },
  {
    brand: "Elgin",
    type: "AC",
    values: [
      { label: "Ambiente/Tubo", resistance: "10k", category: "CONVENCIONAL" },
      { label: "Evaporadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Ambiente/Tubo)", resistance: "10k", category: "INVERTER" },
      { label: "Condensadora (Descarga)", resistance: "50k", category: "INVERTER" }
    ]
  }
];

export const TEMPERATURE_TABLE = [
  { temp: 0, r5k: 16.3, r10k: 32.7, r15k: 49.1, r20k: 65.3 },
  { temp: 5, r5k: 12.7, r10k: 25.4, r15k: 38.1, r20k: 50.8 },
  { temp: 10, r5k: 10.0, r10k: 19.9, r15k: 29.9, r20k: 39.8 },
  { temp: 15, r5k: 7.9, r10k: 15.7, r15k: 23.6, r20k: 31.4 },
  { temp: 20, r5k: 6.3, r10k: 12.5, r15k: 18.7, r20k: 25.0 },
  { temp: 25, r5k: 5.0, r10k: 10.0, r15k: 15.0, r20k: 20.0 },
  { temp: 30, r5k: 4.0, r10k: 8.1, r15k: 12.1, r20k: 16.1 },
  { temp: 35, r5k: 3.2, r10k: 6.5, r15k: 9.8, r20k: 13.0 },
  { temp: 40, r5k: 2.6, r10k: 5.3, r15k: 8.0, r20k: 10.6 },
  { temp: 45, r5k: 2.1, r10k: 4.3, r15k: 6.5, r20k: 8.7 },
  { temp: 50, r5k: 1.8, r10k: 3.5, r15k: 5.3, r20k: 7.1 }
];
