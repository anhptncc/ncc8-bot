import { Injectable } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';

@Injectable()
export class GoogleSheetsService {
  private sheets: sheets_v4.Sheets;

  constructor() {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  async readSheet(spreadsheetId: string, range: string) {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
  }
}
