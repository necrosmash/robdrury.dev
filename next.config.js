const fs = require('fs')
const matter = require('gray-matter')

// Redirect sources are matched against the encoded request path (spaces
// arrive as %20), and are path-to-regexp patterns, so characters like the
// parentheses in "(Part 1 of 2)" must be escaped.
const escapeSource = (path) => path.replace(/[()[\]{}:*+?\\]/g, '\\$&')

// Browsers send "(" as-is, but some clients encode it as %28, so a title
// with parentheses needs a source for each spelling.
const encodedVariants = (path) => {
  const encoded = encodeURI(path)
  const strict = encoded.replace(/\(/g, '%28').replace(/\)/g, '%29')
  return [...new Set([encoded, strict])]
}

// Blog posts used to be served at /blog/post/<title>. They now live at
// /blog/post/<slug>, so each old title URL permanently redirects to its slug.
const legacyPostRedirects = () =>
  fs.readdirSync('blogPosts').flatMap((fileName) => {
    const { title, slug } = matter.read(`blogPosts/${fileName}`).data
    return encodedVariants(`/blog/post/${title}`).map((path) => ({
      source: escapeSource(path),
      destination: `/blog/post/${slug}`,
      permanent: true,
    }))
  })

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 100],
  },
  async redirects() {
    return legacyPostRedirects()
  },
}

module.exports = nextConfig
