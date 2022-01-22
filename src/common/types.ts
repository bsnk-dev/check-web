export interface Alliance {
  id: string;
  name: string;
  alerts: {
    total: boolean;
    soldiers: boolean;
    tanks: boolean;
    planes: boolean;
    ships: boolean;
  };
  flag: string;
  rank: number;
  totalMembers: number;
  totalMilPercent: number;
  totalMilPercentPM: number;
  soldiersPercent: number;
  tanksPercent: number;
  planesPercent: number;
  shipsPercent: number;
  soldiersPercentPM: number;
  tanksPercentPM: number;
  planesPercentPM: number;
  shipsPercentPM: number;
  isPotentialHazard: boolean;

  score: number;

  soldiers: number;
  tanks: number;
  planes: number;
  ships: number;

  allDataPoints: {
    [key: string]: number[];
    total: number[];
    soldiers: number[];
    tanks: number[];
    planes: number[];
    ships: number[];
  };
  sphere?: string;
}

export interface Database {
  alliances: Array<Alliance>;
  date: number;
}

export interface Dataset {
  label: string;
  data: Array<number>;
  borderColor: string;
  fill?: boolean;
}

export interface ChartData {
  labels: Array<string>;
  datasets: Array<Dataset>;
}

export interface Sphere {
  name: string;
  alliances: Array<Alliance>;
}

export interface SphereConfiguration {
  name: string;
  alliances: Array<number>;
}

export interface BasicAllianceData {
  id: string;
  score: number;
}
