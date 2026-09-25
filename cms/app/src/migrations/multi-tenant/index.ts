import * as migration_20260925_055447_initial from './20260925_055447_initial';

export const migrations = [
  {
    up: migration_20260925_055447_initial.up,
    down: migration_20260925_055447_initial.down,
    name: '20260925_055447_initial'
  },
];
