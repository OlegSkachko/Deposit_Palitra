import React, {ChangeEvent, useState} from 'react';
import {ReactComponent as UploadPhoto} from './../../img/upload_photo.svg'
import './index.css'

const Form = () => {
  const [background, setBackground] = useState<boolean>(false)
  const [img, setImg] = useState<string>('')
  const [image, setImage] = useState<File | undefined>(undefined)
  const [result, setResult] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [patronymic, setPatronymic] = useState<string>('')
  

  function onDragOverHandler(e:React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setBackground(true)
  }

  function onDragLeaveHandler(e:React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setBackground(false)  
  }

  function onDropHandler(e:React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    let img = e.dataTransfer.files[0]
    setImage(img)
      if (img) {
          let imgSrc = URL.createObjectURL(img);
          setImg(imgSrc)
      }     
  }

  function choosePic(e: ChangeEvent<HTMLInputElement>) {
    let img = e.target.files 
      if (img) { 
        setImage(img[0])
        let imgSrc = URL.createObjectURL(img[0]);
        setImg(imgSrc)
      }      
  }

  function submitPhoto() {
  console.log('jf');
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", 'https://test-job.pixli.app/send.php', true)
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  xmlhttp.send(JSON.stringify({ 
    "action": "send_data", 
    "id": "1", 
    "image": `"${image}"`,
    "contact": `"[${name},${surname},${patronymic}]"`}))
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        let result = this.responseText;
        setResult(result)
        setImage(undefined)
        setName('')
        setSurname('')
        setPatronymic('')
      }
    }
  }

  function nameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function surnameChange(e: ChangeEvent<HTMLInputElement>) {
    setSurname(e.target.value)
  }

  function patronymicChange(e: ChangeEvent<HTMLInputElement>) {
    setPatronymic(e.target.value)
  }

    return (
        <div className='main'>
            <span className='input-text'>Имя</span>
              <input onChange={nameChange} className='input'></input>
              <span className='input-text'>Фамилия</span>
              <input onChange={surnameChange} className='input'></input>
              <span className='input-text'>Отчество</span>
              <input onChange={patronymicChange} className='input'></input>
              <span className='input-text'>Фото</span>
              <input 
                type="file"
                accept='image/jpeg,image/png' 
                id='upload-input' 
                style={{'display':'none'}}
                onChange={choosePic}  
              />
              <label  htmlFor="upload-input">
                {img? 
                  <img style={{height: 100}}
                    onDrop = {onDropHandler}
                    onDragOver = {onDragOverHandler}
                    onDragLeave = {onDragLeaveHandler}
                    src={img}
                  />
                  : 
                  <div 
                      className="upload_photo"
                      style={{
                      'background': `${background? 'rgba(118, 118, 128, 0.8)':'rgba(118, 118, 128, 0.24)'}`,
                      'backgroundImage': `url(${img})`,
                      'backgroundSize': 'cover',
                      'backgroundRepeat': 'no-repeat'
                      }}
                      onDrop = {onDropHandler}
                      onDragOver = {onDragOverHandler}
                      onDragLeave = {onDragLeaveHandler}
                  >
                  <UploadPhoto/>
                  </div>
                }
              </label>
              <button type="submit" onClick={submitPhoto}>Сохранить</button>
          <span className='input-text'>Response</span>
          <div className="response">{result}</div>  
        </div>
    );
};

export default Form;