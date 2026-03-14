import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import ActorItem from '../Actors/ActorItem';
import { getActorsAsync } from './../../store/slices/actorsSlices';
import { Link } from 'react-router-dom';

function ActorsList () {
  const dispatch = useDispatch();
  const userActors = useSelector(state => state.actorsList.actors);

  useEffect(() => {
    dispatch(getActorsAsync());
  }, [dispatch]);

  return (
    // <div >
    //   {userActors.map(item => (
    //     <ActorItem key={item.id} actor={item} />
    //   ))}

    // </div>
    <ul>
      {userActors.map(item => (
        <li key={item.id}>
          <Link to={`${item.id}`} />
          {/* <span>{item.fullname}</span> */}
          <ActorItem key={item.id} actor={item} />
        </li>
      ))}
    </ul>
  );
}

export default ActorsList;
