class ReactiveObjectPX {
    constructor(raw) {
        this.effects = new Map()
        let self = this
        raw.add_effect = function (key, fun) {
            let effect_set = self._get_effects(key)
            effect_set.add(fun)
        }
        return new Proxy(raw, {
            set(target, key, value) {
                Reflect.set(target, key, value)
                let effects = self._get_effects(key)
                effects.forEach(function (effect) {
                    effect(key, value)
                })
                return true
            }
        })
    }

    _get_effects(key) {
        let effect_set = this.effects[key]
        if (effect_set == null) {
            effect_set = new Set()
            this.effects[key] = effect_set
        }
        return effect_set
    }


}