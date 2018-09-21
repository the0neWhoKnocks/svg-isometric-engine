import log, {
  BLACK_ON_GRAY,
  BLACK_ON_GREEN,
} from 'UTILS/logger';

function reducerLogger(type) {
  let setLabel = 'SET', setArgs;

  if(arguments.length > 1){
    if(arguments.length === 3){
      setLabel = arguments[1];
      setArgs = arguments[2];
    }
    else{
      setArgs = arguments[1];
    }
  }

  if( !/INIT|@@redux/.test(type) ){
    log(`${ BLACK_ON_GREEN } REDUCER`, type);
    if(setArgs) log('  ', `${ BLACK_ON_GRAY } ${ setLabel }`, ...setArgs);
  }
}

export default reducerLogger;
