require('dotenv').config()
const Airtable = require('airtable-plus')

const {
  AIRTABLE_API_KEY: apiKey,
  AIRTABLE_BASE_ID: baseID,
  AIRTABLE_TABLE_NAME: tableName,
} = process.env

const airtable = new Airtable({ apiKey, baseID, tableName })

module.exports = {
  getTarget: async (slug) => {
    try {
      const target = (
        await airtable.read({
          filterByFormula: `slug = "${slug}"`,
          maxRecords: 1,
        })
      )[0].fields.target

      return target
    } catch (e) {
      console.log(`${slug} was not found`)
      return ''
    }
  },
}
