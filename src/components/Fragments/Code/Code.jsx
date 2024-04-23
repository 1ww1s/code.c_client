import markdownit from 'markdown-it';
import hljs from 'highlight.js'
import { observer } from "mobx-react-lite"
import classes from './code.module.css'
import 'highlight.js/styles/vs.css';

const Code = function({fragment, ...props}){
    const md = markdownit({
        html: true,
        highlight: function (str, lang) {

          if (lang && hljs.getLanguage(lang)) {
            try {
              return '<pre><code class="c">' +
                     hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                     '</code></pre>';
            } catch (__) {}
          }
          
          return '<pre><code class="c">' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    });
       
    function addSing(text){
        const newText = '```c\n' + text + '\n```'
        return newText
    }

    function getCountRow(text){
        let count = 0;
        let length = text.length;
        for(let i = 0; i < length; i++){
            if(text[i] === '\n') count++
        }
        return count + 1
    }

    function getMasRow(text){
        let count = getCountRow(text)
        let mas = []
        for(let i = 0; i < count; i++){
            mas.push(i + 1)
        }
        return mas
    }

    function render(text){
        text = addSing(text)
        return md.render(text)
    }

    return (
        <div
            {...props}
            className={classes.container}
        >
            <h2 id={fragment.title}>{fragment.title}</h2>
            <div className={classes.codeBox}>
                <div className={classes.numbDiv}>{getMasRow(fragment.text).map((numb, ind) => 
                        <p key={ind} className={classes.numb}>{numb}</p>
                     )}
                </div>
                <div className={classes.code} dangerouslySetInnerHTML={{__html: render(fragment.text)}}></div>
            </div>
            
        </div>
    )
}

export default observer(Code)