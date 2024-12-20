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




Switching between different remote repository URLs in Git is straightforward and involves updating the URL of the remote. Here’s how you can manage this:

---

### **1. Check Current Remotes**
Run the following command to see the current remote URLs associated with your repository:
```bash
git remote -v
```
Example output:
```
origin  https://github.com/user/repo.git (fetch)
origin  https://github.com/user/repo.git (push)
```

---

### **2. Change the Remote URL**
If you want to switch to a different remote repository URL, use:
```bash
git remote set-url origin <new-url>
```
Replace `<new-url>` with the URL of the new remote repository.

Example:
```bash
git remote set-url origin https://github.com/another-user/another-repo.git
```

After setting the new URL, verify it:
```bash
git remote -v
```
This will show the updated remote repository URLs.

---

### **3. Add Multiple Remotes (Optional)**
If you want to work with multiple remotes, you can add another remote with a different name:
```bash
git remote add <remote-name> <remote-url>
```

Example:
```bash
git remote add upstream https://github.com/another-user/another-repo.git
```

You can now push or fetch from the new remote using its name:
```bash
git fetch upstream
git push upstream branch-name
```

---

### **4. Switch Between Remote Repositories**
To switch between remotes, simply use their names when pushing or pulling:
```bash
git push origin branch-name
git push upstream branch-name
```

---

### **5. Remove an Unused Remote (Optional)**
If you no longer need a remote, remove it:
```bash
git remote remove <remote-name>
```

Example:
```bash
git remote remove upstream
```

---

### **Summary Commands**
| **Task**                           | **Command**                                           |
|-------------------------------------|-------------------------------------------------------|
| Check current remotes               | `git remote -v`                                       |
| Change URL of a remote              | `git remote set-url origin <new-url>`                |
| Add a new remote                    | `git remote add <remote-name> <remote-url>`          |
| Remove a remote                     | `git remote remove <remote-name>`                    |
| Push to a specific remote           | `git push <remote-name> branch-name`                 |

Let me know if you'd like help with more advanced setups, such as syncing branches between remotes!



