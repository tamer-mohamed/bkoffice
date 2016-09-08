import { pushData, update,getData, removeData} from './data';
import { addTranslation } from './translation';


export function push(data){
  console.log('Pushing location', data);
  let id = pushData('locations', data);
  addTranslation(`locations/${id}`, {name: data.name});

  return id;
}

export function loadLocation(locationId){
  return getData(`locations/${locationId}`);
}


export function loadLocations(){
  return getData('locations');
}

export function remove(locationId){
  return removeData(`locations/${locationId}`);
}


export function updateLocation(id, values){
  return update(`locations/${id}`, values);
}