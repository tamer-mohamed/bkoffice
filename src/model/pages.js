import { pushData, update,getData, removeData} from './data';
import { addTranslation,updateTranslation,removeTranslation } from './translation';
import q from 'q';

const DATA_REF = 'pages';

export function pushPage(data){
  return pushData(DATA_REF, data);
}

export function loadPage(id){
  return getData(`${DATA_REF}/${id}`);
}


export function loadPages(){
  return getData(DATA_REF);
}

export function removePage(id){
  return removeData(`${DATA_REF}/${id}`);
}


export function updatePage(id, data){
  return update(`${DATA_REF}/${id}`, data);
}