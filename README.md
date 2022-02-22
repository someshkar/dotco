# dotco

A URL shortener using Airtable and Vercel.

## Setup

1. Clone the repository and install dependencies.
```sh
git clone https://github.com/dotangad/dotco
cd dotco
npm i
```

2. Setup an Airtable document like this -
![airtable](https://i.imgur.com/g1cSOPW.png)

3. Get your Airtable credentials [here](https://airtable.com/api).

4. Fill out the env file
```sh
cp .env.example .env
vim .env
```

5. Deploy to vercel
```sh
vercel .
```

## Extensions
- [CLI]
- [Chrome Extension]
- [Raycast Extension]

[CLI]: https://github.com/kavinvalli/airtable-url-cli
[Chrome Extension]: https://github.com/kavinvalli/dotco-chrome-extension
[Raycast Extension]: https://github.com/kavinvalli/dotco-raycast
