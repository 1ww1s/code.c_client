import { useEffect, useRef } from "react"
import classes from './sidebarBanner.module.css'


const SidebarBanner = function(){
    const refBlock = useRef()

    useEffect(() => {
        const yaScript = document.createElement('script')
        yaScript.setAttribute('type', 'text/javascript')
        yaScript.innerHTML = `
        window.yaContextCb.push(()=>{
            Ya.Context.AdvManager.render({
                "blockId": "R-A-7815909-1",
                "renderTo": "yandex_rtb_R-A-7815909-1"
            })
        })`
    
        refBlock.current.append(yaScript)
    }, [])

    return (
        <div ref={refBlock} className={classes.container}>
            <div id="yandex_rtb_R-A-7815909-1"></div>
        </div>
    )
}

export default SidebarBanner