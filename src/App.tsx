import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {Route, Routes} from 'react-router-dom';
import MainApp from './route/mainApp/MainApp';
import Auth from './route/auth/Auth';
import TodoScreen from './route/todo/TodoScreen';

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<MainApp />} />
          <Route path='/auth' element={<Auth /> } />
          <Route path='/todo' element={<TodoScreen />} />
        </Routes>
      </QueryClientProvider>
  );
}

export default App;
