/* eslint-disable react/jsx-key */
import { client } from "../../libs/client";
import type { Thumbnail, pageStateType, Blog } from "../../src/types/MicroCms";
import { AspectRatio, Center, Divider, Grid, GridItem, HStack, Text, Link as CLink, Box, Accordion, AccordionButton, AccordionItem, AccordionPanel, AccordionIcon, Button,  Tag } from '@chakra-ui/react';
import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import Menu, { MenuList } from '../../src/components/Menu'
import Image from 'next/image';
import NextLink from 'next/link'
import { Dispatch, SetStateAction, useState } from "react";
import { useArchive, useTagBlogNumbers } from "../../src/hooks/useSortBlogs";
import sanitizeHtml from 'sanitize-html';
// ダイナミックSSGにおける型定義
type BlogProp ={
    blog:{
        contents:string,
        createdAt:string,
        id:string,
        publishedAt:string,
        revisedAt:string,
        tag:string[],
        thumbnail:Thumbnail,
        title:string,
        updatedAt:string
    }
}

// SSGパス
export const getStaticPaths = async()=>{
    const data = await client.get({endpoint:"blog"});
    const paths = data.contents.map((content:Blog)=>`/blog/${content.id}`)

    return{
        paths,
        fallback:false,
    };
};

//SSG
export const getStaticProps = async(context: { params: { id: any; }; }) => {
    const id = context.params.id;
    const data = await client.get({endpoint:"blog", contentId: id})
    const Blogsdata = await client.get({endpoint: "blog"})
    return {
        props:{
            // ブログ詳細のデータ
            blog:data,
            // 全ブログのデータ
            blogs:Blogsdata.contents
        },
    };
};

// コンポーネント
const MenuSmallLink = ({text, number, setTag}: {text: pageStateType, number:String, setTag:Dispatch<SetStateAction<pageStateType>>}) => {
    return (
            <NextLink href={"/"} legacyBehavior passHref>
                <div  className={ styles.link } onClick={() => setTag(text)}>
                    <MenuSmallButton text={text}  number={number} />
                </div>
            </NextLink>
  )}

// コンポーネント
const MenuSmallButton = ({text , bgcolor, number}: {text: string, bgcolor?: string, number:String}) => {
    return (
            <HStack left="0px" mx={5} color={"gray"} pos={"relative"} _hover={{ left: "3px", color:"blackAlpha.900", transition: "0.5s" }}  fontSize={15} fontWeight="bold" borderRadius={5} className={styles.linkSmall}>
                <Text  mx={5}  bg={bgcolor} h={30}  borderRadius={10}>
                    {text}
                </Text>
                <Center pos={"absolute"} right={5} border="1px solid #009b85"  fontSize={13} fontWeight="500" px={1} borderRadius={5} color="base.700">
                    {number}
                </Center>
            </HStack>
  )}


// ページコンポーネント
export default function BlogId({blog, blogs, isTag, setTag}:{blog: Blog,blogs:Blog[], isTag:pageStateType, setTag:Dispatch<SetStateAction<pageStateType>>}){
    const dateprot = blog.createdAt.substring( 0, 10 ) ;
    const date = dateprot.replace( /-/g, " / ");
    // 月別アーカイブ
    const archive = useArchive(blogs)

    // カテゴリー
    const categoryNum = useTagBlogNumbers(blogs)
    const headingCorrectedBlog = blog.contents.replace( /<h1/g, '<h1 style="font-size: 35px; font-weight: bolder" ').replace( /<h2/g, '<h2 style="font-size: 25px; font-weight: bolder" ').replace( /<h3/g, '<h3 style="font-size: 20px; font-weight: bolder" ').replace( /<h4/g, '<h4 style="font-size: 15px; font-weight: bolder" ').replace( /<h5/g, '<h5 style="font-size: 13px; font-weight: bolder" ');

    // const sanitizedContent = sanitizeHtml(blog.contents , { allowedTags: ["p", "br" , "img", "a", "strong", "em", "s", "code", "span","h6","h5","h4","h3","h2","h1","li", "pre", "ul", "sup","sub"], allowedAttributes: { button: ['class'], img: [ 'src', 'srcset', 'alt', 'title', 'width', 'height', 'loading' ], p: ["style"], a: ["href"]},disallowedTagsMode: 'escape', });


    return(
        <>
        <Grid bg={"back.300"} templateColumns={{base: "repeat(1, 1fr)", md: "repeat(4, 1fr)"}} className={styles.container}>
            <GridItem colSpan={1}>
                <Menu blogs={blogs} isTag={isTag} setTag={ setTag }/>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 3}}>
            <Grid
            templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)"}}
            gap={5} p={5}
            >
                <GridItem
                colSpan={2}
                bg={"back.100"} borderRadius={10} boxShadow="md"
                >
                    <AspectRatio overflow={"hidden"} borderTopRadius={15} ratio={6 / 4}>
                    {blog.thumbnail?.url ? <Image src={ blog.thumbnail.url }  alt='' fill/> : <Image src="/logo.png"  alt='' fill objectFit='contain' />}
                    </AspectRatio>
                    <Center p={5} fontWeight="bold" fontSize={30}>{blog.title}</Center>
                    <HStack fontSize={13} p={3} color="base.700">
                        <Text>{date}</Text>
                        <Text> : </Text>
                        <Text>{blog.tag}</Text>
                    </HStack>
                    <Divider />
                    <Box p={5} fontSize={15}>
                        {/* <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div> */}
                        <div dangerouslySetInnerHTML={{ __html: headingCorrectedBlog }}></div>
                    </Box>
                </GridItem>

                <GridItem colSpan={{base: 2, md: 1}}>
                    <Grid templateColumns={{base: "repeat(2, 1fr)", md: "repeat(1, 1fr)"}} gap={5} w="100%">
                        <GridItem
                        display={{base: "block", md: "none"}}
                        colSpan={1} bg={"back.100"} borderRadius={10} boxShadow="md" p={3}
                        >
                            <Text mx={5} mt={2} mb={2} fontSize={15} fontWeight="bold" borderBottom={"2px solid #ffbb8a"}>カテゴリー</Text>
                            <MenuSmallLink text="イベント" number={categoryNum.eventBlogs.toString()} setTag={ setTag }/>
                            <MenuSmallLink text="日常" number={categoryNum.dailyBlogs.toString()} setTag={ setTag }/>
                            <MenuSmallLink text="研究" number={categoryNum.studyBlogs.toString()} setTag={ setTag }/>
                            <MenuSmallLink text="その他" number={categoryNum.otherBlogs.toString()} setTag={ setTag }/>
                        </GridItem>
                        <GridItem
                        colSpan={1} bg={"back.100"} borderRadius={10} boxShadow="md" p={3}
                        >
                            <Text mx={5} mt={2} mb={2} fontSize={15} fontWeight="bold" borderBottom={"2px solid #ffbb8a"}>アーカイブ</Text>
                            <Accordion  allowMultiple>
                                {Object.keys(archive).map((index)=>(
                                    <AccordionItem key={index}>
                                        <h2>
                                            <AccordionButton _hover={{bg:"whiteAlpha.900"}}>
                                                <Box flex='1' textAlign='left'>
                                                    <MenuSmallButton  number={archive[index].length}  text={index.split("_")[0] + "年" + index.split("_")[1] + "月"}/>
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        {archive[index].map((blog: Blog)=>(
                                            <AccordionPanel key={blog.id} pb={2} textAlign='center'>
                                                <NextLink href={`/blog/${blog.id}`}>
                                                    <HStack left="0px" mx={5} color={"gray"} pos={"relative"} _hover={{ left: "3px", color:"blackAlpha.900", transition: "0.5s" }}  fontSize={15} fontWeight="bold" borderRadius={5} className={styles.linkSmall}>
                                                        <Text  mx={2}  h={30}  borderRadius={10}>
                                                            { blog.title.substring( 0, 6 ) + "..."}
                                                            {/* {blog.title} */}
                                                        </Text>
                                                        <Center pos={"absolute"} right={5} border="1px solid #009b85"  fontSize={13} fontWeight="500" px={1} borderRadius={5} color="base.700">
                                                            {blog.tag}
                                                        </Center>
                                                    </HStack>
                                                </NextLink>
                                            </AccordionPanel>
                                        ))}
                                    </AccordionItem>

                                ))}
                            </Accordion>


                        </GridItem>
                    </Grid>
                </GridItem>
            </Grid>
            </GridItem>
        </Grid>
    </>
    )
}
