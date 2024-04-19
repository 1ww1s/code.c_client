import React from "react";
import classes from './markdown.module.css'
import ExampleMarkdown from "../../ExampleMarkdown/ExampleMarkdown";

const MarkdownInfo = function({onHide}){
    

    
    return (
        <div onClick={(e) => {e.stopPropagation(); onHide()}} className={classes.container}>
            <div onClick={(e) => e.stopPropagation()} className={classes.content}>
                <b>Markdown</b> — облегчённый язык разметки, созданный с целью обозначения форматирования в простом тексте,
                с максимальным сохранением его читаемости человеком, и пригодный для машинного преобразования в языки
                для продвинутых публикаций (HTML, Rich Text и других).
                <h2>Перенос строки</h2>
                    Для переноса строки внутри одного параграфа есть три метода:
                    <ul>
                        <li>поставить в конце строки два или больше пробела <span className={classes.highlight}>&nbsp;&nbsp;</span>;</li>
                        <li>поставить в конце строки обратную косую черту <span className={classes.highlight}>\</span> (лучше всего);</li>
                        <li>использовать HTML-тег <span className={classes.highlight}>{`<br>`}</span></li>
                    </ul>
                <h2>Нумерованный список</h2>
                    Для создания нумерованного списка перед пунктами нужно поставить число 
                    с точкой <span className={classes.highlight}>n.</span>: <br />
                    <ExampleMarkdown ind={0} markdownValue={`1. Первый пункт<br>\n2. Второй пункт<br>\n3. Третий пункт`} />
                  
                <h2>Ненумерованный список</h2>
                    Для создания ненумерованного списка нужно поставить перед каждым пунктом 
                    звёздочку <span className={classes.highlight}>*</span>,
                    дефис <span className={classes.highlight}>-</span> или 
                    плюс <span className={classes.highlight}>+</span>:
                    <ExampleMarkdown ind={1} markdownValue={`* Первый пункт<br>\n* Второй пункт<br>\n* Третий пункт`} />

                <h2>Таблица</h2>
                    Столбцы разделяются вертикальными линиями <span className={classes.highlight}>|</span>, 
                    а строка с шапкой отделяется от остальных дефисами <span className={classes.highlight}>-</span>, 
                    которых можно ставить сколько угодно:
                    <ExampleMarkdown ind={2} markdownValue={`|Столбец 1|Столбец 2|Столбец 3|<br>\n|-|--------|---|<br>\n|Запись в столбце 1|Запись в столбце 2|Запись в столбце 3|<br>\n|Кртк зпс| |Слева нет записи|`} />
                    Чтобы выровнять весь столбец по правому краю, в строке с дефисами сразу после дефисов можно поставить 
                    двоеточие <span className={classes.highlight}>:</span>. Чтобы выровнять содержимое по центру, 
                    надо поставить двоеточия с обеих сторон:
                    <ExampleMarkdown ind={3} markdownValue={`| text | text | text |<br>\n| :---- | :----: | -----: |<br>\n| text | text | text |<br>\n| text | text | text |`} />
                    Чтобы сделать перенос строки в ячейке, нужно использовать специальный тег <span className={classes.highlight}>&lt;br&gt;</span>
                <h2>Подробнее</h2>
                    Более подробнее об markdown можно почитать в следующих источниках:
                    <ul>
                        <li><a target="_blank" href="https://skillbox.ru/media/code/yazyk-razmetki-markdown-shpargalka-po-sintaksisu-s-primerami/">Язык разметки Markdown: шпаргалка по синтаксису с примерами</a></li>
                        <li><a target="_blank" href="https://ru.wikipedia.org/wiki/Markdown/">Markdown — облегчённый язык разметки, созданный с целью обозначения форматирования... </a></li>
                        <li><a target="_blank" href="https://codebeautify.org/markdown-to-html/">Из markdown в HTML (Convert)</a></li>
                    </ul>
            </div>
        </div>
        
    )
}

export default MarkdownInfo