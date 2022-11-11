import { initial } from 'lodash';
import React, { useEffect, useState } from 'react'
import { Blog, pageStateType, Props, TagBlogNumbers } from '../types/MicroCms';

export const useSortBlogs = (blogs: Blog[], isTag:pageStateType) => {
    const[displayBlogs, setDisplayBlogs] = useState(blogs)
      useEffect(() => {
        const homeBlogs = blogs;
        const eventBlogs = blogs.filter((blog:Blog) => blog.tag[0] == "イベント")
        const dailyBlogs = blogs.filter((blog:Blog) =>  blog.tag[0] == "日常")
        const studyBlogs = blogs.filter((blog:Blog) =>  blog.tag[0] == "研究")
        const otherBlogs = blogs.filter((blog:Blog) =>  blog.tag[0] == "その他")
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if(isTag == "ホーム") setDisplayBlogs(homeBlogs);
        if(isTag == "イベント") setDisplayBlogs(eventBlogs);
        if(isTag == "日常") setDisplayBlogs(dailyBlogs) ;
        if(isTag == "研究") setDisplayBlogs(studyBlogs);
        if(isTag == "その他") setDisplayBlogs(otherBlogs);
        console.log(displayBlogs)
      },[isTag]);

  return displayBlogs;
}

export const useTagBlogNumbers =(blogs:Blog[])=>{
    const tagBlogNumber ={ homeBlogs: blogs.length,
        eventBlogs: blogs.filter((blog: Blog) => blog.tag[0] == "イベント").length,
        dailyBlogs: blogs.filter((blog: Blog) => blog.tag[0] == "日常").length,
        studyBlogs: blogs.filter((blog: Blog) => blog.tag[0] == "研究").length,
        otherBlogs: blogs.filter((blog: Blog) => blog.tag[0] == "その他").length
    }
    return tagBlogNumber;
}
