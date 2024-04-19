import { HOME_ROUTE } from "../../utils/consts"
import CreateFragment from "../Admin/CreateFragment/CreateFragment"
import Image from "../Fragments/Image/Image"
import TextHome from "../Fragments/TextHome/TextHome"
import About from "./HomePage/About/About"
import InformationAboutC from "./HomePage/InformationAboutC/InformationAboutC"
import JoinUs from "./HomePage/JoinUs/JoinUs"
import Main from "./HomePage/Main/Main"



export const choiceHomeArticles = function(fragments, title, ind){
    if(!fragments) return
    switch (ind){
        case 0:
            return <Main key={ind} fragments={fragments} title={title} />
        case 1:
            return <About key={ind} fragments={fragments} title={title} />
        case 2:
            return <InformationAboutC key={ind} fragments={fragments} title={title} />
        case 3:
            return <JoinUs key={ind} fragments={fragments} title={title} />
    }
}

export const click = function(fragment){
    fragment.setStatus('change')
}

export const isHome = function(location){
    if(location.pathname === HOME_ROUTE) return choiceElem
    return choiceElemUpdate
}

export const choiceElem = function(fragment, i, classes) {
    return  <div key={i}  className={classes.elem}>
                {   fragment.type === 'text'
                        ?
                    <TextHome   
                        classNameText={classes.text} 
                        fragment={fragment} />
                        :
                    <Image 
                        className={classes.image} 
                        fragment={fragment} />    
                }
         </div>
}

export const choiceElemUpdate = function(fragment, i, classes) {
    return  <div key={i}  className={classes.elem}>
                {   fragment.status === 'change' 
                        ?
                    <CreateFragment id={i} />
                        :
                    fragment.type === 'text'
                        ?
                    <TextHome 
                        onMouseDown={(event)=>{
                            if (event.detail > 1) event.preventDefault();
                        }}
                        onDoubleClick={() => click(fragment)}    
                        classNameText={classes.text} 
                        fragment={fragment} />
                        :
                    <Image 
                        onMouseDown={(event)=>{
                            if (event.detail > 1) event.preventDefault();
                        }}
                        onDoubleClick={() => click(fragment)}    
                        className={classes.image} 
                        fragment={fragment} />    
                }
            </div>
}