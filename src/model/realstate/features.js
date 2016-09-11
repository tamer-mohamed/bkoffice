import { pushData, update,getData, removeData} from '../data';
import { addTranslation,updateTranslation,removeTranslation } from '../translation';
import q from 'q';

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
  let defer = q.defer();

  removeData(`${DATA_REF}/${id}`)
      .then(() => removeTranslation(`${DATA_REF}/${id}`)
          .then(() => defer.resolve())
          .catch(e => defer.reject(e)))
      .catch(e => defer.reject());

  return defer.promise;
}


export function updateFeature(id, data){
  let defer = q.defer();
  update(`${DATA_REF}/${id}`, data)
      .then(() => updateTranslation(`${DATA_REF}/${id}`, {name: data.name})
          .then(() => defer.resolve())
          .catch(e => defer.reject(e)))
      .catch(e => defer.reject());
  return defer.promise;
}