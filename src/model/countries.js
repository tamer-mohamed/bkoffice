import { pushData, update,getData, removeData} from './data';
import { addTranslation } from './translation';

const DATA_REF = 'countries';

export function pushCountry(data){
  console.log(`Pushing ${DATA_REF}`, data);
  let id = pushData(DATA_REF, data);
  addTranslation(`${DATA_REF}/${id}`, data);

  return id;
}

export function loadCountry(id){
  return getData(`${DATA_REF}/${id}`);
}


export function loadCountries(){
  return getData(DATA_REF);
}

export function removeCountry(id){
  return removeData(`${DATA_REF}/${id}`);
}


export function updateCountry(id, values){
  return update(`${DATA_REF}/${id}`, values);
}