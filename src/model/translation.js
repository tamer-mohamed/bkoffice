import { pushData, update,addData, removeData} from './data';
import _ from 'lodash';

const langs = ['ar', 'en'];
const defaultLang = 'en';

export function addTranslation(ref, data){
  console.log('adding translation for default lang', defaultLang);
  addData(`translations/${ref}/${defaultLang}`, data);
}

export function updateTranslation(ref, data){
  console.log('updating translation for default lang', defaultLang);
  return update(`translations/${ref}/${defaultLang}`, data);
}


export function removeTranslation(ref, data){
  console.log('removing translation for default lang', defaultLang);
  return removeData(`translations/${ref}`, data);
}
