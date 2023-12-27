import React, { useState } from "react";
import "./modal.css"


const ModalEdit = ({active, setActive , data}) =>{

const [activeBtn,setActiveBtn] = useState(false)
let [inputValue,setInputValue]= useState('')
let [dataRow,setDataRow] = useState()




const getSelectedRow = () => {
  
  setActiveBtn(true)
  const selectedRow = data()
  console.log(selectedRow)
  if(selectedRow !== undefined) {
    setDataRow(selectedRow)
    setInputValue(selectedRow)
  }
  else {
    alert('Студент не выбран')
  }
}


const overWriteData = () => {
  setDataRow((currentData)=>({
    ...currentData,
    roomNumber: Number(inputValue.roomNumber) || Number(inputValue),
  }));
  console.log(dataRow)
  
}

    return (  
      <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
      >
        <div
          className={active ? "modal__content active" : "modal__content"}
          onClick={(e) => e.stopPropagation()}
        >
          <form className="form" action="#">
            <button onClick={getSelectedRow} type="button" formtarget="blank">
              Получить данные выбранного студента
            </button>
            <p className="form__title">Введите данные</p>
              <div className="form__input-wrap">
                <label for="Фамилия">Фамилия</label>
                <input
                  className="form__input"
                  type="text"
                  placeholder="Фамилия"
                  id="Фамилия"
                  // value={activeBtn ? inputValue.student.surname : "Нет данных"}
                />
              </div>
              <div className="form__input-wrap">
                <label for="Имя">Имя</label>
                <input
                  className="form__input"
                  type="text"
                  placeholder="Имя"
                  id="Имя"
                  // value={activeBtn ? inputValue.student.name: "Нет данных"}
                />
              </div>
              <div className="form__input-wrap">
                <label for="Отчество">Отчество</label>
                <input
                  className="form__input"
                  type="text"
                  placeholder="Отчество"
                  id="Отчество"
                  // value={activeBtn ? inputValue.student.patronymic : "Нет данных"}  
                />
              </div>
           
            <div className="form__input-wrap">
              <label for="№ комнаты">№ комнаты</label>
              <input
                className="form__input"
                type="text"
                placeholder="№ комнаты"
                id="№ комнаты"
                value={activeBtn ? inputValue.roomNumber   : 'Нет данных' }
                onChange={(e)=> setInputValue(e.target.value)}
              />
            </div>
            <button type="button" formtarget="blank" onClick={overWriteData} >Принять Данные</button>
            {/* <button type="button" formtarget="blank" onClick={postData} >Отправить</button> */}
          </form>
        </div>
      </div>
    )
}

export default ModalEdit;