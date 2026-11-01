'use client'
import Left from "./Left"
import Right from "./Right"

const Main = () => {
  return (
    <div className="flex flex-col sm:flex-row h-screen p-4 sm:px-14 sm:py-11">
      <Left />
      <Right />
    </div>
  )
}

export default Main