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

export type pageStateType = 'ホーム' | 'イベント' | '日常' | '研究' | 'その他';

