// App.jsx
import { RouterProvider } from 'react-router-dom';
import { Global } from '@emotion/react';
import { globalStyles } from './style/global';
import router from './routes/router';
import { Suspense } from 'react';
import Loading from './components/common/Loading';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
