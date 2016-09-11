import { pushData, update,getData, removeData} from '../data';
import { addTranslation } from '../translation';

const DATA_REF = 'location-types';


export function loadLocationTypes(id){
  return getData(`${DATA_REF}/${id}`);
}


export function removeLocationTypes(id){
  return removeData(`${DATA_REF}/${id}`);
}


export function updateLocationTypes(id, values){
  return update(`${DATA_REF}/${id}`, values);
}