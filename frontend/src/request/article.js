import apiClient from "./apiClient";
import {LIMIT} from "../constant";

const OFFSET = (page)=>{
    return (page-1)*LIMIT
};

export default {
    //获取作者
    getAuthor: (author, page) => apiClient.get(`/articles?author=${author}&limit=${LIMIT}&offset=${OFFSET(page)}`),
    //获取喜欢
    getFavorite: (author, page) => apiClient.get(`/articles?favorite=${author}&limit=${LIMIT}&offset=${OFFSET(page)}`),
    //创建文章
    create: (article) => apiClient.post(`/articles`, { article }),
    //获取文章
    get: (slug) => apiClient.get(`/articles/${slug}`),
    //更新文章
    update: (article) => apiClient.put(`/articles/${article.slug}`, { article }),
    //删除文章
    delete: (slug) => apiClient.delete(`/articles/${slug}`),
    //添加喜欢
    favorite: slug => apiClient.post('/favorites/' + slug),
    //取消喜欢
    unfavorite: slug => apiClient.delete('/favorites/' + slug),

    //获取文章
    getAll: (page) => apiClient.get(`/articles?limit=${LIMIT}&offset=${OFFSET(page)}`),
    //根据标签获取文章
    byTag: (tag, page) => apiClient.get(`/articles?tag=${tag}&limit=${LIMIT}&offset=${OFFSET(page)}`),
    // 获取关注 follow
    byFollow: (page) => apiClient.get(`/articles/follow?limit=${LIMIT}&offset=${OFFSET(page)}`), //暂时可以不要看需求
}