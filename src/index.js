/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import './editor.css'

const Typeface = ({ label,description,options,theme,...props }) => {
    const [align, setAlign] = useState("justifyLeft");
    const [active, setActive] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);
    const [bold, setBold] = useState(false);
    const [color, setColor] = useState("#010101");
    const [setcolor, setSetcolor] = useState(false);
    const [uList, setUList] = useState(false);
    const [oList, setOList] = useState(false);
    const [script, setScript] = useState("");
    const [block, setBlock] = useState(false);
    const [preblock, setPre] = useState(false);
    const [font, setFont] = useState("p");
    const [fontLabel, setFontLabel] = useState('Paragraph');
    const [code,setCode] = useState(false);
    const inputEl = useRef(null);
    const editor = useRef(null);
    const inputE2 = useRef(null);
    const colorRef = useRef(null);

    useEffect(() => {
        onFocus();
        document.execCommand('formatBlock', false, 'p');
    }, [])

    //  function to get container in focus
    const onFocus = () => {
        editor.current.focus();
    }
    //1.  undo redo buttons (No Permanent Highlight)
    const undoRedoHandler = (e) => {
        onFocus();
        var search = e.currentTarget.getAttribute('data-cmd')
        document.execCommand(search);
        selectHandler();
    }
    //2.  align- left,right,center,justify handler
    const alignHandler = (e) => {
        onFocus();
        document.execCommand(e.currentTarget.getAttribute('data-cmd'));
        setAlign(e.currentTarget.getAttribute('data-cmd'));
    }
    // 3. Bold
    const boldHandler = (e) => {
        document.execCommand("styleWithCSS", true, null);
        document.execCommand('bold', false, null);
        setBold(!bold);
        onFocus();
    }
    // 4. Italic
    const italicHandler = (e) => {
        document.execCommand("styleWithCSS", true, null);
        document.execCommand('italic', false, null);
        setItalic(!italic);
        onFocus();
    }
    // 5. Underline
    const underlineHandler = (e) => {
        document.execCommand("styleWithCSS", true, null);
        document.execCommand('underline', false, null);
        setUnderline(!underline);
        onFocus();
    }
    //  6. Link
    const linkHandler = () => {
        let url = prompt("Enter link here", "");
        const linkURL = `<a target='__blank' class='rte-link' href="${url}">${url}</a>`
        document.execCommand('inserthtml', false, linkURL);
        // document.execCommand('createLink', false, url);
        onFocus();
    }
    //  7. Image
    const handleUploadImg = () => {
        inputE2.current.click();
        onFocus();
    }
    const imgHandler = (e) => {
        let reader = new FileReader();
            reader.onload = (e) => {
                const imgurl = `<img class="rte-image" src="${e.target.result}"/></br></br>`
                document.execCommand('inserthtml', false, imgurl);
            };
        reader.readAsDataURL(e.target.files[0]);  
        onFocus();
    }
    // 8. Video 
    // const handleUpload = () => {
    //     inputEl.current.click();
    //     onFocus();
    // }
    const vidHandler = () => {
        let urlPrompt = prompt("Enter youtube link here","");
        if(urlPrompt !== null){
            var url = urlPrompt.replace("watch?v=", "embed/");
            var embed = '<iframe class="rte-video" title="YouTube video player" src="'+url+'" allowfullscreen="true" width="500" frameborder="0" height="300">';
            document.execCommand('Inserthtml',false,embed);
        }
        onFocus();
    }
    //  9. Ordered List
    const OlistHandler = (e) => {
        setUList(false);
        setOList(true);
        onFocus();
        document.execCommand('insertOrderedList');
    }
    // 10. Unordered List
    const UlistHandler = (e) => {
        setUList(true);
        setOList(false);
        onFocus();
        document.execCommand('insertUnorderedList');
    }
    // 11. Subscript and Superscript
    const scriptHandler = (e) => {
        onFocus();
        var search = e.currentTarget.getAttribute('data-cmd')
        document.execCommand(e.currentTarget.getAttribute('data-cmd'));
        if (script === search) setScript("");
        else setScript(search);
    }
    // 12. Blockquote
    const blockHandler = () => {
        onFocus();
        document.execCommand('formatblock', false, '<blockquote>');
        setBlock(!block);
        if (block) document.execCommand('formatblock', false, 'p');
        if (!block) setPre(false);
    }
    // 13. Codeblock
    const preHandler = () => {
        onFocus();
        document.execCommand('formatblock', false, '<pre>');
        setPre(!preblock);
        if (preblock) document.execCommand('formatblock', false, 'p');
        if (!preblock) setBlock(false);
    }
    //  14. Font Size
    const fontHandler = (e) => {
        // setFont(e.currentTarget.getAttribute('data-cmd'));
        if(active) setActive(false);
        else setActive(true);
    }
    const fontSetter = (e) => {
        onFocus();
        setFont(e.currentTarget.getAttribute('data-cmd'));
        document.execCommand('formatBlock', false, e.currentTarget.getAttribute('data-cmd'));
        setFontLabel( e.currentTarget.getAttribute('title'))
        setActive(false);

    }
    // 15. font color
    const colorHandler = (e) => {
        onFocus();
        setColor(e.target.value);
        document.execCommand("styleWithCSS", true, null);
        document.execCommand('foreColor', false, e.target.value);
        setSetcolor(true);
    }
    // ----> rgb to hex
    const componentToHex = (c) => {
        let hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
    const rgbToHex = (r, g, b) => {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    // 16. code handler
    const codeHandler = () => {
        setCode(!code);
        if(!code){
            editor.current.innerText = editor.current.innerHTML
        } else {
            editor.current.innerHTML = editor.current.innerText
        }
    }

    // 17. Handlers
    const selectHandler = () => {
        // ---- getting selection object and details ---
        const selection = window.getSelection();
        const selected = selection.anchorNode.parentNode;
        const styles = selected.style;
        // Bold
        if (document.queryCommandState('bold')) setBold(true);
        else setBold(false);
        // Italic
        if (document.queryCommandState('italic')) setItalic(true);
        else setItalic(false);
        // Underline
        if (document.queryCommandState('underline')) setUnderline(true);
        else setUnderline(false);
        // Align
        if (document.queryCommandState('justifyRight')) setAlign("justifyRight");
        else if (document.queryCommandState('justifyCenter')) setAlign("justifyCenter");
        else if (document.queryCommandState('justifyFull')) setAlign("justifyFull");
        else setAlign("justifyLeft");
        //  Unordered List & Unordered List
        if (document.queryCommandState('insertUnorderedList')) { setUList(true); setOList(false); }
        else if (document.queryCommandState('insertOrderedList')) { setUList(false); setOList(true); }
        else { setUList(false); setOList(false); }
        // Subscript and Superscript
        if (document.queryCommandState('subscript')) { setScript('subscript'); }
        else if (document.queryCommandState('superscript')) { setScript('superscript'); }
        else { setScript(''); }
        // Blockquote
        if (document.queryCommandValue('formatblock') === "blockquote") { setBlock(true); setPre(false); }
        else setBlock(false);
        // Codeblock
        if (document.queryCommandValue('formatblock') === "pre") { setPre(true); setBlock(false); }
        else setPre(false);
        //  Font Size
        if (document.queryCommandValue('formatblock') === "h1") setFont('h1');
        else if (document.queryCommandValue('formatblock') === "h6") setFont('h6');
        else if (document.queryCommandValue('formatblock') === "h2") setFont('h2');
        else if (document.queryCommandValue('formatblock') === "h3") setFont('h3');
        else if (document.queryCommandValue('formatblock') === "h4") setFont('h4');
        else if (document.queryCommandValue('formatblock') === "h5") setFont('h5');
        else if (document.queryCommandValue('formatblock') === "div") setFont('p');
        else if (document.queryCommandValue('formatblock') === "p") setFont('p');
        // Colour (Setting and Checking) 
        if (setcolor) {
            document.execCommand("styleWithCSS", false, "true");
            document.execCommand('foreColor', false, color);
            setSetcolor(false);
        }
        if (true) {
            for (let i = 0; i < styles.length; i++) {
                if (styles[i] === 'color') {
                    let rgb = styles.color;
                    let start = rgb.indexOf("(");
                    let end = rgb.indexOf(")");
                    let col = rgb.substring(start + 1, end);
                    let colArray = col.split(",");
                    setColor(rgbToHex(parseInt(colArray[0]), parseInt(colArray[1]), parseInt(colArray[2])));
                    break;
                }
            }
            if (document.queryCommandValue('foreColor') === "rgb(0, 0, 0)") setColor("#000000")
            if (document.queryCommandValue('foreColor') === "rgb(255, 255, 255)") setColor("#ffffff")
        }
    }
    // Handling keypresses
    const test = (e) => {
        //  console.log(e.key);
        if (e.key === "Enter") selectHandler();
        else if (e.key === "Backspace") selectHandler();
        else if (e.key === "ArrowDown") selectHandler();
        else if (e.key === "ArrowUp") selectHandler();
        props.getdata(editor.current.innerHTML)
    }


    return (
        <div className="rte-main-container">
            {label?<h2 className='rte-main-container-h2'>{label}</h2>:null}
           {label?
             theme?<div className='label-border' style={{ background:`${theme}`}}></div>:<div className='label-border'></div>
           :null}
            {description?<p className='rte-main-container-p'>{description}</p>:null}
            <div className='rte-icons-container'>
                <button><span data-cmd="undo" onClick={(e) => undoRedoHandler(e)} className="material-icons rte-icon">undo</span></button>
                <button><span data-cmd="redo" onClick={(e) => undoRedoHandler(e)} className="material-icons rte-icon">redo</span></button>
                <button><span data-cmd="justifyLeft" onClick={(e) => { alignHandler(e) }} className={align === `justifyLeft` ? "material-icons rte-icon-active" : "material-icons rte-icon"}>format_align_left</span></button>
                <button><span data-cmd="justifyCenter" onClick={(e) => { alignHandler(e) }} className={align === `justifyCenter` ? "material-icons rte-icon-active" : "material-icons rte-icon"} >format_align_center</span></button>
                <button><span data-cmd="justifyRight" onClick={(e) => { alignHandler(e) }} className={align === `justifyRight` ? "material-icons rte-icon-active" : "material-icons rte-icon"} >format_align_right</span></button>
                <button><span data-cmd="justifyFull" onClick={(e) => { alignHandler(e) }} className={align === `justifyFull` ? "material-icons rte-icon-active" : "material-icons rte-icon"}>format_align_justify</span></button>
                <button><span onClick={linkHandler} className={"material-icons rte-icon"}>link</span></button>
                <button><span data-cmd="insertUnorderedList" onClick={(e) => UlistHandler(e)} className={uList ? "material-icons rte-icon-active" : "material-icons rte-icon"}>format_list_bulleted</span></button>
                <button><span data-cmd="insertOrderedList" onClick={(e) => OlistHandler(e)} className={oList ? "material-icons rte-icon-active" : "material-icons rte-icon"}>format_list_numbered</span></button>
                <button><span data-cmd="subscript" onClick={(e) => { scriptHandler(e) }} className={script === "subscript" ? "material-icons rte-icon-active" : "material-icons rte-icon"}>subscript</span></button>
                <button><span data-cmd="superscript" onClick={(e) => { scriptHandler(e) }} className={script === "superscript" ? "material-icons rte-icon-active" : "material-icons rte-icon"}>superscript</span></button>
                <button><span onClick={(e) => { boldHandler(e) }} className={bold ? "material-icons rte-icon-active" : "material-icons rte-icon"}>format_bold</span></button>
                <button><span onClick={(e) => { underlineHandler(e) }}className={underline ? "material-icons rte-icon-active" : "material-icons rte-icon"}>format_underlined</span></button>
                <button><span onClick={(e) => { italicHandler(e) }} className={italic ? "material-icons rte-icon-active" : "material-icons rte-icon"}>format_italic</span></button>

                <button>
                
                <input ref={colorRef} type="color" className='rte-colour-pallete' onChange={(e) => colorHandler(e)} value={color} />
                <span onClick={()=>colorRef.current.click()} className='material-icons rte-icon' style={{ color: color }}>format_color_text</span>
                </button>

                <button><span onClick={handleUploadImg} className="material-icons rte-icon">image</span></button>
                <input type="file" id="file" ref={inputE2} accept="image/*" onChange={(e) => { imgHandler(e) }} style={{ display: "none" }} />
                
                {options.includes("video")?
                <>
                <button><span onClick={vidHandler} className="material-icons rte-icon">ondemand_video</span></button>
                {/* <input type="file" id="file" ref={inputEl} accept="video/*" onChange={(e) => {vidHandler(e)}} style={{ display: "none" }} /> */}
                </>
                :null}
                
                {options.includes("blockquote") ?
                    <button><span data-cmd="<blockquote>" onClick={blockHandler} className={block ?  "material-icons rte-icon-active" : "material-icons rte-icon"}>format_quote</span></button>
                    : null}
                {options.includes("code") ?
                    <button><span data-cmd="<pre>" onClick={preHandler} className={preblock ?  "material-icons rte-icon-active" : "material-icons rte-icon"}>code</span></button>
                    : null}

                <button onClick={codeHandler}><span className={code ? "material-icons rte-icon-active" : "material-icons rte-icon"}>developer_mode</span></button>

                <button>
                    <div className='rte-font-container'>
                        <span className='rte-font-label' onClick={fontHandler}>
                            
                            <span className='rte-font-display'>
                                <span className="material-icons">text_fields</span>&ensp;
                                {fontLabel}&emsp;
                                { active ?<span className="material-icons">expand_less</span>:<span className="material-icons">expand_more</span>}
                            </span>
                        </span>
                        {
                            active ?
                                <div className='rte-font-dpd'>
                                    <div title='Heading 1' data-cmd="h1" className={font === 'h1' ? 'rte-dpd-item-active' : 'rte-dpd-item'} onClick={(e) => fontSetter(e)}>Heading 1</div>
                                    <div title='Heading 2' data-cmd="h2" className={font === 'h2' ? 'rte-dpd-item-active' : 'rte-dpd-item'} onClick={(e) => fontSetter(e)}>Heading 2</div>
                                    <div title='Heading 3' data-cmd="h3" className={font === 'h3' ? 'rte-dpd-item-active' : 'rte-dpd-item'} onClick={(e) => fontSetter(e)}>Heading 3</div>
                                    <div title='Heading 4' data-cmd="h4" className={font === 'h4' ? 'rte-dpd-item-active' : 'rte-dpd-item'} onClick={(e) => fontSetter(e)}>Heading 4</div>
                                    <div title='Heading 5' data-cmd="h5" className={font === 'h5' ? 'rte-dpd-item-active' : 'rte-dpd-item'} onClick={(e) => fontSetter(e)}>Heading 5</div>
                                    <div title='Heading 6' data-cmd="h6" className={font === 'h6' ? 'rte-dpd-item-active' : 'rte-dpd-item'} onClick={(e) => fontSetter(e)}>Heading 6</div>
                                    <div title='Paragraph' data-cmd="p" className={font === 'p' ? 'rte-dpd-item-active' : 'rte-dpd-item'} onClick={(e) => fontSetter(e)}>Paragraph</div>
                                </div> :
                                null
                        }
                    </div>
                </button>
            </div>

            <div
                contenteditable="true"
                id="myTextField" 
                ref={editor}
                tabindex="1"
                className='rte-editor-container'
                onClick={selectHandler}
                onKeyUp={(e) => test(e)}
            >
            </div>

           
        </div>
    )
}




export default Typeface
