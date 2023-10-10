 let timer: ReturnType<typeof setTimeout>

 export default function debounce(func: Function, wait = 1000) {
     clearTimeout(timer)
     timer = setTimeout(func, wait)
 }