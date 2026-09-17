import * as migration_20260917_204853_initial from './20260917_204853_initial';

export const migrations = [
  {
    up: migration_20260917_204853_initial.up,
    down: migration_20260917_204853_initial.down,
    name: '20260917_204853_initial'
  },
];
