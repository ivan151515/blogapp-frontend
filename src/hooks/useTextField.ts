import { useState } from "react"

export const useTextField = () => {
    const [value, setValue] = useState('')
  
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }
    const reset = () => {
      setValue("")
    }
    return {
      value,
      onChange,
      reset
    }
  }
  