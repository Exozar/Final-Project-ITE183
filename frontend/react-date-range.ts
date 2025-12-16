declare module 'react-date-range' {
    export interface Range {
        startDate?: Date;
        endDate?: Date;
        key?: string;
    }


    export interface RangeKeyDict {
        [key: string]: Range;
    }


    export const DateRange: any;
    export const DateRangePicker: any;
    export const Calendar: any;
    export const DefinedRange: any;
    export const createStaticRanges: any;
    export const defaultInputRanges: any;
    export const defaultStaticRanges: any;
}
