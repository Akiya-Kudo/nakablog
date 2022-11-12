import { AspectRatio, Box, Center, Divider, Grid, GridItem, Heading, HStack, LinkBox, LinkOverlay, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import {  Thumbnail } from '../types/MicroCms';

import sanitizeHtml from 'sanitize-html';

type Props ={
    key:string,
    id:string,
    thumbnail:Thumbnail,
    title:string,
    createdAt:string,
    content:string,
    tag:string[]
}
export const Card = (props: Props) => {

  const dateprot = props.createdAt.substring( 0, 10 ) ;
  const date = dateprot.replace( /-/g, " / ");

  const sanitizedContent = sanitizeHtml(props.content, { allowedTags: [], allowedAttributes: { button: ['class']},disallowedTagsMode: 'discard', });
  let splitedContent = sanitizedContent.substring( 0, 120 ) ;
  if (splitedContent.length == 120) {
    splitedContent += "...";
  }



  return (
    <GridItem  colSpan={1} width={{base: "95vw", sm: "47vw", md: "35vw", lg: "23vw", xl:"17vw", "2xl": "13.5vw"}}>
        <LinkBox bg={"back.100"} boxShadow="md" border="0.5px solid rgb(209, 209, 209)" borderRadius={15} >
            <Box transition="0.2s" borderRadius={15} h={"100%"}
            _hover={{ bg: "blackAlpha.200", filter: "grayscale(0.3)",}}
            >
                    <AspectRatio overflow={"hidden"} borderTopRadius={15} ratio={6 / 4}>

                        {props.thumbnail?.url ? <Image src={ props.thumbnail.url }  alt='' fill/> : <Image src="/logo.png"  alt='' fill objectFit='contain' />}
                    </AspectRatio>
                    <LinkOverlay href={`blog/${props.id}`}>
                        <Center pt={3} fontWeight="bold" fontSize={20}>{ props.title }</Center>
                    </LinkOverlay>
                    <HStack fontSize={13} p={3} color="base.700">
                        <Text>{date}</Text>
                        <Text> : </Text>
                        <Text>{ props.tag }</Text>
                    </HStack>
                    <Divider />
                    <Box p={5} fontSize={15}>
                        <div dangerouslySetInnerHTML={{ __html: splitedContent }}></div>
                    </Box>
            </Box>
        </LinkBox>
    </GridItem>
  )}
