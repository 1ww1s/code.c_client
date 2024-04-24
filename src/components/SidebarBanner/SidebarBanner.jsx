import { useRef } from "react"


const SidebarBanner = function(){
    const refBlock = useRef()



    return (
        <div>
            <div id="yandex_rtb_R-A-7815909-1"></div>
                <script>
                    {window.yaContextCb.push(()=>{
                        Ya.Context.AdvManager.render({
                            "blockId": "R-A-7815909-1",
                            "renderTo": "yandex_rtb_R-A-7815909-1"
                        })
                    })
                }
            </script>
        </div>
    )
}

export default SidebarBanner