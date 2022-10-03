interface StateConfig {
    name?: string
    onEnter?: () => void 
    onUpdate?: (dt: number) => void
    onExit?: () => void
}

export default class StateMachine
{
    private context?: any
    private name: string
    private states = new Map<string, StateConfig>()

    private currentState?: StateConfig
    private isSwitchingState = false
    private stateQeue: string[] = []

    constructor(context?: any, name?: string) {
        console.log("STATEMACHINE")
        this.context = context
        this.name = name ?? 'machine'
    }

    addState(name: string, config?: StateConfig) {
        this.states.set(name, {
            name,
            onEnter: config?.onEnter?.bind(this.context),
            onUpdate: config?.onUpdate?.bind(this.context),
            onExit: config?.onExit?.bind(this.context)
        })

        return this
    }

    isCurrentState(name: string){
        if (!this.currentState)
            return false

        return this.currentState.name === name
    }

    setState(name: string) {
        if (!this.states.has(name))
            return

        if (this.isSwitchingState) {
            this.stateQeue.push(name)
            return
        }

        this.isSwitchingState = true

        console.log(`[StateMachine (${this.name})] change from ${this.currentState?.name ?? 'none'} to ${name}`)
        
        if (this.currentState && this.currentState.onExit) 
            this.currentState.onExit()

        this.currentState = this.states.get(name)!

        if (this.currentState?.onEnter)
            this.currentState?.onEnter()

        this.isSwitchingState = false

        return this
    }

    update(dt: number) {
        if (this.stateQeue.length > 0) {
            const name = this.stateQeue.shift()
            this.setState(name)
            return
        }

        if(!this.currentState)
            return

        if(this.currentState.onUpdate)
            this.currentState.onUpdate(dt)
    }
}