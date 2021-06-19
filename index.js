const express = require('express')
const fetch = require('node-fetch')
const fs=require("fs");
const path=require("path");
const bodyParser=require("body-parser");
const app = express()
const { getTarget } = require('./lib/airtable')
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
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
    console.log(page); 
    res.status(404).send(page)
    return
  } catch (e) {
    console.error(e)
  }
})
// Main slugs
app.get('/*', async (req, res) => {
  try {
    const slug = req.originalUrl.substring(1)
    const target = await getTarget(slug)

    if (target) {
      return res.redirect(302, target)
    }

    let page=fs.readFileSync(__dirname+ '/views/notfound.html', 'utf8');
    page=page.replace("tochange", req.url);
    console.log(page); 
    res.status(404).send(page);
  } catch (e) {
    console.error(e)
  }
})
app.post("/*", (req, res)=>{
  const {new_adress}=req.body;
  res.redirect(`${new_adress}`)
})
const port = process.env.PORT || 3000
app.listen(port, (err) => {
  console.log(`Shortener listening on ${port}!`)
  if (err) throw err
})
