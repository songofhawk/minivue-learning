let currentEffect;

class Dep {
    // 1.收集依赖
    constructor(val) {
        this.effects = new Set()
        this._val = val
    }
    get value(){
        this.depend()
        return this._val
    }
    set value(newVal){
        this._val = newVal
        this.notice()
    }
    depend(){
        if (currentEffect){
            this.effects.add(currentEffect)
        }
    }
    // 2.触发依赖
    notice(){
        // 触发之前收集到的依赖
        this.effects.forEach((effect)=>{
            effect()
        })
    }
}

const dep = new Dep(10)
function effectWatch(effect){
    currentEffect = effect
    effect()
    currentEffect = null
}


let b
effectWatch(()=>{
    console.log("heihei")
    b = dep.value + 10
})

// 值发生变化
dep.value = 20
