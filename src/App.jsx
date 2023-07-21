import React from 'react'
import { Formik } from 'formik'
import './App.css'

function App() {
  const [books, setBooks] = React.useState([])
  const [indexSelected, setIndexSelected] = React.useState(-1)
  
  const handleValidate = (values) => {
    const errors = {}
    if (!values.bookTitle) {
      errors.bookTitle = 'Tiêu đề sách không được để trống'
    }

    if (!values.bookNumber) {
      errors.bookNumber = 'Số lượng sách không được để trống'
    }

    return errors
  }

  const handleSelect = (bookSelected, index, setFieldValue) => {
    setIndexSelected(index)
    setFieldValue('bookTitle', bookSelected.bookTitle)
    setFieldValue('bookNumber', bookSelected.bookNumber)
  }

  const handleDelete = (index) => {
    const newBooks = [...books]
    newBooks.splice(index, 1)
    setBooks(newBooks)
  }

  const handleFormSubmit = (values, formik) => {
    let isValid = values.bookTitle && values.bookNumber
    if (isValid) {
      const newBooks = [...books]
      if (indexSelected > -1) {
        newBooks[indexSelected] = values
      } else {
        newBooks.push(values)
      }
      setBooks(newBooks)
      formik.resetForm()
      setIndexSelected(-1)
    }
  }

  return (
    <Formik
      initialValues={{
        bookTitle: '',
        bookNumber: '',
      }}
      onSubmit={handleFormSubmit}
      validate={handleValidate}
    >
      {({ values, errors, touched, handleChange, handleSubmit, setFieldTouched, setFieldValue }) => (
        <div className='main'>
          <form id='form-1' className='form'>
            <h3 className='heading'>Library</h3>
            <p className='desc'>Khám phá tri thức - Mở cửa tương lai</p>

            <div className='spacer'></div>

            <div className={`form-group ${errors.bookTitle && touched.bookTitle ? 'invalid' : ''}`}>
              <label className='form-label' htmlFor='bookTitle'>Tiêu đề</label>
              <input name='bookTitle' id='bookTitle' className='form-control' value={values.bookTitle} onChange={handleChange} onBlur={() => setFieldTouched('bookTitle', true)} />
              {errors.bookTitle && touched.bookTitle && <span className='form-message'>{errors.bookTitle}</span>}
            </div>

            <div className={`form-group ${errors.bookNumber && touched.bookNumber ? 'invalid' : ''}`}>
              <label className='form-label' htmlFor='bookNumber'>Số lượng</label>
              <input name='bookNumber' id='bookNumber' className='form-control' value={values.bookNumber} onChange={handleChange} onBlur={() => setFieldTouched('bookNumber', true)} />
              {errors.bookNumber && touched.bookNumber && <span className='form-message'>{errors.bookNumber}</span>}
            </div>

            {indexSelected < 0 ? <button className='form-submit' onClick={handleSubmit}>Submit</button> : <button className='form-submit' onClick={handleSubmit}>Update</button>}
          </form>

          <table>
            <thead>
              <th>Title</th>
              <th>Number</th>
              <th>Actions</th>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td>{book.bookTitle}</td>
                  <td>{book.bookNumber}</td>
                  <td>
                    <button onClick={() => handleSelect(book, index, setFieldValue)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      )}
    </Formik>
  )
}

export default App