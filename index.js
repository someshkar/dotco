const express = require('express')
const fetch = require('node-fetch')

const app = express()
const { getTarget } = require('./lib/airtable')

app.get('/', async (req, res) => {
  try {
    return res.redirect(302, process.env.MAIN_DOMAIN)
  } catch (e) {
    console.error(e)
  }
})

// GitHub projects
app.get('/gh/:repo', async (req, res) => {
  try {
    const { repo } = req.params
    const { GITHUB_USERNAME: ghUsername } = process.env

    const { ok: repoExists } = await fetch(
      `https://api.github.com/repos/${ghUsername}/${repo}`
    )

    if (repoExists) {
      return res.redirect(302, `https://github.com/${ghUsername}/${repo}`)
    }

    return res.status(404).send('404')
  } catch (e) {
    console.error(e)
  }
})

// Main slugs
app.get('/*', async (req, res) => {
  try {
    const slug = req.originalUrl.substring(1)
    console.log(slug)
    const target = await getTarget(slug)

    if (target) {
      return res.redirect(302, target)
    }

    return res.status(404).send('404')
  } catch (e) {
    console.error(e)
  }
})

const port = process.env.PORT || 3000
app.listen(port, (err) => {
  console.log(`Shortener listening on ${port}!`)
  if (err) throw err
})
