import toRGBA from '@/utilities/toRGBA';

export const color = [
  'rgba(187, 96, 109, 0.8)',
  'rgba(177, 103, 135, 0.8)',
  'rgba(154, 115, 157, 0.8)',
  'rgba(121, 128, 170, 0.8)',
  'rgba(81, 139, 170, 0.8)',
  'rgba(42, 147, 158, 0.8)',
  'rgba(35, 153, 136, 0.8)',
  'rgba(67, 155, 109, 0.8)',
  'rgba(102, 154, 83, 0.8)',
  'rgba(137, 150, 62, 0.8)',
  'rgba(170, 142, 56, 0.8)',
];

export interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

export class ChartData implements ChartData {
  labels: string[] = [];
  datasets: Dataset[] = [];
}

export interface Dataset {
  label: string;
  data: (number | string | {x: string | number; y: string | number})[];
  lineTension: number;
  borderColor: string;
  backgroundColor: (string | string[]);
  fill: boolean;
  pointHitRadius: number;
  pointRadius: number;
}

export class Dataset implements Dataset {
  label = '';
  data: (number | string | {x: string | number; y: string | number})[] = [];
  lineTension = 0;
  borderColor = color[0];
  // eslint-disable-next-line
  // @ts-ignore
  backgroundColor = toRGBA(color[0], 0.3);
  fill = true;
  pointHitRadius = 5;
  pointRadius = 0;
}
