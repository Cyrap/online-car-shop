import React from 'react';
import './App.css';
import FirebaseProvider from './config/FirebaseContext';
import Auth from './components/Auth';
import UserProvider from './config/UserProvider';
function App() {
  return (
    <FirebaseProvider>
      <UserProvider>
        <div>
          <Auth/>
        </div>
      </UserProvider>
    </FirebaseProvider>
  );
}

export default App;
