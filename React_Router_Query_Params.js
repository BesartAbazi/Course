import { useSearchParams } from 'react-router-dom';

// Rendered when a user visits "/list?order=DESC"
export const SortedList = (numberList) => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const sortOrder = searchParams.get('order');
  console.log(sortOrder); // Prints "DESC"
};




import { useSearchParams } from 'react-router-dom';

// Rendered when a user visits "/list"
export const List = (numberList) => {
  const [ searchParams, setSearchParams ] = useSearchParams();

  // render the numberList in ascending order
  <button click={ () => setSearchParams( {order: 'ASC'} ) }>
    Sort 
  </button>
}



For example, if we wanted to directly navigate to /list?order=ASC from the root (/) path we’d do something like this:
import { useNavigate, createSearchParams } from 'react-router-dom';
// get navigate function
const navigate = useNavigate();

// define an object where the key is is the query parameter name and value is query parameter value
const searchQueryParams = {
  order: 'ASC'
}

// use createSearchParams which takes an object and transforms it to a query string of the form order=ASC
const searchQueryString = createSearchParams(searchQueryParams);

// force a navigate by passing in an object with pathname indicating that path to navigate and search indicating the query parameters to append
navigate({
  pathname:'/list',
  search: `?${searchQueryString}`
})
