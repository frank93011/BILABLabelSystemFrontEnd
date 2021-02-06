import './Card.css';

function Card(props) {
  return (
    <div className="card">
      {props.title}
    </div>
  )
}

export default Card;