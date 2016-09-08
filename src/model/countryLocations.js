import { pushData,update,addData,getData,removeData} from './data';


export function push(data){
  return pushData('location-areas', data);
}

export function setCountryLocations(id, data){

  console.log('Setting Locations for country', data);
  return addData(`country-locations/${id}`, data);
}

export function remove(locationId, areaId){
  let ref;
  if(areaId)
    ref = `country-locations/${locationId}/${areaId}`;
  else
    ref = `country-locations/${locationId}`;

  return removeData(ref);
}

export function load(locationId){
  console.log('load location areas for location', locationId);
  return getData(`country-locations/${locationId}`);
}