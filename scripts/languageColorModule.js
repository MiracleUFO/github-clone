import { palette } from '../seeders/palette.js';


export const languageColorModule = (repo) => {
  for (const [k, v] of Object.entries(palette)) {
    if (k === repo.node.primaryLanguage?.name)
    return v;
  }
}