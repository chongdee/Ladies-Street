// 防抖
export function debounce(fn, delay = 100) {
    let timer = null;

    return function(...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn(...args)
        }, delay);
    }

    console.log('防抖');

}