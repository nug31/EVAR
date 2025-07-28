import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import SimpleHome from './pages/SimpleHome';
import ARShowroom from './pages/ARShowroom';
import Specs from './pages/Specs';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Header />
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<SimpleHome />} />
                <Route path="/showroom" element={<ARShowroom />} />
                <Route path="/specs" element={<Specs />} />
              </Routes>
            </ErrorBoundary>
          </div>
        </Router>
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;