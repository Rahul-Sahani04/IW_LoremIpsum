import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Textarea,
  useColorModeValue,
  FormHelperText,
} from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";

export default function SimpleCard({ onModalClose }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPost = (data) => {
    // Simulate the post adding process
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onModalClose();
    }, 2000);
  };

  return (
    <Flex minH={"40vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"90%"} minW={"90%"} py={12}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Add new post</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack>
            <form onSubmit={handleAddPost}>
              <FormControl id="title">
                <FormLabel>Blog Title</FormLabel>
                <Input type="text" required maxLength="120" />
                <FormHelperText>
                  Eg: The Art of Effective Communication
                </FormHelperText>
              </FormControl>
              <FormControl id="image">
                <FormLabel> Image URL</FormLabel>
                <Input type="url" required />
                <FormHelperText>
                  <Link
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "https://picsum.photos/200/300/"
                      );
                      // Simulate a toast message
                      alert("URL Copied");
                    }}
                  >
                    Eg: https://picsum.photos/200/300/
                  </Link>
                  <div>
                    <Text as="mark">Copy image link by click</Text>
                  </div>
                </FormHelperText>
              </FormControl>
              <FormControl id="desc">
                <FormLabel> Description</FormLabel>
                <Textarea
                  placeholder='I know writing can be tough, Just type "blah blah blah" to test things out!'
                  as={TextareaAutosize}
                  minRows={5}
                  resize={"none"}
                  required
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  mt={"10px"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  isLoading={isLoading}
                  loadingText={"Loading..."}
                >
                  Hit the Big Blue Button! POST
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
