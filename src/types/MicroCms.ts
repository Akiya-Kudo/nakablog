import { useTagBlogNumbers } from '../hooks/useSortBlogs';
export type Thumbnail ={
    height:number,
    url:string,
    width:number
}

export type Blog = {
    contents:string,
    createdAt: string,
    id: string,
    publishedAt: string,
    revicedAt:string,
    title: string,
    updatedAt:string
    tag:string[]
    thumbnail:Thumbnail

}

export type Props = {
    blogs:Array<Blog>
}

export type TagBlogNumbers={
    homeBlogs:   Number,
    eventBlogs:  Number,
    dailyBlogs:  Number,
    studyBlogs:  Number,
    otherBlogs:  Number,
}

export type pageStateType = 'ホーム' | 'イベント' | '日常' | '研究' | 'その他';

