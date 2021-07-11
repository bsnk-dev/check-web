import {Nation} from './common/Nations';
import {Database, SphereConfiguration} from './common/types';

export default {
  alliancesData: {} as Database,
  spheres: {} as SphereConfiguration[],
  cachedNations: [] as Nation[],
};
