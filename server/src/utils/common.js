/**
 *  处理文章
 * @param article
 * @param author
 * @param favoriteCount
 * @param favorite
 * @returns {TModelAttributes}
 */

function handleArticle(article,author,favoriteCount,favorite){
    //处理tag
    const tags = [];
    for(let tag of article.Tags){
        tags.push(tag.name);
    }
    article.dataValues.tags = tags;

    //处理文章信息
    delete author.dataValues.password;//删除作者的密码
    delete article.dataValues.userEmail;//删除文章中的用户email

    article.dataValues.author = author.dataValues;

    //处理喜欢 favorite
    article.dataValues.favoriteCount = favoriteCount; //喜欢的数量
    article.dataValues.favorite = favorite; //你是否喜欢

    return article.dataValues;
}

module.exports ={
    handleArticle
}