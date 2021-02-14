import '../class.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchLessonsTeacher} from "../../../actions/lessonsTeacher";
import {fetchLessonsStudentDetailed} from "../../../actions/lessonsStudentByid";
import {fetchLessonsTeacherDetailed} from "../../../actions/lessonsTeacherByid";


function Lessont() {
  const dispatch = useDispatch()
  const state = useSelector(state => state.lessonsTeacher)
  let lessonsTeacherById = useSelector(state => state.lessonsTeacherById)


  useEffect(() => {
	const id = JSON.parse(localStorage.getItem('lessonId'))
	dispatch(fetchLessonsTeacherDetailed(id))
  }, [])

  if(!lessonsTeacherById.loading) {
	return <>

	  <div className="container">
		<div className="first-section">

		  {/*{% for i in get_chapter %}*/}
		  <div className="col">
			<div className="title">
			  <span>{lessonsTeacherById.detailed.name}</span>
			</div>
			<div className="description">
			  <span>{lessonsTeacherById.detailed.description}</span>
			</div>
			<div className="title pdf">
			  {/*<a href="{{ i.document.url }}" download>{{i.document.name}}</a>*/}
			  {/*<img src="../../media/page/pdf.svg" alt="" className="user-png">*/}
			</div>
			<div className="redaction">
			  <a href="/">Видалити</a>
			  <a href="/">
				<span>Редактувати</span>
			  </a>
			</div>
		  </div>
		  {/*{% endfor %}*/}

		</div>
		<div className="second-section">
		  <div className="col col-teacher-info">
			{/*<div className="teacher-info"><p>{{get_lesson.description}}</p></div>*/}
			<div className="whois">
			  <span>Групи:</span>
			  {/*{% for i in get_group %}*/}
			  {/*<span>{{i}}</span>*/}
			  {/*{% endfor %}*/}
			</div>
		  </div>
		  <div className="col col-teacher-info add-new-chapter">
			<span className="collapsible">Додати</span>
			<div className="content">
			  <form encType="multipart/form-data" action="" method="post">
				{/*{% csrf_token %}*/}
				{/*{{form.as_p}}*/}
				<div className="modal-footer">
				  <button type="submit" name="button">Add</button>
				</div>
			  </form>
			</div>
		  </div>

		</div>

	  </div>
	</>
  } else {}
  return (
  	<div>Loading...</div>
  )
}

export default Lessont

