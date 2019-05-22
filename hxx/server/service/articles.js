/*
 * @Author: huangxiaoxun 
 * @Date: 2018-12-28 01:03:15 
 * @Last Modified by: huangxiaoxun
 * @Last Modified time: 2019-05-22 15:05:17
 */



import Article from '../database/schema/article'


class ArticleService {

  async _sendArticle ({
    article: article,
  }) {
    // console.log('article',article)
    article = {
      ...article,
      date: Date(),
      comment_n: 0,
      ArticleLike: 0
    }
    
    await new Article(article).save()
  }


  /**
   *
   *
   * @param {*} {
   *     tags,  //tags
   *     limit,  //最大值
   *     skip,  // 页码
   *     isPublish // 是否公开
   *   }
   * @returns
   * @memberof ArticleService
   */
  async _getAllArticles({
    tags,  
    limit, 
    skip,  
    isPublish
  }) {
    let _articles = {}
    //文章总数
    try {
      let count = await Article.countDocuments({
        isPublish: isPublish
      }).exec()
      _articles.total = Math.ceil(count / limit ) // 总页数
    } catch (e) {
      console.log(e)
      throw e
    }

    if (tags && tags !== '全部') {
      try {
        _articles.articles = await Article.find({
          tags: tags,
          isPublish: isPublish
        }).sort({
          date: -1
        }).limit(limit).skip(skip).exec()
      } catch (e) {
        console.log(e)
        throw e
      }
    } else {
      try{
        _articles.articles = await Article.find({
          isPublish: isPublish
        }).sort({
          date: -1
        }).limit(limit).skip(skip).exec()
      } catch (e) {
        console.log(e)
        throw e
      }
    }
    return _articles
  }

  async _getArticle ({aid}) {
    let article = null
    try{
      article = await Article.findOne({
        isPublish: true
      })
        .exec()
        console.log('article',article,aid)

    } catch (e) {
      console.log(e)
      throw e
    }
    return article
  }

  async _updateArticle ({article , aid}) {
    try {
      console.log('update',aid,typeof aid)
      await Article.findOne({aid: aid}, (err, res) => {
        console.log('查询结果',res)
      })
      console.log('FIND---------------',)
      article = {
        ...article,
        lastDate: Date()
      }
      return await Article.updateOne({aid: aid}, article)
    } catch (e) {
      console.log(e)
    }
  }

  async _deleteArticle ({article, aid}) {
    try {
      return await Article.deleteOne({aid:aid})
    } catch(e) {
      console.log(e)
    }
  }

  async _ArticleLike ({article , aid}) {
    try {
      return await Article.findOneAndUpdate({aid: aid}, {$inc: {ArticleLike: 1}}, {new: true})
    } catch (e) {
      console.log(e)
    }
  }




}

module.exports = new ArticleService()
