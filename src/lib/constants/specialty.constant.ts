const specialties = [
  "L3 SI",
  "L3 ISIL",
  "M2 SIGL",
  "M2 IDO",
  "M2 IA",
  "M2 RTIC",
] as const;

export default specialties;
export type Specialty = (typeof specialties)[number];
