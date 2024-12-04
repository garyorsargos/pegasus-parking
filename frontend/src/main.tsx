import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from './components/ui/provider.tsx'
import { MessageProvider } from './context/messageContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </Provider>
  </StrictMode>,
)