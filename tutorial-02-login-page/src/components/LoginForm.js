import React, { useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import ErrorMessage from "./ErrorMessage";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const userLogin = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "email@mail.com" && password === "pass") {
        resolve();
      } else {
        reject();
      }
    }, 3000);
  });
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await userLogin({ email, password });
      setIsLogged(true);
    } catch (error) {
      setError("Invalid username or password");
      setEmail("");
      setPassword("");
    } finally {
      setShowPassword(false);
      setIsLoading(false);
    }

    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>

        <Box
          p={8}
          maxW="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          my={4}
          textAlign="left"
        >
          {isLogged ? (
            <Box textAlign="center">
              <Text>{email} logged in!</Text>
              <Button
                colorScheme="orange"
                variant="outline"
                width="full"
                mt={4}
                onClick={() => setIsLogged(false)}
              >
                Sign out
              </Button>
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <ErrorMessage message={error} />}
              <FormControl isRequired>
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="email"
                  placeholder="Digite seu e-mail"
                  onChange={({ currentTarget }) =>
                    setEmail(currentTarget.value)
                  }
                />
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite a senha"
                    onChange={({ currentTarget }) =>
                      setPassword(currentTarget.value)
                    }
                  />
                  <InputRightElement width="3rem">
                    <Button
                      h="1.5rem"
                      size="sm"
                      onClick={handlePasswordVisibility}
                      a
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                colorScheme="teal"
                variant="outline"
                width="full"
                mt={4}
                type="submit"
              >
                {isLoading ? (
                  <CircularProgress
                    isIndeterminate
                    size="24px"
                    color="green.600"
                  />
                ) : (
                  <Text>Entrar</Text>
                )}
              </Button>
            </form>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginForm;
