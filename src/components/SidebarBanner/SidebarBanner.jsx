import { useEffect, useRef } from "react"

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
        <div ref={refBlock}>
            <div id="yandex_rtb_R-A-7815909-1"></div>
        </div>
    )
}

export default SidebarBanner