/*

	The rules of reducers provided by the Redux documentation:

	1. They should only calculate the new state value based on the state and action arguments.
	2. They are not allowed to modify the existing state. Instead, they must copy the existing state and make changes to the copied values.
	3. They must not do any asynchronous logic or have other “side effects”.

*/

// Define reducer here

const reducer = (state, action) => {
  switch(action.type){
    case 'songs/addSong':{
      return [...state, action.payload];
    }
    case 'songs/removeSong':{
      return state.filter((song) => {
        return song !== action.payload
      });
    }
    default: {
      return state
    };
  }
}

const actionAddNewSong = {
  type: 'songs/addSong',
  payload: 'Halo'
};

const actionRemoveSong = {
  type: 'songs/removeSong',
  payload: 'Take Five'
};

const actionRemoveAll = {
  type: 'songs/removeAll'
}

const sate = [ 'Take Five', 'Claire de Lune', 'Respect' ];

const newState = reducer(state, actionAddNewSong);
const newState2 = reducer(state, actionRemoveSong);
const newState2 = reducer(state, actionRemoveAll);
