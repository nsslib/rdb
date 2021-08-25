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
import { KeyValue, ReducerInterface } from './models';
declare class RDBroadcast {
    protected initialState: KeyValue;
    store: Store;
    protected reducer: (state: any, action: ReducerInterface.Action) => void;
    /**
     *
     * Public Methods
     *
    */
    setInitialState: (obj: KeyValue) => void;
    createStore: (devtoolEnabled: boolean, ...middlewares: any[]) => void;
    broadcast: (value: ReducerInterface.BroadCast) => void;
    storeChecker: (callback: (state: boolean) => void, timer: number) => void;
    hoc: <T>(Wrapper: any, WrapperStyle: KeyValue, MainComponent: React.ComponentType<any>) => React.ComponentType<T>;
    Dhoc: <T>(Wrapper: any, WrapperStyle: KeyValue) => any;
}
export { RDBroadcast, Provider };
