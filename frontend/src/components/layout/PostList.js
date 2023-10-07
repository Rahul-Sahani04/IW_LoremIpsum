import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import SinglePost from "../posts/SinglePost";

// Simulate data fetching with a delay
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Sample Post 1",
          content: "This is the content of the first post.",
          imageUrl: "https://example.com/sample-image.jpg",
          date: "2023-10-15T12:30:00Z", // Date in ISO 8601 format
          likes: [1, 2, 3], // User IDs who have liked the post
          uid: 4,
        },
        {
          id: 2,
          title: "Sample Post 2",
          content: "This is the content of the second post.",
          imageUrl: "https://example.com/sample-image.jpg",
          date: "2023-10-15T12:30:00Z", // Date in ISO 8601 format
          likes: [1, 2, 3], // User IDs who have liked the post
          uid: 4,
        },
        {
          id: 3,
          title: "Sample Post 3",
          content: "This is the content of the third post.",
          imageUrl: "https://example.com/sample-image.jpg",
          date: "2023-10-15T12:30:00Z", // Date in ISO 8601 format
          likes: [1, 2, 3], // User IDs who have liked the post
          uid: 4,
        },
      ]);
    }, 2000);
  });
};

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData().then((data) => {
      setPosts(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <Box pos="absolute" top="50%" left="50%">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h2" marginTop="5">
        Latest articles
      </Heading>
      <Divider marginTop="5" />
      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 2fr))"
        gap={6}
        marginTop="5"
      >
        {posts.map((post) => (
          <GridItem key={post.id}>
            <motion.div layout>
              <SinglePost post={post} />
            </motion.div>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}
