import '../classes.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {addDeadlines, deleteDeadlines, fetchDeadlines, updateDeadlines} from "../../../actions/deadlines";
import {fetchLessonsTeacherDetailed} from "../../../actions/lessonsTeacherByid";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/all";
import SmallModal from "../../../components/modal/smallModal";
import {fetchGradesLessons} from "../../../actions/displayGradesLessons";
import {fetchLessonsTeacher} from "../../../actions/lessonsTeacher";

function Classest() {
  const history = useHistory()
  const dispatch = useDispatch()
  const smallRef = useRef()
  const state = useSelector(state => state.lessonsTeacher)
  const deadlineLessons = useSelector(state => state.gradesLessons)
  const deadlines = useSelector(state => state.deadlines)
  const [deadline, setDeadline] = useState({lesson: null, name: "", description: "", deadline_time: "", type: "Lab"})
  const [upd, setUpd] = useState(true)


  useEffect(() => {
	dispatch(fetchLessonsTeacher())
	dispatch(fetchDeadlines())
	dispatch(fetchGradesLessons())
  }, [])

  const handleLessonClick = (id) => {
	dispatch(fetchLessonsTeacherDetailed(id))
	localStorage.setItem("lessonId", JSON.stringify(id))
	history.push("/teacher/lessont");
  }

  const deleteDeadline = (id) => {
	dispatch(deleteDeadlines(id))
  }

  const updateDeadline = (id, lesson, el) => {
	setUpd(false)
	setDeadline({...deadline, ...el, lesson, id})
	console.log(deadline)
	smallRef.current.add()
  }

  const handleDeadlineAddSubmit = (e) => {
	if (!upd) {
	  console.log('here', deadline)
	  dispatch(updateDeadlines(deadline))
	  setDeadline({lesson: null, name: "", description: "", deadline_time: "", type: "Lab"})
	  setUpd(true)
	} else {

	  if (!deadline.lesson) deadline.lesson = deadlineLessons.lessons[0].id
	  dispatch(addDeadlines(deadline))
	  setDeadline({lesson: null, name: "", description: "", deadline_time: "", type: "Lab"})
	  dispatch(fetchDeadlines())
	}
	smallRef.current.end()
	e.preventDefault()
  }
  if (!state.loading) {
	return (<>
	  <div className="main-container">
		<div className="subject-title"><span>Предмети</span></div>
		<SmallModal ref={smallRef}>
		  <div className="subject-creation-container">
			<label for="name" className="name">Name</label>
			<input type="text" id="name" onChange={(e) => setDeadline({...deadline, name: e.target.value})}/>
			<label for="name" className="type">Type</label>
			<select id="type" onChange={(e) => setDeadline({...deadline, type: e.target.value})}
					className="sub-select-name">
			  <option value="Lab">Lab</option>
			  <option value="Task">Task</option>
			  <option value="Test">Test</option>
			</select>
			<label for="subject" className="subject-selector">Subject</label>
			{upd && <select id="subject" onChange={(e) => setDeadline({...deadline, lesson: Number(e.target.value)})}
							className="sub-select">
			  {deadlineLessons.lessons.map((el) => {
				return <option value={el.id} key={el.lesson.id}>{el.lesson.name} - {el.group.name}</option>
			  })}

			</select>}
			<label for="description" className="subject-desc">Description</label>
			<textarea type="description" id="description"
					  onChange={(e) => setDeadline({...deadline, description: e.target.value})}/>
			<label for="date" className="subject-date">Date</label>
			<input type="date" id="date" placeholder="deadline_time"
				   onChange={(e) => setDeadline({...deadline, deadline_time: e.target.value})}/>
			<input type="submit" onClick={(e) => {
			  handleDeadlineAddSubmit(e)
			}}/>
		  </div>
		</SmallModal>
		<div className="inner-container">
		  {!state.loading && state.lessons.map((el) => {
			return <a className="col2" key={el.id} onClick={() => handleLessonClick(el.id)}>
			  <div className="inner-information">
				<span>{el.name}</span>
			  </div>
			</a>
		  })}
		</div>


		<>
		  <div className="subject-title"><span>Дедлайни</span></div>

		  <div className="deadline-container">
			<table className="content-table">
			  <thead>
			  <tr>
				<th>Назва предмату</th>
				<th>Назва задачі</th>
				<th>Дедлайн</th>
				<th>Додатковий опис</th>
				<th colSpan="2" id="myBtn" onClick={() => smallRef.current.add()}>Додати дедлайн</th>
			  </tr>
			  </thead>
			  <tbody>
			  {!deadlines.loading &&
			  deadlines.deadlines.map((el, i) => {
				return (
					<tr key={el.id} className={'tr-info'}>

					  <td>{el.name}</td>
					  <td>{el.type}</td>
					  <td>{el.deadline_time}</td>
					  <td>{el.description}</td>
					  <td className="delete" onClick={() => deleteDeadline(el.id)}><AiOutlineDelete/></td>
					  <td className="edit" onClick={() => updateDeadline(el.id, el.lesson.lesson.id, el)}>
						<AiOutlineEdit/>
					  </td>
					</tr>
				)
			  })}

			  </tbody>
			</table>
		  </div>

		</>

	  </div>
	</>)
  } else {
    return <div>Loading...</div>
  }
}

export default Classest
