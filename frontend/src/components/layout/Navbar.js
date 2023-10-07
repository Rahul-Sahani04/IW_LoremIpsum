import React, { useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Stack,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Tooltip,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { RiLogoutCircleLine } from "react-icons/ri";
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { Link as routerLink } from "react-router-dom";
import Newpost from "../posts/NewPost";

function Navbar() {
  const [colorMode, setColorMode] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  const onMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const onMenuClose = () => {
    setIsMenuOpen(false);
  };

  const onModalOpen = () => {
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const logout = () => {
    // Handle logout logic here
  };

  const Links = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/login", name: "Sign in" },
    { id: 3, path: "/register", name: "Create an account" },
  ];

  return (
    <Container maxW="1300px">
      <Box bg="gray.100" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isMenuOpen ? onMenuClose : onMenuOpen}
          />
          <HStack spacing={8} alignItems="center">
            <Box as="b" fontSize="2xl">
              <Link
                as={routerLink}
                to="/"
                _hover={{
                  textDecoration: "none",
                }}
              >
                Logo
              </Link>
            </Box>

            <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
              {!user ? (
                Links.map((link) => (
                  <Link
                    px={2}
                    py={1}
                    as={routerLink}
                    to={link.path}
                    rounded="md"
                    _hover={{
                      textDecoration: "none",
                      bg: "gray.200",
                    }}
                    key={link.id}
                  >
                    {link.name}
                  </Link>
                ))
              ) : (
                <Link
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  Glad you're here!😍
                </Link>
              )}
            </HStack>
          </HStack>
          <Flex alignItems="center">
            <Button mr={4} onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            {user ? (
              <Button
                variant="solid"
                colorScheme="teal"
                size="sm"
                mr={4}
                onClick={onModalOpen}
                leftIcon={<AddIcon />}
              >
                Create Post
              </Button>
            ) : (
              <Tooltip label="Activate me, captain! Login required">
                <Button
                  variant="solid"
                  colorScheme="teal"
                  isDisabled={true}
                  size="sm"
                  mr={4}
                  onClick={onModalOpen}
                  leftIcon={<AddIcon />}
                >
                  Action
                </Button>
              </Tooltip>
            )}
            {/* Modal */}
            <Modal
              closeOnOverlayClick={false}
              isOpen={isModalOpen}
              onClose={onModalClose}
              size="xl"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody pb={12}>
                  <Newpost onModalClose={onModalClose} />
                </ModalBody>
              </ModalContent>
            </Modal>
            {/* Modal end */}
            {user && (
              <Button
                ml="auto"
                colorScheme="teal"
                size="sm"
                onClick={logout}
                isLoading={authLoading}
              >
                <Icon as={RiLogoutCircleLine} />
              </Button>
            )}
          </Flex>
        </Flex>

        {isMenuOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4}>
              {!user ? (
                Links.map((link) => (
                  <Link
                    px={2}
                    py={1}
                    as={routerLink}
                    to={link.path}
                    rounded="md"
                    _hover={{
                      textDecoration: "none",
                      bg: "gray.200",
                    }}
                    key={link.id}
                  >
                    {link.name}
                  </Link>
                ))
              ) : (
                <Link
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  Glad you're here!😍
                </Link>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Container>
  );
}

export default Navbar;
