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

// 3th party
import React from 'react'
import { createStore, applyMiddleware, Store } from "redux";
import { connect, Provider } from 'react-redux'

// interfaces
import { KeyValue, ReducerInterface } from './models'

class RDBroadcast {
    protected initialState: KeyValue;
    public store: Store; // redux store

    protected reducer = (state: any = this.initialState, action: ReducerInterface.Action): void => {
        let _state: any = {}

        try {
            _state[action.payload.key] = action.payload.value;
            state = {...state, ..._state};
        } catch (error) {
            // prevents uninitialized key errors, we know what the heck is the error!!!
        }

        return state;
    }

    /** 
     * 
     * Public Methods
     * 
    */

    // 1) enable devtool, 2) insert initial state, 3) define middlewares as many as you want...
    public setInitialState = (obj: KeyValue): void => {
        this.initialState = obj;
    }

    public createStore = (devtoolEnabled: boolean, ...middlewares: any[]): void => {
        if(devtoolEnabled) console.log("[+] Redux devtool enabled, but there are no devtool plugin!");
        this.store = createStore(
            this.reducer,
            applyMiddleware(...middlewares)
        )
    }

    public broadcast = (signalName: string, payload: any): void => {
        this.store ? this.store.dispatch({type: signalName, payload: payload}) : console.error('[-] Store is not ready.')
    }

    public storeChecker = (callback: (state: boolean) => void, timer: number): void => {
        const storeChecker = setInterval(() => {
            if(this.store) {
                callback(true);
                clearInterval(storeChecker);
            } else { console.log("[!] waiting for store...") }
        }, timer)
    }

    public hoc = <T>(
        Wrapper: any,
        WrapperStyle: KeyValue,
        MainComponent: React.ComponentType<any>): React.ComponentType<T> => {

        const styleObject = WrapperStyle ? WrapperStyle : {};

        class Base extends React.Component {
            render() {
                return React.createElement(
                    Wrapper,
                    styleObject,
                    React.createElement(
                        MainComponent,
                        this.props
                    )
                )
            }
        }

        return connect(
            (state: any) => state, 
            null
        )(Base) as React.ComponentType<T>;
    }

    public Dhoc = <T>(
        Wrapper: any,
        WrapperStyle: KeyValue): T | any => {

        const styleObject = WrapperStyle ? WrapperStyle : {};

        return (MainComponent: React.ComponentType<any>): T | any => {

            class Base extends React.Component {
                render() {
                    return React.createElement(
                        Wrapper,
                        styleObject,
                        React.createElement(
                            MainComponent,
                            this.props
                        )
                    )
                }
            }

            return connect(
                (state: any) => state, 
                null
            )(Base);
        }
    }
}

export {
    RDBroadcast,
    Provider
}