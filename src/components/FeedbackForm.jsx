import React from 'react'
import Card from './shared/Card'
import { useState } from 'react'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'

function FeedbackForm({handleAdd}) {
    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('') 

    const handleTextChange = ({ target: { value } }) => {
        if(value === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if (value.trim().length < 10) {
            setMessage('Text must be atleast 10 characters')
            setBtnDisabled(true)
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }

        setText(value)
    }

    const handleSubmit = (e) => {
      e.preventDefault(false)
      if(text.trim().length > 10) {
        const newFeedback = {
          text,
          rating
        }

        handleAdd(newFeedback)

        setText('')
      }
    }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)}/>
        <div className='input-group'>
            <input 
                onChange={handleTextChange} 
                type='text' 
                placeholder='write a review' 
                value={text} />
            <Button type='submit' isDisabled={btnDisabled} >Send</Button>
        </div>

        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
