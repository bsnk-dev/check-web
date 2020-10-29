export interface Alliance {
  id: number;
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

  allDataPoints: any;
}

export interface Database {
  alliances: Array<Alliance>;
  date: number;
}

export interface Dataset {
  label: string;
  data: Array<number>;
  borderColor: string;
  filled?: boolean;
}

export interface ChartData {
  labels: Array<string>;
  datasets: Array<Dataset>;
}
