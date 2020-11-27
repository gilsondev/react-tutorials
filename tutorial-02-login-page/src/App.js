import {
  Box,
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import LoginForm from "./components/LoginForm";
import ThemeToggler from "./components/ThemeToggler";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ThemeToggler />
      <LoginForm />
    </ChakraProvider>
  );
}

export default App;
