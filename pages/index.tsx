import Link from 'next/link'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { client } from '../libs/client'
import { Blog, pageStateType, Props } from '../src/types/MicroCms'
import { Box, Center, Grid, GridItem, Tag } from '@chakra-ui/react';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Menu from '../src/components/Menu'
import { Card } from '../src/components/Card'
import { useState } from 'react';
import { useSortBlogs } from '../src/hooks/useSortBlogs';


export const getStaticProps = async()=>{
    const data = await client.get({endpoint: "blog"})
    console.log(data);
    return{
        props:{
            blogs:data.contents,
        },
    }
}



const Cards = ({blogs, isTag}:{blogs: Blog[], isTag:pageStateType} ) => {

  const displayBlogs = useSortBlogs(blogs, isTag);

  return (
    <>
      { displayBlogs.map((blog:Blog)=> <Card key={blog.id} id={blog.id} thumbnail={blog.thumbnail} title={blog.title} createdAt={blog.createdAt} content={blog.contents} tag={blog.tag}/>)}
    </>
  )
}

const Home: NextPage<Props> = ({blogs, isTag, setTag}:{blogs: Blog[],isTag:pageStateType, setTag:Dispatch<SetStateAction<pageStateType>>}) => {

  return (
    <>
    <Grid bg={"back.300"} templateColumns={{base: "repeat(1, 1fr)", md: "repeat(4, 1fr)"}} className={styles.container}>
      <GridItem colSpan={1}>
          {/* blogsの中から必要なパラメータをpropsで渡す。 */}
        <Menu isTag={isTag} setTag={ setTag} blogs= {blogs}/>
      </GridItem>
      <GridItem colSpan={{base: 1, md: 3}}>
        <Grid templateColumns={{base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)", "2xl":  "repeat(5, 1fr)" }} gap={5} p={5}>
          <GridItem
            colSpan={{base: 1, sm: 2, lg: 3, xl: 4, "2xl": 5 }}
            // bg={"base.500"}
            borderRadius={10}
            color="base.700"
          >
            <Center fontWeight={"bold"} minHeight={50}>
              <Box borderBottom="2px solid #f4c78a">
              { isTag }
              </Box>
            </Center>
          </GridItem>
          <Cards blogs={blogs} isTag={isTag}/>
          </Grid>
      </GridItem>
    </Grid>
        {/* <Box bg={{ base: "red.200", sm: "yellow.200", md: "green.200", lg: "blue.200" , xl: "blue.900", "2xl": "red.500"}} ></Box> */}
    </>
  )
}
export default Home;

