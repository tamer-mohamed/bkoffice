import { pushData, update,getData, removeData} from './data';
import { addTranslation } from './translation';

const DATA_REF = 'location-areas';

export function pushLocationAreas(data){
  console.log(`Pushing ${DATA_REF}`, data);
  let id = pushData(DATA_REF, data);

  return id;
}

export function loadLocationAreas(id){
  return getData(`${DATA_REF}/${id}`);
}


export function loadLocationAreas(){
  return getData(DATA_REF);
}

export function remove(locationId, areaId){
  let ref;
  if(areaId)
    ref = `${DATA_REF}/${locationId}/${areaId}`;
  else
    ref = `${DATA_REF}/${locationId}`;

  return removeData(ref);
}


export function updateLocationAreas(id, values){
  return update(`${DATA_REF}/${id}`, values);
}