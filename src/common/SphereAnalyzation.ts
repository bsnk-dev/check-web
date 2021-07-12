import {Alliance} from './types';

export interface SphereStatistics {
  name: string;

  soldiers: number;
  tanks: number;
  aircraft: number;
  ships: number;

  totalScore: number;
  nationCount: number;

  militarization: Militarization;

  includedAlliances: Alliance[];
}

export interface Militarization {
  [key: string]: number[];
  total: number[];
  soldiers: number[];
  tanks: number[];
  aircraft: number[];
  ships: number[];
}

export interface MilitarizationMap {
  [key: string]: number[][];
  total: number[][];
  soldiers: number[][];
  tanks: number[][];
  aircraft: number[][];
  ships: number[][];
}
