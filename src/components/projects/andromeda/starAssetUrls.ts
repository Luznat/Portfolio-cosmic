import starConst1 from '../../../shared/assets/images/Estrela-const1.svg?url'
import starConst2 from '../../../shared/assets/images/Estrela-const2.svg?url'
import starConst3 from '../../../shared/assets/images/Estrela-const3.svg?url'
import starProject from '../../../shared/assets/images/Estrela-projeto.svg?url'

import type { SatelliteVariant } from '../../../content/featuredProjects'

export const STAR_PROJECT_URL = starProject

export function satelliteAssetUrl(variant: SatelliteVariant): string {
  switch (variant) {
    case 1:
      return starConst1
    case 2:
      return starConst2
    case 3:
      return starConst3
    default:
      return starConst1
  }
}
