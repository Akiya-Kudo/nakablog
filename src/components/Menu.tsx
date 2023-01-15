import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Heading, HStack, Image, Link as CLink, Stack, Text, VStack, } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction ,useEffect,useState} from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { basename } from 'path'
import { pageStateType, Blog, Props, TagBlogNumbers } from '../types/MicroCms';
import { useTagBlogNumbers, useArchive } from '../hooks/useSortBlogs';

const MenuButton = ({text , isTag, setTag, number}: {text: pageStateType,isTag:pageStateType, setTag:Dispatch<SetStateAction<pageStateType>>, number:Number}) => {
  let bgIsTag = "";
  if(isTag == text) bgIsTag = "accent.500";
  let fontColor = "accent.700"
  if(isTag == text) fontColor = "whiteAlpha.900"
  let hoverBg = "base.500"
  if(isTag == text) hoverBg = "accent.300"

  return (
    <Link href="/" legacyBehavior passHref className={ styles.link }>
      <Box as="div" className={ styles.link }>
          <Center as="a" onClick={() => setTag(text)} fontSize={15} fontWeight="bold" bg={bgIsTag} w="100%" h={50} textDecoration='none' _hover={{ bg: hoverBg, textDecorationColor:'none', textDecorationLine:0, color: "whiteAlpha.900" }} borderTopEndRadius={10} borderBottomEndRadius={10} borderBottomStartRadius={{base: 10, sm: 10, md: 0, lg: 0, xl: 0, "2xl": 0}}  borderTopStartRadius={{base: 10, sm: 10, md: 0, lg: 0, xl: 0, "2xl": 0}} color={fontColor}>
            {`${text}(${number})`}
          </Center>
      </Box>
    </Link>
  )
}

export const  MenuList = ({isTag, setTag,number}:{isTag:pageStateType, setTag:Dispatch<SetStateAction<pageStateType>>,number:TagBlogNumbers}) => {


  return (
    <>
    {number==undefined ?
    null
    :
    <>
    <MenuButton text="ホーム" isTag={isTag} setTag={ setTag }  number={number.homeBlogs}/>
    <MenuButton text="イベント" isTag={isTag} setTag={ setTag } number={number.eventBlogs} />
    <MenuButton text="日常" isTag={isTag} setTag={ setTag } number={number.dailyBlogs}/>
    <MenuButton text="研究" isTag={isTag} setTag={ setTag } number={number.studyBlogs}/>
    <MenuButton text="その他" isTag={isTag} setTag={ setTag } number={number.otherBlogs}/>
    </>
    }
    </>
  )
}

const AccordionMenu = ({isTag, setTag, number}:{isTag:pageStateType, setTag:Dispatch<SetStateAction<pageStateType>>, number:TagBlogNumbers}) => {
  return (
    <Accordion mx={5} allowToggle display={{base: "block", md: "none"}}>
      <AccordionItem border="0px" >
        <AccordionButton border={"1px solid #4494a3"} _hover={{ bg: "base.500"}} borderRadius={10} h={50}>
          <Box flex='1' textAlign='center' ps={5} fontWeight="bold" color={"accent.700"} _hover={{color: "whiteAlpha.900"}} >
            メニュー
          </Box>
          <AccordionIcon color={"base.700"} />
        </AccordionButton>
        <AccordionPanel m={0} py={0}>
          <MenuList isTag={isTag} setTag={ setTag } number={number}/>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )}


const Menu = ({isTag, setTag, blogs}:{isTag:pageStateType, setTag:Dispatch<SetStateAction<pageStateType>>, blogs:Blog[]}) => {
  const number = useTagBlogNumbers(blogs)

//    console.log(archive)
  return (
    <>
        <Box py={3} bg={"back.100"} minHeight={{base: "200px", md: "100vh"}} boxShadow="md" pos={{base: "unset", md: "fixed"}} w={{base: "100vw", md: "25vw"}}>
          <VStack my={5}>
            <Link href="/" legacyBehavior passHref>
              <Box cursor='pointer'>
                <HStack px={3}>
                  <Image src='../logo.png' height={100} alt='#'/>
                  <Heading color={"base.700"}p={2}>中川 ゼミ</Heading>
                </HStack>
                <Center fontWeight={"bold"} color="gray.600">
                  国際政治経済学部　国際経済学科
                </Center>
              </Box>
            </Link>
          </VStack>
            <Box display={{base: "none", md: "block"}} marginRight={3}>
                {typeof number== undefined?
                null
                :<MenuList isTag={isTag} setTag={ setTag} number={number}/>}
            </Box>
            <AccordionMenu isTag={isTag} setTag={ setTag} number={number}/>
        </Box>
    </>
  )
}

export default Menu
