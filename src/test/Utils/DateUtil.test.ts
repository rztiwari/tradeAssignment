import DateUtil from "../../app/Utils/DateUtil"

describe('Testing the date utils features', () => {

    // let dateUtil: DateUtil;

    // beforeEach(() => {
    //     dateUtil = new DateUtil();
    // })

    test('get Long Time From String test', () => {
        let longVal = new Date(2022, 11, 20).getTime() - (new Date().getTimezoneOffset()) * 60 * 1000
        let val = DateUtil.getLongTimeFromString('20/12/2022');
        expect(val).toEqual(longVal);

        longVal = new Date(2020, 2, 31).getTime() - (new Date().getTimezoneOffset()) * 60 * 1000
        val = DateUtil.getLongTimeFromString('31/03/2020');
        expect(val).toEqual(longVal);

        longVal = new Date(2024, 1, 29).getTime() - (new Date().getTimezoneOffset()) * 60 * 1000
        val = DateUtil.getLongTimeFromString('29/02/2024');
        expect(val).toEqual(longVal);
    });

    test('should throw error for no date value in getLongTimeFromString method', () => {
        expect(() => {
            DateUtil.getLongTimeFromString('')
        }).toThrow('Invalid Date format');
    });

    test('should throw error for invalid date value in getLongTimeFromString method', () => {
        expect(() => {
            DateUtil.getLongTimeFromString('dsddsd')
        }).toThrow('Invalid Date format');
        expect(() => {
            DateUtil.getLongTimeFromString('33/11/2011')
        }).toThrow('Invalid Date format');
        expect(() => {
            DateUtil.getLongTimeFromString('20 03 2031')
        }).toThrow('Invalid Date format');
    });

    test('check for value getStringDateFromLong', () => {
        let longVal = new Date(2021, 8, 12).getTime() - new Date().getTimezoneOffset() * 60 * 1000;
        let val = DateUtil.getStringDateFromLong(longVal);
        expect(val).toEqual('12/09/2021');

        longVal = new Date(2022, 9, 30).getTime() - new Date().getTimezoneOffset() * 60 * 1000;
        val = DateUtil.getStringDateFromLong(longVal);
        expect(val).toEqual('30/10/2022');
    });

    test('test for fecting todays long date', () => {
        const currDate = new Date();
        const year = currDate.getFullYear();
        const month = currDate.getMonth();
        const day = currDate.getDate();
        let longVal = new Date(year, month, day).getTime() - new Date().getTimezoneOffset() * 60 * 1000;
        let val = DateUtil.getTodayLongDate();
        expect(val).toEqual(longVal);
    });
})