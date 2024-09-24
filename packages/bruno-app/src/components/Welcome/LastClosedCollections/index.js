
import { useDispatch, useSelector } from 'react-redux';


const LastClosedCollections = () => {
  const preferences = useSelector((state) => state.app.preferences);
  const dispatch = useDispatch();



  return (
      <div>
          <p>Last closed collections</p>

          ${(preferences.lastClosedCollections || []).map((p) => (<p>${p}</p>))}

      </div>
  );

}


export default LastClosedCollections;