import * as migration_20260917_204851_initial from './20260917_204851_initial';

export const migrations = [
  {
    up: migration_20260917_204851_initial.up,
    down: migration_20260917_204851_initial.down,
    name: '20260917_204851_initial'
  },
];
