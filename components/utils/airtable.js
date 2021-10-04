import Airtable from 'airtable'
import moment from 'moment'

export async function getAirtableData() {
  try {

    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_BASE_ID)

    let pseudoData = []

    await base('DorkshopList').select({
      view: 'Grid view'
    }).firstPage().then(records => {

      records.forEach(function(record) {
        console.log('Retrieved', record.get('Title'))
        pseudoData.push(record)
      })

    })

    // filter the rows to only show the rows needed
    const filteredRows = pseudoData.filter(row => (row.fields.IsHappening === true ) )

    // adjust rows to match
    const allRows = filteredRows.map((row) => {

      const startDate = moment( row.get('Date') )
      const durationInMinutes = moment.duration(row.get('Duration')*1000).asMinutes()
      const endDate = startDate.clone().add(durationInMinutes, 'minutes')

      return {
        Title: row.get('Title'),
        Description: row.get('Description'),

        StartDate: startDate.toDate().toISOString(),
        EndDate: endDate.toDate().toISOString(),
        DurationInMinutes: durationInMinutes,

        Place: row.get('Place'),
        Person: row.get('Person'),
        Email: row.get('Email'),
      }
    })

    return allRows

  } catch (error) {
    console.log(error);
  }
}
