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
    private initialState: KeyValue;
    public store: Store; // redux store

    private reducer = (state: any = this.initialState, action: ReducerInterface.Action): void => {
        let data: any = {} // any data for your signal

        try {
            data[action.type] = action.payload;
            state = {...state, ...data};
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

    public setInitialState = (obj: KeyValue): void => {
        this.initialState = obj;
    }

    /**
     * 
     * @param devtoolEnabled This parameter currently not working, we can modify it for furthere use.
     * @param middlewares Define as you want as middlewares for your store.
     */
    public createStore = (devtoolEnabled: boolean, ...middlewares: any[]): void => {
        if(devtoolEnabled) console.log("[+] Redux devtool enabled, but there are no devtool plugin!");
        this.store = createStore(
            this.reducer,
            applyMiddleware(...middlewares)
        )
    }

    /**
     * 
     * @param signalName This is the "type" of dispatch in redux
     * @param payload This is th "payload" of dispatch in redux
     */
    public broadcast = <T>(signalName: string, payload: T): void => {
        this.store ? this.store.dispatch({type: signalName, payload}) : console.error('[-] Store is not ready.')
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