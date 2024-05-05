import { useEffect } from 'react'
// import { useState } from 'react'

// Hooks
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// Components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home =() => {
    // const [workouts, setWorkouts] = useState(null);
    const {workouts, dispatch} = useWorkoutsContext();
    const { user } = useAuthContext();

    // Rendered only once when the page is loaded
    useEffect(() => {
        const fetchWorkouts = async() => {
            const response = await fetch('/api/workouts',{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok){
                // setWorkouts(json);
                dispatch({type: "SET_WORKOUTS", payload: json});
            }
        }
        if(user){
            fetchWorkouts();
        }
    },[dispatch, user])

    return (
        <div className="home">
            <div className='workouts'>
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;