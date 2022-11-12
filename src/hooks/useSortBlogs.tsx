import { initial } from 'lodash';
import React, { useEffect, useState } from 'react'
import { arrayBuffer } from 'stream/consumers';
import { Blog, pageStateType, Props, TagBlogNumbers } from '../types/MicroCms';
import dayjs from'dayjs';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";


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

      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[isTag]);

  return displayBlogs;
}

export const useTagBlogNumbers =(blogs:Blog[])=>{
    if( blogs !== undefined){
        const tagBlogNumber ={ homeBlogs: blogs.length,
            eventBlogs: blogs.filter((blog: Blog) => blog.tag[0] == "イベント").length,
            dailyBlogs: blogs.filter((blog: Blog) => blog.tag[0] == "日常").length,
            studyBlogs: blogs.filter((blog: Blog) => blog.tag[0] == "研究").length,
            otherBlogs: blogs.filter((blog: Blog) => blog.tag[0] == "その他").length
        }
        return tagBlogNumber;
    }else{
        return null;
    }
}

// アーカイブ機能
export const useArchive = (blogs:Blog[])=>{
    // ブログのデータを取得
    const formatDate = (date: string | number | dayjs.Dayjs | Date) => {
        const formattedDate = dayjs.utc(date).tz("Asia/Tokyo").format("YYYY_MM");
        return formattedDate;
    }
    dayjs.extend(utc);
    dayjs.extend(timezone);
    return blogs.reduce(function (group, x) {
        const yearMonthString = formatDate(new Date(x["publishedAt"]));
        (group[yearMonthString] = group[yearMonthString] || []).push(x);
        return group;
    }, {});
}




