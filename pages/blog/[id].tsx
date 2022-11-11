import { client } from "../../libs/client";
import type { Thumbnail, pageStateType, Blog } from "../../src/types/MicroCms";
import { AspectRatio, Center, Divider, Grid, GridItem, HStack, Text, Link as CLink, Box, } from '@chakra-ui/react';
import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import Menu, { MenuList } from '../../src/components/Menu'
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from "react";
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

// コンポーネント
const MenuSmallButton = ({text , bgcolor}: {text: string, bgcolor?: string}) => {

    return (
      <Link href="" legacyBehavior passHref className={ styles.link }>
        <CLink as="a" className={ styles.link }>
            <HStack left="0px" mx={5} color={"gray"} pos={"relative"} _hover={{ left: "3px", color:"blackAlpha.900", transition: "0.5s" }}  fontSize={15} fontWeight="bold" borderRadius={5} className={styles.linkSmall}>
                <Text  mx={5}  bg={bgcolor} h={30}  borderRadius={10}>
                    {text}
                </Text>
                <Center pos={"absolute"} right={5} border="1px solid #009b85"  fontSize={13} fontWeight="500" px={1} borderRadius={5} color="base.700">
                    10
                </Center>
            </HStack>
        </CLink>
      </Link>
  )}
//SSG
export const getStaticProps = async(context: { params: { id: any; }; }) => {
    const id = context.params.id;
    const data = await client.get({endpoint:"blog", contentId: id})
    return {
        props:{
            blog:data,
        },
    };
};
// SSGパス
export const getStaticPaths = async()=>{
    const data = await client.get({endpoint:"blog"});
    const paths = data.contents.map((content:Blog)=>`/blog/${content.id}`)

    return{
        paths,
        fallback:false,
    };
};
// ページコンポーネント
export default function BlogId({blog, isTag, setTag}:{blog: Blog, isTag:pageStateType, setTag:Dispatch<SetStateAction<pageStateType>>}){
    const dateprot = blog.createdAt.substring( 0, 10 ) ;
    const date = dateprot.replace( /-/g, " / ");
    // console.log(blog)
    return(
        <>
        <Grid bg={"back.300"} templateColumns={{base: "repeat(1, 1fr)", md: "repeat(4, 1fr)"}} className={styles.container}>
            <GridItem colSpan={1}>
                <Menu isTag={isTag} setTag={ setTag }/>
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
                        <Image src={ blog.thumbnail?.url ? blog.thumbnail.url : "/logo.png" } alt=''  layout="fill" objectFit='cover'></Image>
                    </AspectRatio>
                    <Center p={5} fontWeight="bold" fontSize={20}>{blog.title}</Center>
                    <HStack fontSize={13} p={3} color="base.700">
                        <Text>{date}</Text>
                        <Text> : </Text>
                        <Text>{blog.tag}</Text>
                    </HStack>
                    <Divider />
                    <Box p={5} fontSize={15}>
                        <div dangerouslySetInnerHTML={{ __html: blog.contents }}></div>
                    </Box>
                </GridItem>

                <GridItem colSpan={{base: 2, md: 1}}>
                    <Grid templateColumns={{base: "repeat(2, 1fr)", md: "repeat(1, 1fr)"}} gap={5} w="100%">
                        <GridItem
                        display={{base: "block", md: "none"}}
                        colSpan={1} bg={"back.100"} borderRadius={10} boxShadow="md" p={3}
                        >
                            <Text mx={5} mt={2} mb={2} fontSize={15} fontWeight="bold" borderBottom={"2px solid #a5e8cb"}>カテゴリー</Text>
                            <MenuSmallButton text="イベント"/>
                            <MenuSmallButton text="日常"/>
                            <MenuSmallButton text="研究"/>
                            <MenuSmallButton text="その他"/>
                        </GridItem>
                        <GridItem
                        colSpan={1} bg={"back.100"} borderRadius={10} boxShadow="md" p={3}
                        >
                            <Text mx={5} mt={2} mb={2} fontSize={15} fontWeight="bold" borderBottom={"2px solid #a5e8cb"}>アーカイブ</Text>
                            <MenuSmallButton text="2021 / 7 "/>
                            <MenuSmallButton text="2021 / 6 "/>
                            <MenuSmallButton text="2021 / 5 "/>
                            <MenuSmallButton text="2021 / 4 "/>
                        </GridItem>
                    </Grid>
                </GridItem>
            </Grid>
            </GridItem>
        </Grid>
    </>
    )
}
