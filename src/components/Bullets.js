
import '../css/bullets.css';


let array = [
    `
    Reduce complexity of conducting online exams,
    EXAMIO helps in conducting various types of exams
    `,
    `
    Easy to read documentation about how to create your own exams,
    `,
    `
    Speedy and effective result management with various modes of results
     delivery
    `,
    `
    ExamIO web APIs to be readily integrated with other web apps with little,
    configuration process.
    `,

]

function Bullets (props) {
    return(
        <div className="bull shadow-8">
            <div className="content" data-aos="fade-right">
                <p>{array[props.value]}</p>
            </div>
            <div data-aos="fade-left" className={`image i${props.value + 1}`}>
            </div>
        </div>
    )
}

export default Bullets;