import React from 'react';
import Items from "./Items";
import Pagination from "./Pagination";
const Articles = props =>{
    const {articles,count,currentPage,onPageClick,isShowPage}= props;
    // console.log(articles)

    if (!articles){ //如果文章还未加载成功
        return <div className="article-preview">加载中。。。</div>
    }

    if (articles && articles.length === 0) { //如果article存在并且长度为0
        return <div className="article-preview">这里没有文章</div>
    }

    //article存在并且有文章: 遍历展示到页面中
    return (
        <div>
            {
                articles.map(article => {
                    return <Items article={article} key={article.slug} />
                })
            }

            {
                isShowPage ? <Pagination
                    count={count}
                    currentPage={currentPage}
                    onPageClick={onPageClick}
                /> : null
            }
        </div>
    )

}

export default Articles;