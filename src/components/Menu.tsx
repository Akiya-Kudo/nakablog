import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Heading, HStack, Image, Link as CLink, Stack, Text, VStack, } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction ,useEffect,useState} from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { basename } from 'path'
import { pageStateType, Blog, Props, TagBlogNumbers } from '../types/MicroCms';
import { useTagBlogNumbers, useArchive } from '../hooks/useSortBlogs';

const MenuButton = ({text , isTag, setTag, number}: {text: pageStateType,isTag:pageStateType, setTag:Dispatch<SetStateAction<pageStateType>>, number:Number}) => {
  let bgIsTag = "";
  if(isTag == text) {
    bgIsTag = "base.500";
  }

  return (
    <Link href="/" legacyBehavior passHref className={ styles.link }>
      <CLink as="a" className={ styles.link }>
          <Center as="button" onClick={() => setTag(text) } fontSize={15} fontWeight="bold" bg={bgIsTag} w="100%" h={70} _hover={{ bg: "base.300" }} borderRadius={10}>
            {`${text}(${number})`}

          </Center>
      </CLink>
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
        <AccordionButton border={"1px solid #009b85"} _hover={{ bg: "base.300" }} borderRadius={10} h={50}>
          <Box flex='1' textAlign='center' ps={5} fontWeight="bold">
            メニュー
          </Box>
          <AccordionIcon />
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
        <Box p={3} bg={"back.100"} minHeight={{base: "200px", md: "100vh"}} boxShadow="md" pos={{base: "unset", md: "fixed"}} w={{base: "100vw", md: "25vw"}}>
          <VStack>
            <HStack p={5}>
              <Image src='../logo.png' height={100} alt='#'/>
              <Heading color={"accent.300"}p={2}>Aoyama Nakagawa Seminar</Heading>
            </HStack>
          </VStack>
            <Box display={{base: "none", md: "block"}}>
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
