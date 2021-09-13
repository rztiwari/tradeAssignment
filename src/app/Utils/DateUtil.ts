export default class DateUtil {

    // Regext for valid date format DD-MM-YYYY
    private static rgexp: RegExp = /(^(((0[1-9]|1[0-9]|2[0-8])[-](0[1-9]|1[012]))|((29|30|31)[-](0[13578]|1[02]))|((29|30)[-](0[4,6,9]|11)))[-](19|[2-9][0-9])\d\d$)|(^29[-]02[-](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;

    // Utility to convert string date DD/MM/YYYY into long date at the date change.
    public static getLongTimeFromString(date: string): number {
        if (date) {
            let dateToTest = date.replace(/\//g, '-');
            const isValidDate = this.rgexp.test(dateToTest);
            if (isValidDate) {
                const arr = dateToTest.split('-');
                const day = parseInt(arr[0]);
                const month = parseInt(arr[1]) - 1;
                const year = parseInt(arr[2]);
                const timeZoneOffset = new Date().getTimezoneOffset()
                const longTime = new Date(year, month, day).getTime() - timeZoneOffset * 60 * 1000;
                return longTime;
            } else {
                throw new TypeError('Invalid Date format');
            }
        } else {
            throw new TypeError('Invalid Date format');
        }
    }

    // Utility to get String date DD/MM/YYYY from the long format
    public static getStringDateFromLong(time: number): string {
        if (time && time > 0) {
            const dateVal = new Date(time);
            const month = dateVal.getMonth() + 1;
            let strMonth = '' + month;
            if (month < 10) {
                strMonth = '0' + month;
            }
            const strDate = `${dateVal.getDate()}/${strMonth}/${dateVal.getFullYear()}`;
            return strDate;
        } else {
            throw new TypeError('Long time not provided')
        }
    }

    // Utility to get the today's time at the time of date change.
    public static getTodayLongDate(): number {
        const currDate = new Date();
        const year = currDate.getFullYear();
        const month = currDate.getMonth();
        const day = currDate.getDate();
        const longTime = new Date(year, month, day).getTime() - new Date().getTimezoneOffset() * 60 * 1000;
        return longTime;
    }
}