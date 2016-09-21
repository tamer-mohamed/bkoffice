import { pushData, update,addData,getData, removeData} from './data';
import _ from 'lodash';
import q from 'q';

const langs = ['ar', 'en'];
const defaultLang = 'en';

export function getTranslationKeywords(entityId, fields){

  let promise = q.defer();
  getData(`${entityId}`)
      .then((snap) =>{
        let records = Object.keys(snap.val()).map(
            (k) =>{
              let originalRecord = snap.val()[k];
              let filteredData = {};
              _.forEach(fields, (v, k) =>{
                filteredData[v] = originalRecord[v];
              });

              return filteredData
            }
        );
        promise.resolve(records);
      })
      .catch(() =>{

      });

  console.log('fetch translation keywords');
  return promise.promise;
}

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
