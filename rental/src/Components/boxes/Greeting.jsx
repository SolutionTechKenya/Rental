import React from 'react';
import { useAuth } from '../admin/AuthProvider'; // Adjust import as necessary
import '../../css/boxes/Greeting.css'; // Adjust path as necessary

const Greeting = () => {
  const { user } = useAuth(); // Assuming `useAuth` provides the user object
  const currentHour = new Date().getHours();
  let greeting;

  // Determine greeting based on the current time
  if (currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  return (
    <div className="greeting">
      <span>{`${greeting}, ${user?.username || 'Guest'}!`}</span>
    </div>
  );
};

export default Greeting;
