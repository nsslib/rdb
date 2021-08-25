export interface KeyValue {
  [key: string]: any
}

export namespace ReducerInterface {
	export interface Action {
		type: number
		payload: Payload
	}

	export interface Payload extends KeyValue { }

	export interface BroadCast {
		key: string
		value: any
	}
}