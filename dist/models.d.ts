export interface KeyValue {
    [key: string]: any;
}
export declare namespace ReducerInterface {
    interface Action {
        type: number;
        payload: Payload;
    }
    interface Payload extends KeyValue {
    }
    interface BroadCast {
        key: string;
        value: any;
    }
}
