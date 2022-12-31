import React from 'react';
import {Route, Routes} from 'react-router-dom';
import MainApp from './route/mainApp/MainApp';
import Auth from './route/auth/Auth';
import TodoScreen from './route/todo/TodoScreen';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainApp />} />
      <Route path='/auth' element={<Auth /> } />
      <Route path='/todo' element={<TodoScreen />} />
    </Routes>
  );
}

export default App;
