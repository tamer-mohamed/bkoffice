import { pushData, update,getData, removeData} from './data';
import { addTranslation } from './translation';

const DATA_REF = 'areas';

export function pushArea(data){
  console.log(`Pushing ${DATA_REF}`, data);
  let id = pushData(DATA_REF, data);
  addTranslation(`${DATA_REF}/${id}`, data);

  return id;
}

export function loadArea(id){
  return getData(`${DATA_REF}/${id}`);
}


export function loadAreas(){
  return getData(DATA_REF);
}

export function removeArea(id){
  return removeData(`${DATA_REF}/${id}`);
}


export function updateArea(id, values){
  return update(`${DATA_REF}/${id}`, values);
}