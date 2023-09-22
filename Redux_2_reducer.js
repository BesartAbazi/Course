const initialWagonState = {
  supplies: 100,
  distance: 0,
  days: 0,
  cash: 200
}

const reducer = (state = initialWagonState, action) => {
  switch(action.type){
    case 'gather': {
      return {
        ...state,
        supplies: state.supplies + 15,
        distance: state.distance,
        days: ++state.days
      }
    }
    case 'travel': {
      if (state.supplies - 20 * action.payload >= 0){
        return {
          ...state,
          supplies: state.supplies - 20 * action.payload,
          distance: state.distance + 10 * action.payload,
          days: state.days + action.payload
        }
      }
      else{
        return state;
      }
    }
    case 'tippedWagon': {
      return {
        ...state,
        supplies: state.supplies - 30,
        distance: state.distance,
        days: ++state.days
      }
    }
    case 'cell': {
      return {
        ...state,
        supplies: state.supplies - 20,
        distance: state.distance,
        days: state.days,
        cash: state.cash + 5
      }
    }
    case 'buy': {
      return {
        ...state,
        supplies: state.supplies + 25,
        distance: state.distance,
        days: state.days,
        cash: state.cash - 15
      }
    }
    case 'theft': {
      return {
        ...state,
        supplies: state.supplies,
        distance: state.distance,
        days: state.days,
        cash: state.cash / 2
      }
    }
    default: {
      return state;
    }
  }
}

let wagon = reducer(undefined, {type: ''});
console.log(wagon);

wagon = reducer(wagon, {type: 'travel', payload: 1});
console.log(wagon);

wagon = reducer(wagon, {type: 'gather', payload: 1});
console.log(wagon);

wagon = reducer(wagon, {type: 'tippedWagon'});
console.log(wagon);

wagon = reducer(wagon, {type: 'travel', payload: 3});
console.log(wagon);

wagon = reducer(wagon, {type: 'buy'});
console.log(wagon);