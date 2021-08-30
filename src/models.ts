export interface KeyValue {
  [key: string]: any
}

export namespace ReducerInterface {
	export interface Action {
		type: number
		payload: any
	}
}