import { Connection, getConnection } from 'typeorm';

export class Common {
    public static parseCommaDelimitedToArray(str: string): string[] {
        return str !== '' ? str.split(',') : [];
    }

    public static spredArrayToCommaDelimiterString(array: string[]): string {
        return array.length > 0 ? array.join(',') : '';
    }

    public static getDbConnection(dbConnection?: Connection): Connection {
        if (!dbConnection) {
            return getConnection();
        }
        return dbConnection;
    }

    public static allPropertiesAreNull(obj: any): boolean {
        for (const key in obj) {
            if (obj[key] !== null && obj[key] !== '') {
                return false;
            }
        }
        return true;
    }
}
