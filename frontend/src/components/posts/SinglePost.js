import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Avatar,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { AiTwotoneHeart, AiOutlineHeart, AiFillDelete } from "react-icons/ai";
import { Link as routerLink } from "react-router-dom";

const SinglePost = ({ post }) => {
  const [user, setUser] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    // Simulate fetching user data
    setUserLoading(true);
    setTimeout(() => {
      setUser({ username: "ExampleUser" }); // Replace with actual user data
      setUserLoading(false);
    }, 1000);
  }, []);

  const toggleLike = () => {
    if (isLoading) return;
    setIsLoading(true);

    // Simulate toggling the like
    setTimeout(() => {
      setIsLiked(!isLiked);
      setIsLoading(false);
    }, 1000);
  };

  const deletePost = () => {
    if (deleteLoading) return;
    setDeleteLoading(true);

    // Simulate post deletion
    setTimeout(() => {
      // Handle post deletion logic here
      setDeleteLoading(false);
    }, 1000);
  };

  return (
    <>
      <Box w="100%" key={post.id}>
        <Box borderRadius="lg" overflow="hidden">
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            <Image
              transform="scale(1.0)"
              src={post.imageUrl}
              alt="some text"
              width="100%"
              objectFit="cover"
              height={"400px"}
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
            />
          </Link>
        </Box>
        <Heading fontSize="xl" marginTop="2">
          <Link
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            as={routerLink}
            to={`/posts/${post?.id}`}
          >
            {post.title}
          </Link>
        </Heading>
        <Text as="p" fontSize="md" marginTop="2">
          {post.content.substring(0, 150)}...
        </Text>
        <Box mt={"10px"}>
          <Flex align={"center"}>
            <Avatar name={user?.username} size={"sm"} />
            <Text casing={"capitalize"}>
              <span style={{ paddingLeft: "10px" }}>
                {/* {formatDistanceToNow(post.date)}  */}
                hours ago
              </span>
            </Text>
            <IconButton
              colorScheme="red"
              onClick={toggleLike}
              isLoading={userLoading || isLoading}
              size="md"
              icon={isLiked ? <AiTwotoneHeart /> : <AiOutlineHeart />}
              isRound
              variant="ghost"
            />
            <Text> {post.likes.length}</Text>
            {!userLoading && user?.id === post.uid && (
              <IconButton
                colorScheme="red"
                size="lg"
                icon={<AiFillDelete />}
                isRound
                onClick={deletePost}
                isLoading={deleteLoading}
                variant="ghost"
              />
            )}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default SinglePost;
