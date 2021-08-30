/**
 *
 * Signaller is a Helper module for Redux.
 *
 * Aim of this helper is to remove store and reducer file garbage and adopt them into low code environment.
 * With Signaller module, your each components will broadcast a signal around the application then if a component needs that, will grab that data.
 *
 * Think it as a bus topology, any broadcasted signals in the bus will be only retrieved by relevant nodes.
 *
 * Dont forget to install "redux, react-redux"
 *
 */
import React from 'react';
import { Store } from "redux";
import { Provider } from 'react-redux';
import { KeyValue } from './models';
declare class RDBroadcast {
    private initialState;
    store: Store;
    private reducer;
    /**
     *
     * Public Methods
     *
    */
    setInitialState: (obj: KeyValue) => void;
    /**
     *
     * @param devtoolEnabled This parameter currently not working, we can modify it for furthere use.
     * @param middlewares Define as you want as middlewares for your store.
     */
    createStore: (devtoolEnabled: boolean, ...middlewares: any[]) => void;
    /**
     *
     * @param signalName This is the "type" of dispatch in redux
     * @param payload This is th "payload" of dispatch in redux
     */
    broadcast: (signalName: string, payload: any) => void;
    storeChecker: (callback: (state: boolean) => void, timer: number) => void;
    hoc: <T>(Wrapper: any, WrapperStyle: KeyValue, MainComponent: React.ComponentType<any>) => React.ComponentType<T>;
    Dhoc: <T>(Wrapper: any, WrapperStyle: KeyValue) => any;
}
export { RDBroadcast, Provider };
