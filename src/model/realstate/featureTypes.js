import { pushData, update,getData, removeData} from '../data';
import { addTranslation } from '../translation';

const DATA_REF = 'feature-types';


export function loadFeatureTypes(id){
  return getData(`${DATA_REF}/${id}`);
}


export function removeFeatureTypes(id){
  return removeData(`${DATA_REF}/${id}`);
}


export function updateFeatureTypes(id, values){
  return update(`${DATA_REF}/${id}`, values);
}