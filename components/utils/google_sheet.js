import { GoogleSpreadsheet } from "google-spreadsheet";
import moment from 'moment'

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);

export async function getSheetData() {
  try {

    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    });

    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[process.env.GOOGLE_SHEET_ID]
    const rows = await sheet.getRows()

    // filter the rows to only show the rows needed
    const filteredRows = rows.filter(row => (row.IsHappening === "TRUE" && row.IsReady === "TRUE" ) )

    // adjust rows to match
    const allRows = filteredRows.map((row) => {

      const startDate = moment( row.Date +' '+ row.Time )
      const durationInMinutes = moment.duration(row.Duration).asMinutes()
      const endDate = startDate.clone().add(durationInMinutes, 'minutes')

      return {
        Title: row.Title,
        Description: row.Description,

        StartDate: startDate.toDate().toISOString(),
        EndDate: endDate.toDate().toISOString(),
        DurationInMinutes: durationInMinutes,

        // Date: row.Date ? row.Date : null,
        // Time: row.Time ? row.Time : null,
        // Duration: row.Duration ? row.Duration : null,
        Place: row.Place,
        Person: row.Person,
        Email: row.Email,

        // isHappening: row.IsHappening === "TRUE" ? true : false
      }
    })

    return allRows

  } catch (error) {
    console.log(error);
  }
}
