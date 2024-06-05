import matter from 'gray-matter'
import fs from 'fs'
import { join } from 'path'

const postsDirectory = join(process.cwd(), 'data', 'posts')
const postDataFiles = fs.readdirSync(postsDirectory)

const getDateId = slug => {
  const match = slug?.match(/^(\d+)-/)
  return match ? match[1] : null
}
const cleanUpSlug = slug => slug?.replace(/^\d+-/, '').replace(/\.mdx?$/, '')

export function getPostBySlug(slug) {
  const realSlug = cleanUpSlug(slug)
  const foundFilenameIndex = postDataFiles.findIndex(filename =>
    filename.includes(realSlug),
  )
  const fullPath = join(postsDirectory, postDataFiles[foundFilenameIndex])
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const dateId = getDateId(slug)
  const next = cleanUpSlug(postDataFiles[foundFilenameIndex + 1]) || null
  const previous = cleanUpSlug(postDataFiles[foundFilenameIndex - 1]) || null

  return {
    slug: realSlug,
    frontmatter: { ...data, next, previous, dateId },
    content,
  }
}

export function getAllPosts() {
  const posts = postDataFiles.map(slug => getPostBySlug(slug))
  return posts
}
