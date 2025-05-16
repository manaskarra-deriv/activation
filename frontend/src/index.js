import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Custom theme with Deriv brand colors
const theme = extendTheme({
  colors: {
    brand: {
      50: '#ffe6e6',
      100: '#ffcccc',
      200: '#ff9999',
      300: '#ff6666',
      400: '#ff3333',
      500: '#ff0000',  // Deriv red
      600: '#cc0000',
      700: '#990000',
      800: '#660000',
      900: '#330000',
    },
    accent: {
      500: '#ff0000',  // Deriv red
      600: '#cc0000',
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'full',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '600',
      },
    },
  },
  fonts: {
    heading: "'IBM Plex Sans', sans-serif",
    body: "'IBM Plex Sans', sans-serif",
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
); 