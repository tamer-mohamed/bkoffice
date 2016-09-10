import { pushData, update,getData, removeData} from '../data';
import { addTranslation } from '../translation';

const DATA_REF = 'features';

export function pushFeature(data){
  console.log(`Pushing ${DATA_REF}`, data);
  let id = pushData(DATA_REF, data);
  addTranslation(`${DATA_REF}/${id}`, {name: data.name});

  return id;
}

export function loadFeature(id){
  return getData(`${DATA_REF}/${id}`);
}


export function loadFeatures(){
  return getData(DATA_REF);
}

export function removeFeature(id){
  return removeData(`${DATA_REF}/${id}`);
}


export function updateFeature(id, values){
  return update(`${DATA_REF}/${id}`, values);
}