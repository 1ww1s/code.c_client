import { comparer } from "mobx"
import { useRef, useEffect } from "react"

export const useObserver = function(contentRef, callback, nameClassTargetElem){

    let options = {
        rootMargin: '-50px'
    }

    const observer = useRef()
    useEffect(() => { 
        const targets = document.querySelectorAll(`.${nameClassTargetElem}`)
        if(targets.length === 0) return
        if(observer.current) observer.current.disconnect()
        const cb = function(entries, observer){
            entries.map(entry => {
                if(entry.isIntersecting){
                    callback(entry.target)
                    observer.unobserve(entry.target);
                }
            })
        };
        observer.current = new IntersectionObserver(cb, options)
        
        for(let target of targets){
            observer.current.observe(target)
        }
    }, [contentRef])
}

