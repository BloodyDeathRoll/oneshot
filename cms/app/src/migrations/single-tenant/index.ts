import * as migration_20260925_055444_initial from './20260925_055444_initial';

export const migrations = [
  {
    up: migration_20260925_055444_initial.up,
    down: migration_20260925_055444_initial.down,
    name: '20260925_055444_initial'
  },
];
