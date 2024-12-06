1. **Install Node.js**  
   Download and install [Node.js](https://nodejs.org/).

2. **Install `create-react-app`**  
   Open a terminal and run:  
   ```bash
   npx create-react-app my-app
   ```

3. **Navigate to the App Folder**  
   ```bash
   cd my-app
   ```

4. **Start the Development Server**  
   ```bash
   npm start
   ```

This will open the app at `http://localhost:3000`.


1. **Install Node.js**  
   Download and install [Node.js](https://nodejs.org/).

2. **Install Expo CLI**  
   ```bash
   npm install -g expo-cli
   ```

3. **Create a New React Native App**  
   ```bash
   npx expo-cli init my-app
   ```

4. **Navigate to the App Folder**  
   ```bash
   cd my-app
   ```

5. **Start the Development Server**  
   ```bash
   npx expo start
   ```

6. **Run on Device/Simulator**  
   - Scan the QR code in the terminal using the Expo Go app (iOS/Android).  
   - Or use an emulator/simulator.

Use **React Router** for navigation:

1. **Install React Router**:  
   ```bash
   npm install react-router-dom
   ```

2. **Set Up Routes**:  
   In `App.js`:
   ```jsx
   import React from 'react';
   import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
   import Home from './Home';
   import About from './About';

   function App() {
     return (
       <Router>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
         </Routes>
       </Router>
     );
   }

   export default App;
   ```

3. **Create Pages**:  
   Example `Home.js`:
   ```jsx
   import React from 'react';
   import { Link } from 'react-router-dom';

   function Home() {
     return (
       <div>
         <h1>Home Page</h1>
         <Link to="/about">Go to About</Link>
       </div>
     );
   }

   export default Home;
   ```

   Example `About.js`:
   ```jsx
   import React from 'react';

   function About() {
     return <h1>About Page</h1>;
   }

   export default About;
   ```

Now, clicking the link will navigate between pages.



