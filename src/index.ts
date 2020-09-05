import es5Strict from './es5-strict.json'
import es5 from './es5.json'
import latest from './latest.json'
import recommended from './recommended.json'
import { rules } from './rules'
import tsPrettier from './ts-prettier.json'
import tsRecommendedTypeCheck from './ts-recommended-requiring-type-checking.json'
import tsRecommended from './ts-recommended.json'

export = {
  configs: {
    es5,
    'es5-strict': es5Strict,
    latest,
    recommended,
    'ts-prettier': tsPrettier,
    'ts-recommended-requiring-type-checking': tsRecommendedTypeCheck,
    'ts-recommended': tsRecommended,
  },
  rules
}
