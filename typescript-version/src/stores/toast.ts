import { defineStore } from "pinia"
import { shallowReactive } from "vue"

export const useToastStore = defineStore("toast", () => {
const toasts = shallowReactive<{
message: string
color: string
}[]>([])

function create(conf: typeof toasts[0]) {
  toasts.push(conf)
}
function remove(conf: typeof toasts[0]) {
  toasts.splice( toasts.indexOf(conf) >>> 0,  1)
}


return { toasts, create, remove }
})
