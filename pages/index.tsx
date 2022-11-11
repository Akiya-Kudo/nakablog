import Link from 'next/link'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { client } from '../libs/client'
import { Blog, pageStateType, Props } from '../src/types/MicroCms'
import { Box, Center, Grid, GridItem, Tag } from '@chakra-ui/react';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Menu from '../src/components/Menu'
import { Card } from '../src/components/Card'

export const getStaticProps = async()=>{
    const data = await client.get({endpoint: "blog"})
    return{
        props:{
            blogs:data.contents,
        },
    }
}

const Cards = ({blogs, isTag}:{blogs: Blog[], isTag:pageStateType} ) => {
  
  let displayBlogs = blogs;
  let a = displayBlogs.map((blog:Blog)=> <Card key={blog.id} id={blog.id} thumbnail={blog.thumbnail} title={blog.title} createdAt={blog.createdAt} content={blog.contents} tag={blog.tag}/>)
  useEffect(() => {
    const eventBlogs = blogs.filter((blog:Blog) => blog.tag[0] == "イベント")
    const dailyBlogs = blogs.filter((blog:Blog) =>  blog.tag[0] == "日常")
    const studyBlogs = blogs.filter((blog:Blog) =>  blog.tag[0] == "研究")
    const otherBlogs = blogs.filter((blog:Blog) =>  blog.tag[0] == "その他")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if(isTag == "イベント") displayBlogs = eventBlogs;
    if(isTag == "日常") displayBlogs = dailyBlogs;
    if(isTag == "研究") displayBlogs = studyBlogs;
    if(isTag == "その他") displayBlogs = otherBlogs;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    a = displayBlogs.map((blog:Blog)=> <Card key={blog.id} id={blog.id} thumbnail={blog.thumbnail} title={blog.title} createdAt={blog.createdAt} content={blog.contents} tag={blog.tag}/>)
    console.log(a)
  },[isTag]);

  return (
    <>
      { a }
    </>
  )
}

const Home: NextPage<Props> = ({blogs, isTag, setTag}:{blogs: Blog[],isTag:pageStateType, setTag:Dispatch<SetStateAction<pageStateType>>}) => {

  // console.log(blogs);



  return (
    <>
    <Grid bg={"back.300"} templateColumns={{base: "repeat(1, 1fr)", md: "repeat(4, 1fr)"}} className={styles.container}>
      <GridItem colSpan={1}>
          {/* blogsの中から必要なパラメータをpropsで渡す。 */}
        {/* <Menu blogs={blogs}/> */}
        <Menu isTag={isTag} setTag={ setTag }/>
      </GridItem>
      <GridItem colSpan={{base: 1, md: 3}}>
        <Grid templateColumns={{base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)", "2xl":  "repeat(5, 1fr)" }} gap={5} p={5}>
          <GridItem
            colSpan={{base: 1, sm: 2, lg: 3, xl: 4, "2xl": 5 }}
            bg={"base.500"}
            borderRadius={10}
          >
            <Center fontWeight={"bold"} minHeight={50}>
              { isTag }
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

