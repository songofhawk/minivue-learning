class ActiveObject {
    constructor(raw) {
        this.raw = raw
        this.effects = new Map()
        let self = this
        for (let key in raw) {
            Object.defineProperty(this, key,
                {
                    get: function () {
                        return raw[key]
                    },
                    set: function (value) {
                        raw[key] = value
                        let effects = self._get_effects(key)
                        effects.forEach(function (effect) {
                            effect(key, value)
                        })
                    }
                });
        }
    }

    _get_effects(key) {
        let effect_set = this.effects[key]
        if (effect_set == null) {
            effect_set = new Set()
            this.effects[key] = effect_set
        }
        return effect_set
    }

    add_effect(key, fun) {
        let effect_set = this._get_effects(key)
        effect_set.add(fun)
    }

}