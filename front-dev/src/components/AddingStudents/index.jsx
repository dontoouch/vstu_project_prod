import React, { useEffect, useState  } from "react";
import "./style.css";
import Select from "react-select";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { addStudentThunk } from "../../redux/actions/mainThunks";
import { connect } from "react-redux";


const AddingStudents = ({ active, setActive , addStudentThunk}) => {


  const [dataState, setDataState] = useState([]);
  const [roomsData, setRoomsData] = useState([]);

  useEffect(() => {
    fetch("http://192.168.11.57:18076/api/hostels/1/rooms", {
    // fetch("http://localhost:3001/room", {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))["access_token"],
      },
    })
      .then((resp) => resp.json())
      .then((data) => setRoomsData(data));

      fetch("http://192.168.11.57:18076/api/students/needHostel", {
    // fetch("http://localhost:3002/needHostel", {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))["access_token"],
      },
    })
      .then((resp) => resp.json())
      .then((data) => setDataState(data));
  }, []);

  const [currentName, setCurrentName] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [currentType, setCurrentType] = useState("М" || "Б");

  const optionsName = dataState.map((item) => {
    return {
      value: `${item.name} ${item.patronymic} ${item.surname}`,
      label: `${item.name} ${item.patronymic} ${item.surname}`,
    };
  });

  const optionsRoom =
    roomsData !== undefined
      ? roomsData.map((item) => {
          return {
            value: item.roomNumber,
            label: item.roomNumber,
          };
        })
      : "unknown";

  const optionsRoomType = [
    {
      value: "LITTLE",
      label: "М",
    },
    {
      value: "BIG",
      label: "Б",
    },
  ];

  
  const onPostData = async (roomsData, dataState) => {
    try {
      const foundRoom = roomsData.find(
        (item) => item.roomNumber === currentRoom
      );

      const foundStudent = dataState.find(
        (item) =>
          `${item.name} ${item.patronymic} ${item.surname}` === currentName
      );

      let roomLength = foundRoom.students.length;
      foundRoom.students = foundStudent

      
      console.log(currentType)

      
      if (((currentType === "BIG" && roomLength < 3) || (currentType ==='LITTLE' && roomLength < 2)) && foundStudent !== undefined) {
        const response = await fetch(
          `http://192.168.11.57:18076/api/hostels/rooms/${foundRoom.id}/students?studentId=${foundStudent.id}`,
          // `http://localhost:3001/room/${foundRoom.id}/students/${foundStudent.id}`,
          {
            method: "POST",
            headers: {
              Authorization:
                "Bearer" +
                JSON.parse(localStorage.getItem("user"))["access_token"],
            },
            body: JSON.stringify({
              studentId: foundStudent.id,
              roomId: foundRoom.id,
            }),
          }
        ).then((response) => response.json());
        updateStudents(foundRoom);
        setActive(false)
        
      }
      else {
        alert('В комнате максимальное количество студентов или студент не выбран')
      }
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateStudents = (foundRoom) => {
    addStudentThunk([foundRoom])
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
        <div className="select">
          <div className="select-block">
            <h3>ФИО</h3>
            <Select
              className="select-content"
              options={optionsName}
              onChange={(newValue) => setCurrentName(newValue.value)}
              value={
                currentName
                  ? optionsName.find((c) => c.value === currentName)
                  : ""
              }
            />
          </div>
          <div className="select-block">
            <h3>Номер комнаты</h3>
            <Select
              className="select-content"
              options={optionsRoom}
              onChange={(newValue) => setCurrentRoom(newValue.value)}
              value={
                currentRoom
                  ? optionsRoom.find((c) => c.value === currentRoom)
                  : ""
              }
            />
          </div>
          <div className="select-block">
            <h3>Размер комнаты</h3>
            <Select
              className="select-content"
              options={Array.from(new Set(optionsRoomType))}
              onChange={(newValue) => setCurrentType(newValue.value)}
              value={
                currentType
                  ? optionsRoomType.find((c) => c.value === currentType)
                  : ""
              }
            />
          </div>
          <div className="btn-block">
            <button
              className="btn-approved"
              type="button"
              onClick={() => onPostData(roomsData, dataState)}
            >
              Добавить студента
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


let mapStateToProps = (state) => {
  return {
    rooms: state.mainPage.rooms,
    // students: state.mainPage.students,
  };
};

export default connect(mapStateToProps, {
  addStudentThunk,
  // getStudentsThunk,
})(AddingStudents);
