import * as migration_20260925_055444_initial from './20260925_055444_initial';
import * as migration_20260928_165510_video from './20260928_165510_video';

export const migrations = [
  {
    up: migration_20260925_055444_initial.up,
    down: migration_20260925_055444_initial.down,
    name: '20260925_055444_initial',
  },
  {
    up: migration_20260928_165510_video.up,
    down: migration_20260928_165510_video.down,
    name: '20260928_165510_video'
  },
];
