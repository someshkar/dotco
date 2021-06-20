const express = require('express')
const fetch = require('node-fetch')
const fs=require("fs");
const path=require("path");
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
    let page=fs.readFileSync(__dirname+ '/views/notfound.html', 'utf8');
    page=page.replace("tochange", "");
    res.status(404).send(page)
    return
  } catch (e) {
    console.error(e)
  }
})
// Main slugs
app.get('/*', async (req, res) => {
  const q=req.url;
  if(q.split("?")[0]=="/redirect_to_new_adress"){
    if(req.query)return res.redirect(req.query.new_adress);
  }
  try {
    const slug = req.originalUrl.substring(1)
    const target = await getTarget(slug)

    if (target) {
      return res.redirect(302, target)
    }

    let page=fs.readFileSync(__dirname+ '/views/notfound.html', 'utf8');
    page=page.replace("tochange", req.url);
    res.status(404).send(page);
  } catch (e) {
    console.error(e)
  }
})
const port = process.env.PORT || 3000
app.listen(port, (err) => {
  console.log(`Shortener listening on ${port}!`)
  if (err) throw err
})
