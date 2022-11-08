import { useEffect, useState } from "react"
import Resource from '../services/notes'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    useEffect(()=> {
        Resource.getData(baseUrl).then((res) => {
            setResources(res)
        })
    }, [])
    const create = async (resource) => {
      console.log(resource)
        if (resource.content) {
            await Resource.createNote(resource)
        }
        if (resource.name) {
            await Resource.createPerson(resource)
        }
        
        await Resource.getData(baseUrl).then((res) => {
            setResources(res)
        })
        console.log(resources)
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
  }






export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }
  

