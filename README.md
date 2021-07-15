# Typeface
![image info](https://typeface.atishi.me/static/media/logo_small.649c3852.png)
<!-- [![Build Status]()]() -->

Typeface is a fast, lightweight  and easy to use rich text editor package for react.js
You can checkout a live demo [here](https://typeface.atishi.me/)

## Features
- Add responsive images and videos
- Change font colour
- View and edit html for your text
- provide a custom label and description to your editor

## Installation

Install using npm 
```
npm install --save typeface-editor
```


## Parameters

| Parameter | Value | Required 
| ------ | ------ | ------ 
| getdata | Function | Required
| value | String | Optional
| options | Array of strings | Optional
| label | String | Optional
| description | String | Optional
| theme | String | Optional

## Options
```
const optionalData = [
  "blockquote",
  "video",
  "code",
]
```
## Usage

```
import React,{ useState } from "react"
import Typeface from "typeface-editor"

function App() {

const [data,setData] = useState("");

const additionalOptions = [
"blockquote",
"video",
"code",
]

return (
<div>
  <Typeface
    options={additionalOptions}
    label="Typeface Editor Demo"
    description="rich text editor for react"
    theme='#FFCA41'
    value = "<h1>Hello World</h1>"
    getdata={(value)=>setData(value)}
  />
</div>
)
}
```