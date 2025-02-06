import { appConfig } from '@/config/apiConfig.js'
import { Article } from '../models/Article.js'

class ArticleAdaptor {
  //use this
  resourceUrl = appConfig.BACKEND_URL + '/articles'

  //instead of this
  constructor(resourceUrl) {
    ArticleAdaptor.resourceUrl = resourceUrl
    console.log('ArticleAdaptor.constructor: resourceUrl = ' + resourceUrl)
  }

  async getArticles() {
    try {
      const response = await fetch(`${this.resourceUrl}`)
      let data = await response.json()

      let articles = []
      for (let article of data) {
        articles.push(
          new Article(
            article.id,
            article.title,
            article.content, // Parse JSON string to object
            article.author,
            article.lastUpdatedAt,
          ),
        )
      }
      return articles
    } catch (error) {
      console.error('Error retrieving articles:', error)
      throw error
    }
  }

  async getArticle(id) {
    try {
      const response = await fetch(`${this.resourceUrl}/${id}`)
      const data = await response.json()
      return new Article(
        data.id,
        data.title,
        data.content, // Parse JSON string to object
        data.author,
        data.lastUpdatedAt,
      )
    } catch (error) {
      console.error('Error retrieving article:', error)
      throw error
    }
  }

  async saveArticle(article) {
    try {
      const response = await fetch(`${this.resourceUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: article.id,
          title: article.title,
          content: article.content, // Serialize object to JSON string
          author: article.author,
          lastUpdatedAt: article.lastUpdatedAt,
        }),
      })
      const data = await response.json()
      return new Article(
        data.id,
        data.title,
        data.content, // Parse JSON string to object
        data.author,
        data.lastUpdatedAt,
      )
    } catch (error) {
      console.error('Error saving article:', error)
      throw error
    }
  }

  async updateArticle(article) {
    try {
      const response = await fetch(`${this.resourceUrl}/${article.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: article.id,
          title: article.title,
          content: article.content, // Serialize object to JSON string
          author: article.author,
          lastUpdatedAt: article.lastUpdatedAt,
        }),
      })
      const data = await response.json()
      return new Article(
        data.id,
        data.title,
        data.content, // Parse JSON string to object
        data.author,
        data.lastUpdatedAt,
      )
    } catch (error) {
      console.error('Error updating article:', error)
      throw error
    }
  }

  async deleteArticle(id) {
    try {
      const response = await fetch(`${this.resourceUrl}/${id}`, {
        method: 'DELETE',
      })
      return response.ok
    } catch (error) {
      console.error('Error deleting article:', error)
      throw error
    }
  }
}

export { ArticleAdaptor }
