import * as migration_20260925_055447_initial from './20260925_055447_initial';
import * as migration_20260928_165509_video from './20260928_165509_video';

export const migrations = [
  {
    up: migration_20260925_055447_initial.up,
    down: migration_20260925_055447_initial.down,
    name: '20260925_055447_initial',
  },
  {
    up: migration_20260928_165509_video.up,
    down: migration_20260928_165509_video.down,
    name: '20260928_165509_video'
  },
];
