import { useCallback, useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import * as filestack from 'filestack-js';

const roles = [
  { id: 0, role: "Select a role" },
  { id: 1, role: "React Developer" },
  { id: 2, role: "React Developer Personal Cook" },
  { id: 3, role: "React Developer Personal Chauffeur" }
]
export default function Home() {
  const [fileName, setFileName] = useState(null)
  const [file, setFile] = useState(null)
  const [name, setName] = useState(null)
  const [role, setRole] = useState(null)
  const [client, setClient] = useState(null)

  useEffect(() => {
    setClient(filestack.init(process.env.NEXT_PUBLIC_API_KEY));
  }, [])

  const onDrop = useCallback(acceptedFile => {
    setFileName(acceptedFile[0].name)
    setFile(acceptedFile[0])
    console.log(acceptedFile[0])
    // console.log(acceptedFile)
  }, [])

  function handleSubmit() {
    if (file && name && role && JSON.parse(role)?.id !== 0 && client) {
      let formData = new FormData();
      formData.append("file", file, file.type);

      
      
      axios.post("/api/upload", formData)
      .then((result) => {
        let body = {
          applicant: name,
          applicantRole: JSON.parse(role).role,
          url: result.data.url
        }
        return axios.post('/api/airtable', body)

      })
      .then((result) => {
        console.log(result.data)
      }).catch((err) => {
        console.log(err)
      });
    }

  }
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div>
      <Head>
        <title>CV Tracker</title>
        <meta name="description" content="CV Tracker demo created by You Know Who" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="field" style={{ width: '40%' }}>
        <label className="label">Full Name</label>
        <div className="control">
          <input onChange={(e) => setName(e.target.value)}  className="input" type="text" placeholder="Text input" />
        </div>
      </div>

      <div className="field">
        <label className="label">Role</label>
        <div className="control">
          <div className="select" onChange={(e) => setRole(e.target.value)}>
            <select>
              {
                roles.map((role) => <option value={JSON.stringify(role)}  key={role.id}>{role.role}</option>)
              }

            </select>
          </div>
        </div>
      </div>

      <div className="file has-name mt-5" {...getRootProps()}>
        <label className="file-label">
          <input className="file-input" type="file" name="resume" {...getInputProps({ multiple: false })} />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">
              Choose a file…
            </span>
          </span>
          <span className="file-name">
            {fileName ? fileName : 'Upload your resume here'}
          </span>
        </label>
      </div>

      <button onClick={handleSubmit} className="button is-success is-outlined mt-6" style={{ width: '40%' }}>Submit</button>

    </div>
  )
}
